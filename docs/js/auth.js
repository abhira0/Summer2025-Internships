function generateToken(user) {
    // Simple JWT token generation (in production, use a proper JWT library)
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
        user: user.username,
        role: user.role,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
    const signature = btoa(header + payload + "your-secret-key"); // In production use proper signing
    return `${header}.${payload}.${signature}`;
}

function verifyToken() {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        window.location.href = '/login.html';
        return false;
    }

    try {
        const [header, payload, signature] = token.split('.');
        const decodedPayload = JSON.parse(atob(payload));
        
        if (decodedPayload.exp < Date.now()) {
            localStorage.removeItem('jwt_token');
            window.location.href = '/login.html';
            return false;
        }
        return true;
    } catch (error) {
        window.location.href = '/login.html';
        return false;
    }
}

// Add this to the start of every protected page
function protectPage() {
    if (!verifyToken()) {
        return false;
    }
    return true;
}
