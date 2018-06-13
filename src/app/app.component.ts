import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  showAll = true;
  searchTag = ['Koahsiung', 'Taipei', 'Learning'];

  categoriesTag = [
    { name: 'All', checked: '' },
    { name: 'Entertainment', checked: '' },
    { name: 'Food', checked: '' },
    { name: 'Learning', checked: '' },
    { name: 'Outdoors', checked: '' },
  ];
  data = [1, 2, 3];
}
