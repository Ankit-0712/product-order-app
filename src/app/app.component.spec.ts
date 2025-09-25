import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { AppComponent } from './app.component';
import { TtsService } from './service/tts.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let ttsServiceSpy: jasmine.SpyObj<TtsService>;

  beforeEach(async () => {
    ttsServiceSpy = jasmine.createSpyObj('TtsService', ['speak']);
    ttsServiceSpy.speak.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [AppComponent, ReactiveFormsModule],
      providers: [{ provide: TtsService, useValue: ttsServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with one empty row', () => {
    expect(component.rows.length).toBe(1);
    const row = component.rows.at(0).value;
    expect(row.productId).toBeNull();
    expect(row.quantity).toBeNull();
    expect(row.locked).toBeFalse();
  });

  it('should add a new row on onAdd()', () => {
    const row = component.rows.at(0);
    row.patchValue({ productId: 'pencil', productName: 'Pencil', quantity: 2 });
    component.onAdd(0);

    expect(component.orderItem.length).toBe(1);
    expect(component.rows.length).toBe(2); // new empty row added
    expect(row.value.locked).toBeTrue();
  });

  it('should lock a row on onAdd()', () => {
    const row = component.rows.at(0);
    row.patchValue({ productId: 'eraser', productName: 'Eraser', quantity: 1 });
    component.onAdd(0);
    expect(row.disabled).toBeTrue();
    expect(row.value.locked).toBeTrue();
  });

  it('should prepare order summary correctly', () => {
    const row = component.rows.at(0);
    row.patchValue({ productId: 'pencil', productName: 'Pencil', quantity: 3 });
    component.onAdd(0);

    component.onShowOrder();

    expect(component.showSummary).toBeTrue();
    expect(component.orderItem.length).toBe(1);
    expect(component.orderItem[0].productName).toBe('Pencil');
    expect(component.orderItem[0].quantity).toBe(3);
  });

  it('should toggle showSummary when onShowOrder() is called', () => {
    expect(component.showSummary).toBeFalse();
    component.onShowOrder();
    expect(component.showSummary).toBeTrue();
  });

  it('should remove a row on onRemoveRow()', () => {
    const row = component.rows.at(0);
    row.patchValue({ productId: 'pencil', productName: 'Pencil', quantity: 2 });
    component.onAdd(0);
    const initialRows = component.rows.length;

    component.onRemoveRow(0);
    expect(component.rows.length).toBe(initialRows - 1);
    expect(component.orderItem.length).toBe(0);
  });

  it('should unlock a row on onEditRow()', () => {
    const row = component.rows.at(0);
    row.patchValue({ productId: 'eraser', productName: 'Eraser', quantity: 1 });
    component.onAdd(0);

    component.onEditRow(0);
    expect(row.enabled).toBeTrue();
    expect(row.value.locked).toBeFalse();
  });

  it('should call TTS in onReadOrder()', async () => {
    const row = component.rows.at(0);
    row.patchValue({ productId: 'pencil', productName: 'Pencil', quantity: 1 });
    component.onAdd(0);

    await component.onReadOrder();
    expect(ttsServiceSpy.speak).toHaveBeenCalled();
  });

  it('should not fail when calling onReadOrder with empty order', async () => {
    component.orderItem = [];
    spyOn(window, 'alert');
    await component.onReadOrder();
    expect(window.alert).toHaveBeenCalledWith('No item in order');
  });
});
