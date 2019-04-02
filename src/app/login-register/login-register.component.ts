import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../api.service';
import { AppGlobals } from '../app.global';

declare var $: any;

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {


  loginform: boolean = false;
  forgotform: boolean = false;
  registerform: boolean = false;

  login: any = { 'mobile_email': '', 'password': '','iscaptchaverified':0,'captcha_code':'' };
  register: any = { 'name': '', 'mobile': '', 'email': '', 'password': '', 'user_type': '', 'device_type': '0', 'device_id': '', 'device_token': '', 'user_type_id': '', 'confirm_pass': '', 'otp': '', 'enteredotp': '','hidden_mobile':'','iscaptchaverified':0,'business_name':'','refer_code':'','captcha_code':'' };
  forget: any = { 'mobile_email': '', 'entered_otp': '', 'otp': '', 'password': '', 'confirm_pass': '','hidden_mobile':'' };
  state: any;
  usertypes: any = [];
  selected_user_type = '2';
  is_not_user_type_loggin: boolean = false;
  redirecturl: any;
  isresendotp: boolean = false;


  constructor(private router: Router, private aroute: ActivatedRoute, private loadingBar: LoadingBarService, private api: Api, public global: AppGlobals) {



    this.state = this.global.getAppState();
  
    
    let usertype = this.aroute.snapshot.queryParams["usertype"];
    this.redirecturl = this.aroute.snapshot.queryParams["redirecturl"];

    if (usertype != undefined && usertype == 'retailer') {

      this.is_not_user_type_loggin = true;

    }
  }



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
    this.aroute.params.subscribe(params => {

      // let url = this.router.url;
      let url: any = this.aroute.snapshot.url;
      //    alert(this.aroute.snapshot.url);
      if (url == 'login') {

        setTimeout(() => {
          this.switchView('login');
        }, 50);

        this.registerform = false;
        this.forgotform = false;

      }
      else if (url == 'sign-up') {


        setTimeout(() => {
          this.switchView('signup');
        }, 50);
        this.loginform = false;
        this.forgotform = false;
        //   this.registerform = true;



      }
      else if (url == 'forget-password') {


        this.loginform = false;
        this.registerform = false;
        this.forgotform = true;

        $('.loginPopups').css('display', 'block');
        setTimeout(() => {
          $('.btns').removeClass('active');

        }, 50);

      }


    });


    this.getUserTypes();

    //  alert(this.router.url);

  }

  getUserTypes() {

    this.loadingBar.start();

    let data = "not_in=1"+"&request_from=0";
  
    
    this.api.getUserTypes(data).subscribe(
      (response) => {
     
        

        var dt: any = response;

        this.loadingBar.stop();

        if (dt.status == 200) {

          this.usertypes = dt.data;
         

        }
        else if (dt.status == 201) {

        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );



  }


  goBack() {

    this.router.navigate(['/home']);
    // history.go(-1);
  }

  switchView(type:any) {

    $('.btns').removeClass('active');

    if (type == 'login') {
      // alert('here');
      $('.login_btn').addClass('active');

      if (this.is_not_user_type_loggin) {

        this.router.navigate(['/login'], { queryParams: { usertype: this.aroute.snapshot.queryParams["usertype"] } });

      }
      else if (this.redirecturl != undefined) {
        
        this.router.navigate(['/login'], { queryParams: { redirecturl: this.redirecturl } });

      }
      else {
        this.router.navigate(['/login']);
      }


      this.loginform = true;
      $('.loginPopups').css('display', 'block');

    }
    else if (type == 'signup') {

      $('.registerBTN').addClass('active');

      if (this.is_not_user_type_loggin) {

        this.router.navigate(['/sign-up'], { queryParams: { usertype: this.aroute.snapshot.queryParams["usertype"] } });

      }
      else if (this.redirecturl != undefined) {

        this.router.navigate(['/sign-up'], { queryParams: { redirecturl: this.redirecturl } });

      }
      else {
        this.router.navigate(['/sign-up']);
      }

      this.registerform = true;
      $('.loginPopups').css('display', 'block');
      setTimeout(() => {
        //   $('.loginPopups .designBox .innerDesign .right_data .login_steps').css('display','block');
      }, 20);




    }
  }

  onNext(type:any, step:any) {


    if (type == 'register') {

      this.registerSteps(step);
    }
    else if (type == 'login') {

      this.loginSteps(step);
    }
    else if (type == 'forget-pass') {

      this.forgetSteps(step);
    }

  }

  registerSteps(step:any) {

    if (step == '1') {
     


      if(this.register.business_name =='' && this.aroute.snapshot.queryParams["usertype"] =='retailer' ){
        this.global.setToast('error','Business name is required');

        
      }
      else{
     //   alert(this.register.mobile);
        this.register.hidden_mobile= this.setHiddenMobile(this.register.mobile.toString());
        this.getRegistrationOtp(this.register.mobile_email);
      }



      
    }
    else if (step == '2') {

    
      

      if (parseInt(this.register.enteredotp) != parseInt(this.register.otp)) {

        this.global.setToast('error', 'Invalid otp');
      }
      else if (parseInt(this.register.enteredotp) == parseInt(this.register.otp)) {

        // $('#register_form').css('display', 'none');
        // $('#register_form2').css('display', 'none');
        // $('#register_form3').css('display', 'block');  
         
          $('#register_form2').css('display', 'none');
          $('#register_form').css('display', 'none');
          $('#register_form4').css('display', 'block');


      }


    }
    else if (step == '3') {

      if (this.register.password == '') {

        this.global.setToast('error', 'Password is required');

      }
      else if (this.register.confirm_pass == '') {

        this.global.setToast('error', 'Confirm password is required');

      }
      else if (this.register.password != this.register.confirm_pass) {

        this.global.setToast('error', 'Password and confirm password should be same');
      }
      else {


      //  this.loadingBar.start();
        let data;
        if (this.is_not_user_type_loggin) {
          data = "name=" + this.register.name +"&business_name="+this.register.business_name+ "&email_id=" + this.register.email + "&mobile_no=" + this.register.mobile + "&password=" + this.register.password + "&user_type=1" + "&device_type=0&device_id=" + this.register.device_id +
           "&device_token=" + this.state.device_token + "&user_type_id=" + this.selected_user_type+
           "&refer_code="+this.register.refer_code+"&captcha_code="+this.register.captcha_code+"&login_type=0";
        }
        else {
          data = "name=" + this.register.name + "&email_id=" + this.register.email + "&mobile_no=" + this.register.mobile +
           "&password=" + this.register.password + "&user_type=1" + "&device_type=0&device_id=" +
            this.register.device_id + "&device_token=" + this.state.device_token + 
            "&user_type_id=1"+"&refer_code="+this.register.refer_code+"&captcha_code="+this.register.captcha_code+"&login_type=0";
        }



   //    console.log(data);

        this.api.registerUser(data).subscribe(
          (response) => {
         
            
            var dt: any = response;
         ///   console.log(dt);
            if (dt.status == 200) {

              this.loadingBar.stop();
              this.global.setToast('info', dt.message+", Please wait..redirecting to your dashboard.");
              this.state.user = dt.data;
              this.state.is_logged_in = true;
              this.global.saveAppState(this.state);
          

              if (this.state.user.user_type_id != '1' && this.redirecturl != undefined) {

                this.router.navigate(['/chemist-account/profile-setup'], { queryParams: { step: '1' } });
                //this.router.navigate(['/login'], { queryParams: { usertype:  this.aroute.snapshot.queryParams["usertype"] } });
              }
              else if (this.state.user.user_type_id != '1' && this.redirecturl == undefined) {

                this.router.navigate(['/chemist-account/profile-setup'], { queryParams: { step: '1' } });
                //this.router.navigate(['/login'], { queryParams: { usertype:  this.aroute.snapshot.queryParams["usertype"] } });
              }
              else if (this.redirecturl != undefined) {

                this.router.navigate(['/' + this.redirecturl]);

              }
              else {

                this.router.navigate(['/home']);

              }


            }
            else if (dt.status == 201) {
              
              this.onRefreshCaptcha('registercaptcha');
              this.global.setToast('error', dt.message);
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




      // FINAL SUBMIT

    }

  }

  loginSteps(step:any) {

    if (step == '1') {

      // if(this.login.iscaptchaverified==0){
      //   this.global.setToast('error','Please verify captcha');
      // }
      // else{
        this.loadingBar.start();
        let session_id = '';
        if (this.state.cartdata.session_id != undefined) {
          session_id = this.state.cartdata.session_id;
        }
        this.state=this.global.getAppState();
        let data = "login_id=" + this.login.mobile_email + "&password=" + this.login.password + 
                  "&device_type=0&device_id="+this.state.device_id+
                  "&device_token="+this.state.device_token +
                   "&session_id=" + session_id+"&login_type=0"+"&captcha_code="+this.login.captcha_code;
        
  //     console.log(data);
        //ecAMnAWhQuk:APA91bEu48y5vcFl27ulB49l7-JCn3pr2DtGLL-HnCFIO_Pq-e7LzmkIHxd_X-3d5uVIl1NBlKq1KBh41PjTZjSJG4BoRG5YorhbC15E2SGQhUcKAb5rD0P6e4YY7--daelQNcpEAJeA
   
       
        
  
        this.api.loginUser(data).subscribe(
          (response) => {
         
            
            this.loadingBar.stop();
  
            var dt: any = response;
           // console.log(dt);
            if (dt.status == 200) {
  
              this.global.setToast('info', dt.message);
              this.state.user = dt.data;
              this.state.is_logged_in = true;
              this.state.cartdata.cartcount = parseInt(dt.cart_count);
              this.state.cartdata.session_id=dt.session_id;
  
              this.global.saveAppState(this.state);
  
              if (this.redirecturl != undefined) {
  
                if(this.redirecturl=='chemist-listing'){
  
                  this.router.navigate(['/chemist-listing'],{queryParams:{lat:this.state.redirectdata.lat,long:this.state.redirectdata.long,
                    keywordid:this.state.redirectdata.keywordid,keywordname:this.state.redirectdata.keywordname,keywordtype:this.state.redirectdata.keywordtype,
                    enquirytype:this.state.redirectdata.enquirytype,vendorid:this.state.redirectdata.vendorid}});

                }
                if(this.redirecturl=='/chemist-account/buy-plan'){
  
                  this.router.navigate(['/chemist-account/buy-plan'],{queryParams:{type:'monthly'}});

                }
               
                else{
                
                  this.router.navigate(['/' + this.redirecturl]);
                  
                }
              
  
              }
              else if (this.state.user.user_type_id != '1' && this.redirecturl == undefined) {
  
                this.router.navigate(['/chemist-account/dashboard']);
                //this.router.navigate(['/login'], { queryParams: { usertype:  this.aroute.snapshot.queryParams["usertype"] } });
              }
              else {
  
                
                this.router.navigate(['/home']);
   
              }
  
            }
            else if (dt.status == 201) {
  
              $.toast({ title: dt.message, position: 'top', backgroundColor: 'red', textColor: '#fff' });
              this.onRefreshCaptcha('logincaptcha');
              // this.global.setToast('error',dt.message);
  
            }
  
          },
          (error) => {
  
            this.loadingBar.stop();
            //   this.spinnerService.hide();
            console.log('RESPONSE FAILED'); console.log(error)
          }
        );
  
    //  }
     
    }


  }

  forgetSteps(step:any) {

    $('.btns .login_btn').addClass('active');
    if (step == '1') {

      this.loadingBar.start();

      let data = "mobile_no=" + this.forget.mobile_email;

      
      this.api.forgetOTP(data).subscribe(
        (response) => {
   
          
          this.loadingBar.stop();

          var dt: any = response;

          if (dt.status == 200) {

            this.global.setToast('info', dt.message);
            this.forget.otp = dt.data.otp;
            $('#forgot_pass_form').css('display', 'none');
            $('#forgot_pass_OTPForm').css('display', 'block');
             this.forget.hidden_mobile= this.setHiddenMobile(this.forget.mobile_email.toString());

          }
          else if (dt.status == 201) {

            this.global.setToast('error', dt.message);

          }

        },
        (error) => {

          this.loadingBar.stop();
          //   this.spinnerService.hide();
          console.log('RESPONSE FAILED'); console.log(error)
        }
      );





    }
    else if (step == '2') {

    
      
      if (parseInt(this.forget.entered_otp) != parseInt(this.forget.otp)) {

        this.global.setToast('error', 'Invalid otp');
      }
      else {

        $('#forgot_pass_form').css('display', 'none');
        $('#forgot_pass_OTPForm').css('display', 'none');
        $('#forgot_pass_CreateForm').css('display', 'block');
      }



    }

    else if (step == '3') {

      if (this.forget.password == '') {

        this.global.setToast('error', 'Password is required');

      }
      else if (this.forget.confirm_pass == '') {

        this.global.setToast('error', 'Confirm password is required');

      }
      else if (this.forget.password != this.forget.confirm_pass) {

        this.global.setToast('error', 'Password and confirm password should be same');
      }

      else {

        this.loadingBar.start();

        let data = "mobile_no=" + this.forget.mobile_email + "&password=" + this.forget.password;
    
        

        this.api.resetPassword(data).subscribe(
          (response) => {
        
            
            this.loadingBar.stop();

            var dt: any = response;

            if (dt.status == 200) {


              this.global.setToast('info', dt.message);

              this.router.navigate(['/home']);

            }
            else if (dt.status == 201) {
              this.global.setToast('error', dt.message);
            }



          },
          (error) => {

            this.loadingBar.stop();
            //   this.spinnerService.hide();
            console.log('RESPONSE FAILED'); console.log(error)
          }
        );
      }





    }

  }

  getRegistrationOtp(field:any) {


    this.loadingBar.start();

    let data = "mobile_number=" + this.register.mobile + "&email_id=" + this.register.email;
    

    this.api.getRegisterOTP(data).subscribe(
      (response) => {

        
        this.loadingBar.stop();

        var dt: any = response;
     //  console.log(dt);
        if (dt.status == 200) {

          $('#register_form').css('display', 'none');
          $('#register_form2').css('display', 'block');
          // $('#register_form').css('display', 'none');
          // $('#register_form4').css('display', 'block');

          this.global.setToast('info', dt.message);
          this.register.otp = dt.data.otp;


        }
        else if (dt.status == 201) {
          this.global.setToast('error', dt.message);
        }



      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );



  }


  //   startTimer(duration, display) {
  //     var timer:any = duration, minutes, seconds;
  //     setInterval(function () {
  //         minutes = parseInt(timer / 60, 10)
  //         seconds = parseInt(timer % 60, 10);

  //         minutes = minutes < 10 ? "0" + minutes : minutes;
  //         seconds = seconds < 10 ? "0" + seconds : seconds;

  //         display.textContent = minutes + ":" + seconds;

  //         if (--timer < 0) {
  //             timer = duration;
  //         }
  //     }, 1000);
  // }
  onStart() {

  }

  onFinished() {
    this.isresendotp = true;
  }

  onStartResend(type) {

    if (type == 'forgetpassword') {

      this.forgetSteps('1');

    }
    else if (type == 'register') {
     // alert(this.register.mobile_email);
      this.register.hidden_mobile=this.setHiddenMobile(this.register.mobile.toString());

      this.getRegistrationOtp(this.register.mobile);
    }
    this.isresendotp = false;

  }

  
  setHiddenMobile(mobileval:any) {
   // let mobile="9911881520";
    let str=mobileval;
    let arr=[];
    for (var i = 0; i < str.length; i++) {
          
      if(i==0 || i==1 || i==8 || i==9){

       
        arr.push(str.charAt(i));
      }
      else{
        arr.push('x');
      }
         
         // str.charAt(i);

    }

   // console.log(arr.join(''));
    return arr.join('');
   
    //return mobile;

  }

  resolvedForLogin(captchaResponse: string) {
    this.login.iscaptchaverified=1;
  
    
}

verifyReferralCode(){

  this.loadingBar.start();
  let user_type_id='';
  if (this.is_not_user_type_loggin) {
    user_type_id= this.selected_user_type;
  }
  else{
    user_type_id= '1';
  }

  let data = "refcode=" + this.register.refer_code+"&user_type_id="+user_type_id;
 
  //console.log(data);
 // console.log( this.selected_user_type);
  this.api.verifyReferralCode(data).subscribe(
    (response) => {

      
      this.loadingBar.stop();

      var dt: any = response;
   //  console.log(dt);
      if (dt.status == 200) {
        
           $('#register_form').css('display', 'none');
        $('#register_form2').css('display', 'none');
        $('#register_form4').css('display', 'none');
        $('#register_form3').css('display', 'block');  
      }
      else if (dt.status == 201) {

        this.register.refer_code='';
        this.global.setToast('error', dt.message);
      }



    },
    (error) => {

      this.loadingBar.stop();
      //   this.spinnerService.hide();
      console.log('RESPONSE FAILED'); console.log(error)
    }
  );

}

onSkipReferralCode(){

  $('#register_form4').css('display', 'none');
  $('#register_form3').css('display', 'block');
}

onRefreshCaptcha(id){
  //alert(2);
  // $('#'+id).attr('src', this.captchaurl);
  this.global.onRefreshCaptcha(id);
}

}
