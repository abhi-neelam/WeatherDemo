import { Component, OnInit } from '@angular/core';
import { PopulationData } from './population-data';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-country-population',
    imports: [RouterLink],
    templateUrl: './country-population.html',
    styleUrl: './country-population.scss'
})

export class CountryPopulation implements OnInit {
    countrypopulation!: PopulationData;

    constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {
        let idparam = this.activatedRoute.snapshot.paramMap.get('id');
        this.http.get<PopulationData>(`${environment.apiUrl}/api/Countries/population/${idparam}`).subscribe(result => {
            this.countrypopulation = result;
        });
    }
}