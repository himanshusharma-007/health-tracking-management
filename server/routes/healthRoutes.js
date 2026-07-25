import express from 'express';
import HealthData from '../models/HealthData.js';

const router = express.Router();

// Add health data
router.post('/add', async (req, res) => {
  try {
    const { userId, weight, steps, calories, water, exercise, notes } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const healthData = new HealthData({
      userId,
      weight: weight || null,
      steps: steps || null,
      calories: calories || null,
      water: water || null,
      exercise: exercise || '',
      notes: notes || ''
    });

    await healthData.save();
    res.status(201).json({ message: 'Health data added', healthData });
  } catch (error) {
    console.error('Error adding health data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get health data by user
router.get('/:userId', async (req, res) => {
  try {
    const healthData = await HealthData.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(healthData);
  } catch (error) {
    console.error('Error fetching health data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update health data
router.put('/:id', async (req, res) => {
  try {
    const healthData = await HealthData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: 'Health data updated', healthData });
  } catch (error) {
    console.error('Error updating health data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;