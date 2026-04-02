import { useState, useEffect } from 'react';
import { useParkingZones } from './useParkingZones';
import { parkingService } from '../api/parkingService';

export const useParkingManagement = () => {
  const { parkingZones: initialZones, loading } = useParkingZones();
  const [zones, setZones] = useState([]);

  useEffect(() => {
    if (initialZones) setZones(initialZones);
  }, [initialZones]);

  const deleteZone = async (id) => {
    await parkingService.deleteZone(id);
    setZones(prev => prev.filter(z => z.id !== id));
  };

  return { zones, loading, deleteZone };
};