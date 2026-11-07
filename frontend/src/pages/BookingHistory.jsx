import { useState } from 'react';
import { bookingHistory } from '../data/dummy';
import './BookingHistory.css';

const STATUS_COLOR = {
  Confirmed: 'status-confirmed',
  Completed: 'status-completed',
  Cancelled: 'status-cancelled',
};

export default function BookingHistory() {
  const [expanded, setExpanded] = useState(null);

  function toggle(id) {
    setExpanded(expanded === id ? null : id);
  }

  return (
    <div className="history-page">
      <h1>My Bookings</h1>

      {bookingHistory.length === 0 ? (
        <p className="empty">No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookingHistory.map(b => (
            <div key={b.id} className="booking-card">
              <div className="booking-summary" onClick={() => toggle(b.id)}>
                <div className="booking-left">
                  <span className="booking-train">{b.trainName}</span>
                  <span className="booking-route">{b.from} → {b.to}</span>
                  <span className="booking-date">{new Date(b.date).toDateString()}</span>
                </div>
                <div className="booking-right">
                  <span className={`status-badge ${STATUS_COLOR[b.status]}`}>{b.status}</span>
                  <span className="booking-fare">₹{b.totalFare}</span>
                  <span className="booking-pnr">{b.pnr}</span>
                  <span className="expand-icon">{expanded === b.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expanded === b.id && (
                <div className="booking-detail">
                  <div className="detail-grid">
                    <div><span>Train No.</span><strong>{b.trainNumber}</strong></div>
                    <div><span>Class</span><strong>{b.travelClass}</strong></div>
                    <div><span>Departure</span><strong>{b.departure}</strong></div>
                    <div><span>Arrival</span><strong>{b.arrival}</strong></div>
                    <div><span>Seats</span><strong>{b.seats.join(', ')}</strong></div>
                    <div><span>Booked On</span><strong>{new Date(b.bookedOn).toDateString()}</strong></div>
                  </div>

                  <h4>Passengers</h4>
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

                  {b.status === 'Confirmed' && (
                    <button className="cancel-btn">Cancel Booking</button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
