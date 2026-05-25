'use client'
import { useState } from 'react'

export default function Analyse() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [form, setForm] = useState({
    name: '',
    instrument: '',
    timeframe: '',
    start_date: '',
    end_date: '',
    initial_capital: '',
    win_rate: '',
    drawdown: '',
    total_trades: '',
    profit_factor: '',
    sharpe_ratio: '',
    avg_trade_duration: '',
    worst_month: '',
    best_month: '',
    entry_condition: '',
    exit_condition: '',
    stop_loss: '',
    target: '',
  })

  const handleSubmit = async () => {
    setLoading(true)
    try {
     const response = await fetch('https://quantos-hq-backend.vercel.app/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const fields = [
    { key: 'name', label: 'Strategy Name', placeholder: 'e.g. RSI Mean Reversion', full: true },
    { key: 'instrument', label: 'Instrument', placeholder: 'e.g. Nifty 50, BankNifty' },
    { key: 'timeframe', label: 'Timeframe', placeholder: 'e.g. Daily, 15min' },
    { key: 'start_date', label: 'Start Date', placeholder: 'e.g. Jan 2024' },
    { key: 'end_date', label: 'End Date', placeholder: 'e.g. Dec 2024' },
    { key: 'initial_capital', label: 'Initial Capital (₹)', placeholder: 'e.g. 100000' },
    { key: 'win_rate', label: 'Win Rate %', placeholder: 'e.g. 43' },
    { key: 'drawdown', label: 'Max Drawdown %', placeholder: 'e.g. 31' },
    { key: 'total_trades', label: 'Total Trades', placeholder: 'e.g. 84' },
    { key: 'profit_factor', label: 'Profit Factor', placeholder: 'e.g. 0.72' },
    { key: 'sharpe_ratio', label: 'Sharpe Ratio', placeholder: 'e.g. -0.43' },
    { key: 'avg_trade_duration', label: 'Avg Trade Duration', placeholder: 'e.g. 3.2 days' },
    { key: 'worst_month', label: 'Worst Month', placeholder: 'e.g. February 2024' },
    { key: 'best_month', label: 'Best Month', placeholder: 'e.g. November 2023' },
    { key: 'entry_condition', label: 'Entry Condition', placeholder: 'e.g. RSI < 30 and price above 200 MA', full: true },
    { key: 'exit_condition', label: 'Exit Condition', placeholder: 'e.g. RSI > 70 or stop loss hit', full: true },
    { key: 'stop_loss', label: 'Stop Loss %', placeholder: 'e.g. 2' },
    { key: 'target', label: 'Target %', placeholder: 'e.g. 6' },
  ]

  return (
    <main style={{ minHeight: '100vh', background: '#07090F', color: '#D8E0EF', fontFamily: 'Inter, sans-serif' }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 48px', borderBottom: '1px solid #1A2438', background: '#0A0D16' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#fff' }}>Q</div>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#D8E0EF' }}>QuantosHQ</span>
        </a>
        <a href="/dashboard" style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid #1A2438', background: 'transparent', color: '#637A99', fontFamily: 'Inter', fontSize: 13, cursor: 'pointer', textDecoration: 'none' }}>Dashboard</a>
      </nav>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>

        {!result ? (
          <>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>Analyse Your Strategy</h1>
              <p style={{ fontSize: 14, color: '#637A99' }}>Fill in your backtest details and Quantos will explain exactly why it failed.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              {fields.map(f => (
                <div key={f.key} style={{ gridColumn: f.full ? '1 / -1' : 'auto' }}>
                  <label style={{ fontSize: 12, color: '#637A99', fontWeight: 500, display: 'block', marginBottom: 6 }}>{f.label}</label>
                  <input
                    style={{ width: '100%', background: '#0F1420', border: '1px solid #1A2438', color: '#D8E0EF', fontFamily: 'Inter', fontSize: 13, padding: '10px 14px', borderRadius: 8, outline: 'none' }}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', background: loading ? '#1A2438' : 'linear-gradient(135deg, #5B7FFF, #3ECFB2)', color: loading ? '#637A99' : '#fff', fontFamily: 'Inter', fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Analysing...' : 'Analyse My Strategy →'}
            </button>
          </>
        ) : (
          <>
            {/* RESULTS */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <h1 style={{ fontSize: 28, fontWeight: 700 }}>{result.strategy}</h1>
                <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 20, background: 'rgba(232,69,90,0.15)', color: '#E8455A', border: '1px solid rgba(232,69,90,0.2)', fontWeight: 600 }}>Analysed</span>
              </div>
              <p style={{ fontSize: 14, color: '#637A99' }}>{form.instrument} · {form.timeframe} · {form.start_date} to {form.end_date}</p>
            </div>

            {/* METRICS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
              {[
                { label: 'Win Rate', value: form.win_rate + '%', red: parseFloat(form.win_rate) < 50 },
                { label: 'Max Drawdown', value: '-' + form.drawdown + '%', red: true },
                { label: 'Total Trades', value: form.total_trades },
                { label: 'Profit Factor', value: form.profit_factor, red: parseFloat(form.profit_factor) < 1 },
                { label: 'Sharpe Ratio', value: form.sharpe_ratio, red: parseFloat(form.sharpe_ratio) < 0 },
                { label: 'Stop Loss', value: form.stop_loss + '%' },
                { label: 'Target', value: form.target + '%' },
                { label: 'Avg Duration', value: form.avg_trade_duration },
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
            {(form.entry_condition || form.exit_condition) && (
              <div style={{ background: '#0F1420', border: '1px solid #1A2438', borderRadius: 14, padding: 24, marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Strategy Details</div>
                {form.entry_condition && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: '#637A99', marginBottom: 6 }}>ENTRY CONDITION</div>
                    <div style={{ fontSize: 13, color: '#D8E0EF', background: '#141B28', borderRadius: 8, padding: '10px 14px' }}>{form.entry_condition}</div>
                  </div>
                )}
                {form.exit_condition && (
                  <div>
                    <div style={{ fontSize: 11, color: '#637A99', marginBottom: 6 }}>EXIT CONDITION</div>
                    <div style={{ fontSize: 13, color: '#D8E0EF', background: '#141B28', borderRadius: 8, padding: '10px 14px' }}>{form.exit_condition}</div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setResult(null)}
              style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #1A2438', background: 'transparent', color: '#637A99', fontFamily: 'Inter', fontSize: 14, cursor: 'pointer' }}>
              ← Analyse Another Strategy
            </button>
          </>
        )}
      </div>
    </main>
  )
}