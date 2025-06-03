import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss'],
  imports: [CommonModule]
})
export class CarruselComponent implements AfterViewInit {
  // 🔍 Referencia al contenedor del carrusel en el HTML para manipular el scroll
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  // 📦 Lista de suscripciones (puedes agregar más aquí)
  subscriptions = [
    { name: 'Spotify', image: 'images/spotify.jpg' },
    { name: 'Amazon Prime', image: 'images/amazon.png' },
    { name: 'Netflix', image: 'images/netflix.png' },
    { name: 'Disney+', image: 'images/disney.png' },
    { name: 'Apple Music', image: 'images/apple.png' },
    { name: 'Youtube Premium', image: 'images/youtube.png' },
    { name: 'Movistar Plus', image: 'images/movistar.png' },
    { name: 'El Mundo', image: 'images/mundo.png' },
    { name: 'Kindle Unlimited', image: 'images/kindle.png' },
    { name: 'NordVPN', image: 'images/nord.png' },
    { name: 'MalwareBytes', image: 'images/mal.png' },
    { name: 'Birchbox', image: 'images/birchbox.jpg' },
  ];

  // 🚀 Hook que se ejecuta después de que la vista está inicializada
  ngAfterViewInit() {
    this.startAutoScroll();
  }

  // ⏩ Lógica de scroll automático horizontal
  startAutoScroll() {
    const container = this.scrollContainer.nativeElement;
    const scrollSpeed = 1; // velocidad en píxeles
    const interval = 30;   // intervalo en ms

    setInterval(() => {
      container.scrollLeft += scrollSpeed;

      // 🔁 Si llega al final, vuelve al inicio
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0;
      }
    }, interval);
  }
}
