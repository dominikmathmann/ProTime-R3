import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  public static readonly LSPREFIX = 'PT3-LST';

  public static readonly SIMPLE_MODE_KEY = 'SMP-INPUT-ON';

  constructor() {}

  getNotes(id: string): string {
    return localStorage.getItem(this.getKey(id));
  }

  setNotes(id: string, value: string) {
    localStorage.setItem(this.getKey(id), value);
  }

  setSimpleRecordInputMode(simpleModeActive: boolean) {
    localStorage.setItem(
      UserPreferencesService.LSPREFIX + UserPreferencesService.SIMPLE_MODE_KEY,
      simpleModeActive + ''
    );
  }

  getSimpleRecordInputMode(): boolean {
    const savedMode = localStorage.getItem(UserPreferencesService.LSPREFIX + UserPreferencesService.SIMPLE_MODE_KEY);
    return savedMode == 'true';
  }

  private getKey(id: string): string {
    return UserPreferencesService.LSPREFIX + id;
  }
}
