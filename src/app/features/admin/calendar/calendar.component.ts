import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../../../layout/sidebar-admin/sidebar-admin.component';

interface CalendarDay {
  date: Date;
  currentMonth: boolean;
  today: boolean;
  events: string[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentYear!: number;
  currentMonth!: number;
  calendar: CalendarDay[][] = [];
  weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  ngOnInit(): void {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  generateCalendar(year: number, month: number): void {
    const firstDay = new Date(year, month, 1);
    const startDay = (firstDay.getDay() + 6) % 7; // lunes = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const today = new Date();

    const calendar: CalendarDay[][] = [];
    let week: CalendarDay[] = [];

    // Días del mes anterior
    for (let i = 0; i < startDay; i++) {
      week.push({
        date: new Date(year, month - 1, prevMonthDays - startDay + i + 1),
        currentMonth: false,
        today: false,
        events: []
      });
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      week.push({
        date,
        currentMonth: true,
        today: this.isSameDate(date, today),
        events: []
      });

      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    // Días del mes siguiente
    let nextDay = 1;
    while (week.length < 7) {
      week.push({
        date: new Date(year, month + 1, nextDay++),
        currentMonth: false,
        today: false,
        events: []
      });
    }
    calendar.push(week);

    this.calendar = calendar;
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  private isSameDate(d1: Date, d2: Date): boolean {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  }

  addEventToDay(day: CalendarDay): void {
    const newEvent = prompt(`Escribe un evento para el ${day.date.toLocaleDateString()}`);
    if (newEvent) {
      day.events.push(newEvent);
    }
  }

  removeEventFromDay(day: CalendarDay, event: string): void {
    const confirmDelete = confirm(`¿Eliminar el evento: "${event}"?`);
    if (confirmDelete) {
      day.events = day.events.filter(e => e !== event);
    }
  }
}
