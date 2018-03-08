import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    constructor() {
    }

    get(key) {
        try {
            return JSON.parse(localStorage.getItem(key)) || null;
        } catch (err) {
            console.warn('invalid key: ' + key, err);
            return null;
        }
    }

    set(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    }
}
