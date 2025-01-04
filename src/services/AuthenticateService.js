import {jwtDecode} from "jwt-decode";
import axios from "axios";
import CookieService from "@/services/CookieService";


export class AuthenticateService {

    static extractRoles() {
        console.log(this.decodeJwtToken());
    }

    static extractId() {
        if (!this.isAuthenticated())
            return null;

        const decodedToken = this.decodeJwtToken();
        if (decodedToken && decodedToken.user_id) {
            return decodedToken.user_id;
        } else {
            console.error("ID not found in the token");
            return null;
        }
    }

    static extractEmail() {
        if (!this.isAuthenticated())
            return null;

        const decodedToken = this.decodeJwtToken();
        if (decodedToken && decodedToken.sub) {
            return decodedToken.sub;
        } else {
            return null;
        }
    }

    static isAuthenticated() {
        return CookieService.getCookie('auth_token') !== null;
    }

    static getAuthToken() {
        return CookieService.getCookie('auth_token');
    }

    static getRefreshToken() {
        return CookieService.getCookie('refresh_token');
    }

    static async updateTokens() {
        try {
            const response = await axios.get('/auth/refresh?token=' + this.getRefreshToken());
            CookieService.setCookieWithExpiration('auth_token', response.data.access_token, 900);
            CookieService.setCookieWithExpiration('refresh_token', response.data.refresh_token, 2592000);

            return response.data.access_token;
        } catch (error) {
            console.log(error);
            CookieService.removeCookie('refresh_token');
            return null;
        }
    }

    static removeTokens() {
        CookieService.removeCookie('refresh_token');
        CookieService.removeCookie('auth_token');
    }

    static logout() {
        axios.get(`/auth/logout?token=${this.getRefreshToken()}`, {
            headers: {
                Authorization: 'Bearer ' + this.getAuthToken()
            }
        }).then(() => this.removeTokens())
            .catch((error) => console.log(error));
    }

    static decodeJwtToken() {
        try {
            let token = CookieService.getCookie('auth_token');
            if (!token) {
                return null;
            }
            return jwtDecode(token);
        } catch (error) {
            return null;
        }
    }
}