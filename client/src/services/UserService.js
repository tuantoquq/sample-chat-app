import authApi from './AuthApi';
import commonApi from './CommonApi';
import TokenService from './TokenService';

export const login = async (phoneNumber, password, keepSigiIn) => {
    let response = await commonApi.post(`/user/login?r=${keepSigiIn}`, {
        phoneNumber,
        password
    });

    return response;
}

export const getProfiles = async () => {
    let response = await authApi.get('/user/auth/profiles');
    return response;
}

export const refreshToken = async () => {
    let response = await commonApi.post('/user/refresh-token', {}, {
        headers: {
            Authorization: `Bearer ${TokenService.getLocalRefreshToken()}`,
        }
    });
    return response;
}

export const register = async (form) => {
    let response = await commonApi.post('/user/register', form);
    return response;
}