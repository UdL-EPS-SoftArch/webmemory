import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { User } from '../../login-basic/user';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html'
})
export class AdminDeleteComponent implements OnInit {
  public user: User = new User();
  private id: string;
  private type: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.adminService.get(this.id).subscribe(
      admin => this.user = admin);
  }

  delete() {
    this.adminService.delete(this.user).subscribe(
      () => this.router.navigate(['users']));
  }
}
