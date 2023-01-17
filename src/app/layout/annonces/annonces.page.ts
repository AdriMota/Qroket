import { Component, OnInit } from '@angular/core';
// Import Angular's HTTP client.
import { HttpClient } from "@angular/common/http";
import { ViewWillEnter } from "@ionic/angular";
import { AuthService } from "src/app/auth/auth.service";
import { AnimalsService } from "../../services/animals.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.page.html',
  styleUrls: ['./annonces.page.scss'],
})

export class AnnoncesPage implements ViewWillEnter {
  constructor(
    // Inject the AuthService
    private auth: AuthService,
    // Inject the HTTP client
    public http: HttpClient,
    // Inject the AnimalsService
    private animal: AnimalsService,
  ) {}

  ionViewWillEnter(): void {
    // Make an HTTP request to retrieve the animals.
    this.http.get(`${environment.apiUrl}animals`).subscribe((animals) => {
      console.log(`Animals loaded`, animals);
    });
  }

  ngOnInit() {
    //this.animal.getAnimals$().subscribe({});
  }
}
