import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { HomeSiteLayout } from './layouts/home-site-layout/home-site-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { adminGuard } from './core/guards/admin-guard';
import { editorGuard } from './core/guards/editor-guard';


export const routes: Routes = [
    // Sitio principal
    {
        path: '',
        component: HomeSiteLayout,
        loadChildren: () => import('./pages/public-site/public.routes').then(m => m.PublicSiteRoutes)
    },

    // Login
    { path: 'login', component: AuthLayout, title: 'Login'},

    // Rutas privadas
    {
        path: 'admin',
        component: DashboardLayout,
        canActivate: [adminGuard],
        loadChildren: () => import('./pages/admin/admin.routes').then(m => m.AdminRoutes)
    },
    {
        path: 'editor',
        component: DashboardLayout,
        canActivate: [editorGuard],
        loadChildren: () => import('./pages/editor/editor.routes').then(m => m.EditorRoutes)
    }, 


    // Redirecciones
    { path: '**', redirectTo: '' }
    
];
