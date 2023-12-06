import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-spinner-component',
  template: `
    <div
      class="container_loader"
      [class]="[isLoading === true ? 'flex' : 'hidden']"
    >
      <div class="loader">
        <div class="anim">
          <em></em>
          <em></em>
          <em></em>
        </div>
        <div class="img float-right">
          <img src="https://www.myastroguruji.com/_next/image?url=%2FAstroLogo.png&w=64&q=75" class="p-2 float-right" alt="Myastroguruji Logo" />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./spinner-component.component.css'],
})
export class SpinnerComponentComponent implements OnInit {
  isLoading: boolean;
  alive: boolean;
  // faSpinner = faSpinner;
  constructor(private _SpinnerService: SpinnerService) {
    this.isLoading = false;
    this.alive = true;
  }
  ngOnInit() {
    this._SpinnerService
      .getStateAsObservable()
      .pipe(takeWhile(() => this.alive))
      .subscribe((state) => (this.isLoading = state));
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
