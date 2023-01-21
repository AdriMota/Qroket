import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShareDataServiceService {
  private addAnimalsFormSource = new BehaviorSubject<boolean>(false);
  addAnimalsForm$ = this.addAnimalsFormSource.asObservable();

  private answerApiFromSource = new BehaviorSubject<boolean>(false);
  answerApi$ = this.answerApiFromSource.asObservable();


  constructor() {}

  addAnnonce() {
    this.addAnimalsFormSource.next(!this.addAnimalsFormSource.getValue());
  }
  showAnswer(){
    this.answerApiFromSource.next(!this.answerApiFromSource.getValue())
  }

}