import { useState, useEffect } from 'react';
import { vehicleService } from '../api/vehicleService';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && user.id) {
      loadVehicles();
    }
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getByOwner(user.id);
      setVehicles(data);
    } catch (err) {
      console.error("Hiba a járművek betöltésekor:", err);
    } finally {
      setLoading(false);
    }
  };

  const addVehicle = async (formData) => {
    try {
      const cleanData = {
        make: formData.make,
        model: formData.model,
        licensePlate: formData.licensePlate.toUpperCase(),
        ownerId: user.id
      };

      const newVehicle = await vehicleService.create(cleanData);
      setVehicles(prev => [...prev, newVehicle]);
    } catch (err) {
      console.error("Hiba a hozzáadásnál:", err);
      throw err;
    }
  };

  const removeVehicle = async (id) => {
    try {
      await vehicleService.delete(id);
      setVehicles(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      console.error("Hiba a törlésnél:", err);
    }
  };

  return { vehicles, loading, addVehicle, removeVehicle };
};