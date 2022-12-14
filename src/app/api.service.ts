import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
	// PHP_API_SERVER = "http://127.0.0.1:8080"; /// DEBUG
	constructor(private httpClient: HttpClient) {}

	read(): Observable<any[]>{
		return this.httpClient.get<any[]>(`./backend/read.php`);
	}

	create(data: any): Observable<any> {
		return this.httpClient.post(`./backend/create.php`, JSON.stringify(data));
	}
}
