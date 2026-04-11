import { useState, useEffect } from 'react';

export const useParkingZones = () => {
  const [parkingZones, setParkingZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/parking-zone');
        if (!response.ok) throw new Error(response);
        const data = await response.json();
        setParkingZones(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchZones();
  }, []);

  return { parkingZones, loading, error };
};