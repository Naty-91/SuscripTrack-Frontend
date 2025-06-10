import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  editUserForm!: FormGroup;
  userId!: number;

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.loadUser(); // sin ID de ruta
  }

  loadUser(): void {
    // ⚠️ Carga de usuario sin ID → sustituye este 1 por el ID que tengas fijo o almacenado en sesión/token
    const id = 1; 
    this.userId = id;

    this.userService.getUserById(id).subscribe({
      next: (user: User) => {
        this.editUserForm.patchValue({
          username: user.username,
          name: user.name
        });
      },
      error: (err) => {
        alert('No se pudo cargar el usuario');
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.editUserForm.valid) {
      const formValue = this.editUserForm.value;
      console.log('📤 Enviando actualización:', formValue);

      this.userService.updateUser(this.userId, formValue).subscribe({
        next: () => {
          alert('Usuario actualizado correctamente');
          this.router.navigate(['/admin/user-mng']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar el usuario');
        }
      });
    }
  }

  get username() {
    return this.editUserForm.get('username')!;
  }

  get name() {
    return this.editUserForm.get('name')!;
  }

  get password() {
    return this.editUserForm.get('password')!;
  }

  onClickGuardar(): void {
    console.log('🖱️ Click en Guardar');
    this.onSubmit();
  }
}
