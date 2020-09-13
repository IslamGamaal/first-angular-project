﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    //restful convention

    getAll(): Observable<User[]>{
        return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/api/user/` + id);
    }

    getAuthenticatedUser(): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/api/auth`);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }
}