'use client'
import { useState } from 'react'

const sidebarItems = [
  { name: 'Dashboard', icon: '▦' },
  { name: 'Strategies', icon: '◈', active: true },
  { name: 'Backtest', icon: '↺' },
  { name: 'Reports', icon: '≡' },
  { name: 'Market Data', icon: '◎' },
  { name: 'AI Insights', icon: '✦' },
  { name: 'Watchlist', icon: '◉' },
]

const tools = [
  { name: 'Screener', icon: '⊞' },
  { name: 'Strategy Builder', icon: '⚙' },
  { name: 'Risk Manager', icon: '⛨' },
  { name: 'Portfolio', icon: '◫' },
]

const metrics = [
  { label: 'Total Return', value: '-18.42%', sub: 'vs S&P +12.3%', red: true },
  { label: 'CAGR', value: '-18.42%', sub: 'vs S&P +12.3%', red: true },
  { label: 'Sharpe Ratio', value: '-0.43', sub: 'Target: > 1.5', red: true },
  { label: 'Max Drawdown', value: '-32.8%', sub: 'Exceeded 20% limit', red: true },
  { label: 'Win Rate', value: '38.2%', sub: '142 / 372 trades', yellow: true },
  { label: 'Profit Factor', value: '0.72', sub: 'Target: > 1.0', blue: true },
  { label: 'Expectancy', value: '-₹49.52', sub: 'Negative expectancy', red: true },
]

const aiInsights = [
  { color: '#E8455A', text: 'High drawdown (-32.8%) indicates excessive risk for the returns generated.' },
  { color: '#F0B429', text: 'Win rate (38.2%) is below average. Consider improving entry filters.' },
  { color: '#E8455A', text: 'Strategy overtrades in volatile markets. Consider adding market regime filter.' },
  { color: '#2ECC8A', text: 'Best performance in trending markets with RSI < 30 conditions.' },
  { color: '#5B7FFF', text: 'Recommendation: Reduce position size by 30% and retest.' },
]

const tradeStats = [
  { label: 'Total Trades', value: '372', color: 'white' },
  { label: 'Winning Trades', value: '142 (38.2%)', color: '#2ECC8A' },
  { label: 'Losing Trades', value: '230 (61.8%)', color: '#E8455A' },
  { label: 'Best Trade', value: '₹2,842 (2.84%)', color: '#2ECC8A' },
  { label: 'Worst Trade', value: '-₹3,210 (-3.21%)', color: '#E8455A' },
  { label: 'Avg Trade', value: '-₹49.52', color: '#E8455A' },
  { label: 'Avg Win', value: '₹412.67', color: '#2ECC8A' },
  { label: 'Avg Loss', value: '-₹256.34', color: '#E8455A' },
  { label: 'Avg Hold Time', value: '3.2 days', color: 'white' },
  { label: 'Long Trades', value: '196 (52.7%)', color: 'white' },
  { label: 'Short Trades', value: '176 (47.3%)', color: 'white' },
  { label: 'Exposure', value: '68.4%', color: 'white' },
]

const recentBacktests = [
  { name: 'Momentum Alpha v2.3', period: 'Jan–Dec 2024', ret: '-18.42%', sharpe: '-0.43', dd: '-32.8%', result: 'Failed', date: '2 min ago', red: true },
  { name: 'Momentum Alpha v2.2', period: 'Jan–Dec 2024', ret: '-8.17%', sharpe: '-0.12', dd: '-28.4%', result: 'Failed', date: '3 days ago', red: true },
  { name: 'Momentum Alpha v2.1', period: 'Jan–Dec 2024', ret: '2.34%', sharpe: '0.28', dd: '-15.2%', result: 'Passed', date: '7 days ago', green: true },
]

const confScores = [
  { label: 'Profitability', value: 18, color: '#E8455A' },
  { label: 'Risk Management', value: 25, color: '#E8455A' },
  { label: 'Stability', value: 22, color: '#F0B429' },
  { label: 'Market Adaptability', value: 42, color: '#5B7FFF' },
  { label: 'Trade Consistency', value: 27, color: '#F0B429' },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const heatmapData = [
  { year: 2019, values: [2.1, -1.8, 3.2, -2.4, 1.5, -0.6, 2.3, -1.2, 0.8, -2.7, -1.3, 2.1] },
  { year: 2020, values: [-3.0, -3.8, -3.3, -2.8, -1.9, -2.8, 2.5, -3.9, 0.8, -2.8, -3.8, 2.9] },
  { year: 2021, values: [1.5, -2.8, 1.2, 2.3, 0.8, -2.8, -3.9, -2.8, 0.8, -2.8, -3.3, -0.8] },
  { year: 2022, values: [-2.0, -3.0, -3.0, -0.9, -0.5, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -2.8] },
  { year: 2023, values: [2.0, -3.0, -3.5, -3.0, -0.5, -0.6, -3.0, -3.5, -3.0, -0.5, -3.0, -2.8] },
  { year: 2024, values: [-1.5, -3.6, -3.5, -2.5, -0.5, -0.6, -3.5, -3.5, -3.0, -3.5, -3.0, -2.8] },
]

function heatColor(v) {
  if (v > 5) return { bg: 'rgba(46,204,138,0.6)', color: '#fff' }
  if (v > 2) return { bg: 'rgba(46,204,138,0.35)', color: '#2ECC8A' }
  if (v > 0) return { bg: 'rgba(46,204,138,0.15)', color: '#2ECC8A' }
  if (v > -2) return { bg: 'rgba(232,69,90,0.15)', color: '#E8455A' }
  if (v > -5) return { bg: 'rgba(232,69,90,0.35)', color: '#E8455A' }
  return { bg: 'rgba(232,69,90,0.6)', color: '#fff' }
}

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('Strategies')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#07090F', color: '#D8E0EF', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>

      {/* SIDEBAR */}
      <div style={{ width: sidebarOpen ? 200 : 60, minWidth: sidebarOpen ? 200 : 60, background: '#0A0D16', borderRight: '1px solid #1A2438', display: 'flex', flexDirection: 'column', flexShrink: 0, transition: 'width 0.2s ease' }}>

        <div style={{ padding: '18px 16px', borderBottom: '1px solid #1A2438', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {sidebarOpen ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#fff' }}>Q</div>
                <span style={{ fontSize: 16, fontWeight: 700 }}>Quantos</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#637A99', cursor: 'pointer', fontSize: 16, padding: 4 }}>←</button>
            </>
          ) : (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', color: '#637A99', cursor: 'pointer', fontSize: 16, padding: 4 }}>→</button>
            </div>
          )}
        </div>

        <div style={{ padding: '12px 8px', flex: 1 }}>
          {sidebarItems.map(item => (
            <div key={item.name} onClick={() => setActiveNav(item.name)}
              style={{ display: 'flex', alignItems: 'center', gap: sidebarOpen ? 9 : 0, padding: '8px 10px', borderRadius: 8, marginBottom: 2, cursor: 'pointer', fontSize: 13, fontWeight: 500, background: activeNav === item.name ? 'rgba(91,127,255,0.12)' : 'transparent', color: activeNav === item.name ? '#5B7FFF' : '#637A99', justifyContent: sidebarOpen ? 'flex-start' : 'center' }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </div>
          ))}

          {sidebarOpen && <div style={{ fontSize: 10, color: '#3D4D6A', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '12px 8px 6px', marginTop: 8 }}>Tools</div>}

          {tools.map(item => (
            <div key={item.name} onClick={() => setActiveNav(item.name)}
              style={{ display: 'flex', alignItems: 'center', gap: sidebarOpen ? 9 : 0, padding: '8px 10px', borderRadius: 8, marginBottom: 2, cursor: 'pointer', fontSize: 13, fontWeight: 500, color: '#637A99', justifyContent: sidebarOpen ? 'flex-start' : 'center' }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </div>
          ))}
        </div>

        <div style={{ padding: 12, borderTop: '1px solid #1A2438' }}>
          {sidebarOpen ? (
            <div style={{ background: 'linear-gradient(135deg, rgba(91,127,255,0.15), rgba(62,207,178,0.1))', border: '1px solid rgba(91,127,255,0.2)', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>Pro Plan</span>
                <span style={{ fontSize: 10, color: '#2ECC8A', fontWeight: 600 }}>Active</span>
              </div>
              <div style={{ fontSize: 10, color: '#3D4D6A' }}>Renews Feb 1, 2026</div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ fontSize: 16 }}>⚙</span>
            </div>
          )}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* TOPBAR */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #1A2438', display: 'flex', alignItems: 'center', gap: 12, background: '#0A0D16', flexShrink: 0 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
              <span style={{ fontSize: 18, fontWeight: 700 }}>Momentum Alpha v2.3</span>
              <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 20, background: 'rgba(232,69,90,0.15)', color: '#E8455A', border: '1px solid rgba(232,69,90,0.2)', fontWeight: 600 }}>Failed</span>
            </div>
            <div style={{ fontSize: 12, color: '#637A99' }}>Long-only momentum strategy targeting mid-cap equities with RSI divergence signals.</div>
          </div>
          <select style={{ background: '#141B28', border: '1px solid #1F2D42', color: '#D8E0EF', fontFamily: 'Inter', fontSize: 12, padding: '7px 10px', borderRadius: 8, outline: 'none' }}>
            <option>Momentum Alpha</option>
            <option>RSI Mean Reversion</option>
            <option>MACD Crossover</option>
          </select>
          <a href="/analyse" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, background: 'linear-gradient(135deg, #5B7FFF, #8BA8FF)', color: '#fff', fontFamily: 'Inter', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
            + Analyse Strategy
          </a>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>

          {/* META ROW */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#637A99' }}>
              📅 <span>Jan 1 – Dec 31, 2024</span><span style={{ fontSize: 10, color: '#3D4D6A', marginLeft: 2 }}>Backtest Period</span>
            </div>
            <div style={{ width: 1, height: 16, background: '#1F2D42' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#637A99' }}>
              ₹ <span style={{ color: '#D8E0EF', fontWeight: 500 }}>₹1,00,000</span><span style={{ fontSize: 10, color: '#3D4D6A', marginLeft: 4 }}>Initial Capital</span>
            </div>
            <div style={{ width: 1, height: 16, background: '#1F2D42' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#637A99' }}>
              📉 <span style={{ color: '#E8455A', fontWeight: 500 }}>-₹18,420</span><span style={{ fontSize: 10, color: '#3D4D6A', marginLeft: 4 }}>Final P&L</span>
            </div>
          </div>

          {/* METRICS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10, marginBottom: 14 }}>
            {metrics.map(m => (
              <div key={m.label} style={{ background: '#0F1420', border: '1px solid #1A2438', borderRadius: 10, padding: 13 }}>
                <div style={{ fontSize: 11, color: '#637A99', marginBottom: 6 }}>{m.label}</div>
                <div style={{ fontSize: 19, fontWeight: 700, fontFamily: 'monospace', color: m.red ? '#E8455A' : m.yellow ? '#F0B429' : m.blue ? '#5B7FFF' : '#D8E0EF' }}>{m.value}</div>
                <div style={{ fontSize: 10, color: '#3D4D6A', marginTop: 4 }}>{m.sub}</div>
              </div>
            ))}
          </div>

          {/* EQUITY + AI */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 12, marginBottom: 12 }}>
            <div style={{ background: '#0F1420', border: '1px solid #1A2438', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>📈 Equity Curve</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {['1M','3M','6M','YTD','1Y','All'].map(t => (
                    <span key={t} style={{ fontSize: 11, padding: '4px 8px', borderRadius: 6, cursor: 'pointer', color: t === '1Y' ? '#D8E0EF' : '#3D4D6A', background: t === '1Y' ? '#141B28' : 'transparent' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ height: 180, position: 'relative', overflow: 'hidden' }}>
                <svg width="100%" height="180" viewBox="0 0 600 180" preserveAspectRatio="none">
                  <polyline points="0,40 50,35 100,20 150,45 200,70 250,95 300,115 350,130 400,140 450,145 500,135 550,125" fill="none" stroke="#E8455A" strokeWidth="2"/>
                  <polyline points="0,50 50,45 100,42 150,40 200,42 250,38 300,35 350,32 400,38 450,30 500,25 550,28" fill="none" stroke="#5B7FFF" strokeWidth="2"/>
                  <polyline points="0,40 50,35 100,20 150,45 200,70 250,95 300,115 350,130 400,140 450,145 500,135 550,125 550,180 0,180" fill="rgba(232,69,90,0.07)"/>
                </svg>
                <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 8px' }}>
                  {months.map(m => <span key={m} style={{ fontSize: 9, color: '#3D4D6A' }}>{m}</span>)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 5, color: '#637A99' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E8455A', display: 'inline-block' }}></span>Strategy</span>
                <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 5, color: '#637A99' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5B7FFF', display: 'inline-block' }}></span>Nifty 50</span>
              </div>
            </div>

            <div style={{ background: '#0F1420', border: '1px solid #1A2438', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✦</div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>AI Strategy Analysis</span>
                </div>
                <span style={{ fontSize: 10, background: 'rgba(91,127,255,0.1)', color: '#5B7FFF', border: '1px solid rgba(91,127,255,0.2)', padding: '3px 8px', borderRadius: 12 }}>Powered by Quantos AI</span>
              </div>
              {aiInsights.map((insight, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < aiInsights.length - 1 ? '1px solid #1A2438' : 'none' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: insight.color, flexShrink: 0, marginTop: 5 }}></div>
                  <div style={{ fontSize: 12, color: '#7A8AAD', lineHeight: 1.5 }}>{insight.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DRAWDOWN + HEATMAP + CONFIDENCE */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: 12, marginBottom: 12 }}>

            <div style={{ background: '#0F1420', border: '1px solid #1A2438', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>📉 Drawdown Curve</div>
              <div style={{ height: 140, position: 'relative' }}>
                <svg width="100%" height="140" viewBox="0 0 400 140" preserveAspectRatio="none">
                  <polyline points="0,10 30,15 60,25 90,40 120,60 150,85 180,105 210,115 240,110 270,95 300,80 330,70 360,65 400,60" fill="none" stroke="#E8455A" strokeWidth="2"/>
                  <polyline points="0,10 30,15 60,25 90,40 120,60 150,85 180,105 210,115 240,110 270,95 300,80 330,70 360,65 400,60 400,140 0,140" fill="rgba(232,69,90,0.15)"/>
                </svg>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between' }}>
                  {['Jan','Mar','May','Jul','Sep','Nov'].map(m => <span key={m} style={{ fontSize: 9, color: '#3D4D6A' }}>{m}</span>)}
                </div>
              </div>
            </div>

            <div style={{ background: '#0F1420', border: '1px solid #1A2438', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>⊞ Monthly Returns Heatmap</div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 2, fontSize: 9, fontFamily: 'monospace' }}>
                  <thead>
                    <tr>
                      <th style={{ color: '#3D4D6A', textAlign: 'right', paddingRight: 6, fontWeight: 400 }}></th>
                      {months.map(m => <th key={m} style={{ color: '#3D4D6A', fontWeight: 400, textAlign: 'center' }}>{m}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {heatmapData.map(row => (
                      <tr key={row.year}>
                        <td style={{ color: '#3D4D6A', textAlign: 'right', paddingRight: 6, fontSize: 9 }}>{row.year}</td>
                        {row.values.map((v, i) => {
                          const { bg, color } = heatColor(v)
                          return <td key={i} style={{ background: bg, color, textAlign: 'center', borderRadius: 3, padding: '3px 2px', minWidth: 26 }}>{v > 0 ? '+' : ''}{v.toFixed(1)}</td>
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ background: '#0F1420', border: '1px solid #1A2438', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>🤖 AI Confidence Score</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#1A2438" strokeWidth="7"/>
                  <circle cx="40" cy="40" r="30" fill="none" stroke="url(#cg2)" strokeWidth="7" strokeLinecap="round" strokeDasharray="188" strokeDashoffset="145" transform="rotate(-90 40 40)"/>
                  <defs><linearGradient id="cg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#E8455A"/><stop offset="100%" stopColor="#F0B429"/></linearGradient></defs>
                  <text x="40" y="36" textAnchor="middle" fontSize="14" fontWeight="700" fill="#D8E0EF" fontFamily="monospace">23%</text>
                  <text x="40" y="48" textAnchor="middle" fontSize="7" fill="#637A99" fontFamily="Inter">Very Low</text>
                </svg>
                <div style={{ flex: 1 }}>
                  {confScores.map(s => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <div style={{ fontSize: 10, color: '#637A99', width: 100, flexShrink: 0 }}>{s.label}</div>
                      <div style={{ flex: 1, height: 4, background: '#141B28', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: `${s.value}%`, height: '100%', background: s.color, borderRadius: 4 }}></div>
                      </div>
                      <div style={{ fontSize: 10, color: s.color, fontFamily: 'monospace', width: 28, textAlign: 'right' }}>{s.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TRADE STATS + RECENT BACKTESTS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

            <div style={{ background: '#0F1420', border: '1px solid #1A2438', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>📊 Trade Statistics</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {tradeStats.map(s => (
                  <div key={s.label} style={{ background: '#141B28', borderRadius: 8, padding: 10 }}>
                    <div style={{ fontSize: 10, color: '#3D4D6A', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: s.color, fontFamily: 'monospace' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#0F1420', border: '1px solid #1A2438', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>🕐 Recent Backtests</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Name', 'Period', 'Return', 'Sharpe', 'Max DD', 'Result', 'Date'].map(h => (
                      <th key={h} style={{ fontSize: 11, color: '#3D4D6A', fontWeight: 500, padding: '8px 8px', textAlign: 'left', borderBottom: '1px solid #1A2438' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBacktests.map((b, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #1A2438' }}>
                      <td style={{ padding: '9px 8px', fontSize: 12, color: '#D8E0EF' }}>
                        <span style={{ display: 'inline-flex', width: 20, height: 20, background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', borderRadius: 5, alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', marginRight: 6 }}>M</span>
                        {b.name}
                      </td>
                      <td style={{ padding: '9px 8px', fontSize: 11, color: '#3D4D6A' }}>{b.period}</td>
                      <td style={{ padding: '9px 8px', fontSize: 12, color: b.red ? '#E8455A' : '#2ECC8A', fontFamily: 'monospace' }}>{b.ret}</td>
                      <td style={{ padding: '9px 8px', fontSize: 12, color: b.red ? '#E8455A' : '#2ECC8A', fontFamily: 'monospace' }}>{b.sharpe}</td>
                      <td style={{ padding: '9px 8px', fontSize: 12, color: b.red ? '#E8455A' : '#F0B429', fontFamily: 'monospace' }}>{b.dd}</td>
                      <td style={{ padding: '9px 8px' }}>
                        <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 20, background: b.red ? 'rgba(232,69,90,0.15)' : 'rgba(46,204,138,0.15)', color: b.red ? '#E8455A' : '#2ECC8A', border: `1px solid ${b.red ? 'rgba(232,69,90,0.2)' : 'rgba(46,204,138,0.2)'}`, fontWeight: 600 }}>{b.result}</span>
                      </td>
                      <td style={{ padding: '9px 8px', fontSize: 11, color: '#3D4D6A' }}>{b.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <span style={{ fontSize: 12, color: '#5B7FFF', cursor: 'pointer' }}>View all backtests →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}