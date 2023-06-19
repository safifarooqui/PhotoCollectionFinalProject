import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from './photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  apiUrl = 'http://localhost:3000/api/photos';

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl);
  }

  getPhoto(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${this.apiUrl}/${id}`);
  }

  createPhoto(photo: Photo): Observable<Photo> {
    return this.http.post<Photo>(this.apiUrl, photo);
  }

  updatePhoto(id: string, photo: Photo): Observable<Photo> {
    return this.http.put<Photo>(`${this.apiUrl}/${id}`, photo);
  }

  deletePhoto(id: string): Observable<Photo> {
    return this.http.delete<Photo>(`${this.apiUrl}/${id}`);
  }
}
