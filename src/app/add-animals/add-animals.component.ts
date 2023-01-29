import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareDataServiceService } from 'src/app/services/share-data-service.service';
import { AuthService } from '../auth/auth.service';
import { ErrorHandlingService } from '../services/error-handling.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-animals',
  templateUrl: './add-animals.component.html',
  styleUrls: ['./add-animals.component.scss'],
})
export class AddAnimalsComponent implements OnInit {

  showForm: boolean;
  showAnswerApi: boolean = false;

  name: string;
  age: string;
  description: string;
  fur: string;
  date: string;
  type: string;
  location: string ;
  user: string;

  animal: object = {};

  messageErrors: any = null;

  constructor(private http: HttpClient, private sharedData: ShareDataServiceService, private authService: AuthService, public errorHandlingService: ErrorHandlingService) { }

  ngOnInit() {
    this.sharedData.answerApi$.subscribe(val => {
      this.showAnswerApi = val;
    });
    this.sharedData.addAnimalsForm$.subscribe(val => {
      this.showForm = val;
    });
    this.authService.getUser$().subscribe(user => {
     this.user = user.id;
    });
  }

  submitAnnonce() {
    this.sharedData.showAnswer();

    const data = {
      name: this.name,
      age: this.age,
      description: this.description,
      fur: this.fur,
      date: this.date,
      type: this.type,
      location: this.location,
      user: this.user
    }

    console.log(data)

    this.http.post(environment.apiUrl + 'animals', data).pipe(
      catchError((error: any) => {
        this.handleError(error, data);
        console.log("ici", error.error)
        return throwError(error);
      })
    ).subscribe(response => {
      console.log(response);
    });

    //this.http.post(environment.apiUrl + 'animals', data);

  }

  goHome(data: any) {
    this.sharedData.addAnnonce();
    this.sharedData.showAnswer();
  }
  
  goAcc() {
    this.sharedData.addAnnonce();
  }

  handleError(error: any, data: any) {
    if (error.error.indexOf("is required.") !== -1) {
      this.messageErrors = this.errorHandlingService.validateFormAnimal(data);
    }
    if(error.error.indexOf("E11000 duplicate key error collection: test.users index: email_1 dup key") !== -1){
      this.messageErrors = this.errorHandlingService.validateDoubleKey(data);
    }
  }
}
