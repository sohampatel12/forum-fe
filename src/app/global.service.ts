import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor() {}
  public jwtToken: string;
  public userId: string;
}