import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InventoryComponent } from '../inventory.component';

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

  constructor(private inventoryComponent: InventoryComponent) { }

  ngOnInit(): void {
  }

  onPageChange(event:any) {
    this.pageChange.emit(event);
    this.inventoryComponent.onPageChange(event);
  }

}
