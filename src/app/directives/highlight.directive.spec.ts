import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `
    <p id="default-color" highlight>Text</p>
    <p id="personalized-color" [highlight]="selectedColor.value">Text</p>
    <input id="color-input" type="color"  [formControl]="selectedColor">
  `
})
class HostComponent {
  selectedColor = new FormControl('');
}

describe('HighlightDirective test', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        HighlightDirective
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have to highlight elements', () => {
    // const highlightElements = fixture.debugElement.queryAll(By.css('*[highlight]'));
    const highlightElements2 = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    // expect(highlightElements.length + 1).toEqual(2);
    expect(highlightElements2.length).toEqual(2);
  });
  it('should highlight with the default color', () => {
    const defaultHighlightDebug = fixture.debugElement.query(By.css('#default-color'));
    const defaultHighlightEle = <HTMLParagraphElement>defaultHighlightDebug.nativeElement;
    const directiveInstance = defaultHighlightDebug.injector.get(HighlightDirective);
    expect(defaultHighlightEle.style.backgroundColor).toEqual(directiveInstance.defaultColor);
  });

  it('should highlight with the selected color in the input', fakeAsync(() => {
    // Arrange
    const input = fixture.debugElement.query(By.css('#color-input'));
    const inputElement: HTMLInputElement = input.nativeElement;
    const pDebug = fixture.debugElement.query(By.css('#personalized-color'));
    const pElement = <HTMLParagraphElement>pDebug.nativeElement;
    const newColor = '#ddcc00';
    const directiveInstance = pDebug.injector.get(HighlightDirective);
    // Act
    expect(pElement.style.backgroundColor).toEqual('rgb(255, 0, 204)');

    inputElement.value = newColor;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // Assert
    expect(component.selectedColor.value).toEqual(newColor);
    console.log(pElement.style.backgroundColor, directiveInstance.bgColor)
    expect(directiveInstance.bgColor).toEqual(component.selectedColor.value);
  }));
});
