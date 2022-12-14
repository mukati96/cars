import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InventoryV2Component } from '../inventory-v2.component';
@Component({
  selector: 'post-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Output() pageChange:any = new EventEmitter();
  public labels: any = {
      previousLabel: '<<',
      nextLabel: '>>',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  constructor(private inventoryComponent:InventoryV2Component) { }

  ngOnInit(): void {
  }

  onPageChange(event:any) {
    this.pageChange.emit(event);
    this.inventoryComponent.onPageChange(event);
  }

}
