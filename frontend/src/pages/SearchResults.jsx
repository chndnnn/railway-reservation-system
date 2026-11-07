import { useLocation, useNavigate } from 'react-router-dom';
import { trains } from '../data/dummy';
import './SearchResults.css';

export default function SearchResults() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate('/');
    return null;
  }

  const { from, to, date, passengers } = state;

  const results = trains.filter(
    t => t.from.toLowerCase() === from.toLowerCase() &&
         t.to.toLowerCase() === to.toLowerCase()
  );

  function availableSeats(cls) {
    return cls.totalSeats - cls.bookedSeats.length;
  }

  function handleSelect(train, className) {
    navigate('/seats', { state: { train, selectedClass: className, date, passengers } });
  }

  return (
    <div className="results-page">
      <div className="results-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <div className="route-info">
          <span className="route-text">{from} → {to}</span>
          <span className="route-meta">{new Date(date).toDateString()} · {passengers} passenger{passengers > 1 ? 's' : ''}</span>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="no-results">
          <p>😔 No trains found for this route.</p>
          <button className="back-btn" onClick={() => navigate('/')}>Search Again</button>
        </div>
      ) : (
        <div className="train-list">
          {results.map(train => (
            <div key={train.id} className="train-card">
              <div className="train-header">
                <div>
                  <span className="train-name">{train.name}</span>
                  <span className="train-number">#{train.number}</span>
                </div>
                <div className="train-timing">
                  <span className="time">{train.departure}</span>
                  <span className="duration">── {train.duration} ──</span>
                  <span className="time">{train.arrival}</span>
                </div>
              </div>

              <div className="class-list">
                {Object.entries(train.classes).map(([cls, info]) => {
                  const avail = availableSeats(info);
                  return (
                    <div key={cls} className={`class-card ${avail === 0 ? 'unavailable' : ''}`}>
                      <div className="class-name">{cls}</div>
                      <div className="class-price">₹{info.price}</div>
                      <div className={`class-avail ${avail < 10 ? 'low' : ''}`}>
                        {avail === 0 ? 'Waitlist' : `${avail} seats`}
                      </div>
                      <button
                        className="book-btn"
                        disabled={avail === 0}
                        onClick={() => handleSelect(train, cls)}
                      >
                        {avail === 0 ? 'Full' : 'Book'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
