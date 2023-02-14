import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StartPageComponent } from './start-page/start-page.component';
const routes: Routes = [
    { path: '', redirectTo: 'start-page', pathMatch: 'full' },
    { path: 'start-page', component: StartPageComponent },
    { path: 'home', component: HomeComponent },
    { path: 'config', component: ConfigComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
