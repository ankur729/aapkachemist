import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../api.service';
import { AppGlobals } from '../app.global';
declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  state:any;
  categories:any=[];
  email_subscribe:any='';
  subscribe_popup:boolean=false;

  constructor(private router:Router,private global:AppGlobals,private api:Api,private loadingBar:LoadingBarService) { this.state=this.global.getAppState();}

  ngOnInit() {
    
 
    // if(this.state.footer.length==0){

       
    //  this.getFooterCategories();
    // }
    // else{
    //   this.categories=this.state.footer;
    //  // console.log(this.categories);
    // }

   
    
  }

  getFooterCategories(){

    
    this.api.getFooterCategories('').subscribe(
      (response) => {
      


        var dt: any = response;

  //   console.log(dt);
        if (dt.status == 200) {

          this.categories=dt.retdata;
          this.state.footer=dt.retdata;
        
          this.global.saveAppState(this.state);
        }
        else if (dt.status == 201) {
         
          //  this.global.setToast('error','Sorry, no result found');
          this.loadingBar.stop();

        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


  }
  navigate(field){

    if(field=='about-us'){
      this.router.navigate(['about-us']);
    }
    else if(field=='privacy-policy'){
      this.router.navigate(['privacy-policy']);
    }
    else if(field=='faq'){
      this.router.navigate(['faq']);
    }
  }
  catnavigate(category){
  
    
    if(parseInt(category.total_count)>0){
    //    this.router.navigate(['/categories'],{queryParams:{id:category.category_id,name:category.category_name}});

    this.router.navigate(['/category'+category.seo_url]);

    }
    else{
      this.router.navigate(['/medicine-listing'],{queryParams:{categoryid:category.id}})
    }
  }
  navigateCategory(category) {
 
    
  //  console.log(category);
    if(category.no_link=='1'){
     // alert('3');



    //  $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").after("<span class='search_input_overlay'></span>");
    //  $(".search_input_overlay").show();
    //  $("header .mainHeader .insideDesign .right_part .icon_menu .list .input_box#headersearch").focus();

    //   $(document).on("click" , ".search_input_overlay" , function(){
    //     $(".search_input_overlay").remove();
    //   });
 



      
    }
    else if(category.total_count>0){
     
      //this.router.navigate(['/categories'], { queryParams: { id: category.id } });
      this.router.navigate(['/category/'+category.seo_url]);
  //    [routerLink]= " [ '/category/'+category.seo_url]"
    }
    else if(category.total_count==0){
     
      this.router.navigate(['/medicine-listing/'+category.seo_url])

    }

    else{
      this.router.navigate(['/categories'], { queryParams: { id: category.id } });
    }
    // if (parseInt(category.total_count) > 0) {
    //   this.router.navigate(['/categories'], { queryParams: { id: category.category_id } });
    // }
    // else {
    //   this.router.navigate(['/medicine-listing'], { queryParams: { categoryid: category.category_id } })
    // }

  }

  toggleSubscribePopup(){

    if(!this.subscribe_popup)
    {
      $('.popup_design').fadeIn(100);
      $(".style .input").on('click keypress',function(){
        $(this).parent(".style").addClass("inpActive");
                
        $(this).blur(function(){
          var getitemval=$(this).val();						
            if(getitemval==''){
              $(this).parent(".style").removeClass("inpActive");
            }
        
        });
        
      });
      this.subscribe_popup=!this.subscribe_popup;
    }
    else{
      $('.popup_design').fadeOut(100);
      this.subscribe_popup=!this.subscribe_popup;
    }


  }
  onSubscribe(){
    
   
    this.loadingBar.start();
    let data="email="+this.email_subscribe;
    this.api.subscribeEmail(data).subscribe(
      (response) => {
      


        var dt: any = response;

       //console.log(dt);
        if (dt.status == 200) {
          this.email_subscribe='';

          this.subscribe_popup=false;
          $('.popup_design').fadeOut(100);
          // this.categories=dt.retdata;
          // this.state.footer=dt.retdata;
          this.global.setToast('info',dt.message);
          // this.global.saveAppState(this.state);
        }
        else if (dt.status == 201) {
         
          this.global.setToast('error',dt.message);
          //  this.global.setToast('error','Sorry, no result found');
          this.loadingBar.stop();

        }
        this.loadingBar.stop();
      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

}
