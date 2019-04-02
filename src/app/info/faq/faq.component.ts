import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


declare var $:any;
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit() {

    this.title.setTitle('Frequently Asked Questions at Aapka Chemist');    
    this.meta.updateTag({
      name: 'description', content: "At Aapka Chemist, we aim to provide a flawless customer experience to all our customers. To help guide you through our website and services, we have compiled a list of frequently asked questions and their answers below."
    });


    $('.section_1').hide();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
  ngAfterViewInit(){
    setTimeout(() => {
      $('.faq_toggle').click(function(e) {
        e.preventDefault();
      
        var $this = $(this);
      
        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('li .faq_inner').removeClass('show');
            $this.parent().parent().find('li .faq_inner').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
       }
    });
    
    
    $('.faq_list').click(function() {
      
      $('.faq_list').removeClass('active_faq');
      
      $(this).addClass('active_faq');
      
      });
    }, 20);
    setTimeout(() => {
      $('.section_1').fadeIn(500);
    }, 200);
  }

}
