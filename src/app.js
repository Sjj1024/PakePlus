let newDevice;
let keyboardAPI;
const cache = {};
const receivedDataContainer = document.getElementById("receivedData");
// 设备连接和断开事件监听
navigator.hid.addEventListener("connect", async ({ device }) => {
  console.log(`设备插入: ${device.productName}`);

  // 检查设备是否为授权的设备
  const storedDeviceInfo = localStorage.getItem("authorizedDevice");
  if (storedDeviceInfo) {
    const { vendorId, productId } = JSON.parse(storedDeviceInfo);
    if (device.vendorId === vendorId && device.productId === productId) {
      // 如果是授权的设备，自动连接
      if (device !== newDevice) {
        await WebHid.connectDevice(device);
      }
    }
  } else {
    console.log("没有授权设备，等待用户授权");
  }
});
navigator.hid.addEventListener("disconnect", (event) => {
  console.log(`设备拔出: ${event.device.productName}`);
  newDevice = null;
  document.getElementById("status").innerText = "设备已断开";
  // 清除缓存和接收到的数据
  if (keyboardAPI) {
    keyboardAPI.receivedData = []; // 清空接收到的数据
    keyboardAPI.renderReceivedData(); // 更新UI，清空显示的数据
  }
});

// 生成唯一地址
const getRandomAddress = () => {
  return (
    (self.crypto?.randomUUID && self.crypto.randomUUID()) ||
    `path:${Math.random()}`
  );
};

// 缓存设备信息
const tagDevice = (device) => {
  device._address = device._address || getRandomAddress();
  return (WebHid._cache[device._address] = {
    _device: device,
    vendorId: device.vendorId ?? -1,
    productId: device.productId ?? -1,
    address: device._address,
    productName: device.productName,
  });
};

// 设备连接按钮
document.getElementById("connect").addEventListener("click", async () => {
  try {
    const devices = await navigator.hid.requestDevice({
      filters: [{ vendorId: 0x36b0, usagePage: 0xff60, usage: 0x0061 }],
    });

    if (devices.length > 0) {
      // 授权并保存设备信息
      const device = devices[0];
      const deviceInfo = {
        vendorId: device.vendorId,
        productId: device.productId,
        productName: device.productName,
      };
      localStorage.setItem("authorizedDevice", JSON.stringify(deviceInfo));

      await WebHid.connectDevice(device);
    }
  } catch (error) {
    console.error("连接设备失败:", error);
  }
});

// KeyboardAPI 类
class KeyboardAPI {
  constructor(device) {
    this.address = device.address;
    this.receivedData = [];
    this.device;

    if (!cache[this.address]) {
      cache[this.address] = { hid: device };
      this.device = device._device;
    } else {
      this.device = cache[this.address]._device;
    }
  }

  async initialize() {
    if (!this.device) return;
    console.log(this.device);

    try {
      this.device.addEventListener(
        "inputreport",
        this.handleInputReport.bind(this)
      );
      await this.sendInitCommands();
      console.log("缓存设备信息:", cache);
    } catch (error) {
      console.error("初始化失败:", error);
    }
  }

  async handleInputReport(event) {
    const dataArray = new Uint8Array(event.data.buffer);
    this.receivedData.push(dataArray);
    console.log(`收到数据 (${this.receivedData.length}):`, this.receivedData);

    // 渲染接收到的数据到页面
    this.renderReceivedData();
  }

  async sendInitCommands() {
    if (!this.device) return;
    console.log(this.device, cache);

    try {
      await this.device.sendReport(0x00, new Uint8Array([0xdd]));
      console.log("已发送第一笔数据");
      await this.device.sendReport(0x00, new Uint8Array([0xcc]));
      console.log("已发送第二笔数据");
    } catch (error) {
      console.error("发送初始化命令失败:", error);
    }
  }
  renderReceivedData() {
    if (!receivedDataContainer) return;

    // 清空当前列表
    receivedDataContainer.innerHTML = "";

    // 遍历 receivedData 数组，并处理每一笔数据
    this.receivedData.forEach((data, index) => {
      // 处理数据：去除 0 并去除一个最大值和一个最小值（如果有超过四个值）
      let processedData = this.processData(data).filter((value) => value !== 0); // 去除0

      if (processedData.length > 4) {
        // 如果数据项超过4个，去除一个最大值和一个最小值
        const minValue = Math.min(...processedData);
        const maxValue = Math.max(...processedData);

        // 去除一个最小值和一个最大值
        // 去除一个最小值
        const minIndex = processedData.indexOf(minValue);
        if (minIndex !== -1) processedData.splice(minIndex, 1);

        // 去除一个最大值
        const maxIndex = processedData.indexOf(maxValue);
        if (maxIndex !== -1) processedData.splice(maxIndex, 1);
      }

      console.log(processedData);

      // 计算该笔数据的平均值
      const average =
        processedData.length > 0
          ? processedData.reduce((acc, curr) => acc + curr, 0) /
            processedData.length
          : 0;

      // 显示每一笔数据及其平均值
      const listItem = document.createElement("li");
      listItem.textContent = `数据 ${index + 1}: ${processedData.join(
        ", "
      )} | 平均值: ${average.toFixed(2)}`;
      receivedDataContainer.appendChild(listItem);
    });
  }

  // 数据处理函数
  processData(data) {
    const processed = [];
    for (let i = 0; i < data.length; i++) {
      if (i <= 1) {
        // 跳过 221, 221
        i++;
        continue;
      }
      if (data[i] === 1) {
        // 1表示负数
        processed.push(-data[i + 1]);
        i++;
      } else if (data[i] === 0) {
        // 0表示整数，保留原值
        processed.push(data[i + 1]);
        i++;
      } else {
        // 其他情况，按原样处理
        processed.push(data[i]);
      }
    }
    return processed;
  }

  async write(arr) {
    await this.openPromise;
    const data = new Uint8Array(arr.slice(1));
    this.fastForwardGlobalBuffer(Date.now());
    eventWaitBuffer[this.address] = [];
    await this._hidDevice?._device.sendReport(0, data);
  }
}

// WebHid 对象：负责设备连接与自动重连
const WebHid = {
  _cache: {},

  // 自动连接设备
  autoConnect: async () => {
    try {
      const devices = await navigator.hid.getDevices();
      console.log(devices, cache);

      if (devices.length > 0) {
        await WebHid.connectDevice(devices[0]);
      }
    } catch (error) {
      console.error("自动连接设备失败:", error);
    }
  },

  // 连接设备
  connectDevice: async (newDevice) => {
    if (!newDevice) return;
    newDevice = newDevice;
    console.log(newDevice, cache);

    // 打开设备
    try {
      if (!newDevice.opened) {
        await newDevice.open();
        console.log(`已连接设备: ${newDevice.productName}`);
        document.getElementById(
          "status"
        ).innerText = `已连接: ${newDevice.productName}`;
      }

      // 初始化设备
      keyboardAPI = new KeyboardAPI(tagDevice(newDevice));
      await keyboardAPI.initialize();
    } catch (error) {
      console.error("设备连接失败:", error);
    }
  },
};
class HidDeivce {
  _hidDevice;
  interface;
  vendorId;
  productId;
  productName;
  address;
  openPromise;
  constructor(address) {
    if (address == "demo") {
      this.vendorId = 0x9a9a;
      this.productId = 0xbaba;
      this.productName = "Test";
      return;
    }
    this._hidDevice = WebHid._cache[address];
    if (this._hidDevice) {
      this.vendorId = this._hidDevice.vendorId;
      this.productId = this._hidDevice.productId;
      this.address = this._hidDevice.address;
      this.interface = this._hidDevice.interface;
      this.productName = this._hidDevice.productName;
      globalBuffer[this.address] = globalBuffer[this.address] || [];
      eventWaitBuffer[this.address] = eventWaitBuffer[this.address] || [];
      if (!this._hidDevice._device.opened) {
        this.open();
      }
    }
  }

  async open() {
    if (this._hidDevice && !this._hidDevice._device.opened) {
      this.openPromise = this._hidDevice._device.open();
      this.setupListeners();
      await this.openPromise;
    }
    return Promise.resolve();
  }

  addListeners(fn) {
    if (this._hidDevice) {
      this._hidDevice._device.oninputreport = fn;
    }
  }

  setupListeners() {
    if (this._hidDevice) {
      this._hidDevice._device.addEventListener("inputreport", (e) => {
        if (eventWaitBuffer[this.address].length !== 0) {
          // It should be impossible to have a handler in the buffer
          // that has a ts that happened after the current message
          // came in
          eventWaitBuffer[this.address].shift()(new Uint8Array(e.data.buffer));
        } else {
          globalBuffer[this.address].push({
            currTime: Date.now(),
            message: new Uint8Array(e.data.buffer),
          });
        }
      });
    }
  }

  read(fn) {
    if (globalBuffer[this.address]?.length > 0) {
      // this should be a noop normally
      fn(undefined, globalBuffer[this.address].shift()?.message);
    } else {
      eventWaitBuffer[this.address].push((data) => fn(undefined, data));
    }
  }

  readP = promisify((arg) => this.read(arg));

  fastForwardGlobalBuffer(time) {
    let messagesLeft = globalBuffer[this.address]?.length;
    while (messagesLeft) {
      messagesLeft--;
      // message in buffer happened before requested time
      if (globalBuffer[this.address][0].currTime < time) {
        globalBuffer[this.address].shift();
      } else {
        break;
      }
    }
  }

  async write(arr) {
    await this.openPromise;
    const data = new Uint8Array(arr.slice(1));
    this.fastForwardGlobalBuffer(Date.now());
    eventWaitBuffer[this.address] = [];
    await this._hidDevice?._device.sendReport(0, data);
  }
}
// 自动连接已授权的设备
WebHid.autoConnect();
