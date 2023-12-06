import { Injectable } from '@angular/core';

declare const require: any;

class ConfigHelper {
    config: any;
    constructor() {
        try {
            this.config = require('./assets/config.json');
        } catch (e) {
            // simply console error

            // tslint:disable-next-line: no-console
            console.log('Error while reading configuration json file');
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class Config {
    api: any;
    googleRecaptcha: any;
    googleLocation: any;



    constructor() {
        const _ConfigHelper = new ConfigHelper();
        this.api = _ConfigHelper.config.api;



    }
}