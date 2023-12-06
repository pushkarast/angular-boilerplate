

import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Buffer } from 'buffer'
@Injectable({
    providedIn: 'root'
})


export class CommonService {
    userType: any;
    constructor(
        private _ActivatedRoute: ActivatedRoute
    ) {
        if (localStorage.getItem('_ty_'))
            this.userType = Buffer.from(localStorage.getItem('_ty_') || '{}', 'base64').toString('ascii');
    }
    getPermission(permission: any, p_type: any) {
        if (this.userType == "admin")
            return true;
        else
            return permission?.includes(p_type);
    }
    hideMobile(string: any) {
        if (this.userType != "admin") {//hide number only if user is not admin
            // Define a regular expression to find mobile numbers (assuming 10-digit numbers for simplicity).
            const mobileNumberRegex = /\d{10}/g;
            // Replace all occurrences of mobile numbers with masked versions.
            const maskedString = string?.replace(mobileNumberRegex, (match) => {
                // Keep only the last 3 digits visible.
                const maskedPart = match?.slice(0, -3).replace(/\d/g, '*');
                const visiblePart = match?.slice(-4);
                return `${maskedPart}${visiblePart}`;
            });
            return maskedString;
        } else
            return string;
    }
    checkUserType() {
        let data: any = {};
        if (localStorage.getItem('_ty_'))
            data.userType = Buffer.from(localStorage.getItem('_ty_') || '{}', 'base64').toString('ascii');
        if (data.userType != "admin" && localStorage.getItem('_p_'))
            data.permissions = JSON.parse(Buffer.from(localStorage.getItem('_p_') || '{}', 'base64').toString('ascii'));
        if (localStorage.getItem('_t_'))
            data.type = Buffer.from(localStorage.getItem('_t_') || '{}', 'base64').toString('ascii');
        return data;
    }
}
