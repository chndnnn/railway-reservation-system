import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stations } from '../data/dummy';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({ from: '', to: '', date: today, passengers: 1 });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSwap() {
    setForm({ ...form, from: form.to, to: form.from });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.from || !form.to) return setError('Please select both stations.');
    if (form.from === form.to) return setError('Origin and destination cannot be the same.');
    setError('');
    navigate('/results', { state: form });
  }

  return (
    <div className="home">
      <div className="home-hero">
        <h1>Book Train Tickets</h1>
        <p>Search trains across India — fast, easy, reliable</p>
      </div>

      <div className="search-card">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="station-row">
            <div className="field">
              <label>From</label>
              <select name="from" value={form.from} onChange={handleChange} required>
                <option value="">Select station</option>
                {stations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <button type="button" className="swap-btn" onClick={handleSwap} title="Swap stations">⇄</button>

            <div className="field">
              <label>To</label>
              <select name="to" value={form.to} onChange={handleChange} required>
                <option value="">Select station</option>
                {stations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="bottom-row">
            <div className="field">
              <label>Date</label>
              <input type="date" name="date" value={form.date} min={today} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Passengers</label>
              <select name="passengers" value={form.passengers} onChange={handleChange}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <button type="submit" className="search-btn">Search Trains</button>
          </div>

          {error && <p className="form-error">{error}</p>}
        </form>
      </div>

      <div className="features">
        <div className="feature-card">🎫<h3>Easy Booking</h3><p>Book tickets in under 2 minutes</p></div>
        <div className="feature-card">💺<h3>Seat Selection</h3><p>Choose your preferred seat</p></div>
        <div className="feature-card">📋<h3>Booking History</h3><p>Track all your journeys</p></div>
        <div className="feature-card">❌<h3>Easy Cancellation</h3><p>Cancel anytime before departure</p></div>
      </div>
    </div>
  );
}
