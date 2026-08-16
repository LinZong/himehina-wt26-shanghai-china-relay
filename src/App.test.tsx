import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('HIMEHINA Shanghai relay page', () => {
  it('shows only the selected event sections and confirmed details', () => {
    render(<App />)

    expect(screen.getByLabelText('活动性质说明')).toHaveTextContent('非官方民间观影活动')
    expect(screen.getByLabelText('活动性质说明')).toHaveTextContent('与 Studio LaRa 及 HIMEHINA 官方无隶属或主办关系')
    expect(screen.getByLabelText('活动性质说明').querySelector('a')).toHaveAttribute(
      'href',
      'https://spc.himehina.jp/world-tour26',
    )
    expect(screen.getByRole('heading', { name: 'TOUR DATES' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'TICKETS' })).not.toBeInTheDocument()
    expect(screen.getByText('中国上海')).toBeInTheDocument()
    expect(screen.getByText('2026/10/3（六）・2026/10/4（日）')).toBeInTheDocument()
    expect(screen.queryByText('GET TICKETS')).not.toBeInTheDocument()
    expect(screen.queryByText('GOODS')).not.toBeInTheDocument()
    expect(screen.queryByText('YOUR VOICE')).not.toBeInTheDocument()
    expect(screen.queryByText('ATTENTION')).not.toBeInTheDocument()
  })

  it('advances the carousel automatically and manually', () => {
    vi.useFakeTimers()
    render(<App />)

    expect(screen.getByRole('button', { name: /当前第 1 张/ })).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(8000))
    expect(screen.getByRole('button', { name: /当前第 2 张/ })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /当前第 2 张/ }))
    expect(screen.getByRole('button', { name: /当前第 3 张/ })).toBeInTheDocument()
  })

  it('keeps the current section navigation directly accessible', () => {
    render(<App />)

    const nav = screen.getByRole('navigation', { name: '页面导航' })
    const datesLink = screen.getByRole('link', { name: 'TOUR DATES' })
    expect(nav).toContainElement(datesLink)
    expect(screen.queryByRole('link', { name: 'TICKETS' })).not.toBeInTheDocument()
    fireEvent.click(datesLink)
    expect(datesLink).toHaveAttribute('aria-current', 'location')
  })
})
