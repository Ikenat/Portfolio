import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
    isDark: false,
  }),
  actions: {
      switchTheme() {
          this.isDark = !this.isDark
      }
  }
})
