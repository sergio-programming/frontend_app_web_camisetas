import { Component } from '@angular/core';
import { HeaderSiteComponent } from '../../components/header-site-component/header-site-component';
import { FooterSiteComponent } from '../../components/footer-site-component/footer-site-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-site',
  imports: [HeaderSiteComponent, FooterSiteComponent, RouterOutlet],
  templateUrl: './home-site.html',
  styleUrl: './home-site.css',
})
export class HomeSite {

}
