import { useEffect, useState } from 'react'

const SLIDE_DURATION = 8000

const slides = [
  { desktop: './images/kv-01.png', mobile: './images/kv-01-sp.png' },
  { desktop: './images/kv-02.png', mobile: './images/kv-02-sp.png' },
  { desktop: './images/kv-03.png', mobile: './images/kv-03-sp.png' },
  { desktop: './images/kv-04.png', mobile: './images/kv-04-sp.png' },
] as const

const navigation = [
  { href: '#dates', label: 'TOUR DATES' },
  // { href: '#tickets', label: 'TICKETS' },
] as const

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [pageVisible, setPageVisible] = useState(true)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  useEffect(() => {
    if (reducedMotion || !pageVisible) return
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      SLIDE_DURATION,
    )
    return () => window.clearInterval(timer)
  }, [pageVisible, reducedMotion])

  const nextSlide = () => setActiveSlide((current) => (current + 1) % slides.length)

  return (
    <header className="hero" aria-label="HIMEHINA WORLD Tour 2026">
      <div className="hero-stage">
        {slides.map((slide, index) => (
          <picture
            className={`hero-image${index === activeSlide ? ' is-active' : ''}`}
            aria-hidden={index !== activeSlide}
            key={slide.desktop}
          >
            <source media="(max-width: 680px)" srcSet={slide.mobile} />
            <img
              src={slide.desktop}
              alt={index === activeSlide ? `HIMEHINA WORLD Tour 2026 主视觉 ${index + 1}` : ''}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          </picture>
        ))}
        <button
          className="hero-gauge"
          type="button"
          onClick={nextSlide}
          aria-label={`当前第 ${activeSlide + 1} 张，共 ${slides.length} 张；切换到下一张`}
        >
          <svg key={`${activeSlide}-${pageVisible}`} viewBox="0 0 36 36" aria-hidden="true">
            <circle className="gauge-track" cx="18" cy="18" r="16" />
            <circle className="gauge-fill" cx="18" cy="18" r="16" />
          </svg>
          <span>{activeSlide + 1}<small>/{slides.length}</small></span>
        </button>
      </div>
    </header>
  )
}

function Navigation() {
  const [activeHash, setActiveHash] = useState(() => window.location.hash)

  useEffect(() => {
    const updateActiveHash = () => setActiveHash(window.location.hash)
    window.addEventListener('hashchange', updateActiveHash)
    return () => window.removeEventListener('hashchange', updateActiveHash)
  }, [])

  return (
    <nav className="section-nav" aria-label="页面导航">
      <ul>
        {navigation.map((item) => (
          <li key={item.href}>
            <a
              className={activeHash === item.href ? 'is-active' : undefined}
              href={item.href}
              aria-current={activeHash === item.href ? 'location' : undefined}
              onClick={() => setActiveHash(item.href)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function BackgroundDecorations() {
  return (
    <div className="decorations" aria-hidden="true">
      <span className="blob blob-one" />
      <span className="blob blob-two" />
      <span className="blob blob-three" />
      <span className="bubble bubble-one" />
      <span className="bubble bubble-two" />
      <span className="bubble bubble-three" />
      <span className="spark spark-one">✦</span>
      <span className="spark spark-two">✦</span>
    </div>
  )
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className="section-title">{children}</h2>
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      type="button"
      aria-label="返回页面顶部"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <span aria-hidden="true">↑</span>
    </button>
  )
}

export default function App() {
  return (
    <div className="site-shell">
      <BackgroundDecorations />
      <aside className="unofficial-banner" aria-label="活动性质说明">
        <span className="unofficial-banner-mark" aria-hidden="true">✦</span>
        <p>
          <strong>非官方民间观影活动</strong>
          <span>本活动由民间组织举办，与 Studio LaRa 及 HIMEHINA 官方无隶属或主办关系，敬请留意。</span>
          <a href="https://spc.himehina.jp/world-tour26" target="_blank" rel="noreferrer">
            前往 HIMEHINA WORLD Tour 2026 官方网站
          </a>
        </p>
        <span className="unofficial-banner-mark" aria-hidden="true">✦</span>
      </aside>
      <HeroCarousel />
      <Navigation />

      <div className="date-ribbon" aria-label="活动日期与城市">
        <span className="ribbon-label">GRAND FINALE 2DAYS</span>
        <strong>10.03 <i>—</i> 10.04</strong>
        <span>SHANGHAI · CHINA</span>
      </div>

      <main className="content">
        <header className="intro">
          <p className="intro-prefix">HIMEHINA WORLD Tour 2026 GRAND FINALE LIVERELAY IN SHANGHAI</p>
          <h1>中国上海民间观影</h1>
          <p className="intro-lead">
            <span>10月3日・10月4日，两日限定</span>
            <span>与大家共同见证这段旅程的最终章</span>
          </p>
        </header>

        <section id="dates" className="section reveal-section" aria-labelledby="dates-title">
          <div id="dates-title"><SectionTitle>TOUR DATES</SectionTitle></div>
          <article className="event-card">
            <div className="event-tabs" aria-label="场次">
              <span className="event-tab is-active">
                <span>上海 Grand Finale 2Days</span>
                <em>Coming Soon</em>
              </span>
            </div>
            <dl className="event-details">
              <div><dt>活动地点</dt><dd>中国上海</dd></div>
              <div><dt>日期</dt><dd>2026/10/3（六）・2026/10/4（日）</dd></div>
              <div><dt>具体地址</dt><dd><span className="pending">待定</span></dd></div>
            </dl>
          </article>
        </section>

        {/* <section id="tickets" className="section reveal-section" aria-labelledby="tickets-title">
          <div id="tickets-title"><SectionTitle>TICKETS</SectionTitle></div>
          <details className="ticket-card" open>
            <summary>
              <span>GRAND FINALE 2Days 上海</span>
              <span className="summary-icon" aria-hidden="true">＋</span>
            </summary>
            <div className="ticket-content">
              <span className="ticket-spark" aria-hidden="true">✦</span>
              <strong>信息待定</strong>
              <p>详细信息将在确认后公布，敬请期待。</p>
            </div>
          </details>
        </section> */}
      </main>

      <footer className="footer">
        <img src="./images/wt26-logo.png" alt="LIFETIME is BUBBLIN" />
        <p className="disclaimer">
          本活动为非官方民间观影活动，与 Studio LaRa 及 HIMEHINA 官方无隶属或主办关系。
          HIMEHINA 名称、角色与相关视觉素材的权利归其各自权利人所有。
        </p>
        <a href="https://spc.himehina.jp/world-tour26" target="_blank" rel="noreferrer">
          前往 HIMEHINA WORLD Tour 2026 官方网站
        </a>
        <p className="fan-credit">JOJI Made🥕 · 2026</p>
      </footer>
      <BackToTop />
    </div>
  )
}
