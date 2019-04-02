import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Api } from '../../../api.service';
import {HttpHeaders} from '@angular/common/http';
declare var $: any;
declare var FgGallery:any;

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  offer:any={'offer_title':'','target_amount':'','discount':'','deal_price':'','ptr':'','stock_quantity':'','offer_start_date':'',
  'offer_duration_days':'1','offer_description':'','picture':'','img_name':''}
  state:any;
  galleryinit:any;

  constructor(public global: AppGlobals, private loadingBar: LoadingBarService, 
    private router: Router, private api: Api,private aroute:ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {
    // setTimeout(() => {
    //   $(function() {
    //     $('input.calendar').pignoseCalendar({
    //     format: 'YYYY-MM-DD' // date format string. (2017-02-02)
    //   });
    // });
    //  $('#datepicker').fdatepicker();
    // }, 200);
    $('.fg-gallery').hide();
    setTimeout(() => {
      this.galleryinit = new FgGallery('.fg-gallery', {
        cols: 1,
        style: {
          width: '50px',
          height: '50px',
        }
      });
    }, 200);
    $(".style .input").on('click keypress',function(){
      $(this).parent(".style").addClass("inpActive");
              
      $(this).blur(function(){
        var getitemval=$(this).val();						
          if(getitemval==''){
            $(this).parent(".style").removeClass("inpActive");
          }
      
      });
      
    });

    setTimeout(() => {

      $('#datepicker').fdatepicker({
        format: 'dd/mm/yyyy',
      });
    }, 200);

    setTimeout(() => {

      $('.nameDesigns').removeClass('active');
      $('#myoffers').addClass('active');
    }, 20);
  }

  onUpdateOfferDuration(type){

    let current_qty=parseInt(this.offer.offer_duration_days);
    let new_qty:any=0;
   // console.log(current_qty);
    if(type=='+'){
     
      if(current_qty>19){
        new_qty=current_qty;
      } 
      else{
        new_qty=current_qty+1;
      }
     
    }
    else if(type =='-'){
      new_qty=current_qty-1;
      if(new_qty<1){
        new_qty=1;
      }
      else{
        new_qty=current_qty-1;
      }
     
    }
    this.offer.offer_duration_days=new_qty;
  }
  onChangeImage(fileInput: any) {


    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e: any) {
        $('#img1').attr('src', e.target.result);
        $('.fg-gallery').show();
      }
      
       this.offer.img_name = fileInput.target.files[0].name;
       this.offer.picture=fileInput.target.files[0];
     
     // this.uploadImage(fileInput.target.files[0]);
      reader.readAsDataURL(fileInput.target.files[0]);
    }

  }

  onSubmit(){
    let offerdate=$('#datepicker').val();
    console.log(offerdate);
    this.offer.offer_start_date=offerdate;
    console.log(this.offer);
    if(!this.validateFields()){

    }
    else{
      this.loadingBar.start();
      const formData = new FormData();

      // append your data
      formData.append('user_id', this.state.user.id);
      formData.append('offer_title', this.offer.offer_title);
      formData.append('target_amount', this.offer.target_amount);
      formData.append('discount', this.offer.discount);
      formData.append('deal_price', this.offer.deal_price);
      formData.append('ptr', this.offer.ptr);
      formData.append('stock_quantity', this.offer.stock_quantity);
      formData.append('offer_start_date', this.offer.offer_start_date);
      formData.append('offer_duration_days', this.offer.offer_duration_days);
      formData.append('offer_description', this.offer.offer_description);

      formData.append('picture', this.offer.picture);
      let appurl:any=this.global.baseAppUrl+this.global.apiUrl;
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      this.loadingBar.start();
      $.ajax({
        type:'POST',
        url: appurl+'offer/addoffer',
        data:formData,
        
        cache:false,
        contentType: false,
        processData: false,
        success:(data:any)=>{
          
          console.log(data);
            this.loadingBar.stop();
            this.global.setToast('info',data.message);
            if(data.status==200){
           
              this.router.navigate(['/chemist-account/my-offers']);
 
            }
            else {
              this.global.setToast('error',data.message);
            }
          

  
        },
        error: (data:any)=>{
          this.loadingBar.stop();
            console.log("error");
            this.global.setToast('error',data.message);
            console.log(data);
        }
    },{headers: headers});
      // let data = "user_id="+this.state.user.id+"&offer_title="+this.offer.offer_title+"&target_amount="+this.offer.target_amount+
      //             "&discount="+this.offer.discount+"&deal_price="+this.offer.deal_price+"&ptr="+this.offer.ptr+"&stock_quantity="+this.offer.stock_quantity+
      //             "&offer_start_date="+this.offer.offer_start_date+"&offer_duration_days="+this.offer.offer_duration_days+"&offer_description="+this.offer.offer_description+
      //             "&picture="+this.offer.picture;
      // console.log(data);
      // /// console.log(this.address);
      // this.api.addOffer(data).subscribe(
      //   (response) => {
       
      //     var dt: any = response;
  
      //     console.log(dt);
      //     //  this.enquires=enquiries;
      //  //   this.global.setToast('info', dt.message);
  
      //     if (dt.status == 200) {
  
      //    //   this.offers=dt.data;
      //       // this.wallet.lists=dt.data;
      //       // this.wallet.balance=dt.balance;
      //    //   this.global.setToast('info', dt.message);
  
      //     }
      //     else if (dt.status == 201) {
  
      //       // this.is_result_get=false;
      //       // this.searchresp=[];
      //     }
  
      //     this.loadingBar.stop();
  
  
  
      //   },
      //   (error) => {
  
      //     this.loadingBar.stop();
      //     console.log('RESPONSE FAILED'); console.log(error)
      //   }
      // );
    }

  }

  validateFields(){
   
    if(this.offer.offer_title ==''){
      this.global.setToast('error','Offer title is required');
      return false;
    }
    else if(this.offer.offer_title ==''){
      this.global.setToast('error','Offer title is required');
      return false;
    }
    else if(this.offer.target_amount ==''){
      this.global.setToast('error','Offer MRP is required');
      return false;
    }
    else if(this.offer.discount ==''){
      this.global.setToast('error','Offer discount is required');
      return false;
    }
    else if(this.offer.deal_price ==''){
      this.global.setToast('error','Offer deal price is required');
      return false;
    }
    else if(this.offer.ptr ==''){
      this.global.setToast('error','Offer PTR is required');
      return false;
    }
    else if(this.offer.stock_quantity ==''){
      this.global.setToast('error','Offer stock qty is required');
      return false;
    }
    else if(this.offer.offer_start_date ==''){
      this.global.setToast('error','Offer Date is required');
      return false;
    }
    
    else{
      return true;
    }


  }
}
