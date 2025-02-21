import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Plant || mongoose.model('Plant', plantSchema);