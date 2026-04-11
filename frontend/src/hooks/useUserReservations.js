import { useState, useEffect } from 'react';

export const useUserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        
        // 1. Token kinyerése
        const rawUser = localStorage.getItem('user');
        if (!rawUser) throw new Error("Bejelentkezés szükséges!");

        const userData = JSON.parse(rawUser);
        const token = userData?.token;

        if (!token) throw new Error("Munkamenet lejárt, jelentkezz be újra!");

        // 2. Kérés az aktív foglalásokhoz
        const response = await fetch('http://localhost:3000/api/reservation/active', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // 3. Hibakezelés
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Szerver hiba (${response.status})`);
        }

        const data = await response.json();
        setReservations(data);
        
      } catch (err) {
        console.error("Fetch hiba:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return { reservations, loading, error };
};