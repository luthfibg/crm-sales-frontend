import axios from "axios";

// Buat instance Axios
const axiosInstance = axios.create({
    baseURL: 'https://crm-sales-backend-production.up.railway.app', // URL base pointing to your backend
});

// Tambahkan interceptor untuk menyisipkan token JWT pada setiap request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Tambahkan token ke header Authorization
            // config.headers['Cache-Control'] = 'no-cache'; // Nonaktifkan cache

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
    (error) => {
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
        } else {
            console.error('Error message:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
