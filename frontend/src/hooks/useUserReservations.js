import { useState, useEffect } from 'react';

export const useUserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthToken = () => {
    try {
      const rawUser = localStorage.getItem('user');
      if (!rawUser) return null;
      const userData = JSON.parse(rawUser);
      return userData?.token;
    } catch (e) {
      return null;
    }
  };

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        setReservations([]);
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3000/api/reservation/active', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Szerver hiba: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setReservations(data);
      } else if (data.reservations && Array.isArray(data.reservations)) {
        setReservations(data.reservations);
      } else {
        setReservations([]);
      }
      
      setError(null);
    } catch (err) {
      console.error("Fetch hiba részletesen:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (id) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:3000/api/reservation/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error("Sikertelen lemondás.");

      setReservations(prev => prev.filter(res => res.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return { reservations, loading, error, cancelReservation };
};