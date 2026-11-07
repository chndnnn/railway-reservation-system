import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SeatSelection.css';

const GENDERS = ['Male', 'Female', 'Other'];

export default function SeatSelection() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) { navigate('/'); return null; }

  const { train, selectedClass, date, passengers } = state;
  const classInfo = train.classes[selectedClass];
  const totalSeats = classInfo.totalSeats;
  const bookedSeats = classInfo.bookedSeats;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState(
    Array.from({ length: Number(passengers) }, () => ({ name: '', age: '', gender: 'Male' }))
  );
  const [step, setStep] = useState(1); // 1=seats, 2=details

  function toggleSeat(num) {
    if (bookedSeats.includes(num)) return;
    if (selectedSeats.includes(num)) {
      setSelectedSeats(selectedSeats.filter(s => s !== num));
    } else if (selectedSeats.length < Number(passengers)) {
      setSelectedSeats([...selectedSeats, num]);
    }
  }

  function seatStatus(num) {
    if (bookedSeats.includes(num)) return 'booked';
    if (selectedSeats.includes(num)) return 'selected';
    return 'available';
  }

  function updatePassenger(i, field, value) {
    const updated = [...passengerDetails];
    updated[i] = { ...updated[i], [field]: value };
    setPassengerDetails(updated);
  }

  function handleProceed() {
    if (selectedSeats.length < Number(passengers)) return;
    setStep(2);
  }

  function handleConfirm(e) {
    e.preventDefault();
    const booking = {
      pnr: 'PNR' + Math.floor(Math.random() * 9000000 + 1000000),
      trainName: train.name,
      trainNumber: train.number,
      from: train.from,
      to: train.to,
      date,
      departure: train.departure,
      arrival: train.arrival,
      travelClass: selectedClass,
      seats: selectedSeats,
      passengers: passengerDetails,
      totalFare: classInfo.price * Number(passengers),
      status: 'Confirmed',
    };
    navigate('/confirmation', { state: booking });
  }

  const seatsPerRow = 6;
  const rows = Math.ceil(totalSeats / seatsPerRow);

  return (
    <div className="seat-page">
      <div className="seat-header">
        <button className="back-btn" onClick={() => step === 2 ? setStep(1) : navigate(-1)}>← Back</button>
        <div>
          <div className="seat-title">{train.name} · {selectedClass}</div>
          <div className="seat-meta">{train.from} → {train.to} · {new Date(date).toDateString()}</div>
        </div>
      </div>

      {step === 1 && (
        <>
          <div className="seat-legend">
            <span className="legend-item"><span className="dot available"></span>Available</span>
            <span className="legend-item"><span className="dot selected"></span>Selected</span>
            <span className="legend-item"><span className="dot booked"></span>Booked</span>
          </div>

          <p className="seat-instruction">
            Select {passengers} seat{passengers > 1 ? 's' : ''} · {selectedSeats.length}/{passengers} selected
          </p>

          <div className="seat-grid">
            {Array.from({ length: rows }, (_, r) =>
              Array.from({ length: seatsPerRow }, (_, c) => {
                const num = r * seatsPerRow + c + 1;
                if (num > totalSeats) return null;
                const status = seatStatus(num);
                return (
                  <button
                    key={num}
                    className={`seat ${status}`}
                    onClick={() => toggleSeat(num)}
                    disabled={status === 'booked'}
                  >
                    {num}
                  </button>
                );
              })
            )}
          </div>

          <div className="seat-footer">
            <div className="fare-summary">
              Total: <strong>₹{classInfo.price * Number(passengers)}</strong>
              <span> ({passengers} × ₹{classInfo.price})</span>
            </div>
            <button
              className="proceed-btn"
              disabled={selectedSeats.length < Number(passengers)}
              onClick={handleProceed}
            >
              Proceed to Details →
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <form onSubmit={handleConfirm} className="passenger-form">
          <h2>Passenger Details</h2>
          {passengerDetails.map((p, i) => (
            <div key={i} className="passenger-card">
              <div className="passenger-label">Passenger {i + 1} · Seat {selectedSeats[i]}</div>
              <div className="passenger-fields">
                <div className="field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={p.name}
                    onChange={e => updatePassenger(i, 'name', e.target.value)}
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div className="field field-sm">
                  <label>Age</label>
                  <input
                    type="number"
                    value={p.age}
                    onChange={e => updatePassenger(i, 'age', e.target.value)}
                    placeholder="Age"
                    min="1" max="120"
                    required
                  />
                </div>
                <div className="field field-sm">
                  <label>Gender</label>
                  <select value={p.gender} onChange={e => updatePassenger(i, 'gender', e.target.value)}>
                    {GENDERS.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
            </div>
          ))}

          <div className="seat-footer">
            <div className="fare-summary">
              Total: <strong>₹{classInfo.price * Number(passengers)}</strong>
            </div>
            <button type="submit" className="proceed-btn">Confirm Booking ✓</button>
          </div>
        </form>
      )}
    </div>
  );
}
