import { Component } from '@angular/core';
import { UserSidebarComponent } from '../../layout/sidebar-user/sidebar-user.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ FooterComponent,
    UserSidebarComponent,RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
