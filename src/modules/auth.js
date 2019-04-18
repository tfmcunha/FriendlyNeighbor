class Auth {
	static authenticateToken(token) {
		sessionStorage.setItem('token', token);
	}

	static isUserAuthenticated() {
		return sessionStorage.getItem('token') !== null;
	}

	static deauthenticateUser() {
		sessionStorage.removeItem('token');
	}

	static getToken(token) {
		return sessionStorage.getItem('token');
	}
}

export default Auth;