import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ViewWillEnter } from "@ionic/angular";
import { AuthService } from "src/app/auth/auth.service";
import { AnimalsService } from "../../services/animals.service";
import { environment } from "../../../environments/environment";
import { ShareDataServiceService } from 'src/app/services/share-data-service.service';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.page.html',
  styleUrls: ['./annonces.page.scss'],
})

export class AnnoncesPage implements ViewWillEnter {

  showForm: boolean;

  constructor(
    private auth: AuthService,
    public http: HttpClient,
    private animal: AnimalsService,
    private sharedData: ShareDataServiceService
  ) {}

  ionViewWillEnter(): void {
    this.http.get(`${environment.apiUrl}animals`).subscribe((animals) => {
      console.log(`Animals loaded`, animals);
    });
  }

  ngOnInit() {
    this.sharedData.addAnimalsForm$.subscribe(val => {
      this.showForm = val;
    });
  }

  handleClick(data: any) {
    this.sharedData.addAnnonce(); 
  }
}
