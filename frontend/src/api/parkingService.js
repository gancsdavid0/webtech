const API_URL = 'http://localhost:3000/api/parking-zone';

const getAuthHeaders = () => {
  const userString = localStorage.getItem('user');
  if (!userString) return {};
  const userData = JSON.parse(userString);
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userData.token}`
  };
};

export const parkingService = {
  deleteZone: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Delete failed');
    return true;
  },

  createZone: async (zoneData) => {
    const response = await fetch('http://localhost:3000/api/parking-zone/', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(zoneData),
    });
    if (!response.ok) throw new Error('Error');
    return await response.json();
  }
};