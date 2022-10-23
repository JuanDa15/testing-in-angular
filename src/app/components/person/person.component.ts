import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  public imc = '';
  @Input() person: Person = new Person('','',0,0,0);
  @Output() onSelected = new EventEmitter<Person>();
  constructor() { }

  ngOnInit(): void {
  }

  calcIMC() {
    this.imc = this.person.calcIMC();
  }

  emitPerson( ){
    this.onSelected.emit(this.person);
  }
}
