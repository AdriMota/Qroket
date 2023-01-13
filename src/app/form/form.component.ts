import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})


export class FormComponent implements OnInit {

  //initalisation des variables à récupérer du formulaire
  firstname: string = '';
  lastname: string = '';
  phone: number = null;
  email: string = '';
  password: string = '';
  // picture: any = '';
  // location: number = null;

  user: object = {};

  constructor(private http: HttpClient) { }

  //fonction à appeler lors d'un click sur BTN pour créer un nouvel utilisateur
  createUser(user) {

    //construction de l'objet à envoyer à l'API, en récupérant les données entrées par l'utilisateur
    const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        phone: this.phone,
        email: this.email,
        password: this.password  
    }

    //envoie des données dans l'API, recevoir et afficher la réponse de la requête
    this.http.post(environment.apiUrl +'users', data).subscribe(response=>{
      console.log(response)
    });
  }

  ngOnInit() {}

}
