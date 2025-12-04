import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-site-component',
  imports: [RouterModule],
  templateUrl: './header-site-component.html',
  styleUrl: './header-site-component.css',
})
export class HeaderSiteComponent {

  isMenuOpen: boolean = false;

}
