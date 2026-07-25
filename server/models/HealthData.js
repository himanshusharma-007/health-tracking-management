import mongoose from 'mongoose';

const healthDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: { type: Number },
  steps: { type: Number },
  calories: { type: Number },
  water: { type: Number },
  exercise: { type: String },
  notes: { type: String }
});

export default mongoose.model('HealthData', healthDataSchema);