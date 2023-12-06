import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class NotifierService {
    constructor(
        private _ToastrService: ToastrService,
        private _Router: Router,
    ) { }

    showSuccess(text: string): void {
        this._ToastrService.success(text);
    }
    showError(text: string): void {
        this._ToastrService.error(text);
    }
    showWarning(text: string): void {
        this._ToastrService.warning(text);
    }
    showInfo(text: string): void {
        this._ToastrService.info(text);
    }
    clear(toastId?: number) {
        this._ToastrService.clear(toastId)
    }
}