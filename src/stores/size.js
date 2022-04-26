import { defineStore } from 'pinia'

export const useSizeStore = defineStore({
  id: 'size',
  state: () => ({
    sizeScreen: window.innerWidth
  }),
  actions: {
    resize(param) {
      this.sizeScreen = param
    }
  }
})
