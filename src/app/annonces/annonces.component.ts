import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-annonces-component',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss'],
})
export class AnnoncesComponent implements OnInit {

  animals : any;
  user: string;
  animal: any;
  animalFilter: any;

  @Input() showLost: boolean;
  @Input() showFind: boolean;
  @Input() showAll: boolean;


  constructor(private http: HttpClient, private authService: AuthService,) { 
    this.getAnimals();
  }
 
  ngOnInit() {
    this.authService.getUser$().pipe(filter(user => user != null),).subscribe(user => {
      this.user = user.id
    });
  }

  getAnimals() {
    this.http.get( environment.apiUrl + 'animals').subscribe(
      (response) => {
        if(!this.showAll){
          this.animalFilter = response
          this.animals = this.animalFilter.filter(a => a.user == this.user)
        }
        if(this.showAll){
          this.animals = response;
          this.animals.sort((a, b) => a.date.localeCompare(b.date));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  }
