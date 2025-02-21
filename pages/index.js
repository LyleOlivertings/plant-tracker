import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUploader from '../components/ImageUploader';

export default function Home() {
  const [plants, setPlants] = useState([]);
  const [currentPlant, setCurrentPlant] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    const response = await axios.get('/api/plants');
    setPlants(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentPlant) {
      await axios.put(`/api/plants/${currentPlant._id}`, formData);
    } else {
      await axios.post('/api/plants', formData);
    }
    resetForm();
    fetchPlants();
  };

  const handleEdit = (plant) => {
    setCurrentPlant(plant);
    setFormData({
      name: plant.name,
      description: plant.description,
      image: plant.image
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/plants/${id}`);
    fetchPlants();
  };

  const resetForm = () => {
    setCurrentPlant(null);
    setFormData({ name: '', description: '', image: '' });
  };

  return (
    <div>
      <h1>Plant Tracker</h1>
      
      <form onSubmit={handleSubmit}>
        <ImageUploader 
          onImageUpload={(image) => setFormData({ ...formData, image })}
        />
        {formData.image && <img src={formData.image} alt="Preview" width="200" />}
        
        <input
          type="text"
          placeholder="Plant name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        
        <button type="submit">{currentPlant ? 'Update' : 'Add'} Plant</button>
      </form>

      <div className="plants-grid">
        {plants.map(plant => (
          <div key={plant._id} className="plant-card">
            <img src={plant.image} alt={plant.name} width="200" />
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <button onClick={() => handleEdit(plant)}>Edit</button>
            <button onClick={() => handleDelete(plant._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}