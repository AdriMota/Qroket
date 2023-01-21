import { Component, OnInit } from '@angular/core';
import { ShareDataServiceService } from 'src/app/services/share-data-service.service';

@Component({
  selector: 'app-add-animals',
  templateUrl: './add-animals.component.html',
  styleUrls: ['./add-animals.component.scss'],
})
export class AddAnimalsComponent implements OnInit {

  showForm: boolean;
  showAnswerApi: boolean = false;


  constructor(private sharedData: ShareDataServiceService) { }

  ngOnInit() {
    this.sharedData.answerApi$.subscribe(val => {
      this.showAnswerApi = val;
    });
    this.sharedData.addAnimalsForm$.subscribe(val => {
      this.showForm = val;
    });
  }

  submitAnnonce(data: any){
    this.sharedData.showAnswer();

  }

  goHome(data: any){
    this.sharedData.addAnnonce();
    this.sharedData.showAnswer();
  }
}
