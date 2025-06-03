import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserSidebarComponent } from '../../../layout/sidebar-user/sidebar-user.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, UserSidebarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: FormGroup;
  estaEditando = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      tipoPago: ['', Validators.required]
    }, { validators: this.passwordsIguales });

    // Desactiva el formulario al iniciar
    this.profileForm.disable();
  }

  toggleEdicion() {
    this.estaEditando = !this.estaEditando;
    if (this.estaEditando) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }

  passwordsIguales(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { notMatching: true };
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Formulario enviado:', this.profileForm.value);
      this.profileForm.markAsPristine();
      this.toggleEdicion();
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
