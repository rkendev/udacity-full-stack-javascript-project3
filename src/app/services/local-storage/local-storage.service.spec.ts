import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('add key and value to local storage an retrieve value using key', () => {
    const testKey = 'testkey';
    const testValue = 'testValue';
    service.addItem(testKey, testValue);
    const retrievedValue: any = service.getItem(testKey);
    expect(retrievedValue).toEqual('testValue');
    service.clear();
  });

  it('add key and value to local storage an retrieve value using wrong key', () => {
    const testKey = 'testkey';
    const testValue = 'testValue';
    const wrongKey = 'wrongKey';
    service.addItem(testKey, testValue);
    const retrievedValue: any = service.getItem(wrongKey);
    expect(retrievedValue).toBeNull();
    service.clear();
  });

  it('add key and value and delete using key', () => {
    const testKey = 'testkey';
    const testValue = 'testValue';
    service.addItem(testKey, testValue);
    service.deleteItem(testKey);
    const retrievedValue: any = service.getItem(testKey);
    expect(retrievedValue).toBeNull();
    service.clear();
  });

  it('add key and value and clear localstorage', () => {
   const testKey = 'testkey';
   const testValue = 'testValue';
   service.addItem(testKey, testValue);
   service.clear();
   const retrievedValue: any = service.getItem(testKey);
   expect(retrievedValue).toBeNull();
   service.clear();
  });

  it('add multiple keys and value and clear localstorage', () => {
    const testKey = 'testkey';
    const testValue = 'testValue';
    service.addItem(testKey, testValue);

    const testKey2 = 'testkey2';
    const testValue2 = 'testValue2';
    service.addItem(testKey2, testValue2);

    service.clear();
    const retrievedValue: any = service.getItem(testKey2);
    expect(retrievedValue).toBeNull();
    service.clear();
  });

  it('add multiple keys and value and retrieve all', () => {
    let allValuesFound = false;

    const testKey = 'testkey';
    const testValue = 'testValue';
    service.addItem(testKey, testValue);

    const testKey2 = 'testkey2';
    const testValue2 = 'testValue2';
    service.addItem(testKey2, testValue2);

    const objectRetreived: any[] = service.getAllItems();
    const retrievedValue: any = service.getItem(testKey2);
    if (objectRetreived[1] === 'testValue' && objectRetreived[0] === 'testValue2') {
      allValuesFound = true;
    }

    expect(allValuesFound).toEqual(true);
    service.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
