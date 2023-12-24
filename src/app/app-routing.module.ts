import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from '@app/demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "@app/layout/app.layout.component";
import { ReunionComponent } from '@app/reunion/reunion.component';
import { HomeComponent } from '@app/home/home.component';
import { CreateReunionComponent } from '@app/reunion/create/create-reunion.component';
import { ValidateReunionComponent } from './reunion/create/validate-reunion.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ProfileComponent } from './Profile/profile.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { CreatePersonnelComponent } from './personnel/create/create-personnel.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                 component: AppLayoutComponent,
                 canActivate: [AuthGuard],
                children: [
                    {
                      path: '',
                      redirectTo: '/login', 
                      pathMatch: 'full',
                    },
                    {
                      path: 'home',
                      component:HomeComponent,
                    },
                    {
                      path: 'reunion',
                      component:ReunionComponent,
                    },
                    {
                      path: 'reunion/create',
                      component:CreateReunionComponent,
                    },
                    {
                      path: 'reunion/validate',
                      component:ValidateReunionComponent,
                    },
                    {
                      path: 'profile',
                      component:ProfileComponent,
                    },
                    {
                      path: 'personnel',
                      component:PersonnelComponent,
                    },
                    {
                      path: 'personnel/create',
                      component:CreatePersonnelComponent,
                    },
                    
                   /* {
                      path: 'home',
                      loadChildren: () =>
                        import('./views/home/home.module').then((m) => m.HomeModule)
                    },*/
                  ]
            },
            { path: 'login', component: LoginComponent },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
