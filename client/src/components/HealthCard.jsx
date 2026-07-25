import '../styles/HealthCard.css';

export default function HealthCard({ data }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="health-card">
      <div className="card-header">
        <h3>{formatDate(data.date)}</h3>
      </div>
      
      <div className="card-content">
        {data.weight && (
          <div className="metric">
            <span className="metric-label">⚖️ Weight:</span>
            <span className="metric-value">{data.weight} kg</span>
          </div>
        )}
        {data.steps && (
          <div className="metric">
            <span className="metric-label">👟 Steps:</span>
            <span className="metric-value">{data.steps}</span>
          </div>
        )}
        {data.calories && (
          <div className="metric">
            <span className="metric-label">🔥 Calories:</span>
            <span className="metric-value">{data.calories}</span>
          </div>
        )}
        {data.water && (
          <div className="metric">
            <span className="metric-label">💧 Water:</span>
            <span className="metric-value">{data.water} ml</span>
          </div>
        )}
        {data.exercise && (
          <div className="metric">
            <span className="metric-label">💪 Exercise:</span>
            <span className="metric-value">{data.exercise}</span>
          </div>
        )}
        {data.notes && (
          <div className="metric">
            <span className="metric-label">📝 Notes:</span>
            <span className="metric-value">{data.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
}