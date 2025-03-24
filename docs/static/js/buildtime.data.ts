export default {
    // get data from local
    async load() {
        return {
            buildTime: new Date().toLocaleString(),
        }
    },
}
