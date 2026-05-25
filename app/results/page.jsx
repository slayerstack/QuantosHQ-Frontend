'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Results() {
  const router = useRouter()
  const [result, setResult] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('quantos_result')
    if (stored) setResult(JSON.parse(stored))
    else router.push('/analyse')
  }, [])

  if (!result) return <div style={{ background: '#07090F', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#637A99', fontFamily: 'Inter' }}>Loading...</div>

  return (
    <main style={{ minHeight: '100vh', background: '#07090F', color: '#D8E0EF', fontFamily: 'Inter, sans-serif' }}>
      
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 48px', borderBottom: '1px solid #1A2438', background: '#0A0D16' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => router.push('/')}>
          <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#fff' }}>Q</div>
          <span style={{ fontSize: 16, fontWeight: 700 }}>QuantosHQ</span>
        </div>
        <button onClick={() => router.push('/analyse')} style={{ padding: '7px 16px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', color: '#fff', fontFamily: 'Inter', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>+ New Analysis</button>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>{result.strategy || result.name}</h1>
              <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 20, background: 'rgba(232,69,90,0.15)', color: '#E8455A', border: '1px solid rgba(232,69,90,0.2)', fontWeight: 600 }}>Analysed</span>
            </div>
            <div style={{ fontSize: 13, color: '#637A99' }}>{result.instrument} · {result.timeframe} · {result.start_date} to {result.end_date}</div>
          </div>
        </div>

        {/* METRICS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
          {[
            { label: 'Win Rate', value: result.win_rate ? result.win_rate + '%' : 'N/A', red: parseFloat(result.win_rate) < 50 },
            { label: 'Max Drawdown', value: result.drawdown ? '-' + result.drawdown + '%' : 'N/A', red: true },
            { label: 'Total Trades', value: result.total_trades || 'N/A' },
            { label: 'Profit Factor', value: result.profit_factor || 'N/A', red: parseFloat(result.profit_factor) < 1 },
            { label: 'Sharpe Ratio', value: result.sharpe_ratio || 'N/A', red: parseFloat(result.sharpe_ratio) < 0 },
            { label: 'Stop Loss', value: result.stop_loss ? result.stop_loss + '%' : 'N/A' },
            { label: 'Target', value: result.target ? result.target + '%' : 'N/A' },
            { label: 'Avg Duration', value: result.avg_trade_duration || 'N/A' },
          ].map(m => (
            <div key={m.label} style={{ background: '#0F1420', border: '1px solid #1A2438', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, color: '#637A99', marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'monospace', color: m.red ? '#E8455A' : '#D8E0EF' }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* AI EXPLANATION */}
        <div style={{ background: '#0F1420', border: '1px solid rgba(91,127,255,0.3)', borderRadius: 14, padding: 28, marginBottom: 20, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 2, background: 'linear-gradient(90deg, #5B7FFF, #3ECFB2)', borderRadius: '14px 14px 0 0' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✦</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Quantos AI Analysis</div>
              <div style={{ fontSize: 11, color: '#637A99' }}>Powered by Claude AI</div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: '#7A8AAD', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{result.explanation}</div>
        </div>

        {/* STRATEGY DETAILS */}
        {(result.entry_condition || result.exit_condition) && (
          <div style={{ background: '#0F1420', border: '1px solid #1A2438', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Strategy Details</div>
            {result.entry_condition && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: '#637A99', marginBottom: 6 }}>ENTRY CONDITION</div>
                <div style={{ fontSize: 13, color: '#D8E0EF', background: '#141B28', borderRadius: 8, padding: '10px 14px' }}>{result.entry_condition}</div>
              </div>
            )}
            {result.exit_condition && (
              <div>
                <div style={{ fontSize: 11, color: '#637A99', marginBottom: 6 }}>EXIT CONDITION</div>
                <div style={{ fontSize: 13, color: '#D8E0EF', background: '#141B28', borderRadius: 8, padding: '10px 14px' }}>{result.exit_condition}</div>
              </div>
            )}
          </div>
        )}

        <button onClick={() => router.push('/analyse')} style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #1A2438', background: 'transparent', color: '#637A99', fontFamily: 'Inter', fontSize: 14, cursor: 'pointer', marginTop: 20 }}>
          Analyse Another Strategy
        </button>

      </div>
    </main>
  )
}