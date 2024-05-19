import { InjectionToken } from '@angular/core';

export interface Environment {
  apiUrl: string;
  clientId: string;
}

export const environment = {
  apiUrl: 'https://api-176-3000.prg1.zerops.app/api',
  clientId: 'vl',
};

export const ENVIRONMENT: InjectionToken<Environment> = new InjectionToken(
  'ENVIRONMENT'
);
