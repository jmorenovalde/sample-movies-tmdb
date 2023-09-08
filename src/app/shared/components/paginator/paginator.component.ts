import { Component, EventEmitter, Input, OnChanges , Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {

  @Input()
  totalPages = 1;

  @Input()
  currentPage = 1;

  @Input()
  totalPagesToShow = 5;

  @Output()
  pageChanged = new EventEmitter<number>();

  pageList: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const { totalPages, currentPage } = changes;
    if (!!totalPages?.currentValue && !!currentPage?.currentValue) {
      this.getPagesToShow(totalPages.currentValue, currentPage.currentValue);
    } else if (!!totalPages?.currentValue) {
      this.getPagesToShow(totalPages.currentValue, this.currentPage);
    } else if (!!currentPage?.currentValue) {
      this.getPagesToShow(this.totalPages, currentPage.currentValue);
    }
  }

  goToPage(page: number): void {
    this.pageChanged.emit(page);
  }

  private getPagesToShow(totalPages: number, currentPage: number): void {
    if (!!totalPages && !!currentPage) {
      this.pageList = [];
      if (currentPage > 0 && currentPage <= this.totalPages - this.totalPagesToShow) {
        const startPage = (currentPage - 2 <= 0) ?  1 : currentPage - 2;
        const endPage = (currentPage + 2 < this.totalPagesToShow) ? this.totalPagesToShow : currentPage + 2;
        for (let i = startPage; i <= endPage; i++) {
          this.pageList.push(i);
        }
      }
    }
  }
}
