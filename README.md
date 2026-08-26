# Integrantes del proyecto 
# Diego Garzon 
# Cristian Camacho
# Edison Garzon 



# Velvet & Blade - Plataforma Móvil de Gestión de Turnos y Experiencia del Cliente

> **Aplicación Móvil Híbrida** desarrollada para **Velvet & Blade**, un centro premium de imagen personal que combina la excelencia de la **Barbería de Autor** con el cuidado exclusivo de un **Spa de Uñas Premium**.

---

## Propósito del Proyecto

Debido al alto flujo de usuarios en nuestras instalaciones, el objetivo de esta aplicación es resolver la saturación en la recepción mediante la digitalización y organización en tiempo real de los turnos de trabajo por estación (**sillones de barbería** y **mesas de manicura/pedicura**).

La plataforma permite:
* **Eliminar cuellos de botella en recepción:** Gestión de turnos y flujos ágiles.
* **Organización por Estación de Trabajo:** Asignación inteligente según el tipo de servicio (Cortes de precisión, perfilado de barba, tratamientos faciales, manicura rusa, pedicura spa y esmaltado permanente).
* **Experiencia de Usuario Premium:** Interfaz elegante, intuitiva, clara e integraciones nativas mediante Capacitor.

---

## Tecnologías Utilizadas

* **Framework Móvil:** con Angular / JavaScript / TypeScript
* **Runtime Nativo:** (Gestión de plugins nativos como Haptics y Notificaciones Locales
* **Estilos y Maquetación:** HTML5, CSS3 / SCSS, Ionic UI Components (Diseño responsivo y adaptativo)
* **Control de Versiones:** Git & GitHub

---

## Identidad Visual y Paleta de Colores

La aplicación refleja la sofisticación y distinción de la marca Velvet & Blade:

| Tono | Código Hex | Uso |
| :--- | :--- | :--- |
| **Negro Azabache** | `#1B1B1B` | Color primario, elegancia y fondo de componentes clave |
| **Dorado Muted** | `#C5A059` | Acentos, estado de turnos y tarjetas destacadas |
| **Terracota Velvet**| `#8A3A2D` | Botones de acción, alertas y badges de estado |
| **Blanco Marfil** | `#FDFBF7` | Fondo general suave y limpio |

---

## Estructura de Pantallas y Funcionalidades

1. **Dashboard Principal (`/home`):**
   * Catálogo interactivo de experiencias (*Barbería de Autor* vs *Spa de Uñas*).
   * Indicadores de disponibilidad de estaciones en tiempo real.

2. **Flujo de Agendamiento (`/booking`):**
   * Selección de servicio, fecha, hora y especialista preferido.
   * Asignación de puesto de trabajo (Sillón / Mesa).

3. **Monitor de Turnos en Tiempo Real (`/queue`):**
   * Visualización del número de turno y tiempo estimado de espera.
   * Feedback háptico y notificaciones nativas al ser llamado a la estación.

4. **Panel de Recepción / Administración (`/reception`):**
   * Gestión operativa para el personal de recepción.
   * Control de llamado y liberación de estaciones.

---

## Guía de Instalación y Ejecución Local

### Prerrequisitos
* Node.js (v18 o superior)
* npm o yarn
* Ionic CLI (`npm install -g @ionic/cli`)

### Pasos para ejecutar

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/DS1216/velvet-y-blade-.git](https://github.com/DS1216/velvet-y-blade-.git)
   cd velvet-y-blade-
