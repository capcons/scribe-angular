import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayName;
  userName;
  photoURL = '../../assets/images/default-profile.jpg';

  constructor(
    private auth: AuthService,
    private router: Router,
    private titleService: Title,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.auth.checkLogin();
    this.titleService.setTitle('Home');
    this.getCurrentUser();
  }
  sendTo(path) {
    if (path === 'profile') {
      this.router.navigateByUrl('user/' + this.userName);
    }
  }
  getCurrentUser() {
    this.auth.getAuthState().subscribe(
      user => {
        if (user) {
          this.userService.retrieveUserDocument(user.uid).subscribe(
            userDoc => {
              this.displayName = userDoc.displayName;
              this.userName = userDoc.userName;
              this.photoURL = userDoc.photoURL;
            });
        }
    });
  }
}
