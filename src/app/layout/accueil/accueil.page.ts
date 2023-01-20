import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { AddAnimalsComponent } from 'src/app/add-animals/add-animals.component';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  handleClick(data : any){
    console.log(data, "Do something in parent event");
    this.router.navigateByUrl("/annonces");
  }
}
