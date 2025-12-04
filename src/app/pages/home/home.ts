import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header-component/header-component';
import { FooterComponent } from '../../components/footer-component/footer-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
