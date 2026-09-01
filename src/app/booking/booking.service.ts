import { Injectable } from '@angular/core';

// ── Interfaz del modelo de cita ─────────────────────────────────────────
export interface Booking {
  id:             string;
  serviceId:      string;
  serviceName:    string;
  date:           string;
  time:           string;
  specialistId:   string;
  specialistName: string;
  stationId:      string;
  stationLabel:   string;
  stationType:    'sillon' | 'mesa';
  price:          number;
  status:         'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt:      string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {

  private readonly STORAGE_KEY = 'vb_bookings';

  // ── Crear una nueva cita ───────────────────────────────────────────────
  async createBooking(data: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    // Simula latencia de red (200ms)
    await this.delay(200);

    const booking: Booking = {
      ...data,
      id:        this.generateId(),
      createdAt: new Date().toISOString(),
    };

    const bookings = this.getAll();
    bookings.push(booking);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));

    return booking;
  }

  // ── Obtener todas las citas ───────────────────────────────────────────
  getAll(): Booking[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  // ── Obtener cita por ID ───────────────────────────────────────────────
  getById(id: string): Booking | undefined {
    return this.getAll().find(b => b.id === id);
  }

  // ── Obtener la cita activa más reciente ───────────────────────────────
  getActiveBooking(): Booking | undefined {
    const today = new Date().toISOString().split('T')[0];
    return this.getAll()
      .filter(b => b.date === today && b.status !== 'cancelled' && b.status !== 'completed')
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  }

  // ── Cancelar una cita ─────────────────────────────────────────────────
  async cancelBooking(id: string): Promise<void> {
    await this.delay(150);
    const bookings = this.getAll().map(b =>
      b.id === id ? { ...b, status: 'cancelled' as const } : b
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
  }

  // ── Helpers ───────────────────────────────────────────────────────────
  private generateId(): string {
    return `VB-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
