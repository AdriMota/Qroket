import { Injectable, ViewContainerRef, EventEmitter } from "@angular/core";
import { UpdateAnimalComponent } from "./update-animal.component";

@Injectable({
    providedIn:'root'
})

export class ModalServiceUpdate {
    private rootView: ViewContainerRef;

    constructor(private viewContainerRef: ViewContainerRef) {  
       
    }

    setRootViewContainerRef(viewContainerRef: any) {
        this.rootView = viewContainerRef;
    }
    
    //lorsque le premier component s'ajoute dans un viewhote, il ne se passe rien. Pourquoi ? 
    async addDynamicComponent(modalTitle: string, modalText: string, modalLocation: string, modalAnimalId: number, animalUser: number, viewContainerRef: any) {
        await this.setRootViewContainerRef(viewContainerRef);
        const component = this.rootView.createComponent(UpdateAnimalComponent);

        component.instance.name = modalTitle;
        component.instance.description = modalText;
        component.instance.location = modalLocation;
        component.instance.id = modalAnimalId;
        component.instance.animalUser = animalUser;

        component.instance.modalClose.subscribe(() => this.removeDynamicComponent(component))

        if (component.hostView && !component.hostView.destroyed) {
            this.rootView.insert(component.hostView);
        }
    }

    onWillDismiss(event: any) {
        console.log("Cancel dans le parent");
    }

    removeDynamicComponent(component) {
        component.destroy();
    }
}
