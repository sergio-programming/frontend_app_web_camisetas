import { Routes } from "@angular/router";

import { AdminDashboard } from "./admin-dashboard/admin-dashboard";

export const AdminRoutes: Routes = [
    {
        path: 'dashboard',
        component: AdminDashboard,
        title: 'Admin Dashboard'
    },
    {
        path: 'user-management',
        loadChildren: () => import('../user-management/user.management.routes').then(m => m.UserManagementRoutes)
    },
    {
        path: 'products',
        loadChildren: () => import('../../products/product.routes').then(m => m.ProductRoutes)
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

]