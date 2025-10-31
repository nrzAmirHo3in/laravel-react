import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export async function ping() {
    try {
        const response = await axios.get('/api/ping');
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`${error.response.data.message}`);
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
}

export async function AuthPing() {
    try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.get('/api/auth/ping'); // api.jsx:23  GET http://127.0.0.1:8000/api/auth/ping 401 (Unauthorized)
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`${error.response.data.message}`);
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
}
