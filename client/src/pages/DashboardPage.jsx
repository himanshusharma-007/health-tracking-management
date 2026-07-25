import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { healthAPI } from '../services/api';
import HealthCard from '../components/HealthCard';
import '../styles/Dashboard.css';

export default function DashboardPage() {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    weight: '',
    steps: '',
    calories: '',
    water: '',
    exercise: '',
    notes: ''
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }
    fetchHealthData(userId);
  }, [navigate]);

  const fetchHealthData = async (userId) => {
    try {
      setLoading(true);
      const response = await healthAPI.getData(userId);
      setHealthData(response.data || []);
    } catch (err) {
      setError('Failed to load health data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await healthAPI.addData({ ...formData, userId });
      setFormData({
        weight: '',
        steps: '',
        calories: '',
        water: '',
        exercise: '',
        notes: ''
      });
      fetchHealthData(userId);
    } catch (err) {
      setError('Error adding health data');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <nav className="dashboard-navbar">
        <div className="nav-brand">💪 Health Tracker</div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>

      <div className="dashboard-container">
        <div className="dashboard-grid">
          {/* Add Health Data Form */}
          <div className="form-section">
            <h2>Add Today's Health Data</h2>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="health-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    id="weight"
                    type="number"
                    name="weight"
                    placeholder="Enter weight"
                    value={formData.weight}
                    onChange={handleChange}
                    step="0.1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="steps">Steps</label>
                  <input
                    id="steps"
                    type="number"
                    name="steps"
                    placeholder="Enter steps"
                    value={formData.steps}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="calories">Calories</label>
                  <input
                    id="calories"
                    type="number"
                    name="calories"
                    placeholder="Enter calories"
                    value={formData.calories}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="water">Water (ml)</label>
                  <input
                    id="water"
                    type="number"
                    name="water"
                    placeholder="Enter water intake"
                    value={formData.water}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="exercise">Exercise</label>
                <input
                  id="exercise"
                  type="text"
                  name="exercise"
                  placeholder="E.g., Running, Yoga, Swimming"
                  value={formData.exercise}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Add any notes about your day"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <button type="submit" className="btn-submit">Add Health Data</button>
            </form>
          </div>

          {/* Health Data List */}
          <div className="health-data-section">
            <h2>Your Health Records</h2>
            {loading ? (
              <p>Loading...</p>
            ) : healthData.length === 0 ? (
              <p className="no-data">No health data yet. Add your first entry!</p>
            ) : (
              <div className="health-data-list">
                {healthData.map(data => (
                  <HealthCard key={data._id} data={data} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}