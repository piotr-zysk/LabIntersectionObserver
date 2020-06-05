import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LabIntersectionObserver';

  observedItemOffsetHeight = 0;
  observedItemOffsetTop = 0;

  viewportHeightWithScrollBar = 0;
  viewportHeightWithoutScrollBar = 0;

  ngOnInit() {
    this.getObserverItemPosition();
    this.getViewPortHeight();
  }

  private getObserverItemPosition() {
    const item = document.getElementById('observed');
    this.observedItemOffsetHeight = item.offsetHeight;
    this.observedItemOffsetTop = item.offsetTop;
  }

  private getViewPortHeight() {
    this.viewportHeightWithScrollBar = window.innerHeight;
    this.viewportHeightWithoutScrollBar = document.documentElement.clientHeight;
  }
}
