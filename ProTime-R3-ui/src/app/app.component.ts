import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Router } from '@angular/router';
import { DefaultService } from './api';
import { LoginService } from './base/services/login.service';

@Component({
  selector: 'pt3-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  static readonly MOBILE_BREAKPOINT = 770;

  constructor(public loginService: LoginService, private router: Router) { }

  items: MenuItem[];

  smallScreen = false;

  @HostListener('window:resize', ['$event'])
  onWindowsResize(event) {
    this.detectScreensize();
  }

  ngOnInit() {
    this.items = [
      { label: 'home', icon: 'pi pi-fw pi-home', routerLink: '/home' },
      { label: 'record', icon: 'pi pi-fw pi-clock', routerLink: '/record' },
      { label: 'projects', icon: 'pi pi-fw pi-users', routerLink: '/project' },
      { label: 'report', icon: 'pi pi-fw pi-file', routerLink: '/report' },
      { label: 'notes', icon: 'pi pi-fw pi-paperclip', routerLink: '/notes' }
    ];

    this.detectScreensize();
  }

  private detectScreensize() {
    this.smallScreen = window.screen.width < AppComponent.MOBILE_BREAKPOINT;
  }

  logout() {
    this.loginService.logout().subscribe(r => {
      this.router.navigateByUrl('/login');
    });
  }
}
