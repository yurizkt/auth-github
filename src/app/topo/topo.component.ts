import { Component } from "@angular/core"
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-topo',
    templateUrl: './topo.component.html'
})
export class TopoComponent { 
    title = 'Banco Pan';

    constructor(public auth: AuthService){
        auth.handleAuthentication()
    }
}