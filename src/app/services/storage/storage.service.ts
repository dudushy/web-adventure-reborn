import { Injectable } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';
import { StorageType } from '../../types/storage.type';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(private debugService: DebugService) {
    this.debugService.log(this);
  }

  private _getStorage(type: StorageType): Storage {
    this.debugService.log(this, 'type', type);
    return type === 'session' ? sessionStorage : localStorage;
  }

  get<T>(key: string, type: StorageType = 'local'): T | null {
    try {
      const raw = this._getStorage(type).getItem(key);
      if (raw === null) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T, type: StorageType = 'local'): void {
    this.debugService.log(this, 'key', key);
    this.debugService.log(this, 'value', value);
    this.debugService.log(this, 'type', type);

    this._getStorage(type).setItem(key, JSON.stringify(value));
  }

  remove(key: string, type: StorageType = 'local'): void {
    this.debugService.log(this, 'key', key);
    this.debugService.log(this, 'type', type);

    this._getStorage(type).removeItem(key);
  }

  clearAll(type?: StorageType): void {
    this.debugService.log(this, 'type', type);

    if (type) {
      this._getStorage(type).clear();
    } else {
      localStorage.clear();
      sessionStorage.clear();
    }
  }
}
