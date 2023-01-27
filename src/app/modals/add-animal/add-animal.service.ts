import { Injectable, ViewContainerRef } from "@angular/core";
import { AddAnimalComponent } from "./add-animal.component";

@Injectable({
    providedIn:'root'
})

export class ModalService {
    //peut contenir des vues hôtes.
    private rootViewContainer: ViewContainerRef;
    constructor(private viewContainerRef: ViewContainerRef) {
    }

    setRootViewContainerRef(viewContainerRef: any) {
        this.rootViewContainer = viewContainerRef;
    }

    //ajouter un composant. Reçoit les paramètres à afficher
    addDynamicComponent(modalTitle: string, modalText: string, modalLocation: string, modalAnimalId: number) {
        const component = this.viewContainerRef.createComponent(AddAnimalComponent);

        component.instance.name = modalTitle;
        component.instance.description = modalText;
        component.instance.location = modalLocation;
        component.instance.id = modalAnimalId;

        component.instance.closeModal();
        if (component.hostView && !component.hostView.destroyed) {
            this.rootViewContainer.insert(component.hostView);
        }

        // this.rootViewContainer.insert(component.hostView);
        // this.removeDynamicComponent(component);
    }

    removeDynamicComponent(component) {
        // component.destroy();
        // this.rootViewContainer.clear();
        // console.log("dans le remove component", component)
        // console.log(this.rootViewContainer)
    }
}
