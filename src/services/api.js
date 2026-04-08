const BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
    let token = null;
    try {
        const userStr = localStorage.getItem('oms.currentUser');
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user && user.token) {
                token = user.token;
            }
        }
    } catch (e) {
        console.error('Error reading token', e);
    }

    return token
        ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        : { 'Content-Type': 'application/json' };
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Network response was not ok';
        try {
            const errorObj = JSON.parse(errorText);
            errorMessage = errorObj.message || errorObj.error || errorMessage;
        } catch {
            errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
    }
    // Return null if empty response (like 204 No Content)
    if (response.status === 204) return null;
    return response.json();
};

export const api = {
    get: async (endpoint) => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        return handleResponse(res);
    },
    post: async (endpoint, data) => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },
    put: async (endpoint, data) => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },
    delete: async (endpoint) => {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        return handleResponse(res);
    }
};

export default api;
