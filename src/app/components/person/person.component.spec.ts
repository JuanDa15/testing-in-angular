import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //lifecycle
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a name juan david', () => {
    component.person = new Person('Juan David','Osorio', 21, 70, 1.80);
    const input = component.person;
    expect(input.name).toEqual('Juan David');
  })

  it('should have a <p> with text Im a paragraph', () => {
    // Arrange
    component.person = new Person('Juan David','Osorio', 21, 70, 1.80);
    const expectMsg = `My height is ${component.person.height}, and my weight is ${component.person.weight}`
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const personElement:HTMLElement = pDebug.nativeElement;

    // Act
    fixture.detectChanges();
    // Assert
    expect(personElement?.textContent).toEqual(expectMsg);
  });
  it('should have a <h3> with text Hola, Person', () => {
    // Arrange
    component.person = new Person('Juan David','Osorio', 21, 70, 1.80);
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element:HTMLElement = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3Element?.textContent).toContain(component.person.name);
  });

  it('should execute the IMC method when do click', () => {
    // Arrange
    const expectedAnswer = 'overweight level 3';
    component.person = new Person('Juana','Osorio', 21, 120, 1.65);
    const buttonDebug = fixture.debugElement.query(By.css('button#calcIMC'));
    const buttonElement: HTMLButtonElement = buttonDebug.nativeElement;
    // Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(buttonElement.textContent).toContain(expectedAnswer);
  });

  it('should emit a Person in the selected event', () => {
    // Arrange
    component.person = new Person('Juan David','Osorio', 21, 70, 1.80);
    const debugButton = fixture.debugElement.query(By.css('button#emitterBtn'));
    let selectedPerson: Person | undefined;
    // Act
    debugButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    component.onSelected.subscribe(value => {
      selectedPerson = value;
      expect(selectedPerson).toEqual(component.person);
    });

  });
});

@Component({
  template: `
    <app-person [person]="person" (onSelected)="testMethod($event)"></app-person>
  `
})
class HostComponent {
  person = new Person('Juan David','Osorio', 21, 70, 1.50);
  selectedPerson: Person | undefined;

  testMethod(e: Person) {
    this.selectedPerson = e;
  }
}
describe('Person component from host component', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //lifecycle
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a person name', () => {
    // Arrange
    const expectedName = 'Juan David';
    const personDebug = fixture.debugElement.query(By.css('app-person h3'));
    const personElement = personDebug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(personElement?.textContent).toContain(expectedName);
  });
  it('should return a selectedperson', () => {
    // Arrange
    const expectedPerson = component.person;
    const personDebug = fixture.debugElement.query(By.css('app-person'));
    const fireEventBtn = personDebug.query(By.css('#emitterBtn'));
    // Act
    fireEventBtn.triggerEventHandler('click',null);
    fixture.detectChanges();
    // Assert
    expect(component.selectedPerson).toEqual(expectedPerson);
  })
});
