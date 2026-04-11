import { useState } from 'react';
import { createReservation } from '../api/reservationService';

export const useCreateReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitReservation = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await createReservation(data);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitReservation, loading, error, success };
};