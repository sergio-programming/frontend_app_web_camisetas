import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { HomeSiteLayout } from './layouts/home-site-layout/home-site-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';


export const routes: Routes = [
    // Sitio principal
    {
        path: '',
        component: HomeSiteLayout,
        loadChildren: () => import().then(m => m.HomeRoutes)
    },

    // Login
    { path: 'login', component: AuthLayout, title: 'login'},

    // Rutas privadas
    {
        path: 'admin',
        component: DashboardLayout,
        loadChildren: () => import('./features/users/admin/admin.routes').then(m => m.AdminRoutes)
    },
    {
        path: 'editor',
        component: DashboardLayout,
        loadChildren: () => import('./features/users/editor/editor.routes').then(m => m.EditorRoutes)
    } 


    // Redirecciones
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
    
];
