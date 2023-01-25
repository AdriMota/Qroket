import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-annonces-component',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss'],
})
export class AnnoncesComponent implements OnInit {

  animals : any;
  @Input() showLost: boolean;
  @Input() showFind: boolean;

  constructor(private http: HttpClient) { 
    this.getAnimals();
  }

  getAnimals() {
    this.http.get( environment.apiUrl + 'animals').subscribe(
      (response) => {
        this.animals = response;
        this.animals.sort((a, b) => a.date.localeCompare(b.date));
      },
      (error) => {
        console.log(error);
      }
    );
  }
    ngOnInit() { }
  }
