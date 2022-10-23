import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  public selected: Person | undefined;
  public people: Person[] = [
    new Person('Ramiro','Lopez',42, 85, 1.78),
    new Person('Pedro','Ramirez',12, 70, 1.80),
    new Person('Jhonatan','Perea',32, 92, 1.92),
    new Person('Daniela','Jaramillo',27, 70, 1.75),
    new Person('Camila','Ossa',22, 60, 1.60),
    new Person('Carlos','Molina',24, 85, 1.70),
  ];

  constructor() {
    this.selected = undefined;
  }

  ngOnInit(): void {
  }

  public seledtedPerson(person: Person): void {
    this.selected = person;
  }
}
