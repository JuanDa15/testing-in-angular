import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ReversePipe } from './reverse.pipe';


@Component({
  template: `
    <input id="input-text" type="text" [formControl]="stringToReverse">
    <p id="renderedText">{{ stringToReverse.value | reverse}}</p>
  `
})
class HostComponent {
  stringToReverse = new FormControl('');
}


fdescribe('ReversePipe', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        ReversePipe
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //lifecycle
  });

  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return a reverse string', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform('123456')).toEqual('654321');
  });
  it('should render a reverse string', () => {

    const inputDebug = fixture.debugElement.query(By.css('#input-text'));
    const inputElement = <HTMLInputElement>inputDebug.nativeElement;
    const pDebug = fixture.debugElement.query(By.css('#renderedText'));
    const pElement = <HTMLParagraphElement>pDebug.nativeElement;
    inputElement.value = 'AMOR';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(pElement.textContent).toContain('ROMA');
  });
});
