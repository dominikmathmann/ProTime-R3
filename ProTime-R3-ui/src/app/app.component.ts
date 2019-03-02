import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/components/common/menuitem';
import { LoginService } from './base/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pt3-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public loginService: LoginService, private router: Router) {}

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'home', icon: 'pi pi-fw pi-home', routerLink: '/home' },
      { label: 'record', icon: 'pi pi-fw pi-clock', routerLink: '/record' },
      { label: 'projects', icon: 'pi pi-fw pi-users', routerLink: '/project' },
      { label: 'report', icon: 'pi pi-fw pi-file', routerLink: '/report' }
    ];
  }

  logout() {
    this.loginService.logout().subscribe(r => {
      this.router.navigateByUrl('/login');
    });
  }
}
