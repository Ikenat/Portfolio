import { defineStore } from 'pinia'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind);

let isWideEnough = breakpoints.greater('lg')


export const useSizeStore = defineStore({
  id: 'size',
  state: () => ({
    isDesktop: isWideEnough,
  }),
})
