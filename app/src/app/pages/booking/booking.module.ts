import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { BookingPageRoutingModule } from './booking-routing.module';

import { BookingPage } from './booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingPageRoutingModule
  ],
  declarations: [BookingPage]
})
export class BookingPageModule {}
