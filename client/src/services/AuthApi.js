import axios from "axios";
import { API_URL } from "../constants/Constants";
import TokenService from "./TokenService";
import { refreshToken } from "./UserService";

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== API_URL + "/login" && err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                refreshToken().then(res => {
                    if (res.data.status === 0) {
                        const accessToken = res.data.data.token;
                        const refreshToken = res.data.data.refreshToken;

                        TokenService.updateLocalAccessToken(accessToken);
                        TokenService.updateLocalRefreshToken(refreshToken);
                    } else {
                        console.log("Refresh token api was wrong!");
                        localStorage.clear();
                        window.location = "/login";
                    }
                }).catch((err) => {
                    console.log("Refresh token api was wrong!");
                    localStorage.clear();
                    window.location = "/login";
                });
            }
        }
        return Promise.reject(err);
    }
);

export default instance;