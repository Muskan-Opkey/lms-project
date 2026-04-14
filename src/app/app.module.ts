import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { EResourcesComponent } from './components/e-resources/e-resources.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SignupComponent } from './components/user-management/signup/signup.component';
import { DashboardComponent } from './components/user-management/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CoursesComponent,
    ContactComponent,
    FooterComponent,
    EResourcesComponent,
    GalleryComponent,
    RegistrationComponent,
    SignupComponent,
    DashboardComponent,
    FeaturedProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
