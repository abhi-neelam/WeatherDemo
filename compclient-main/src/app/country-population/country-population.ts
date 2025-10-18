import { Component } from '@angular/core';
import { PopulationData } from './population-data';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-country-population',
    imports: [],
    templateUrl: './country-population.html',
    styleUrl: './country-population.scss'
})
export class CountryPopulation {
    country!: PopulationData;

    constructor(http: HttpClient) {
        http.get<PopulationData>(environment.apiUrl + "/api/Countries/population").subscribe(result => {
            this.country = result;
        });
    }
}