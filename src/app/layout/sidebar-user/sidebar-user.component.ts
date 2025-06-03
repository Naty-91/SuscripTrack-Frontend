import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: '../sidebar-user/sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.scss']
})
export class UserSidebarComponent {}
