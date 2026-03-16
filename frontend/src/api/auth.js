const BASE_URL = 'http://localhost:3000/api';

export const authService = {
  // Regisztráció hívása
  register: async (fullName, email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();
      return { ok: response.ok, data };
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      return { ok: false, data: { message: 'Hálózati hiba történt.' } };
    }
  },

  // Bejelentkezés hívása
  login: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      return { 
        ok: response.ok, 
        data
      };
    } catch (error) {
      console.error('Hiba a bejelentkezés során:', error);
      return { ok: false, data: { message: 'Hálózati hiba történt.' } };
    }
  },

  // Kijelentkezés hívása
  logout: async () => {
    try {
      const savedUserString = localStorage.getItem('user');
      let token = null;

      if (savedUserString) {
        const savedUser = JSON.parse(savedUserString);
        token = savedUser?.token || savedUser?.accessToken;
      }

      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        },
        credentials: 'include',
      });

      return response.ok;
    } catch (error) {
      console.error('Hiba a kijelentkezés során:', error);
      return false;
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  }
};