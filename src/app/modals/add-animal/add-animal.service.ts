import { Injectable, ViewContainerRef, EventEmitter } from "@angular/core";
import { AddAnimalComponent } from "./add-animal.component";

@Injectable({
    providedIn:'root'
})

export class ModalService {
    private rootViewContainer: ViewContainerRef;

    constructor(private viewContainerRef: ViewContainerRef) {   
    }

    setRootViewContainerRef(viewContainerRef: any) {
        this.rootViewContainer = viewContainerRef;
    }
    
    //lorsque le premier component s'ajoute dans un viewhote, il ne se passe rien. Pourquoi ? 
    async addDynamicComponent(modalTitle: string, modalText: string, modalLocation: string, modalAnimalId: number, animalUser: number) {
        const component = this.rootViewContainer.createComponent(AddAnimalComponent);

        component.instance.name = modalTitle;
        component.instance.description = modalText;
        component.instance.location = modalLocation;
        component.instance.id = modalAnimalId;
        component.instance.animalUser = animalUser;

        component.instance.modalClose.subscribe(() => this.removeDynamicComponent(component))

        if (component.hostView && !component.hostView.destroyed) {
            this.rootViewContainer.insert(component.hostView);
        }
    }

    onWillDismiss(event: any) {
        console.log("Cancel dans le parent");
    }

    removeDynamicComponent(component) {
        component.destroy();
    }
}
