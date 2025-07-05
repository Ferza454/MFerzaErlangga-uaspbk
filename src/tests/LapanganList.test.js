import { mount } from '@vue/test-utils'
import LapanganList from '@/views/LapanganList.vue'
import { describe, it, expect } from 'vitest'

describe('LapanganList.vue', () => {
  it('renders title', () => {
    const wrapper = mount(LapanganList, {
      global: {
        stubs: ['router-link']
      }
    })
    expect(wrapper.text()).toContain('Daftar Lapangan')
  })
})
