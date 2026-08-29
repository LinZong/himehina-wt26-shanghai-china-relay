import { useEffect } from 'react'
import { Link, useHref } from 'react-router-dom'

export default function UtamitaSaiGreet() {
  const audioUrl = useHref('/audio/utamita-sai.wav')

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'ウタミタ祭 · ご挨拶'
    return () => { document.title = previousTitle }
  }, [])

  return (
    <main className="greeting-page">
      <div className="greeting-glow greeting-glow-one" aria-hidden="true" />
      <div className="greeting-glow greeting-glow-two" aria-hidden="true" />
      <section className="greeting-card" aria-labelledby="greeting-title">
        <span className="greeting-note" aria-hidden="true">♪</span>
        <h2 id="greeting-title" lang="ja">ウタミタ祭 · ご挨拶</h2>
        <audio
          className="greeting-audio"
          controls
          autoPlay
          preload="metadata"
          src={audioUrl}
        >
          您的浏览器不支持音频播放。
        </audio>
        <p>如果浏览器阻止了自动播放，请点击播放器中的播放按钮。</p>
        <p className="ai-voice-notice" role="note">此音频中的声音由 AI 合成</p>
      </section>
    </main>
  )
}
