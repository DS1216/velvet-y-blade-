import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonBadge,
  AlertController,
  ToastController
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  chevronBackOutline,
  checkmarkCircle,
  timeOutline,
  personOutline,
  calendarOutline,
  chevronForwardOutline,
  sparklesOutline,
  cutOutline,
  handLeftOutline,
  colorPaletteOutline,
  ribbonOutline,
  leafOutline,
  starOutline
} from 'ionicons/icons';

import { BookingService, Booking } from './booking.service';
import { HapticsService } from '../core/haptics.service';


// ── Tipos de datos ──────────────────────────────────────────────────────────

export interface Service {
  id: string;
  name: string;
  category: 'barberia' | 'spa';
  duration: number;
  price: number;
  icon: string;
  description: string;
  stationType: 'sillon' | 'mesa';
}


export interface Specialist {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specialties: string[];
  rating: number;
  available: boolean;
}


export interface WorkStation {
  id: string;
  label: string;
  type: 'sillon' | 'mesa';
  number: number;
  available: boolean;
  specialist?: string;
}


export interface TimeSlot {
  time: string;
  available: boolean;
  period: 'mañana' | 'tarde' | 'noche';
}


// ── Componente ──────────────────────────────────────────────────────────────

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,

    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    IonBadge
  ],
})
export class BookingPage implements OnInit {

  // ── Estado del wizard ─────────────────────────────────────────────────────

  currentStep = 1;

  totalSteps = 4;


  selectedService: Service | null = null;

  selectedDate: string | null = null;

  selectedTimeSlot: TimeSlot | null = null;

  selectedSpecialist: Specialist | null = null;

  selectedStation: WorkStation | null = null;


  activeCategory: 'barberia' | 'spa' = 'barberia';


  // Período seleccionado para los horarios
  activePeriod:
    'mañana' | 'tarde' | 'noche' | 'todos' = 'todos';


  // Filtros disponibles
  periods: (
    'todos' |
    'mañana' |
    'tarde' |
    'noche'
  )[] = [
    'todos',
    'mañana',
    'tarde',
    'noche'
  ];


  // Días disponibles del calendario
  calendarDays: {
    date: string;
    label: string;
    day: string;
    available: boolean;
  }[] = [];


  isSubmitting = false;


  // ── Catálogo de servicios ─────────────────────────────────────────────────

  services: Service[] = [

    {
      id: 'corte-precision',
      name: 'Corte de Precisión',
      category: 'barberia',
      duration: 45,
      price: 65000,
      icon: 'cut-outline',
      description:
        'Corte ejecutado con técnica de autor y acabado impecable.',
      stationType: 'sillon',
    },

    {
      id: 'perfilado-barba',
      name: 'Perfilado de Barba',
      category: 'barberia',
      duration: 30,
      price: 45000,
      icon: 'sparkles-outline',
      description:
        'Definición y escultura de barba con navaja de autor.',
      stationType: 'sillon',
    },

    {
      id: 'tratamiento-facial',
      name: 'Tratamiento Facial',
      category: 'barberia',
      duration: 60,
      price: 95000,
      icon: 'leaf-outline',
      description:
        'Hidratación profunda y cuidado de piel con productos premium.',
      stationType: 'sillon',
    },

    {
      id: 'manicura-rusa',
      name: 'Manicura Rusa',
      category: 'spa',
      duration: 75,
      price: 85000,
      icon: 'hand-left-outline',
      description:
        'Técnica de cutícula seca para un acabado duradero y limpio.',
      stationType: 'mesa',
    },

    {
      id: 'pedicura-spa',
      name: 'Pedicura Spa',
      category: 'spa',
      duration: 90,
      price: 110000,
      icon: 'ribbon-outline',
      description:
        'Relajante pedicura con exfoliación e hidratación profunda.',
      stationType: 'mesa',
    },

    {
      id: 'esmaltado-permanente',
      name: 'Esmaltado Permanente',
      category: 'spa',
      duration: 60,
      price: 75000,
      icon: 'color-palette-outline',
      description:
        'Esmaltado en gel de larga duración con secado en lámpara UV.',
      stationType: 'mesa',
    }

  ];


  // ── Especialistas ─────────────────────────────────────────────────────────

  specialists: Specialist[] = [

    {
      id: 'valeria',
      name: 'Valeria Montoya',
      role: 'Maestra Barbera',
      avatar: 'VM',
      specialties: [
        'corte-precision',
        'perfilado-barba',
        'tratamiento-facial'
      ],
      rating: 4.9,
      available: true,
    },

    {
      id: 'sebastian',
      name: 'Sebastián Ríos',
      role: 'Barbero de Autor',
      avatar: 'SR',
      specialties: [
        'corte-precision',
        'perfilado-barba'
      ],
      rating: 4.8,
      available: true,
    },

    {
      id: 'andrea',
      name: 'Andrea Castillo',
      role: 'Especialista Spa',
      avatar: 'AC',
      specialties: [
        'manicura-rusa',
        'esmaltado-permanente'
      ],
      rating: 4.9,
      available: true,
    },

    {
      id: 'camila',
      name: 'Camila Torres',
      role: 'Técnica en Uñas',
      avatar: 'CT',
      specialties: [
        'manicura-rusa',
        'pedicura-spa',
        'esmaltado-permanente'
      ],
      rating: 4.7,
      available: false,
    }

  ];


  // ── Estaciones de trabajo ─────────────────────────────────────────────────

  workStations: WorkStation[] = [

    {
      id: 's1',
      label: 'Sillón 1',
      type: 'sillon',
      number: 1,
      available: true,
      specialist: 'valeria'
    },

    {
      id: 's2',
      label: 'Sillón 2',
      type: 'sillon',
      number: 2,
      available: false,
      specialist: 'sebastian'
    },

    {
      id: 's3',
      label: 'Sillón 3',
      type: 'sillon',
      number: 3,
      available: true,
      specialist: 'sebastian'
    },

    {
      id: 'm1',
      label: 'Mesa 1',
      type: 'mesa',
      number: 1,
      available: true,
      specialist: 'andrea'
    },

    {
      id: 'm2',
      label: 'Mesa 2',
      type: 'mesa',
      number: 2,
      available: true,
      specialist: 'camila'
    },

    {
      id: 'm3',
      label: 'Mesa 3',
      type: 'mesa',
      number: 3,
      available: false,
      specialist: 'andrea'
    }

  ];


  // ── Horarios ──────────────────────────────────────────────────────────────

  timeSlots: TimeSlot[] = [

    // Mañana
    {
      time: '08:00',
      available: true,
      period: 'mañana'
    },

    {
      time: '08:30',
      available: false,
      period: 'mañana'
    },

    {
      time: '09:00',
      available: true,
      period: 'mañana'
    },

    {
      time: '09:30',
      available: true,
      period: 'mañana'
    },

    {
      time: '10:00',
      available: false,
      period: 'mañana'
    },

    {
      time: '10:30',
      available: true,
      period: 'mañana'
    },

    {
      time: '11:00',
      available: true,
      period: 'mañana'
    },

    {
      time: '11:30',
      available: false,
      period: 'mañana'
    },


    // Tarde
    {
      time: '12:00',
      available: true,
      period: 'tarde'
    },

    {
      time: '12:30',
      available: true,
      period: 'tarde'
    },

    {
      time: '13:00',
      available: false,
      period: 'tarde'
    },

    {
      time: '14:00',
      available: true,
      period: 'tarde'
    },

    {
      time: '14:30',
      available: true,
      period: 'tarde'
    },

    {
      time: '15:00',
      available: true,
      period: 'tarde'
    },

    {
      time: '15:30',
      available: false,
      period: 'tarde'
    },

    {
      time: '16:00',
      available: true,
      period: 'tarde'
    },


    // Noche
    {
      time: '17:00',
      available: true,
      period: 'noche'
    },

    {
      time: '17:30',
      available: false,
      period: 'noche'
    },

    {
      time: '18:00',
      available: true,
      period: 'noche'
    },

    {
      time: '18:30',
      available: true,
      period: 'noche'
    },

    {
      time: '19:00',
      available: true,
      period: 'noche'
    },

    {
      time: '19:30',
      available: false,
      period: 'noche'
    }

  ];


  // ── Constructor ───────────────────────────────────────────────────────────

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private haptics: HapticsService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {

    addIcons({

      chevronBackOutline,

      checkmarkCircle,

      timeOutline,

      personOutline,

      calendarOutline,

      chevronForwardOutline,

      sparklesOutline,

      cutOutline,

      handLeftOutline,

      colorPaletteOutline,

      ribbonOutline,

      leafOutline,

      starOutline,

    });

  }


  // ── Inicialización ────────────────────────────────────────────────────────

  ngOnInit(): void {

    this.buildCalendar();

  }


  // ── Calendario ────────────────────────────────────────────────────────────

  buildCalendar(): void {

    const days = [
      'Dom',
      'Lun',
      'Mar',
      'Mié',
      'Jue',
      'Vie',
      'Sáb'
    ];


    const months = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ];


    const today = new Date();


    this.calendarDays = Array.from(
      { length: 14 },
      (_, i) => {

        const d = new Date(today);

        d.setDate(today.getDate() + i);


        const isSunday = d.getDay() === 0;


        return {

          date: d.toISOString().split('T')[0],

          label:
            `${d.getDate()} ${months[d.getMonth()]}`,

          day:
            days[d.getDay()],

          available:
            !isSunday,

        };

      }
    );

  }


  // ── Getters / filtros ─────────────────────────────────────────────────────

  get filteredServices(): Service[] {

    return this.services.filter(
      service =>
        service.category === this.activeCategory
    );

  }


  get filteredTimeSlots(): TimeSlot[] {

    if (this.activePeriod === 'todos') {

      return this.timeSlots;

    }


    return this.timeSlots.filter(
      slot =>
        slot.period === this.activePeriod
    );

  }


  get filteredSpecialists(): Specialist[] {

    if (!this.selectedService) {

      return this.specialists;

    }


    return this.specialists.filter(
      specialist =>
        specialist.specialties.includes(
          this.selectedService!.id
        )
    );

  }


  get filteredStations(): WorkStation[] {

    if (!this.selectedService) {

      return this.workStations;

    }


    let stations =
      this.workStations.filter(
        station =>
          station.type ===
          this.selectedService!.stationType
      );


    /*
     * Si ya seleccionamos especialista,
     * mostramos solamente las estaciones
     * pertenecientes a ese especialista.
     */

    if (this.selectedSpecialist) {

      stations =
        stations.filter(
          station =>
            station.specialist ===
            this.selectedSpecialist!.id
        );

    }


    return stations;

  }


  get canAdvance(): boolean {

    switch (this.currentStep) {

      case 1:

        return !!this.selectedService;


      case 2:

        return (
          !!this.selectedDate &&
          !!this.selectedTimeSlot
        );


      case 3:

        return (
          !!this.selectedSpecialist &&
          !!this.selectedStation
        );


      case 4:

        return true;


      default:

        return false;

    }

  }


  get progressPercent(): number {

    return (
      (this.currentStep - 1) /
      (this.totalSteps - 1)
    ) * 100;

  }


  // ── Selecciones ───────────────────────────────────────────────────────────

  selectService(service: Service): void {

    this.selectedService = service;


    /*
     * Al cambiar de servicio,
     * se reinician las selecciones dependientes.
     */

    this.selectedSpecialist = null;

    this.selectedStation = null;


    this.haptics.light();

  }


  selectDate(
    day: {
      date: string;
      available: boolean;
    }
  ): void {

    if (!day.available) {

      return;

    }


    this.selectedDate = day.date;


    /*
     * Al cambiar de fecha,
     * la hora anterior deja de ser válida.
     */

    this.selectedTimeSlot = null;


    this.haptics.light();

  }


  selectTimeSlot(slot: TimeSlot): void {

    if (!slot.available) {

      return;

    }


    this.selectedTimeSlot = slot;


    this.haptics.light();

  }


  selectSpecialist(
    specialist: Specialist
  ): void {

    if (!specialist.available) {

      return;

    }


    this.selectedSpecialist =
      specialist;


    /*
     * Limpiamos estación anterior
     * antes de buscar la nueva.
     */

    this.selectedStation = null;


    /*
     * Autoasignar la primera estación
     * libre perteneciente al especialista.
     */

    const autoStation =
      this.filteredStations.find(
        station =>
          station.available &&
          station.specialist ===
            specialist.id
      );


    if (autoStation) {

      this.selectedStation =
        autoStation;

    }


    this.haptics.light();

  }


  selectStation(
    station: WorkStation
  ): void {

    if (!station.available) {

      return;

    }


    /*
     * Seguridad adicional:
     * la estación debe pertenecer
     * al especialista seleccionado.
     */

    if (
      this.selectedSpecialist &&
      station.specialist !==
        this.selectedSpecialist.id
    ) {

      return;

    }


    this.selectedStation = station;


    this.haptics.medium();

  }


  // ── Navegación wizard ─────────────────────────────────────────────────────

  nextStep(): void {

    if (!this.canAdvance) {

      return;

    }


    if (
      this.currentStep <
      this.totalSteps
    ) {

      this.currentStep++;

      this.haptics.medium();

    }

  }


  prevStep(): void {

    if (this.currentStep > 1) {

      this.currentStep--;

      this.haptics.light();

    } else {

      this.router.navigate(
        ['/home']
      );

    }

  }


  goToStep(step: number): void {

    /*
     * Solamente permitimos regresar
     * a pasos anteriores que estén
     * realmente completados.
     */

    if (
      step < this.currentStep &&
      this.isStepCompleted(step)
    ) {

      this.currentStep = step;

      this.haptics.light();

    }

  }


  // ── Confirmación ──────────────────────────────────────────────────────────

  async confirmBooking(): Promise<void> {

    if (this.isSubmitting) {

      return;

    }


    /*
     * Protección adicional para evitar
     * confirmar una cita incompleta.
     */

    if (
      !this.selectedService ||
      !this.selectedDate ||
      !this.selectedTimeSlot ||
      !this.selectedSpecialist ||
      !this.selectedStation
    ) {

      return;

    }


    this.isSubmitting = true;


    this.haptics.heavy();


    const booking:
      Omit<Booking, 'id' | 'createdAt'> = {

      serviceId:
        this.selectedService.id,

      serviceName:
        this.selectedService.name,

      date:
        this.selectedDate,

      time:
        this.selectedTimeSlot.time,

      specialistId:
        this.selectedSpecialist.id,

      specialistName:
        this.selectedSpecialist.name,

      stationId:
        this.selectedStation.id,

      stationLabel:
        this.selectedStation.label,

      stationType:
        this.selectedStation.type,

      price:
        this.selectedService.price,

      status:
        'confirmed',

    };


    try {

      await this.bookingService.createBooking(
        booking
      );


      const toast =
        await this.toastCtrl.create({

          message:
            '¡Tu cita ha sido agendada con éxito! 🎉',

          duration:
            3000,

          position:
            'top',

          color:
            'success',

          cssClass:
            'vb-toast',

        });


      await toast.present();


      /*
       * Navegar al monitor de turno.
       */

      await this.router.navigate(
        ['/queue'],
        {
          queryParams: {
            fromBooking: true
          }
        }
      );


    } catch (err) {

      console.error(
        'Error al crear la reserva:',
        err
      );


      const alert =
        await this.alertCtrl.create({

          header:
            'Error al agendar',

          message:
            'Ocurrió un problema al guardar tu cita. Por favor intenta de nuevo.',

          buttons:
            ['Entendido'],

          cssClass:
            'vb-alert',

        });


      await alert.present();


    } finally {

      this.isSubmitting = false;

    }

  }


  // ── Helpers de UI ─────────────────────────────────────────────────────────

  formatPrice(price: number): string {

    return new Intl.NumberFormat(
      'es-CO',
      {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
      }
    ).format(price);

  }


  formatDate(dateStr: string): string {

    const d =
      new Date(
        dateStr + 'T12:00:00'
      );


    return d.toLocaleDateString(
      'es-CO',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    );

  }


  formatDuration(
    minutes: number
  ): string {

    if (minutes < 60) {

      return `${minutes} min`;

    }


    const h =
      Math.floor(minutes / 60);


    const m =
      minutes % 60;


    return m
      ? `${h}h ${m}min`
      : `${h}h`;

  }


  getStationIcon(
    type: 'sillon' | 'mesa'
  ): string {

    return type === 'sillon'
      ? '💈'
      : '💅';

  }


  getStepLabel(
    step: number
  ): string {

    const labels:
      Record<number, string> = {

      1: 'Servicio',

      2: 'Fecha y Hora',

      3: 'Especialista',

      4: 'Confirmar',

    };


    return labels[step] ?? '';

  }


  isStepCompleted(
    step: number
  ): boolean {

    switch (step) {

      case 1:

        return !!this.selectedService;


      case 2:

        return (
          !!this.selectedDate &&
          !!this.selectedTimeSlot
        );


      case 3:

        return (
          !!this.selectedSpecialist &&
          !!this.selectedStation
        );


      default:

        return false;

    }

  }


  trackById(
    _: number,
    item: { id: string }
  ): string {

    return item.id;

  }

}