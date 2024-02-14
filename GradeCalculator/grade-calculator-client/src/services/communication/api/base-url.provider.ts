import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class BaseUrlProvider {
    constructor() {
        if (environment.production) {
            this.baseUrl = '';
        } else {
            this.baseUrl = environment.baseUrl;
        }
    }

    public baseUrl: string;
}