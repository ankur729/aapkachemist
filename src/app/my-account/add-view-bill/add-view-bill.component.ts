import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Api} from '../../api.service';

declare var $: any;

@Component({
  selector: 'app-add-view-bill',
  templateUrl: './add-view-bill.component.html',
  styleUrls: ['./add-view-bill.component.css']
})
export class AddViewBillComponent implements OnInit {

  state:any;
  data:any={'id':'','bill_upload_date':'','grand_total':'','invoice_file':'','invoice_file2':'','invoice_file2_path':'','invoice_file_path':'',
            'net_payble_amount':'','order_no':'','order_id':'','total_bil_amount':'','total_bill_mrp':'','vendor_grand_total':'','img1_obj':'','img2_obj':''};
  constructor(public global: AppGlobals,private loadingBar:LoadingBarService,private router:Router,
    private api:Api,private aroute:ActivatedRoute) { this.state=this.global.getAppState();}
 
  ngOnInit() {

    setTimeout(() => {

      $('.nameDesigns').removeClass('active');
      $('#myorders').addClass('active');
    }, 20);
    this.aroute.queryParams.subscribe(params => { 
    

      this.data.id = this.aroute.snapshot.queryParams["id"];
      // this.enquiry.enquiry_detail.reply_status = this.aroute.snapshot.queryParams["replystatus"];
      // this.enquiry.enquiry_detail.enquiry_order_type=this.aroute.snapshot.queryParams["enquirytype"];
      this.getBillData();
    });
 
  }


  getBillData(){
    
    let data="order_id="+this.data.id;
   
    this.loadingBar.start();
    
    this.api.getOrderBillInvoice(data).subscribe(
        (response)=>
            { 
            
              
              
               var dt:any=response;
              //console.log(dt);
               if(dt.status==200){
   
                this.data.id=dt.data.order_id;
                this.data.bill_upload_date=dt.data.bill_upload_date;
                this.data.grand_total=dt.data.grand_total;
                this.data.grand_total=dt.data.grand_total;
                this.data.invoice_file=dt.data.invoice_file;
                this.data.invoice_file2=dt.data.invoice_file2;
                this.data.invoice_file2_path=dt.data.invoice_file2_path;
                this.data.invoice_file_path=dt.data.invoice_file_path;
                this.data.net_payble_amount=dt.data.net_payble_amount;
                this.data.order_no=dt.data.order_no;
                this.data.order_id=dt.data.order_id;
                this.data.total_bil_amount=dt.data.total_bil_amount;
                this.data.total_bill_mrp=dt.data.total_bill_mrp;
              
                this.data.vendor_grand_total=dt.data.vendor_grand_total;
          
               // console.log(this.data);
          //      this.relations=dt.data;
                // this.is_result_get=true;
                // this.searchresp=dt.user_data;
                // this.address=this.addressinit;

                //  this.global.setToast('info',dt.message);
                //  this.router.navigate(['/my-account/address']);
    
               }
               else if(dt.status==201){
                
                  //   this.global.setToast('error',dt.message);
                 // this.is_result_get=false;
                // this.searchresp=[];
               }
           //    console.log(dt.d);
           this.loadingBar.stop();
              
        
            
            },
        (error)=>{
    
        //  $('.preloader').fadeOut();
          //   this.spinnerService.hide();
             console.log('RESPONSE FAILED');console.log(error)}
    );


}



}
