import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxTypedWriterComponent } from './ngx-typed-writer.component';

describe('NgxTypedWriterComponent', () => {
  let component: NgxTypedWriterComponent;
  let fixture: ComponentFixture<NgxTypedWriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxTypedWriterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxTypedWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
