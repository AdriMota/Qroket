import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlingService {

    constructor() { }

    handleError(error: any) {
        console.error(error);
    }

 /**
   * Gestion d'erreurs pour la création d'un nouvel utilisateur
   *
   * Retourne un bolean pour indiquer si les datas sont valides
   * ainsi qu'un tableau avec les messages à afficher pour l'utilisateur
   * 
*/

    validateForm(formData: any) {
        let isFormValid = true;
        const formErrors = {};

        if (!formData.firstname) {
            isFormValid = false;
            formErrors['firstname'] = 'Oops! Le prénom est requis';
        } else if (formData.firstname.length < 3) {
            isFormValid = false;
            formErrors['firstname'] = 'Le prénom doit contenir au moins 3 caractères';
        }

        if (!formData.lastname) {
            isFormValid = false;
            formErrors['lastname'] = 'Oops! Le nom est requis';
        } else if (formData.lastname.length < 3) {
            isFormValid = false;
            formErrors['lastname'] = 'Le nom doit contenir au moins 3 caractères';
        }

        if (formData.phone < 10) {
            isFormValid = false;
            formErrors['phone'] = 'Le numéro de téléphone n\'est pas valide';
        } 

        if (!formData.email) {
            isFormValid = false;
            formErrors['email'] = 'Oops! L\'email est requis';
        } else if (!this.validateEmail(formData.email)) {
            isFormValid = false;
            formErrors['email'] = 'L\'email est incorrect';
        }

        if (!formData.password) {
            isFormValid = false;
            formErrors['password'] = 'Oops! Le mot de passe est requis';
        } else if (formData.password.length < 8) {
            isFormValid = false;
            formErrors['password'] = 'Le mot de passe doit contenir au moins 8 caractères';
        }
        if (!formData.location) {
            isFormValid = false;
            formErrors['location'] = 'Oops! Veuillez choisir une location';
        }

        return { isFormValid, formErrors };
    }

    validateEmail(email: string) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegex.test(email)) {
            return true;
        }
        return false;
    }

    validateDoubleKey(formData: any){
        let isFormValid = true;
        const formErrors = {};

        isFormValid = false;
        formErrors['email'] = 'Oops! Cet adresse mail est déjà utilisée !';

        return { isFormValid, formErrors };
    }

 /**
   * Gestion d'erreurs pour la création d'un nouvel animal
   *
   * Retourne un bolean pour indiquer si les datas sont valides
   * ainsi qu'un tableau avec les messages à afficher pour l'utilisateur
   * 
*/
    validateFormAnimal(formData: any) {
        let isFormValid = true;
        const formErrors = {};

        if (!formData.name) {
            isFormValid = false;
            formErrors['name'] = 'Oops! Le nom est requis';
        } else if (formData.name.length < 3) {
            isFormValid = false;
            formErrors['name'] = 'Le nom doit contenir au moins 3 caractères';
        }

        if (!formData.description) {
            isFormValid = false;
            formErrors['description'] = 'Oops! La description est requise';
        } else if (formData.description.length < 10) {
            isFormValid = false;
            formErrors['description'] = 'La description est trop courte. Minimum 10 caractères!';
        } else if (formData.description.length > 400) {
            isFormValid = false;
            formErrors['description'] = 'La description est trop longue. Maximum 400 caractères!';
        }

        if (!formData.fur) {
            isFormValid = false;
            formErrors['fur'] = 'Oops! Le pelage est requis';
        } else if (formData.fur.length < 3) {
            isFormValid = false;
            formErrors['fur'] = 'La description du pelage est trop courte. Minimum 3 caractères!';
        } else if (formData.fur.length > 50) {
            isFormValid = false;
            formErrors['fur'] = 'La description du pelage est trop longue. Maximum 50 caractères!';
        }

        if (!formData.date) {
            isFormValid = false;
            formErrors['date'] = 'Oops! La date est requise';
        } 

        if (!formData.type) {
            isFormValid = false;
            formErrors['type'] = 'Oops! Le type est requis';
        } 

        return { isFormValid, formErrors };
    }

    validateDate(formData: any){
        let isFormValid = true;
        const formErrors = {};

        isFormValid = false;
        formErrors['date'] = 'Oops! La date ne peut pas être dans le futur !';

        return { isFormValid, formErrors };
    }
}