import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
declare var classie:any;
declare var $:any;
@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.css']
})
export class ProfileSetupComponent implements OnInit {

  state:any;
  step:any='0';
  paramsSubscription:any;
  constructor(private api:Api,private loadingBar: LoadingBarService,public global:AppGlobals,private router:Router,private aroute:ActivatedRoute) { this.state=this.global.getAppState();
    
    console.log(this.state);
    // let step=this.aroute.snapshot.queryParams["step"];
   
    // if(step !=undefined){
    //   this.step=step;
 
    // }
  }

  ngOnInit() {


    this.paramsSubscription=   this.aroute.queryParams.subscribe((param: any) => {
      this.step=param.step; 
      //alert(param);
 
    });
  //   this.paramsSubscription = this.route.params.subscribe((param: any) => {
  //     this.type = param['type'];
  //     this.querySubscription = this.route.queryParams.subscribe((queryParam: any) => {
  //         this.page = queryParam['page'];
  //         if (this.page)
  //             this.goToPageNo(this.type, this.page);
  //         else
  //             this.goToPage(this.type);
  //     });
  // });


  }

  ngAfterViewInit(){

    $(".meterBar").owlCarousel({
        items : 5,
        navigation : true,
        trueslideSpeed : 300,
        paginationSpeed : 500,
      
        responsive: true,
        responsiveRefreshRate : 200,
        responsiveBaseWidth: window,
      });
    setTimeout(() => {
        //var catindex = $('.cat-slide').find('.active').parents('.owl-item').index();
        $(document).on('click','.profileStepsMeter .owl-item',function(){

                var currindex = $(this).index()
                console.log(currindex);

                if(currindex >= 4){
                    $('.profileStepsMeter .owl-wrapper').trigger('owl.goTo', 6); 
                }else{
                    $('.profileStepsMeter .owl-wrapper').trigger('owl.goTo', 0); 

                }

                

        });

        if(this.step!=''){

            if(this.step >= 5){

                $('.profileStepsMeter .owl-wrapper').trigger('owl.goTo', 6); 
            }else{
                $('.profileStepsMeter .owl-wrapper').trigger('owl.goTo', 0); 

            }
        }




        //  


    }, 20);
  }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
   // this.querySubscription.unsubscribe();
}

onClosePopup(){
  $('.mapLocationSet').hide();
  $('.sending_enquiry_popup').css('z-index','12');
  $('.sending_enquiry_popup').hide();
}

}
