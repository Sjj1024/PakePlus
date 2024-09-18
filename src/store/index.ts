import { defineStore } from 'pinia'

export const usePakeStore = defineStore('pakeplus', {
    state: () => {
        return {
            name: '小猪课堂',
            age: 25,
            sex: '男',
        }
    },
    getters: {
        getAddAge: (state) => {
            return (num: number) => state.age + num
        },
        getNameAndAge(): string {
            return this.name + this.getAddAge // 调用其它getter
        },
    },
    actions: {
        saveName(name: string) {
            this.name = name
        },
    },
})
