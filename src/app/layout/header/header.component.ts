import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private subscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private eRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn().subscribe(logged => {
      this.isLoggedIn = logged;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    const toggle = document.querySelector('.navbar-toggler') as HTMLElement;
    const menu = document.getElementById('navbarResponsive');

    if (
      menu?.classList.contains('show') &&
      !this.eRef.nativeElement.contains(event.target) &&
      !(toggle && toggle.contains(event.target as Node))
    ) {
      toggle.click(); // Simula el clic para cerrar el menú
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
