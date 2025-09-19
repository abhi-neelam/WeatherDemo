import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Weather } from './weather/weather';
import { City } from './city/city';
import { Country } from './country/country';

export const routes: Routes = [
    { path: '',component:Home, pathMatch: 'full' },
    { path: 'weather',component:Weather },
    { path: 'city',component:City },
    { path: 'country',component:Country }
];
