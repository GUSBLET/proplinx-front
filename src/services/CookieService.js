export default class CookieService {
    static setCookie(name, value) {
        document.cookie = `${name}=${value}; path=/`;
    }

    static setCookieWithExpiration(name, value, expireSeconds = 30) {
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + expireSeconds);

        const expiresLocal = expirationDate.toUTCString();

        document.cookie = `${name}=${value}; expires=${expiresLocal}; path=/;`;
    }

    static getCookie(name) {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith(name))
            ?.split('=')[1];
        return cookieValue ? decodeURIComponent(cookieValue) : null;
    }

    static removeCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}