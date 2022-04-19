import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Home from '../Home.vue'
import Navigation from '../Navigation.vue'

describe('Home', () => {
  it('Home renders properly', () => {
    const wrapper = mount(Home, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Portfolio')
  })
})

describe('HelloWorld', () => {
  it('Navigation renders properly', () => {
    const wrapper = mount(Navigation)
    expect(wrapper.text()).toContain('Julien D')
  })
})

