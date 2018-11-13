import { Component, OnInit } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  

  pushRightClass = 'push-right';
  isMobile: Boolean = false;
  lastClick: String = '';

  username: String = localStorage.getItem('username');

  constructor(public router: Router) {
      this.router.events.subscribe(val => {
          if (
              val instanceof NavigationEnd &&
              window.innerWidth <= 992 &&
              this.isToggled()
          ) {
              this.toggleSidebar();
          }
      });
  }

  ngOnInit() {
      if ($(window).width() < 992) {
          this.isMobile = true;
      }
  }

  isToggled(): boolean {
      const dom: Element = document.querySelector('body');
      return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle('rtl');
  }

  onLoggedout() {
      localStorage.removeItem('isLoggedin');
  }

  closeMenu() {
      $('#open_menu_btn').click();
      this.lastClick = '';
  }

  closeProfile() {
      $('#profile_btn').click();
      this.lastClick = '';
  }

  checkOpen(btn) {
      if (this.lastClick === 'open_menu_btn') {
          if (btn === 'open_menu_btn') {
              this.lastClick = '';
          } else if (btn === 'profile_btn') {
              $('#open_menu_btn').click();
              this.lastClick = 'profile_btn';
          }
      } else if (this.lastClick === 'profile_btn') {
          if (btn === 'open_menu_btn') {
              $('#profile_btn').click();
              this.lastClick = 'open_menu_btn';
          } else if (btn === 'profile_btn') {
              this.lastClick = '';
          }
      } else {
          this.lastClick = btn;
      }
  }

}
