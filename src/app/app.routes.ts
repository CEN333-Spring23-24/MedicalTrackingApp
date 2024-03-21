import { Routes } from '@angular/router';
import { Feature1Component } from './features/feature1/feature1.component';
import { DetailsComponent } from './features/details/details.component';

export const routes: Routes = [
    {path:'', component:Feature1Component},
    {path:'feature1', component:Feature1Component},
    {path:'details', component:DetailsComponent},
];
