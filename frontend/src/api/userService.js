const BASE_URL = 'http://localhost:3000/api';

export const userService = {
  updateProfile: async (userId, token, updateData) => {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();
      return { ok: response.ok, data };
    } catch (error) {
      console.error(error);
      return { ok: false };
    }
  }
};