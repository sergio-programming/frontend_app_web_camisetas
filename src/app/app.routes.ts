import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { HomeWelcomeComponent } from './components/home-welcome-component/home-welcome-component';
import { UserComponent } from './components/user-component/user-component';
import { ProductComponent } from './components/product-component/product-component';
import { HomeSite } from './pages/home-site/home-site';
import { HomeSiteComponent } from './components/home-site-component/home-site-component';
import { ShirtSiteComponent } from './components/shirt-site-component/shirt-site-component';
import { AlbumSiteComponent } from './components/album-site-component/album-site-component';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { Unauthorized } from './pages/unauthorized/unauthorized';

export const routes: Routes = [
    // Sitio principal
    {
        path: 'home',
        component: HomeSite,
        children: [
            { path: '', component: HomeSiteComponent },
            { path: 'shirts', component: ShirtSiteComponent },
            { path: 'albums', component: AlbumSiteComponent },
        ]
    },

    // Login
    { path: 'login', component: Login },

    // Panel administración
    { 
        path: 'home-admin', 
        component: Home,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['superadmin', 'admin'] },
        children: [
            { path: '', component: HomeWelcomeComponent },            
            { 
                path: 'users',
                component: UserComponent,
                canActivate: [authGuard, roleGuard],
                data: { roles: ['superadmin'] }
            },
            { 
                path: 'products',
                component: ProductComponent,
                canActivate: [authGuard, roleGuard],
                data: { roles: ['admin', 'superadmin'] }
            }
        ]
    },

    { path: 'unauthorized', component: Unauthorized },

    // Redirecciones
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
    
];
