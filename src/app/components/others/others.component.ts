import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {

  public selectedColor = new FormControl();
  public wordToReverse = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
