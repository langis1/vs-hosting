import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { todosReducer } from './store/reducers/todos.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TodoEffects } from './store/effects/todo.effects';
import { provideHttpClient } from '@angular/common/http';
import { environment, ENVIRONMENT } from '../environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { todoStateFeatureKey } from './store/selectors/todos.selectors';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideState({ name: todoStateFeatureKey, reducer: todosReducer }),
    provideEffects(TodoEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimations(),
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
    {
      provide: MAT_SNACK_BAR_DATA,
      useValue: {},
    },
  ],
};
