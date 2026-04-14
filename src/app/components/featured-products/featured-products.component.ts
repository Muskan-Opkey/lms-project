import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
}

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent {
  featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Premium Java Course',
      description: 'Master Java with hands-on projects and expert mentorship.',
      image: 'https://via.placeholder.com/400x250/ffb347/ffffff?text=Java+Course',
      price: '$99'
    },
    {
      id: 2,
      name: 'Python Data Science Bootcamp',
      description: 'Become a data scientist with our intensive Python bootcamp.',
      image: 'https://via.placeholder.com/400x250/87ceeb/ffffff?text=Python+Bootcamp',
      price: '$129'
    },
    {
      id: 3,
      name: 'Fullstack Web Dev Bundle',
      description: 'Learn HTML, CSS, JS, Angular, and React in one bundle.',
      image: 'https://via.placeholder.com/400x250/ffa07a/ffffff?text=Fullstack+Bundle',
      price: '$149'
    }
  ];
}
