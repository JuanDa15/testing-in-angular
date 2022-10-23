import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { defer, of } from 'rxjs';
import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ValueService } from 'src/app/services/value.service';
import { ProductComponent } from '../product/product.component';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService',['getAll']);
    const valueServiceSpy = jasmine.createSpyObj('ValueService',['getPromiseValue']);
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy},
        { provide: ValueService, useValue: valueServiceSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

    const productsMocks = generateManyProducts(3);
    productsService.getAll.and.returnValue(of(productsMocks))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test for getAll products', () => {
    it('should return a products list', () => {
      // Arrange
      const prevLength = component.products.length;
      const productsMocks = generateManyProducts(10);
      productsService.getAll.and.returnValue(of(productsMocks));

      // Act
      component.getAllProducts();
      fixture.detectChanges();

      // Assert
      expect(component.products.length).toEqual(productsMocks.length + prevLength);
    });
    it('should render a list of products', () => {
      // Arrange
      const productsMocks = generateManyProducts(10);
      const prevLength = component.products.length;
      productsService.getAll.and.returnValue(of(productsMocks));
      // Act
      component.getAllProducts();
      fixture.detectChanges();
      const productsComponents = fixture.debugElement.queryAll(By.css('product'));
      // Assert
      expect(productsComponents.length).toEqual(productsMocks.length + prevLength);
    });
    it('should change the status of the request "loading" to "success"', fakeAsync(()=> {
      // Arrange
      const productsMocks = generateManyProducts(10);
      productsService.getAll.and.returnValue(defer(()=> Promise.resolve(productsMocks)));
      const productsBtnDebug = fixture.debugElement.query(By.css('#load-products'));
      const productsBtnEle = <HTMLButtonElement>productsBtnDebug.nativeElement;
      productsBtnDebug.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(productsBtnEle.textContent).toEqual('Loading');
      // Act
      tick(2000); //EXEC PENDING PROCESSES
      fixture.detectChanges();
      // Assert
      expect(productsBtnEle.textContent).toEqual('Load more');
    }));
    it('should change the status of the request "loading" to "error"', fakeAsync(()=> {
      // Arrange
      productsService.getAll.and.returnValue(defer(()=> Promise.reject()));
      // Act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(2000); //EXEC PENDING PROCESSES
      fixture.detectChanges();
      // Assert
      expect(component.status).toEqual('error');
    }))
  });

  describe('Test for promises in components', () => {
    it('should call a promise', async () => {
      // Arrange
      const expectedAnswer = 'promise value';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(expectedAnswer));
      // Act
      await component.callPromise();
      fixture.detectChanges();
      // Assert
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(component.promiseAnswer).toEqual(expectedAnswer);
    });
    it('should call a promise from html and render', fakeAsync( () => {
      // Arrange
      const expectedAnswer = 'promise value';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(expectedAnswer));
      const btn = fixture.debugElement.query(By.css('#promise-button'));
      // Act
      btn.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const promiseTextDebug = fixture.debugElement.query(By.css('#promise-answer'));
      const promiseText = <HTMLParagraphElement>promiseTextDebug.nativeElement
      // Assert
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(promiseText.textContent).toContain(expectedAnswer);
    }));
  })
});
