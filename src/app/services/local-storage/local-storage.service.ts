import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  clear(): void  {
    localStorage.clear();
  }

  getAllItems(): any {
    const objectsRetrieved = [];
    for (const [key, value] of Object.entries(localStorage)) {
      objectsRetrieved.push(value);
    }
    return objectsRetrieved;
  }
}
