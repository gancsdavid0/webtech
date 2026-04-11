import { useState, useEffect } from 'react';

export const useAdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        setLoading(true);
        const rawUser = localStorage.getItem('user');
        const token = rawUser ? JSON.parse(rawUser).token : null;

        if (!token) throw new Error("Bejelentkezés szükséges!");

        const response = await fetch('http://localhost:3000/api/reservation/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error("Sikertelen lekérés");

        const jsonResponse = await response.json();

        if (jsonResponse.success && Array.isArray(jsonResponse.data)) {
          setReservations(jsonResponse.data);
        } else {
          setReservations([]);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllReservations();
  }, []);

  return { reservations, loading, error };
};