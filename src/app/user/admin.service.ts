import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../login-basic/user';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) {
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  // GET /admins
  getAll(): Observable<User[]> {
    return this.http.get(`${environment.API}/admins`).pipe(
      map((res: any) => res._embedded.admins)
    );
  }

  // GET /admins/{id}
  get(id: string): Observable<User> {
    return this.http.get<User>(`${environment.API}/admins/${id}`);
  }

  // POST /admins
  create(admin: User): Observable<User> {
    const body = JSON.stringify(admin);
    return this.http.post<User>(`${environment.API}/admins`, body, this.getHttpOptions());
  }

  // PUT /admins/{id}
  update(admin: User): Observable<User> {
    const adminNoAuthorities = admin;
    adminNoAuthorities.authorities = [];
    const body = JSON.stringify(adminNoAuthorities);
    return this.http.put<User>(`${environment.API}${admin.uri}`, body, this.getHttpOptions());
  }

  // DELETE /admins/{id}
  delete(admin: User): Observable<Response> {
    return this.http.delete<Response>(`${environment.API}${admin.uri}`);
  }

  // GET /admins/search/findByUsernameContaining?text={text}
  findByUsernameContaining(text: string): Observable<User[]> {
    return this.http.get(`${environment.API}/admins/search/findByUsernameContaining?text=${text}`).pipe(
      map((res: any) => res._embedded.admins)
    );
  }
}
