import { Injectable } from '@angular/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

/**
 * HapticsService
 * Abstrae el feedback háptico nativo de Capacitor.
 * Falla silenciosamente en web (no soportado).
 */
@Injectable({ providedIn: 'root' })
export class HapticsService {

  /** Toque suave — selección, navegación */
  async light(): Promise<void> {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch { /* web fallback */ }
  }

  /** Toque medio — selección importante */
  async medium(): Promise<void> {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch { /* web fallback */ }
  }

  /** Toque fuerte — confirmación de cita */
  async heavy(): Promise<void> {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch { /* web fallback */ }
  }

  /** Vibración de éxito — cita confirmada */
  async success(): Promise<void> {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch { /* web fallback */ }
  }

  /** Vibración de error */
  async error(): Promise<void> {
    try {
      await Haptics.notification({ type: NotificationType.Error });
    } catch { /* web fallback */ }
  }
}
