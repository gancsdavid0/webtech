const API_URL = 'http://localhost:3000/api/reservation';

export const createReservation = async (bookingData) => {
  const userDataString = localStorage.getItem("user"); 
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const token = userData?.token;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      spotId: bookingData.spotId,
      vehicleId: bookingData.vehicleId,
      startTime: new Date(bookingData.startTime).toISOString(),
      endTime: new Date(bookingData.endTime).toISOString()
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message);
  }

  return await response.json();
};