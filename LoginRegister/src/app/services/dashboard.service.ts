import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  //Get
  getDashboard() {
    return this.http.get<any>('http://localhost:3000/posts').pipe(
      map((response) => {
        return response;
      })
    );
  }

  //Post bu şekilde 500 Hatası veriyor.
  // getPostDashboard(data: any) {
  //   return this.http.post<any>('http://localhost:3000/posts', data).pipe(
  //     map((response) => {
  //       return response;
  //     })
  //   );
  // }

  //Post
  getPostDashboard(data: any) {
    return this.http.post<any>('http://localhost:3000/posts', data);
  }

  //Put
  getUpdateDashboard(data: any, id: number) {
    return this.http
      .put<any>('http://localhost:3000/posts' + '/' + id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  //Delete
  getDeleteDashboard(id: number) {
    return this.http.delete<any>('http://localhost:3000/posts' + '/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
