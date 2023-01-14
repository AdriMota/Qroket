import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlingService {

    constructor() { }

    handleError(error: any) {
        console.error(error);

    }

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
}