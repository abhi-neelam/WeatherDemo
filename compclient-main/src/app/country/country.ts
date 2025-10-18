import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CountryData } from './country-data';
import { environment } from '../../environments/environment.development';

@Component({
    selector: 'app-country',
    imports: [],
    templateUrl: './country.html',
    styleUrl: './country.scss'
})

export class Country {
    countries: CountryData[] = [];

    constructor(http: HttpClient) {
        http.get<CountryData[]>(environment.apiUrl + "/api/countries").subscribe(result => {
            this.countries = result;
        });
    }
}