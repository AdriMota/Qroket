import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject, Observable, from } from "rxjs";
import { delayWhen, map } from "rxjs/operators";
import { AuthResponse } from "../models/auth-response";
import { User } from "../models/user";
import { AuthRequest } from "../models/auth-request";
import { Storage } from "@ionic/storage";
import { environment } from "../../environments/environment";

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: "root" })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient, private storage: Storage) {
    this.#auth$ = new ReplaySubject(1);
    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.#auth$.next(auth);
    });
  }

  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  getUser$(): Observable<User> {
    return this.#auth$.pipe(map((auth) => auth?.user));
  }

  getToken$(): Observable<string> {
    return this.#auth$.pipe(map((auth) => auth?.token));
  }

  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${environment.apiUrl}auth`;
    console.log(authUrl)
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      // Delay the observable stream while persisting the authentication response.
      delayWhen((auth) => this.saveAuth$(auth)),
      map((auth) => {
        console.log(auth.user.firstname);
        this.#auth$.next(auth);
        console.log(`User ${auth.user.firstname} logged in`);
        return auth.user;
      })
    );
  }

  logOut() {
    this.#auth$.next(null);
    // Remove the stored authentication from storage when logging out.
    this.storage.remove('auth');
    console.log("User logged out");
  }

  private saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set('auth', auth));
    return from(this.storage.set('userId', auth.userId));
  }

}