import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#07090F', color: '#D8E0EF', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      
      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 48px', borderBottom: '1px solid #1A2438', background: 'rgba(10,13,22,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#fff' }}>Q</div>
    <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>QuantosHQ</span>
  </div>
  <div style={{ display: 'flex', gap: 32, fontSize: 14, color: '#637A99' }}>
    <a href="/dashboard" style={{ cursor: 'pointer', color: '#637A99', textDecoration: 'none' }}>Features</a>
    <a href="/analyse" style={{ cursor: 'pointer', color: '#637A99', textDecoration: 'none' }}>Analyse</a>
    <a href="/dashboard" style={{ cursor: 'pointer', color: '#637A99', textDecoration: 'none' }}>Dashboard</a>
  </div>
  <div style={{ display: 'flex', gap: 12 }}>
    <a href="/analyse" style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid #1A2438', background: 'transparent', color: '#D8E0EF', fontFamily: 'Inter', fontSize: 13, cursor: 'pointer', textDecoration: 'none' }}>Log in</a>
    <a href="/dashboard" style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', color: '#fff', fontFamily: 'Inter', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>Get Started</a>
  </div>
</nav>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '100px 48px 80px', position: 'relative' }}>
        
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(91,127,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(91,127,255,0.1)', border: '1px solid rgba(91,127,255,0.2)', borderRadius: 20, padding: '6px 14px', fontSize: 12, color: '#5B7FFF', marginBottom: 24, fontWeight: 500 }}>
          ✦ AI-Powered Trading Analysis
        </div>

        <h1 style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24, maxWidth: 800, margin: '0 auto 24px' }}>
          Finally understand
          <span style={{ background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block' }}>
            why your strategy failed
          </span>
        </h1>

        <p style={{ fontSize: 18, color: '#637A99', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Every backtesting platform shows you <strong style={{ color: '#D8E0EF' }}>what</strong> happened. Quantos is the first platform that tells you <strong style={{ color: '#D8E0EF' }}>why</strong> — in plain English.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 60 }}>
          <Link href="/dashboard" style={{ padding: '14px 32px', borderRadius: 10, background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', color: '#fff', fontFamily: 'Inter', fontSize: 15, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
            Launch Dashboard →
          </Link>
          <Link href="/analyse" style={{ padding: '14px 32px', borderRadius: 10, border: '1px solid #1A2438', background: 'transparent', color: '#D8E0EF', fontFamily: 'Inter', fontSize: 15, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
            Analyse a Strategy
          </Link>
        </div>

        {/* BEFORE / AFTER */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 20, maxWidth: 900, margin: '0 auto', alignItems: 'center' }}>
          <div style={{ background: '#0F1420', border: '1px solid #1A2438', borderRadius: 14, padding: 24, textAlign: 'left' }}>
            <div style={{ fontSize: 11, color: '#E8455A', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>What Streak shows you</div>
            {[['Win Rate', '43%'], ['Max Drawdown', '-31%'], ['Sharpe Ratio', '-0.43'], ['Total Trades', '84']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1A2438', fontSize: 13 }}>
                <span style={{ color: '#637A99' }}>{k}</span>
                <span style={{ color: '#E8455A', fontFamily: 'monospace', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 28, color: '#5B7FFF', fontWeight: 300 }}>→</div>

          <div style={{ background: '#0F1420', border: '1px solid rgba(91,127,255,0.3)', borderRadius: 14, padding: 24, textAlign: 'left', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 2, background: 'linear-gradient(90deg, #5B7FFF, #3ECFB2)', borderRadius: '14px 14px 0 0' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 20, height: 20, background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✦</div>
              <span style={{ fontSize: 11, color: '#5B7FFF', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>What Quantos tells you</span>
            </div>
            <p style={{ fontSize: 13, color: '#7A8AAD', lineHeight: 1.7, marginBottom: 12 }}>
              <strong style={{ color: '#D8E0EF' }}>WHY IT FAILED:</strong> Your RSI strategy struggled in February because Nifty was in a strong uptrend. Your buy signal kept triggering but the momentum was too strong to reverse.
            </p>
            <p style={{ fontSize: 13, color: '#7A8AAD', lineHeight: 1.7 }}>
              <strong style={{ color: '#2ECC8A' }}>FIX:</strong> Add a trend filter — only take RSI signals when the market is sideways. This would have avoided 68% of your losing trades.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: 48, padding: '60px 48px', borderTop: '1px solid #1A2438', borderBottom: '1px solid #1A2438' }}>
        {[['15+', 'Traders validated'], ['3 days', 'To build the prototype'], ['₹0', 'To get started'], ['1', 'Problem solved perfectly']].map(([n, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 800, background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</div>
            <div style={{ fontSize: 13, color: '#637A99', marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 48px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>Everything you need to understand your strategies</h2>
          <p style={{ fontSize: 16, color: '#637A99' }}>Not just numbers. Real insights.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { icon: '🧠', title: 'AI Plain English Explanation', desc: 'Claude AI analyses your backtest data and explains exactly why your strategy failed — not just the numbers, the actual reasons.' },
            { icon: '📊', title: 'Visual Dashboard', desc: 'Equity curve, drawdown chart, monthly heatmap, trade statistics — all in one professional dashboard.' },
            { icon: '💡', title: 'What Would Have Worked', desc: 'Quantos suggests 3 specific improvements to your strategy based on what actually failed.' },
            { icon: '📈', title: 'Market Regime Detection', desc: 'Understand if your strategy failed because of the market conditions — trending, sideways, or volatile.' },
            { icon: '🔄', title: 'Strategy History', desc: 'Every analysis is saved. Compare how your strategies improve over time.' },
            { icon: '⚡', title: 'Instant Analysis', desc: 'Get a complete strategy breakdown in under 10 seconds. No waiting, no manual work.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0F1420', border: '1px solid #1A2438', borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: '#637A99', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '80px 48px', borderTop: '1px solid #1A2438' }}>
        <h2 style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>Ready to understand your strategies?</h2>
        <p style={{ fontSize: 16, color: '#637A99', marginBottom: 40 }}>Join traders who are finally learning from their failures — not just accepting them.</p>
        <Link href="/dashboard" style={{ padding: '16px 40px', borderRadius: 12, background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', color: '#fff', fontFamily: 'Inter', fontSize: 16, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
          Launch Quantos Free →
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '24px 48px', borderTop: '1px solid #1A2438', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11, color: '#fff' }}>Q</div>
          <span style={{ fontSize: 14, fontWeight: 600 }}>QuantosHQ</span>
        </div>
        <div style={{ fontSize: 12, color: '#3D4D6A' }}>Built by Shivanjali Vishwakarma · 2026</div>
        <a href="https://github.com/slayerstack/QuantosHQ" style={{ fontSize: 12, color: '#5B7FFF', textDecoration: 'none' }}>GitHub →</a>
      </footer>

    </main>
  )
}