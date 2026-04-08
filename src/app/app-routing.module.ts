import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ContactComponent } from './components/contact/contact.component';
import { EResourcesComponent } from './components/e-resources/e-resources.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SignupComponent } from './components/user-management/signup/signup.component';
import { DashboardComponent } from './components/user-management/dashboard/dashboard.component';

// Define application routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'e-resources', component: EResourcesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'user-management/signup', component: SignupComponent },
  { path: 'user-management/dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '' } // Redirect unknown routes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
