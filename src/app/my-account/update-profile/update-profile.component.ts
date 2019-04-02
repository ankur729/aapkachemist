import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { HeaderComponent } from '../../incl/header/header.component';
import { MyAccountLeftPanelComponent } from '../my-account-left-panel/my-account-left-panel.component';
import { PopupComponent } from '../../popup/popup.component';
declare var classie: any;
declare var $: any;


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  state: any;
  profiledata: any = { 'name': '', 'mobile': '', 'email': '', 'address': '', 'image': '', 'user_image_path': '' };
 
  constructor(private api: Api, private loadingBar: LoadingBarService, public global: AppGlobals, private router: Router, private aroute: ActivatedRoute) { this.state = this.global.getAppState(); }
  @ViewChild('child')
  public child: HeaderComponent;
  @ViewChild('popupchild') popup: PopupComponent;
  @ViewChild('appleftpanel') leftpanel:MyAccountLeftPanelComponent;


  ngOnInit() {

 
    setTimeout(() => {

      $('.list a').removeClass('active');
      $('#updateprofile').addClass('active');
 
    }, 20);
    this.getUserProfile();
  }


  getUserProfile() {


    this.loadingBar.start();
    let data = "user_id=" + this.state.user.id + "&user_type_id=" + this.state.user.user_type_id;
  
    this.api.getUserProfile(data).subscribe(
      (response) => {

      

        var dt: any = response;
        if (dt.status == "200") {

          this.profiledata.name = dt.user_data.user_name;
          this.profiledata.mobile = dt.user_data.mobile;
          this.profiledata.email = dt.user_data.email;
          this.profiledata.address = dt.user_data.address;
          this.profiledata.user_image_path = dt.user_data.user_image_path;
          this.profiledata.user_image = dt.user_data.user_image;
          $("html, body").animate({ scrollTop: 0 }, "slow");
          if (dt.user_data.image_url != '') {

            $('#profimg').attr('src', dt.user_data.image_url);
          }
          this.callInputFn();
        }

        


        else if (dt.status == "201") {

          history.go(-1);
          //  this.global.setToast('error',this.global.toastmsg.login_invalid);

        }
        //  console.log(dt);
        setTimeout(() => {
                  if ($(".form_list .input").val() == '') {
                  $(".form_list .style").removeClass("inpActive");
                  }
                  else {
                  $(".form_list .style").addClass("inpActive");
                  }
                  }, 200);
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
      // (function () {
      //   // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
      //   if (!String.prototype.trim) {
      //     (function () {
      //       // Make sure we trim BOM and NBSP
      //       var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      //       String.prototype.trim = function () {
      //         return this.replace(rtrim, '');
      //       };
      //     })();
      //   }

      //   [].slice.call(document.querySelectorAll('.input__field')).forEach(function (inputEl) {
      //     // in case the input is already filled..
      //     if (inputEl.value.trim() !== '') {
      //       classie.add(inputEl.parentNode, 'input--filled');
      //     }

      //     // events:
      //     inputEl.addEventListener('focus', onInputFocus);
      //     inputEl.addEventListener('blur', onInputBlur);
      //   });

      //   function onInputFocus(ev) {
      //     classie.add(ev.target.parentNode, 'input--filled');
      //   }

      //   function onInputBlur(ev) {
      //     if (ev.target.value.trim() === '') {
      //       classie.remove(ev.target.parentNode, 'input--filled');
      //     }
      //   }
      // })();
    }, 20);
  }

  onUpdateProfile() {

    this.loadingBar.start();

    // formData.append('user_id',this.state.user.id);
    // formData.append('user_type_id', this.state.user.user_type_id);
    // formData.append('address',this.profiledata.address);
    // formData.append('profile_image',this.profiledata.image);

    let data = "user_id=" + this.state.user.id + "&user_type_id=" + this.state.user.user_type_id + "&address=" + this.profiledata.address + "&profile_image=" + this.profiledata.image + "&name=" + this.profiledata.name;
   
    this.api.updateUserProfile(data).subscribe(
      (response) => {

        var dt: any = response;
        this.state.user.first_name=this.profiledata.name;

        this.popup.onReceivePopupData({'type':'success','sent_txt':'Profile updated successfully.','primary_btn_txt':'','secondary_btn_txt':'Close'});

    //  this.global.saveAppState(this.state);
       // this.global.setToast('info', dt.message);
        this.child.onReceiveProfileUpdateData(dt.data);
      //  onReceiveProfileUpdateData
        this.loadingBar.stop();



      },
      (error) => {

        //   $('.preloader').fadeOut();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


  }

  onChangeImage(fileInput: any) {


    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e: any) {
        $('#profimg').attr('src', e.target.result);
      }
     
      this.profiledata.image = fileInput.target.files[0];

      this.uploadImage(fileInput.target.files[0]);
      reader.readAsDataURL(fileInput.target.files[0]);
    }

  }

  uploadImage(fileobj) {

 
    const formData = new FormData();

    this.loadingBar.start();
    // append your data
    formData.append('user_id', this.state.user.id);
    formData.append('user_type_id', this.state.user.user_type_id);
    formData.append('profile_image', fileobj);
    let appurl:any=this.global.baseAppUrl+this.global.apiUrl;
 
    $.ajax({
      type: 'POST',
      url: appurl+'/user/updateprofile',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success:  (data)=> {
        
      
        this.leftpanel.onUpdateProfileImage(data);
        this.loadingBar.stop();
        //this.global.setToast('info',data.message);

      },
      error:  (data)=> {
        console.log("error");
        console.log(data);
      }
    });

  }
  onPopupActionReceived(obj:any) {
    console.log(obj);
    if(obj.mode=='error'){

      if (obj.type == 0) {

        this.popup.onReceivePopupData({ 'type': '' });
        this.router.navigate(['/my-account/wallet']);
  
      }
      else if (obj.type == 1) {

     
        //on primary btn clicked...
  
      }
 
    }
    else if(obj.mode=='success'){
    
      if (obj.type == 0) {
        
        this.popup.onReceivePopupData({ 'type': '' });
        this.router.navigate(['/my-account/update-profile']);
        //Go To Order
      //  this.onRedirect('home')
        
      }
      else if (obj.type == 1) {

     //   this.popup.onReceivePopupData({ 'type': '' });
      //  this.onRedirect('my-enquiries');
        //on primary btn clicked...
  
      }
    }
 

    //console.log(event);
  }

}
