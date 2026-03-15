import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { HomeSiteLayout } from './layouts/home-site-layout/home-site-layout';


export const routes: Routes = [
    // Sitio principal
    {
        path: '',
        component: HomeSiteLayout,
        loadChildren: () => import().then(m => m.HomeRoutes)
    },

    // Login
    { path: 'login', component: AuthLayout},


    // Redirecciones
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
    
];
