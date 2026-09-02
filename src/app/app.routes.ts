import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'booking',
    loadChildren: () =>
      import('./booking/booking.routes').then(m => m.BOOKING_ROUTES),
  },
  {
    path: '',
    redirectTo: 'booking',
    pathMatch: 'full',
  },
];
