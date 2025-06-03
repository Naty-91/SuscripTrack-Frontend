import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [   FooterComponent,
    ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
