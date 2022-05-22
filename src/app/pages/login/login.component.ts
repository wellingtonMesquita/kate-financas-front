import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenDto } from 'src/app/models/token-dto';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  socialUser: SocialUser;
  userLogged: SocialUser;
  isLogged: boolean;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private oauthService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(
      data => {
        console.log("asdas",this.isLogged);
        this.userLogged = data;
        this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
      
        if(this.isLogged){
          this.router.navigate(['/dashboard'])
        }
       
      }
    );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenGoogle = new TokenDto(this.socialUser.idToken);
        this.oauthService.google(tokenGoogle).subscribe({
          next: (res) =>  this.tokenService.setToken(res.value),
          error: (err) => {console.error(err); this.logOut();},
          complete: () =>  {this.isLogged = true;this.router.navigate(['/dashboard'])}
        })
     }

    )
  }

  logOut(): void {
    this.authService.signOut().then(
      data => {
        this.tokenService.logOut();
        this.isLogged = false;
      }
    );
  }
}
    
