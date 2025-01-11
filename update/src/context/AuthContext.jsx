// src/context/AuthContext.jsx
const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('jwt_token', data.token);
    setUser({ username: data.user.username, role: data.user.role });
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};