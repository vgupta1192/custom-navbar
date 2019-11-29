# Custom Navigation Bar
Custom Navigation Bar App based on angular with Material Bootstrap.

## Demo
You may want to have a look at the demo: https://vgupta1192.github.io/custom-navbar/

### Dependencies
```
npm install --save angularx-qrcode angular-bootstrap-md font-awesome hammerjs chart.js@2.5.0
```

### App Details
```
App can be used to generate custom navigation bar with option to change the look and feel of the bar using configuration file.
```

### navbar.component.html
``` html

        <nav class="navbar navbar-expand-sm" [ngClass]="navColor">
        <div class="container">
          <a href="#" class="navbar-brand">{{title}}</a>
          <button *ngIf="isResponsiveToggle" class="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"><span class="navbar-toggler-icon"></span></button>
          <div *ngIf="isResponsiveToggle"  class="navbar-collapse collapse" id="navbarNav">
              <ul class="navbar-nav">
                  <li class="nav-item" *ngFor="let nav of navItems">
                      <a href="nav.href" class="nav-link">{{nav.name}}</a>
                  </li>
                  <div *ngIf="isDropDown">
                  <li class="nav-item dropdown" *ngFor="let dropdown of dropdowns">
                      <a href="{{dropdown.href}}" class="dropdown-toggle nav-link" data-toggle="dropdown">{{dropdown.name}}</a>
                      <div class="dropdown-menu">
                        <div *ngFor="let dropdownlink of dropdown.links">
                        <a href="{{dropdownlink.href}}" class="dropdown-item">{{dropdownlink.name}}</a>
                        </div>
                      </div>
                    </li>
                  </div>
              </ul>
              </div>
              <div *ngIf="!isResponsiveToggle">
                  <ul class="navbar-nav">
                      <li class="nav-item" *ngFor="let nav of navItems">
                          <a href="nav.href" class="nav-link">{{nav.name}}</a>
                      </li>
                      <div *ngIf="isDropDown">
                      <li class="nav-item dropdown" *ngFor="let dropdown of dropdowns">
                          <a href="{{dropdown.href}}" class="dropdown-toggle nav-link" data-toggle="dropdown">{{dropdown.name}}</a>
                          <div class="dropdown-menu">
                            <div *ngFor="let dropdownlink of dropdown.links">
                            <a href="{{dropdownlink.href}}" class="dropdown-item">{{dropdownlink.name}}</a>
                            </div>
                          </div>
                        </li>
                      </div>
                  </ul>
              </div>
          </div>
    </nav>
	
```
### navbar.component.ts
``` typescript
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


```
### custom-navbar.ts
``` typescript
export interface CustomNavbar {
    title: string;
    labels: string[];
    isResponsiveToggle: string;
    isDropDown: string;
    dropdowns: any[];
    navColor: string;
}

```
### app.module.ts
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
