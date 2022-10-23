import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';
import { PersonComponent } from '../person/person.component';

import { PeopleComponent } from './people.component';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of persons', () => {
    // Arrange
    const peopleList: Person[] = [
      new Person('Ramiro','Lopez',42, 85, 1.78),
      new Person('Pedro','Ramirez',12, 70, 1.80),
      new Person('Jhonatan','Perea',32, 92, 1.92),
      new Person('Daniela','Jaramillo',27, 70, 1.75),
      new Person('Camila','Ossa',22, 60, 1.60),
      new Person('Carlos','Molina',24, 85, 1.70),
    ];

    component.people = peopleList;
    // Act
    fixture.detectChanges();
    const personListDebug = fixture.debugElement.queryAll(By.css('app-person'));
    // Assert
    expect(personListDebug.length).toEqual(peopleList.length);
    // Assert
  })

  it('should display the selected person html', () => {
    // Arrange
    const peopleList: Person[] = [
      new Person('Ramiro','Lopez',42, 85, 1.78),
      new Person('Pedro','Ramirez',12, 70, 1.80),
      new Person('Jhonatan','Perea',32, 92, 1.92),
      new Person('Daniela','Jaramillo',27, 70, 1.75),
      new Person('Camila','Ossa',22, 60, 1.60),
      new Person('Carlos','Molina',24, 85, 1.70),
    ];
    component.people = peopleList;
    // Act
    fixture.detectChanges();
    const personsList = fixture.debugElement.queryAll(By.css('app-person'));
    const selectedPersonDebug = personsList[0];
    const selectedPersonDebugBtn = selectedPersonDebug.query(By.css('#emitterBtn'));
    selectedPersonDebugBtn.triggerEventHandler('click', null);
    fixture.detectChanges();

    const selectedPersonContainer = fixture.debugElement.query(By.css('#selected-person-container'));
    const selectedPersonNameDebug = selectedPersonContainer.query(By.css('#selected-name'));
    const selectedPersonNameElement = selectedPersonNameDebug.nativeElement;
    // Assert
    expect(selectedPersonContainer).toBeTruthy();
    expect(component.selected).toEqual(selectedPersonDebug.componentInstance.person);
    expect(selectedPersonNameElement.textContent).toContain((<Person>selectedPersonDebug.componentInstance.person).name);
    expect(selectedPersonNameElement.textContent).toContain((<Person>selectedPersonDebug.componentInstance.person).lastName);
  })
});
