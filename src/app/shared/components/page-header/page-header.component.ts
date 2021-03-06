import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input()
  public title: string;
  @Input()
  public buttonLabel: string;
  @Input()
  public buttonRoute: string;
  @Input()
  public buttonClass: string;

  constructor() { }

  ngOnInit() {
  }

}
