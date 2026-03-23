const BASE_URL = 'http://localhost:3000/api';

export const userService = {
  // Profil frissítése (Felhasználó saját maga)
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
      console.error("UserService updateProfile hiba:", error);
      return { ok: false };
    }
  },

  // Összes felhasználó lekérése (Adminoknak)
  getAllUsers: async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/user/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return { ok: response.ok, data };
    } catch (error) {
      console.error("UserService getAllUsers hiba:", error);
      return { ok: false };
    }
  },

  // Felhasználó törlése (Adminoknak)
  deleteUser: async (userId, token) => {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return { ok: response.ok, data };
    } catch (error) {
      console.error("UserService deleteUser hiba:", error);
      return { ok: false };
    }
  }
};