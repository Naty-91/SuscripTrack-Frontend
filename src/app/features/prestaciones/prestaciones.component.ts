import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ FooterComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

}
