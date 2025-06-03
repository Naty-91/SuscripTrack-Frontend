import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CarruselComponent } from '../carrusel/carrusel.component';
@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CarruselComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

}