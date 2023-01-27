import { Injectable, ViewContainerRef, EventEmitter } from "@angular/core";
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
    async addDynamicComponent(modalTitle: string, modalText: string, modalLocation: string, modalAnimalId: number) {

        console.log("go 2")

        const component = this.viewContainerRef.createComponent(AddAnimalComponent);

        component.instance.name = modalTitle;
        component.instance.description = modalText;
        component.instance.location = modalLocation;
        component.instance.id = modalAnimalId;

        //écouter le click, pour pouvoir supprimer le composant
        component.instance.modalClose.subscribe(() => this.removeDynamicComponent(component))

        if (component.hostView && !component.hostView.destroyed) {
            this.rootViewContainer.insert(component.hostView);
        //     console.log("dans la boucle cheloue")
        }

    }

    onWillDismiss(event: any) {
        console.log("Cancel dans le parent");
    }

    removeDynamicComponent(component) {
        component.destroy();
    }
}
