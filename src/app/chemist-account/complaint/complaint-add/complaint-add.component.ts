import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../../api.service';
import {AppGlobals} from '../../../app.global';
import { PopupComponent } from '../../../popup/popup.component';
declare var $:any;

@Component({
  selector: 'app-complaint-add',
  templateUrl: './complaint-add.component.html',
  styleUrls: ['./complaint-add.component.css']
})
export class ComplaintAddComponent implements OnInit {

  state:any;
  complaint:any={'parameters':[],'parameters_id':'','subject':'','message':'','complaint_image1':'','complaint_image2':'','images_arr':[]}
  @ViewChild('popupchild') popup: PopupComponent;

  constructor(private api:Api,public global:AppGlobals,private loadingBar:LoadingBarService
            ,private router:Router) {this.state=this.global.getAppState(); }

  ngOnInit() {

    setTimeout(() => {
      $('.list a').removeClass('active');
        $('#myaddress').addClass('active');

        $(".style .input").on('click keypress',function(){
          $(this).parent(".style").addClass("inpActive");
                  
          $(this).blur(function(){
            var getitemval=$(this).val();						
              if(getitemval==''){
                $(this).parent(".style").removeClass("inpActive");
              }
          
          });
          
        });
        $('.list a').removeClass('active');
        $('#complaint').addClass('active');
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }, 20);
      
      this.getComplaintParameter();

  }

  getComplaintParameter(){

   
 

    this.api.getComplaintParameter('').subscribe(
      (response) => {
      
        

        var dt: any = response;
        
        console.log(dt);

        if (dt.status == 200) {
          
          this.complaint.parameters=dt.data;
          this.loadingBar.stop();
         

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

  onAddComplaint(){
    console.log('2');
    if(this.validateForm()){

      console.log(this.complaint);
      //this.complaint.images_arr.
      for(let i=0;i<this.complaint.images_arr.length;i++){

        //alert(i);
        if(i==0){

          this.complaint.complaint_image1=this.complaint.images_arr[i].file;

        }
        if(i==1){

          this.complaint.complaint_image2=this.complaint.images_arr[i].file;

        }

      }
      this.onSubmitComplaint();
    }
    //this.popup.onReceivePopupData({'type':'error','sent_txt':'Transaction Failed','primary_btn_txt':'','secondary_btn_txt':'Close'});
  }

  onSubmitComplaint(){
    //complaint:any={'parameters':[],'parameters_id':'','subject':'','message':'','complaint_image1':'','complaint_image2':'','images_arr':[]}
    console.log(this.complaint);
    let data="parameters_id="+this.complaint.parameters_id+"&subject="+this.complaint.subject+"&message="+this.complaint.message+
              "&user_type="+this.state.user.user_type_id+"&user_id="+this.state.user.id+"&complaint_image1="+this.complaint.complaint_image1+
              "&complaint_image2="+this.complaint.complaint_image2;
              console.log(data);
    this.loadingBar.start();
    this.api.addComplaint(data).subscribe(
      (response) => {
    

        var dt: any = response;
        
        console.log(dt);

        if (dt.status == 200) {
            
          this.complaint.parameters_id='';
          this.complaint.subject='';
          this.complaint.message='';
          this.complaint.complaint_image1='';
          this.complaint.complaint_image2='';
          this.complaint.images_arr=[]
          
          this.popup.onReceivePopupData({'type':'success','sent_txt':dt.message,'primary_btn_txt':'','secondary_btn_txt':'Close'});
        
      // let idx=    this.complaint.images_arr.findIndex(elem=>{return elem.file==image.file})
      // console.log(idx);
      // $('#imgadd').show();
      // this.complaint.images_arr.splice(idx, 1);
      
          // console.log(dt.data.social_data.facebook_url);
          
      //    this.detail.gallery_img=dt.data.gallery_img;



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


  onChangeImage(fileInput: any) {

   // console.log(this.prescription_arr);

 
   

      if (fileInput.target.files && fileInput.target.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function (e: any) {
        //  $('#docimg').attr('src', e.target.result);
        }
        
     //   this.detail.img_file = fileInput.target.files[0];
    //    this.detail.filename=fileInput.target.files[0].name;
          console.log(fileInput.target.files[0]);
         this.uploadImage(fileInput.target.files[0]);
        reader.readAsDataURL(fileInput.target.files[0]);
      }

  

    

  }


  uploadImage(file){
    // this.step=
      console.log(file);
    let url=this.global.baseAppUrl+this.global.apiUrl;
    console.log(url);
    var  formData= new FormData();
    // formData.set('prescription_file', this.state.user.id);
    // formData.set('user_type_id', this.state.user.user_type_id);
    formData.set('complaint_image', file);
 
    
    //formData.append('document_file',  this.details.document_file);
   

     //let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&document_id="+this.details.document_id+
        //     "&document_number="+this.details.document_number+"&expiry_date="+expirydate+"&document_file="+this.details.document_file;
    this.loadingBar.start();
 
    $.ajax({
      type:'POST',
      url: url+'user/savecomplaintimage',
      data:formData,
      cache:false,
      contentType: false,
      processData: false,
      success:(data)=>{
        
         console.log(data);
         let img_obj:any={'file':'','file_Path':''};
         img_obj.file=data.complaint_image;
         img_obj.file_Path=data.file_Path;
         console.log(img_obj);
     
        if(this.complaint.images_arr.length<2){
         
          this.complaint.images_arr.push(img_obj);
        }
        if(this.complaint.images_arr.length==2){
         
          $('#imgadd').hide();
        }
        
        else{
        //  this.global.setToast('error','Maximum 2 images can be uploaded');
        }
       //   this.detail.gallery_img=data.data.gallery_img;
          
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

   onRemoveImage(image){
     
    console.log(image);
    let data="complaint_image="+image.file;
  
    this.loadingBar.start();
    this.api.removeComplaintImg(data).subscribe(
      (response) => {
    

        var dt: any = response;
        
        console.log(dt);

        if (dt.status == 200) {

      let idx=    this.complaint.images_arr.findIndex(elem=>{return elem.file==image.file})
      console.log(idx);
      $('#imgadd').show();
      this.complaint.images_arr.splice(idx, 1);
      
          // console.log(dt.data.social_data.facebook_url);
          
      //    this.detail.gallery_img=dt.data.gallery_img;



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
  validateForm(){
    console.log('here');
    if(this.complaint.parameters_id==''){

      this.popup.onReceivePopupData({'type':'error','sent_txt':'Please select your complaint type','primary_btn_txt':'','secondary_btn_txt':'Close'});
      return false;
    }
    else if(this.complaint.subject==''){

      this.popup.onReceivePopupData({'type':'error','sent_txt':'Please write subject','primary_btn_txt':'','secondary_btn_txt':'Close'});
      return false;
    }
    else if(this.complaint.message==''){

      this.popup.onReceivePopupData({'type':'error','sent_txt':'Please write your complaint','primary_btn_txt':'','secondary_btn_txt':'Close'});
      return false;
    }
    else{
      return true;
    }
  }

  onPopupActionReceived(obj:any) {
    console.log(obj);
    if(obj.mode=='error'){

      if (obj.type == 0) {

        this.popup.onReceivePopupData({ 'type': '' });
        
  
      }
      else if (obj.type == 1) {

     
        //on primary btn clicked...
  
      }
 
    }
    else if(obj.mode=='success'){
    
      if (obj.type == 0) {
        
        this.popup.onReceivePopupData({ 'type': '' });

        this.router.navigate(['/chemist-account/complaint'])
        
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
