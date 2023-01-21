import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { ShareDataServiceService } from 'src/app/services/share-data-service.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  showForm: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private sharedData: ShareDataServiceService
  ) { }

  ngOnInit() {
    this.sharedData.addAnimalsForm$.subscribe(val => {
      this.showForm = val;
    });
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  handleClick(data: any) {
    // console.log(data, "Do something in parent event");
    this.sharedData.changeVisibility();
  }
}
