import { Link } from 'react-router-dom';
import '../styles/App.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="nav-brand">💪 Health Tracker</div>
        <div className="nav-links">
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <div className="hero">
        <h1>Welcome to Health Tracker</h1>
        <p>Track your daily health metrics and achieve your wellness goals</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn btn-primary">Get Started</Link>
          <button className="btn btn-secondary">Learn More</button>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>📊 Track Metrics</h3>
          <p>Monitor weight, steps, calories, and more daily</p>
        </div>
        <div className="feature-card">
          <h3>📈 Visualize Progress</h3>
          <p>See your health data in beautiful charts</p>
        </div>
        <div className="feature-card">
          <h3>🎯 Set Goals</h3>
          <p>Create personalized health goals and track them</p>
        </div>
      </div>
    </div>
  );
}
