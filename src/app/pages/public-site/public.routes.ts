import { Routes } from "@angular/router";

import { Home } from "./home/home";
import { Shirts } from "./shirts/shirts";
import { Albums } from "./albums/albums";

export const PublicSiteRoutes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: Home, title: 'Home' },
            { path: 'shirts', component: Shirts, title: 'Camisetas' },
            { path: 'albums', component: Albums, title: 'Álbumes' }
        ]
    }
]
