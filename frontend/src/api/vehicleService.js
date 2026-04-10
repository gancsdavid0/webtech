const API_URL = 'http://localhost:3000/api/vehicle';

const getAuthHeaders = () => {
  const userString = localStorage.getItem('user');
  if (!userString) return {};
  const userData = JSON.parse(userString);
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userData.token}`
  };
};

export const vehicleService = {
  getByOwner: async (ownerId) => {
    const response = await fetch(`${API_URL}/owner/${ownerId}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch vehicles');
    return await response.json();
  },

  // Új jármű hozzáadása
  create: async (vehicleData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(vehicleData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create vehicle');
    }
    
    return await response.json();
  },

  // Jármű törlése
  delete: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Delete failed');
    return true;
  }
};