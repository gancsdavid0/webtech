import { useState, useEffect } from 'react';

export const useParkingSpots = (zoneId) => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!zoneId) return;

    const fetchSpots = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/parking-spot');
        const data = await response.json();
        // Csak az adott zónához tartozó helyeket szűrjük le
        const filteredSpots = data.filter(spot => spot.parkingZoneId === zoneId);
        setSpots(filteredSpots);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, [zoneId]);

  return { spots, loading };
};