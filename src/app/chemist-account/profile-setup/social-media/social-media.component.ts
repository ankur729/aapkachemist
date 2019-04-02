import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../../api.service';
import {AppGlobals} from '../../../app.global';
 
declare var $:any;
declare var classie:any;


@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  state:any;
  detail:any={'gallery_img':[],'social_data':{'facebook_url':'','google_plus_url':'','instagram_url':'','linkedin_url':'',
              'pinterest_url':'','twitter_url':''},'img_file':''};

  constructor(private aroute:ActivatedRoute,private router:Router,private api:Api,public global:AppGlobals,
               private loadingBar:LoadingBarService ) { this.state= this.global.getAppState();}

  ngOnInit() {

    this.getSocialData();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  getSocialData(){

    let data="user_id="+this.state.user.id+"&data_for=6"+"&user_type_id="+this.state.user.user_type_id;

    this.loadingBar.start();
    this.api.getProfileDetails(data).subscribe(
      (response) => {
 
        var dt: any = response;
        
     

        if (dt.status == 200) {

          // console.log(dt.data.social_data.facebook_url);
          this.detail.social_data.facebook_url=dt.data.social_data.facebook_url;
          this.detail.social_data.google_plus_url=dt.data.social_data.google_plus_url;
          this.detail.social_data.instagram_url=dt.data.social_data.instagram_url;
          this.detail.social_data.linkedin_url=dt.data.social_data.linkedin_url;
          this.detail.social_data.pinterest_url=dt.data.social_data.pinterest_url;
          this.detail.social_data.twitter_url=dt.data.social_data.twitter_url;
          this.detail.gallery_img=dt.data.gallery_img;




          this.loadingBar.stop();
         

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


  
  // onNext(){
  //   // this.step=
  //    this.router.navigate(['/chemist-account/profile-setup'], { queryParams: { step:'2' } });
  //  }

  onChangeImage(fileInput: any) {


    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e: any) {
      //  $('#docimg').attr('src', e.target.result);
      }
      
      this.detail.img_file = fileInput.target.files[0];
  //    this.detail.filename=fileInput.target.files[0].name;
  
      this.uploadImage(this.detail.img_file);
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    

  }



  uploadImage(file){
    // this.step=
    console.log(file);
    let url=this.global.baseAppUrl+this.global.apiUrl;
    var  formData= new FormData();
    formData.set('user_id', this.state.user.id);
    formData.set('user_type_id', this.state.user.user_type_id);
    formData.set('img_file', file);
 
    
    //formData.append('document_file',  this.details.document_file);
   

     //let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&document_id="+this.details.document_id+
        //     "&document_number="+this.details.document_number+"&expiry_date="+expirydate+"&document_file="+this.details.document_file;
    this.loadingBar.start();
 
    $.ajax({
      type:'POST',
      url: url+'user/savegalleryimg',
      data:formData,
      cache:false,
      contentType: false,
      processData: false,
      success:(data)=>{
        
        console.log(data);
          this.detail.gallery_img=data.data.gallery_img;
          
        //   console.log(this.details);
        //   this.global.setToast('info',data.message);
        //  this.dlistarr=data.data.document_data;
        //  let details:any={'user_id':'','user_type_id':'','document_id':'0','document_number':'','expiry_month':'','expiry_year':'','document_file':'','filename':''}
        //  this.details=details;
         this.loadingBar.stop();
      },
      error: function(data){
          console.log("error");
          console.log(data);
      }
  });

 
   }


   onSubmit(){

    let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&facebook_url="+this.detail.social_data.facebook_url
              +"&twitter_url="+this.detail.social_data.twitter_url+"&linkedin_url="+this.detail.social_data.linkedin_url
              +"&google_plus_url="+this.detail.social_data.google_plus_url+"&instagram_url="+this.detail.social_data.pinterest_url;
  
    this.loadingBar.start();
    this.api.updateSocialLinks(data).subscribe(
      (response) => {
   

        var dt: any = response;
        
        this.loadingBar.stop();

        if (dt.status == 200) {

          this.global.setToast('info',dt.message);
          this.router.navigate(['/chemist-account/profile-setup'], { queryParams: { step:'1' } });
        }
        else if (dt.status == 201) {
          this.global.setToast('error',dt.message);
        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );
   }

   onRemoveImage(image){
    let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&gallery_id="+image.id;
  
    this.loadingBar.start();
    this.api.removeShopImage(data).subscribe(
      (response) => {
    

        var dt: any = response;
        
     

        if (dt.status == 200) {

          // console.log(dt.data.social_data.facebook_url);
          
          this.detail.gallery_img=dt.data.gallery_img;



          this.loadingBar.stop();
         

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
}
