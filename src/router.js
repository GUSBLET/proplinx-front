import {createRouter, createWebHistory} from 'vue-router';
import SignUpView from "@/views/auth/SignUpView.vue";
import HomeView from "@/views/HomeView.vue";
import SignInView from "@/views/auth/SignInView.vue";
import {AuthenticateService} from "@/services/AuthenticateService";
import UpdatingProfileComponent from "@/components/user/UpdatingProfileComponent.vue";
import SettingsComponent from "@/components/user/SettingsComponent.vue";
import ConnectProvidersComponent from "@/components/user/ConnectProvidersComponent.vue";
import RequestPasswordRecoveryView from "@/views/user/recoveres/RequestPasswordRecoveryView.vue";
import PasswordRecoveryView from "@/views/user/recoveres/PasswordRecoveryView.vue";
import ProfileComponent from "@/components/user/ProfileComponent.vue";
import ProfileView from "@/views/user/ProfileView.vue";
import SuccessMessageCheckEmailView from "@/views/general/SuccessMessageCheckEmailView.vue";

const routes = [
    {
        // path: "/:catchAll(.*)",
        // name: "NotFound",
        // component: NotFound,
    },
    {
        path: '/',
        name: "Home",
        component: HomeView
    },
    {
        path: '/success-check-email',
        name: "SuccessCheckEmail",
        component: SuccessMessageCheckEmailView
    },
    {
        path: '/user',
        children: [
            {
                path: 'sign-in',
                name: "sign-in",
                component: SignInView,
                beforeEnter: validateNotAuthenticated
            },
            {
                path: 'sign-up',
                name: "sign-up",
                component: SignUpView,
                beforeEnter: validateNotAuthenticated
            },
            {
                path: 'request/recover-password',
                name: "request-recover-password",
                component: RequestPasswordRecoveryView
            },
            {
                path: 'recover-password',
                name: "recover-password",
                component: PasswordRecoveryView
            },
            {
                path: ':id',
                name: "profile",
                component: ProfileView,
                children: [
                    {
                        path: 'profile',
                        name: "profile",
                        component: ProfileComponent
                    },
                    {
                        path: 'customization',
                        name: "updating profile",
                        component: UpdatingProfileComponent,
                        beforeEnter: validateAccessToken
                    },
                    {
                        path: 'connect',
                        name: "connect providers",
                        component: ConnectProvidersComponent,
                        beforeEnter: validateAccessToken
                    },
                    {
                        path: 'settings',
                        name: "settings",
                        component: SettingsComponent,
                        beforeEnter: validateAccessToken
                    },
                ]
            },

        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

async function validateAccessToken(to, from, next) {
    try {
        if (AuthenticateService.isAuthenticated()) {
            return next();
        }

        const token = await AuthenticateService.updateTokens();
        if (token != null) {
            return next();
        }

        return next('/user/sign-in');
    } catch (error) {
        console.error('Error during token validation:', error);
        return next('/user/sign-in');
    }
}

function validateNotAuthenticated(to, from, next) {
    if (AuthenticateService.isAuthenticated()) {
        return next(`/user/${AuthenticateService.extractId()}/profile`);
    }
    return next();
}

export default router
