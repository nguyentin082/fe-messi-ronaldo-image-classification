import axios from 'axios';

const AxiosClient = axios.create({
    baseURL: process.env.REACT_APP_FLASK_SERVER_URL, // Thay đổi tùy theo backend của bạn
    withCredentials: true,
});

// Interceptor để xử lý lỗi hoặc thêm token nếu cần
AxiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Lỗi API:', error);
        return Promise.reject(error);
    }
);

export default AxiosClient;
