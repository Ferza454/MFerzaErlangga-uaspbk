import { mount } from '@vue/test-utils'
import BookingForm from '@/views/BookingForm.vue'
import { describe, it, expect, vi } from 'vitest'
import { useRoute, useRouter } from 'vue-router'

vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { id: 1 } }),
  useRouter: () => ({ push: vi.fn() })
}))

vi.mock('@/api', () => ({
  api: {
    post: vi.fn().mockResolvedValue({})
  }
}))

describe('BookingForm.vue', () => {
  it('renders form inputs', () => {
    const wrapper = mount(BookingForm)
    expect(wrapper.find('input[placeholder=\"Nama\"]').exists()).toBe(true)
  })
})
