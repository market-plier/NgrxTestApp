import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private route: ActivatedRoute, private router: Router) {
  }


  title = 'OrdersApp';
  links = [
    { title: 'Orders', fragment: 'orders' },
    { title: 'Products', fragment: 'products' },
    { title: 'Customers', fragment: 'customers' }
  ];
  activeId: string;

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(async (route) => route.snapshot.url[0].path)
    ).subscribe(data =>
     this.activeId = data
    );
  }
}
