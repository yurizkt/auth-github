import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './auth/auth.guard'
import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];