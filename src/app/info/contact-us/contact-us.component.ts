import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
import { Meta, Title } from '@angular/platform-browser';
import { PopupComponent } from '../../popup/popup.component';

declare var $:any;
 

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  data:any={'meta_data':{'email':'','mobile':''},'types':[]
            ,'postdata':{'name':'','email':'','mobile':'','typeid':'1','message':'','captcha_code':''}};
  is_sent_success:boolean=false;
  @ViewChild('popupchild') popup: PopupComponent;


  constructor(private aroute:ActivatedRoute,private router:Router,public global:AppGlobals,
    private api:Api,private loadingBar:LoadingBarService,private title: Title, private meta: Meta) { }

  ngOnInit() {

    setTimeout(() => {
      $(".style .input").on('click keypress',function(){
        $(this).parent(".style").addClass("inpActive");
                
        $(this).blur(function(){
          var getitemval=$(this).val();						
            if(getitemval==''){
              $(this).parent(".style").removeClass("inpActive");
            }
        
        });
        
      });

     
      

    }, 200);
    
    this.title.setTitle('Contact Us at Aapka Chemist');    
    this.meta.updateTag({
      name: 'description', content: "To reach us, just call +91 88586 88586 or drop an email at info@aapkachemist.com"
    });
    this.loadInfoData();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  loadInfoData(){
 
    this.loadingBar.start();

    this.api.getContactUsData('').subscribe(
      (response) => {
        console.log('GETTING CMS DATA');
        console.log(response);

        let dt: any = response;
        if (dt.status == 200) {
 
 
          this.data.meta_data.email=dt.data.meta_data.email;
          this.data.meta_data.mobile=dt.data.meta_data.mobile;
          this.data.types=dt.data.contact_type;
          

        }
        else if (dt.status == 201) {
          this.global.setToast('error', dt.message);
        }

        this.loadingBar.stop();
      },
      (error) => {

        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  onSubmit(){

    console.log(this.data);

    this.loadingBar.start();
    let data="name="+this.data.postdata.name+"&email="+this.data.postdata.email+"&mobile="+this.data.postdata.mobile+
    "&message="+this.data.postdata.message+"&page_type=1&subject_type="+this.data.postdata.typeid+"&captcha_code="+this.data.postdata.captcha_code+"&login_type=0";
    console.log(data);
    this.api.submitContactUsData(data).subscribe(
      (response) => {
        console.log('GETTING CMS DATA');
        console.log(response);

        let dt: any = response;
        if (dt.status == 200) {
          
        //  this.is_sent_success=true;
           this.popup.onReceivePopupData({'type':'success','sent_txt':'Thank You for Contacting Us.','primary_btn_txt':'','secondary_btn_txt':'Close'});
          this.data.postdata.name='';
          this.data.postdata.email='';
          this.data.postdata.mobile='';
          this.data.postdata.message='';
          this.data.postdata.captcha_code='';
          
          // this.data.meta_data.email=dt.data.meta_data.email;
          // this.data.meta_data.mobile=dt.data.meta_data.mobile;
          // this.data.types=dt.data.contact_type;
          

        }
        else if (dt.status == 201) {
          this.global.onRefreshCaptcha('logincaptcha');
          this.global.setToast('error', dt.message);
        }

        this.loadingBar.stop();
      },
      (error) => {

        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


  }

  onClosePopup(){

    this.is_sent_success=false;
  }

  onPopupActionReceived(obj:any) {
    console.log(obj);
    if(obj.mode=='error'){

      if (obj.type == 0) {

        this.popup.onReceivePopupData({ 'type': '' });
  
      }
      // else if (obj.type == 1) {

      //   this.popup.onReceivePopupData({ 'type': '' });
      //   this.status.is_order_confirmed=1;
      //   this.onSubmitEnquiry();
      //   //on primary btn clicked...
  
      // }
 
    }
    else if(obj.mode=='success'){
    
      if (obj.type == 0) {

        //Go To Order
        this.popup.onReceivePopupData({ 'type': '' });
        
      }
      else if (obj.type == 1) {
 
        //on primary btn clicked...
  
      }
    }
 

    //console.log(event);
  }
  onRefreshCaptcha(id){

    this.global.onRefreshCaptcha(id);
  }

}
