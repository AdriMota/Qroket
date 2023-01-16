import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent implements OnInit {

  @Input() paragraph : String;
  @Input() showIcon: boolean;

  //ajouter autant d'événements que souhaités.
  @Output() handleClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}
  
  onClick() {
    let pop = "Do something in child Event."
    this.handleClick.emit(pop)
  }

}
