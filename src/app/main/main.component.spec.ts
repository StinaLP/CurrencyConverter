import { TestBed} from '@angular/core/testing';
import { MainComponent } from './main.component';

describe('MainComponent', () => {

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [MainComponent]
    })
  })

  it ('should create the app MainComponent?' , () => {
    let fixture = TestBed.createComponent(MainComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  })

});
