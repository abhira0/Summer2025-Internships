// src/utils/auth.js
export const generateToken = (user) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      user: user.username,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
    const signature = btoa(header + payload + "your-secret-key");
    return `${header}.${payload}.${signature}`;
  };
  
  export const verifyToken = () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) return false;
  
    try {
      const [, payload] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.exp > Date.now();
    } catch {
      return false;
    }
  };