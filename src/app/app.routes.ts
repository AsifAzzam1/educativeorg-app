import { Routes } from "@angular/router";
import { LoginComponent } from "./components/accounts/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { AppsComponent } from "./components/apps/apps.component";

export const routes:Routes=[
    {
        path:'',redirectTo:'login',pathMatch:'full'
    },
    {
        path:'login',component:LoginComponent
    },
    {
        path:'apps',
        component:AppsComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            }
        ]
    }
]