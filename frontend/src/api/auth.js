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

      // Regisztrációs válasz
      const data = await response.json();
      return { ok: response.ok, data };
    } catch (error) {
      throw new Error('Hálózati hiba történt.');
    }
  },
};