import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'post-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit,AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollToview(id:number) {
    // $('html, body').animate({
    //   scrollTop: $(`#${id}`).offset().top
    // }, 100);
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
