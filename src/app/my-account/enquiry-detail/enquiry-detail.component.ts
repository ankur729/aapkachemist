import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
declare var classie:any;
declare var $:any;


@Component({
  selector: 'app-enquiry-detail',
  templateUrl: './enquiry-detail.component.html',
  styleUrls: ['./enquiry-detail.component.css']
})
export class EnquiryDetailComponent implements OnInit {

  state:any;
  enquiry:any={
          'enquiry_id':'',
          'reply_status':'',
      }
  address: any = { 'enquiry_id': '','address_data':{'address':'','pincode':''}, 'user_type': '', 'full_name': '', 'mobile': '', 'address': '', 'landmark': '', 'state': '', 'city': '', 'pincode': '', 'makeitdefault': '0', 'address_type': '' };
  constructor(private api:Api,private loadingBar: LoadingBarService,public global:AppGlobals,private router:Router,private aroute:ActivatedRoute) { this.state=this.global.getAppState();}

  ngOnInit() {


    this.enquiry.enquiry_id=this.aroute.snapshot.queryParams["enquiryid"];
    this.enquiry.reply_status=this.aroute.snapshot.queryParams["reply_status"];
    setTimeout(() => {
      $('.nameDesigns').removeClass('active');
      $('#myenquires').addClass('active');
    }, 20);
    this.getEnquiryDetailById();
  }

  getEnquiryDetailById(){
    alert('2');
    this.loadingBar.start();
    let data="enquiry_id="+this.enquiry.enquiry_id+"&reply_status="+this.enquiry.reply_status+"&enquiry_order_type=0";

    
    this.api.getVendorEnquiryDetail(data).subscribe(
      (response)=>
          { 
      
            
            
             var dt:any=response;
             if(dt.status=="200"){

              // let addr=dt.data[0];
              // this.address.address_id=addr.address_id;
              // this.address.full_name=addr.full_name;
              // this.address.mobile=addr.mobile;
              // this.address.address=addr.address;
              // this.address.landmark=addr.landmark;
              // this.address.state=addr.state;
              // this.address.city=addr.city;
              // this.address.pincode=addr.pincode;
              // this.address.address_type=addr.address_type;

              //  this.order=dt.order_data;
              // this.isvalid=true;
              }
             
 
             else if (dt.status=="201"){
              
                history.go(-1);
                //  this.global.setToast('error',this.global.toastmsg.login_invalid);

             }
            //  console.log(dt);
       
             this.loadingBar.stop();
             
      
          
          },
      (error)=>{

     //   $('.preloader').fadeOut();
        //   this.spinnerService.hide();
           console.log('RESPONSE FAILED');console.log(error)}
  );

      }

}
