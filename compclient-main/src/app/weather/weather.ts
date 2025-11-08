import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { WeatherData } from '../weather-data';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-weather',
    imports: [AsyncPipe],
    templateUrl: './weather.html',
    styleUrl: './weather.scss'
})
export class Weather {
    forecasts$: Observable<WeatherData[]>;

    constructor(private http: HttpClient) {
        this.forecasts$ = http.get<WeatherData[]>(environment.apiUrl + "/WeatherForecast");
    }
}