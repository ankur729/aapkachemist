import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { HeaderComponent } from '../../incl/header/header.component';
import { ChemistAccountLeftPanelComponent } from '../chemist-account-left-panel/chemist-account-left-panel.component';
import { PopupComponent } from '../../popup/popup.component';

declare var classie: any;
declare var $: any;

@Component({
  selector: 'app-add-update-bank-details',
  templateUrl: './add-update-bank-details.component.html',
  styleUrls: ['./add-update-bank-details.component.css']
})
export class AddUpdateBankDetailsComponent implements OnInit {
 

  state: any;
  profiledata: any = { 'name': '', 'mobile': '', 'email': '', 'address': '', 'image': '' };

  bank:any={'account_holder_name':'','account_no':'','account_type':'','bank_name':'','branch_name':'','cancel_check':[],
            'ifsc_code':'','image_url':'','city':''}

  constructor(private api: Api, private loadingBar: LoadingBarService, public global: AppGlobals, private router: Router, private aroute: ActivatedRoute) { this.state = this.global.getAppState(); }
  @ViewChild('child')
  public child: HeaderComponent;
  @ViewChild('appleftpanel') leftpanel:ChemistAccountLeftPanelComponent;
  @ViewChild('popupchild') popup: PopupComponent;
  
  ngOnInit() {
    setTimeout(() => {
  
      $('.list a').removeClass('active');
      $('#bankdetails').addClass('active');

      $("html, body").animate({ scrollTop: 0 }, "slow");
      $(".style .input").on('click keypress',function(){
        $(this).parent(".style").addClass("inpActive");
                
        $(this).blur(function(){
          var getitemval=$(this).val();						
            if(getitemval==''){
              $(this).parent(".style").removeClass("inpActive");
            }
        
        });
        
      });

      
    }, 20);
 
    this.getBankaccountDetails();
  }


  ngAfterViewInit(){


    
  }
  getBankaccountDetails() {


    this.loadingBar.start();
    let data = "user_id=" + this.state.user.id;

    console.log(data);
    this.api.getBankaccountDetail(data).subscribe(
      (response) => {

        
        

        var dt: any = response;
        console.log(dt);
        if (dt.status == "200") {
 
            this.bank.account_holder_name=dt.data.account_holder_name;
            this.bank.account_no=dt.data.account_no;
            this.bank.account_type=dt.data.account_type;
            this.bank.bank_name=dt.data.bank_name;
            this.bank.branch_name=dt.data.branch_name;
            this.bank.cancel_check=dt.data.cancel_check;
            this.bank.ifsc_code=dt.data.ifsc_code;
            this.bank.city=dt.data.city;
            this.bank.image_url=dt.data.image_url;


            setTimeout(() => {
              if ($(".form_list  .input").val() == '') {
                $(".form_list  .style").removeClass("inpActive");
              }
              else {
                $(".form_list  .style").addClass("inpActive");
              }
            }, 20);
          // this.profiledata.name = dt.user_data.user_name;
          // this.profiledata.mobile = dt.user_data.mobile;
          // this.profiledata.email = dt.user_data.email;
          // this.profiledata.address = dt.user_data.address;
          // this.profiledata.address = dt.user_data.address;
          // this.profiledata.user_image_path= dt.user_data.user_image_path;
          // this.profiledata.user_image= dt.user_data.user_image;
          // if(dt.user_data.image_url !=''){

          //   $('#profimg').attr('src',dt.user_data.image_url );
          // }

          // setTimeout(() => {
          //   if ($(".form_list  .input").val() == '') {
          //     $(".form_list  .style").removeClass("inpActive");
          //   }
          //   else {
          //     $(".form_list  .style").addClass("inpActive");
          //   }
          // }, 20);
          // this.callInputFn();
        }


        else if (dt.status == "201") {

         // history.go(-1);
          //  this.global.setToast('error',this.global.toastmsg.login_invalid);

        }
        //  console.log(dt);

        this.loadingBar.stop();



      },
      (error) => {

        //   $('.preloader').fadeOut();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  callInputFn() {

    setTimeout(() => {
      (function () {
        // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!String.prototype.trim) {
          (function () {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function () {
              return this.replace(rtrim, '');
            };
          })();
        }

        [].slice.call(document.querySelectorAll('.input__field')).forEach(function (inputEl) {
          // in case the input is already filled..
          if (inputEl.value.trim() !== '') {
            classie.add(inputEl.parentNode, 'input--filled');
          }

          // events:
          inputEl.addEventListener('focus', onInputFocus);
          inputEl.addEventListener('blur', onInputBlur);
        });

        function onInputFocus(ev) {
          classie.add(ev.target.parentNode, 'input--filled');
        }

        function onInputBlur(ev) {
          if (ev.target.value.trim() === '') {
            classie.remove(ev.target.parentNode, 'input--filled');
          }
        }
      })();
    }, 20);
  }

  onUpdateProfile() {

    this.loadingBar.start();
 
    // formData.append('user_id',this.state.user.id);
    // formData.append('user_type_id', this.state.user.user_type_id);
    // formData.append('address',this.profiledata.address);
    // formData.append('profile_image',this.profiledata.image);
   
    let data="user_id="+this.state.user.id+"&bank_name="+this.state.user.user_type_id+"&branch_name="+this.profiledata.address+
              "&account_type="+ this.profiledata.image+"&ifsc_code="+this.profiledata.name+
              "&account_holder_name="+this.state.user.user_type_id+"&account_numbe="+this.state.user.user_type_id;
    console.log(data);
      this.api.addBankaccountDetail(data).subscribe(
        (response)=>
            { 



               var dt:any=response;
               console.log(dt);
              //  this.global.setToast('info',dt.message);

              //  setTimeout(() => {
              //   this.child.onReceiveProfileUpdateData(dt.data);
              //  }, 200);
              
               this.loadingBar.stop();



            },
        (error)=>{

       //   $('.preloader').fadeOut();
          //   this.spinnerService.hide();
             console.log('RESPONSE FAILED');console.log(error)}
    );


  }

  onChangeImage(fileInput: any) {


    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e: any) {
        $('#profimg').attr('src', e.target.result);
      }
     
      this.bank.cancel_check = fileInput.target.files[0];
      console.log(this.bank.cancel_check);
   //   this.uploadImage(fileInput.target.files[0]);
      reader.readAsDataURL(fileInput.target.files[0]);
    }

  }

  updateBankDetails() {

   
    const formData = new FormData();
 
    // append your data
    formData.append('user_id', this.state.user.id);
    formData.append('bank_name', this.bank.bank_name);
    formData.append('branch_name', this.bank.branch_name);
    formData.append('account_type', this.bank.account_type);
    formData.append('ifsc_code', this.bank.ifsc_code);
    formData.append('account_holder_name', this.bank.account_holder_name);
    formData.append('account_number', this.bank.account_no);
    formData.append('city', this.bank.city);
    formData.append('cancel_check', this.bank.cancel_check);

    console.log(this.bank.cancel_check);
    let appurl:any=this.global.baseAppUrl+this.global.apiUrl;
   
    this.loadingBar.start();
    $.ajax({
      type:'POST',
      url: appurl+'/user/addbankaccountdetail',
      data:formData,
      cache:false,
      contentType: false,
      processData: false,
      success:(data)=>{
        console.log(data);

        if(data.status==200){
          this.popup.onReceivePopupData({'type':'success','sent_txt':'Bank details updated successfully','primary_btn_txt':'','secondary_btn_txt':'Close'});
        }else{
          this.popup.onReceivePopupData({'type':'error','sent_txt':data.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});
        }
        
          this.loadingBar.stop();
          //this.global.setToast('info',data.message);

      },
      error: (data)=>{

        console.log(data);
        this.popup.onReceivePopupData({'type':'error','sent_txt':'Some error occurred','primary_btn_txt':'','secondary_btn_txt':'Close'});
          console.log("error");
          this.loadingBar.stop();
          console.log(data);
      }
  });



  }
  onPopupActionReceived(obj:any) {
    //  console.log(obj);
      if(obj.mode=='error'){
  
        if (obj.type == 0) {
  
          this.popup.onReceivePopupData({ 'type': '' });
        
    
        }
        else if (obj.type == 1) {
  
          this.popup.onReceivePopupData({ 'type': '' });
         // this.status.is_order_confirmed=1;
          //this.onSubmitEnquiry();
          //on primary btn clicked...
    
        }
   
      }
      else if(obj.mode=='success'){
      
        if (obj.type == 0) {
  
          //Go To Order
         
          this.popup.onReceivePopupData({ 'type': '' });
        
         
        //  this.onRedirect('my-enquiries');
        }
        else if (obj.type == 1) {
  
        //  this.onRedirect('home')
          //on primary btn clicked...
    
        }
      }
   
  
      //console.log(event);
    }

    validateIFSCCode(ifsc_code){

      console.log(ifsc_code);
      this.loadingBar.start();
 
      // formData.append('user_id',this.state.user.id);
      // formData.append('user_type_id', this.state.user.user_type_id);
      // formData.append('address',this.profiledata.address);
      // formData.append('profile_image',this.profiledata.image);
      let data:any='ifsc_code='+ifsc_code;

        this.api.validateIFSCCode(data).subscribe(
          (response)=>
              { 
  
  
  
                 var dt:any=response;
                 console.log(dt);
                 if(dt.status==200){

                  this.bank.bank_name=dt.data.BANK;
                  this.bank.branch_name=dt.data.BRANCH;
                  this.bank.city=dt.data.CITY;
                 }
                 else if(dt.status==201){

                  this.popup.onReceivePopupData({'type':'error','sent_txt':'Invalid IFSC Code','primary_btn_txt':'','secondary_btn_txt':'Close'});

                 }
                //  this.global.setToast('info',dt.message);
  
                //  setTimeout(() => {
                //   this.child.onReceiveProfileUpdateData(dt.data);
                //  }, 200);
                
                 this.loadingBar.stop();
  
  
  
              },
          (error)=>{
  
         //   $('.preloader').fadeOut();
            //   this.spinnerService.hide();
               console.log('RESPONSE FAILED');console.log(error)}
      );


    }
}
