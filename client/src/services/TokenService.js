class TokenService {
    setLocalAccessToken(accessToken) {
        localStorage.setItem('access_token', accessToken);
    }
    setLocalRefreshToken(refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);
    }
    getLocalAccessToken() {
        return localStorage.getItem('access_token');
    }
    getLocalRefreshToken() {
        return localStorage.getItem('refresh_token');
    }
    updateLocalAccessToken(accessToken) {
        localStorage.setItem('access_token', accessToken);
    }
    updateLocalRefreshToken(refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);
    }
    removeLocalAccessToken() {
        localStorage.removeItem('access_token');
    }
    removeLocalRefreshToken() {
        localStorage.removeItem('refresh_token');
    }
}

export default new TokenService();