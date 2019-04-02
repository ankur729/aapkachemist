import { Component, OnInit,ViewChild } from '@angular/core';
import {HeaderComponent} from '../incl/header/header.component';
import { Router, ActivatedRoute  } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../api.service';
import {AppGlobals} from '../app.global';
declare var classie:any;
declare var $:any;


@Component({
  selector: 'app-medicine-detail',
  templateUrl: './medicine-detail.component.html',
  styleUrls: ['./medicine-detail.component.css']
})
export class MedicineDetailComponent implements OnInit {

  state:any;
  respdata:any={
    
    'productdata':{'product_id':'','product_name':'','price':'','product_img_path':'','description':'','product_generic_name':'','company_name':'','manufacturer_name':'','packing_unit':'','option_val':'' },
    'similar_product':[],
    'product_faqs':[],
    'realated_articles':[],
    'generic_info':[],
    'blog_data':[],
    'order_id':'',
    'customer_id':''
  };
  cartcount:any;
  @ViewChild('child')
  private child: HeaderComponent;


  constructor(private api:Api,private loadingBar: LoadingBarService,public global:AppGlobals,private router:Router,private aroute:ActivatedRoute) { this.state=this.global.getAppState();}

  ngOnInit() {

    

    this.aroute.params.subscribe(params => {
    //  let productid=this.aroute.snapshot.queryParams["productid"];
      let seourl=this.aroute.snapshot.paramMap.get('seourl');
      $('.searchResultdiv').css('display','none');
      $('.main_design').hide();
      $('.input_box').val('');
      this.getProductDetailById(seourl);
      $('.Add_button').text('Add To List');
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    if(this.aroute.snapshot.queryParams["redirecturl"] !=undefined){

      
      let redirecturl=this.aroute.snapshot.queryParams["redirecturl"];
      redirecturl=redirecturl.split('?')[1].split('&');
      this.respdata.order_id=redirecturl[0].split('=')[1];
      this.respdata.customer_id=redirecturl[1].split('=')[1];
      
      // console.log(redirecturl);
      // console.log(redirecturl[0].split('=')[1]);
      // console.log(redirecturl[1].split('=')[1]);
      // this.router.navigate(['/chemist-account/modify-order'],{queryParams:{'oid':redirecturl[0].split('=')[1],'uid':redirecturl[1].split('=')[1]}});

    } 
   

  }

  getProductDetailById(seourl:any){

    
    this.loadingBar.start();
  //  let data="product_id="+productid;
  let data="seo_url="+seourl;
    
    this.api.getProductDataById(data).subscribe(
      (response)=>
          { 
           
           
            
             
             var dt:any=response;
        //   console.log(dt);
             if(dt.status=="200"){

              this.respdata.productdata.product_id=dt.data.product_data.product_id;
              this.respdata.productdata.product_name=dt.data.product_data.product_name;
              this.respdata.productdata.price=dt.data.product_data.price;
              this.respdata.productdata.product_img_path=dt.data.product_data.product_img_path;
              this.respdata.productdata.description=dt.data.product_data.description;
              this.respdata.productdata.product_generic_use=dt.data.product_data.product_generic_use;
              this.respdata.productdata.product_generic_warning=dt.data.product_data.product_generic_warning;
              this.respdata.productdata.product_generic_name=dt.data.product_data.product_generic_name;
              this.respdata.productdata.company_name=dt.data.product_data.company_name;
              this.respdata.productdata.manufacturer_name=dt.data.product_data.manufacturer_name;
              this.respdata.productdata.packing_unit=dt.data.product_data.packing_unit;
              this.respdata.productdata.option_val=dt.data.product_data.option_val;

              this.respdata.similar_product=dt.data.similar_product;
              this.respdata.product_faqs=dt.data.product_faqs;
              this.respdata.generic_info=dt.data.generic_info;
              this.respdata.related_articles=dt.data.related_articles;
              this.respdata.blog_data=dt.data.blog_data;

              $('.main_design').fadeIn(500);
              setTimeout(() => {
                this.callJs();
              }, 20);
              
              }
             
 
             else if (dt.status=="201"){


              
              //  history.go(-1);
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


  addToCart(){

    if(this.api.validateOrCreateSession())
    {
      
      this.respdata.productdata['product_qty']='1';

    
    
        this.addToCartFn(this.respdata.productdata);
      
    

      if( $('#addorgotocart').text()=='Go To Cart'){
        
   
          this.router.navigate(['/cart-step-one']);
        
      
      }
      else{

     //   $('.full_w').addClass('fill_green');
        $('#addorgotocart').text('Go To Cart');
      }
     
    //   if(this.api.addToCartFn(this.productdata)){
        
    //  //   this.child.cartCountEvent();

    //   }
   //   setTimeout(() => {
      
   //   }, 20);
     

    }
    else if(!this.api.validateOrCreateSession()){

      this.global.setToast('error','Please login or register to continue');

    }

 

  }

  addToCartFn(productdata:any){

    
  let state = this.global.getAppState();

  
  let cdata = { 'sessionid': '', 'user_id': '', 'product_id': '', 'product_qty': '' };


  cdata.sessionid = state.cartdata.session_id;
  cdata.user_id = state.user.id;
  cdata.product_id = productdata.product_id;
  cdata.product_qty = productdata.product_qty;

  if(cdata.sessionid=='undefined' || cdata.sessionid == undefined){
    cdata.sessionid='';
  }
 

  let direct_enquiry:any=0;
  if(this.state.vendor_id!=0){
    direct_enquiry=1;
    
  }


 // let data = "session_id=" + cdata.sessionid + "&user_id=&product_id=" + cdata.product_id + "&product_qty=" + cdata.product_qty;
  let data:any;
  if(this.state.is_logged_in){

    data = "session_id=" + this.state.cartdata.session_id + "&user_id="+this.state.user.id+"&direct_enquiry="+direct_enquiry+"&vendor_id="+this.state.vendor_id+"&product_id=" + cdata.product_id + "&product_qty=" + cdata.product_qty;
  }
  else if(!this.state.is_logged_in){
    data = "session_id=" + this.state.cartdata.session_id + "&user_id="+"&direct_enquiry="+direct_enquiry+"&vendor_id="+this.state.vendor_id+"&product_id=" + cdata.product_id + "&product_qty=" + cdata.product_qty;
  }
  
 // console.log(data);
  this.api.updateCart(data).subscribe(
    (response) => {
 
      

      var dt: any = response;

      //    this.global.setToast('info',dt.message);
 //   console.log(dt);
      if (dt.status == 200) {

        this.global.setToast('info', dt.message);
        this.child.cartCountEvent();
        //     this.addresses=dt.data;
     //   this.router.navigate(['/cart-step-one']);
  

      }
      else if (dt.status == 201) {

        // this.is_result_get=false;
        // this.searchresp=[];
      }

    


    },
    (error) => {


      console.log('RESPONSE FAILED'); console.log(error)
    }
  );


  }

  // updateModifiedCartFn(productdata) {

  //   let state = this.global.getAppState();

  
  //   let cdata = { 'sessionid': '', 'user_id': '', 'product_id': '', 'product_qty': '' };
  
  
  //   cdata.sessionid = state.cartdata.session_id;
  //   cdata.user_id = state.user.id;
  //   cdata.product_id = productdata.product_id;
  //   cdata.product_qty = productdata.product_qty;
  
  //   if(cdata.sessionid=='undefined' || cdata.sessionid == undefined){
  //     cdata.sessionid='';
  //   }
   
  
  //   let direct_enquiry:any=0;
  //   if(this.state.vendor_id!=0){
  //     direct_enquiry=1;
      
  //   }
  
  
  //  // let data = "session_id=" + cdata.sessionid + "&user_id=&product_id=" + cdata.product_id + "&product_qty=" + cdata.product_qty;
  //   let data:any;
 
  //     data = "session_id=" + this.state.cartdata.session_id+"&user_id"+this.respdata.cust + "&vendor_id="+this.state.user.id+"&direct_enquiry="+direct_enquiry+"&vendor_id="+this.state.vendor_id+"&product_id=" + cdata.product_id + "&product_qty=" + cdata.product_qty;
    
   
    
  //  // console.log(data);
  //   this.api.updateModifiedCart(data).subscribe(
  //     (response) => {
   
        
  
  //       var dt: any = response;
  
  //       //    this.global.setToast('info',dt.message);
  //  //   console.log(dt);
  //       if (dt.status == 200) {
  
  //         this.global.setToast('info', dt.message);
         
  //         //     this.addresses=dt.data;
  //      //   this.router.navigate(['/cart-step-one']);
    
  
  //       }
  //       else if (dt.status == 201) {
  
  //         // this.is_result_get=false;
  //         // this.searchresp=[];
  //       }
  
      
  
  
  //     },
  //     (error) => {
  
  
  //       console.log('RESPONSE FAILED'); console.log(error)
  //     }
  //   );
  

  // }


  ngAfterViewInit(){

    // setTimeout(() => {

     
      
    // }, 200);
  }

  callJs(){
 
   
    $(function(){
      $('.seaTabs_tab').each(function(item){
          $(this).click(function(){
              $(this).addClass('seaTabs_switch_active').siblings().removeClass('seaTabs_switch_active');
              $($('.seaTabs_item')[item]).addClass('seaTabs_content_active').siblings().removeClass('seaTabs_content_active');
          });
      });
  });
  
  
  $(function(){
      $('.seaTabs_tab2').each(function(item){
          $(this).click(function(){
              $(this).addClass('seaTabs_switch_active2').siblings().removeClass('seaTabs_switch_active2');
              $($('.seaTabs_item2')[item]).addClass('seaTabs_content_active2').siblings().removeClass('seaTabs_content_active2');
          });
      });
  });
  
  /*javascript for all categorey button is start from here*/
  
  $(document).ready(function(e) {
      $(".all-cat").hover(function(){
      
      $(".all-cat-mega").toggle();
      
      });
  });

  //$("[data-addui=accordion]").addAccordion();
  }

}
