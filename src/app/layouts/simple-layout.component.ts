import { Component, OnInit } from '@angular/core';
import { ControlsComponent } from '../shared/controls.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './simple-layout.component.html',
})
export class SimpleLayoutComponent implements OnInit {


  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    ControlsComponent.Instance.showGraph = false;
  }
}
