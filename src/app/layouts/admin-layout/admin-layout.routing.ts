import { Routes } from "@angular/router";
import { LoginComponent } from "src/app/pages/login/login.component";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";


export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  //{ path: "login", component: LoginComponent },
];
