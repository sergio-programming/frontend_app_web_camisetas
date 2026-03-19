import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header-component/header-component';

@Component({
  selector: 'app-home-site-layout',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './home-site-layout.html',
  styleUrl: './home-site-layout.css',
})
export class HomeSiteLayout {

}
