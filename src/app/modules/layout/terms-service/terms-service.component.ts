import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'post-terms-service',
  templateUrl: './terms-service.component.html',
  styleUrls: ['./terms-service.component.scss']
})
export class TermsServiceComponent implements OnInit,AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    $('.collapse').on('show.bs.collapse', (e:any) => {
      const $card = $(this).closest('.card');
      const $open = $($(this).data('parent')).find('.collapse.show');
      let additionalOffset = 0;
      if ($card.prevAll().filter($open.closest('.card')).length !== 0)
      {
        additionalOffset =  $open.height();
      }
      $('html,body').animate({
        scrollTop: $card.offset() ? $card.offset().top - additionalOffset - 20 : false
      }, 500);
    });
  }

}
