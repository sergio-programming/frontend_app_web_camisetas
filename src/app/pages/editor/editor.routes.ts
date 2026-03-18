import { Routes } from "@angular/router";

import { EditorDashboard } from "./editor-dashboard/editor-dashboard";

export const EditorRoutes: Routes = [
    {
        path: 'dashboard',
        component: EditorDashboard,
        title: 'Editor Dashboard'
    },
    {
        path: 'products',
        loadChildren: () => import('../../features/products/product.routes').then(m => m.ProductRoutes)
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
]