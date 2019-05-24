import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../login-basic/user';
import { AdminService } from '../admin.service';
import { Admin } from '../admin';

@Component({
  selector: 'app-player-create',
  templateUrl: '../user-form/user-form.component.html'
})
export class AdminCreateComponent implements OnInit {
  public user: User;

  constructor(private router: Router,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.user = new Admin();
  }

  onSubmit(): void {
    this.adminService.create(this.user).subscribe(
      (admin: Admin) => this.router.navigate([admin.uri]));
  }
}
