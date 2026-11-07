import { useLocation, useNavigate } from 'react-router-dom';
import './BookingConfirmation.css';

export default function BookingConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) { navigate('/'); return null; }

  const b = state;

  return (
    <div className="confirm-page">
      <div className="confirm-card">
        <div className="confirm-icon">✅</div>
        <h1>Booking Confirmed!</h1>
        <p className="pnr-label">PNR Number</p>
        <p className="pnr">{b.pnr}</p>

        <div className="confirm-details">
          <div className="detail-row">
            <span>Train</span>
            <span>{b.trainName} ({b.trainNumber})</span>
          </div>
          <div className="detail-row">
            <span>Route</span>
            <span>{b.from} → {b.to}</span>
          </div>
          <div className="detail-row">
            <span>Date</span>
            <span>{new Date(b.date).toDateString()}</span>
          </div>
          <div className="detail-row">
            <span>Departure</span>
            <span>{b.departure}</span>
          </div>
          <div className="detail-row">
            <span>Arrival</span>
            <span>{b.arrival}</span>
          </div>
          <div className="detail-row">
            <span>Class</span>
            <span>{b.travelClass}</span>
          </div>
          <div className="detail-row">
            <span>Seats</span>
            <span>{b.seats.join(', ')}</span>
          </div>
        </div>

        <div className="passenger-section">
          <h3>Passengers</h3>
          <table className="passenger-table">
            <thead>
              <tr><th>#</th><th>Name</th><th>Age</th><th>Gender</th><th>Seat</th></tr>
            </thead>
            <tbody>
              {b.passengers.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{b.seats[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="total-fare">
          Total Fare: <strong>₹{b.totalFare}</strong>
        </div>

        <div className="confirm-actions">
          <button className="action-btn secondary" onClick={() => navigate('/bookings')}>
            View My Bookings
          </button>
          <button className="action-btn primary" onClick={() => navigate('/')}>
            Book Another Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
