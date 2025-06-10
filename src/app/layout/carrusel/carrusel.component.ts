import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss'],
  imports: [CommonModule],
})
export class CarruselComponent implements AfterViewInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

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

  ngAfterViewInit() {
    // Duplicar contenido para simular bucle
    this.subscriptions = [...this.subscriptions, ...this.subscriptions];
    this.startAutoScroll();
  }

  startAutoScroll() {
    const container = this.scrollContainer.nativeElement;
    const scrollSpeed = 1;
    const interval = 20;

    setInterval(() => {
      container.scrollLeft += scrollSpeed;
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    }, interval);
  }
}
