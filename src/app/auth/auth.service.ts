import { Injectable } from '@angular/core'
import * as auth0 from 'auth0-js'
import { Router } from '@angular/router'

(window as any).global = window;

@Injectable()
export class AuthService {
  
  constructor(private router: Router) { }

  userProfile: any

  auth0 = new auth0.WebAuth({
    clientID: 'WTAcoSNfH0qoo4ulMQmZRzC62uAdsIb2',
    domain: 'yzicatti.auth0.com',
    audience: 'https://yzicatti.auth0.com/api/v2/',
    redirectUri: 'http://localhost:4200/login/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
  })

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/profile']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    })
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }
  
    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
        console.log(profile);
        
      }
      cb(err, profile);
    })
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    const scopes = authResult.scope || '';

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('scopes', JSON.stringify(scopes))
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes')
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuth(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return Date.now() < expiresAt;
  }

  // public userHasScopes(scopes: Array<string>): boolean {
  //   const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
  //   return scopes.every(scope => grantedScopes.includes(scope));
  // }

}