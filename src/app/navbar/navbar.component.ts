import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomNavbar } from './custom-navbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarTitle: CustomNavbar;
  title: string;
  navItems: any[];
  isResponsiveToggle: boolean;
  isDropDown: boolean;
  dropdowns: any[];
  navColor: string;

  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.title = '';
    this.httpService.get('./assets/navbar-config.json').subscribe(
      data => {
        this.navbarTitle = data as CustomNavbar;	 // FILL THE ARRAY WITH DATA.
        this.title = this.navbarTitle.title;
        this.navItems = this.navbarTitle.labels;
        this.isResponsiveToggle = this.navbarTitle.isResponsiveToggle === 'Yes' ? true : false;
        this.isDropDown = this.navbarTitle.isDropDown === 'Yes' ? true : false;
        this.dropdowns = this.navbarTitle.dropdowns;
        if (this.navbarTitle.navColor === 'red') {
          this.navColor = 'navbar-dark bg-danger';
        } else if (this.navbarTitle.navColor === 'yellow') {
          this.navColor = 'navbar-dark bg-warning';
        } else if (this.navbarTitle.navColor === 'green') {
          this.navColor = 'navbar-dark bg-success';
        } else if (this.navbarTitle.navColor === 'black') {
          this.navColor = 'navbar-dark bg-dark';
        } else if (this.navbarTitle.navColor === 'blue') {
          this.navColor = 'navbar-dark bg-primary';
        } else if (this.navbarTitle.navColor === 'cyan') {
          this.navColor = 'navbar-dark bg-info';
        } else {
          this.navColor = 'navbar-light bg-light';
        }
      }
    );
  }
}
