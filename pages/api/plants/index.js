import dbConnect from '../../../lib/dbConnect';
import Plant from '../../../models/Plant';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const plants = await Plant.find({});
        res.status(200).json(plants);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const plant = await Plant.create(req.body);
        res.status(201).json(plant);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}