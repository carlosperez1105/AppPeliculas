import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type' : 'application/json'})
};

const apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=623e6cd0ba5e2748523ec84090083063&language=en-US&page=1'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error ('Error ocurrido: ', error.error.message);
    }
    else {
      console.error ( 'Error');
    }
    return throwError ('Algo ha ocurrido, por favor vuelve a ejecutar luego');


  }

  private obtenerDatos (res: Response) {
    let body = res;
    return body || { };
  }

  DatosPelicula(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.obtenerDatos),
      catchError(this.handleError)
    );
  }
}
