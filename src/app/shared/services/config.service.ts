import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  private _config: { [key: string]: any };
  constructor() {
    this._config = {};
  }

  get config(): { [key: string]: any } {
    return this._config;
  }

  set config(config: { [key: string]: any }) {
    this._config = config;
  }
}