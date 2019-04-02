import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../../api.service';
import { AppGlobals } from '../../../app.global';

declare var $: any;
declare var classie: any;
declare var FgGallery:any;

@Component({
  selector: 'app-registration-detail',
  templateUrl: './registration-detail.component.html',
  styleUrls: ['./registration-detail.component.css']
})
export class RegistrationDetailComponent implements OnInit {

  is_show_list: boolean = false;
  expirymonth: any = [];
  expiryyear: any = [];
  state: any;
  dllist: any;
  dlistarr: any = [];
  details: any = { 'user_id': '', 'user_type_id': '', 'document_id': '0', 'document_number': '', 'expiry_month': '', 'expiry_year': '', 'document_file': '', 'filename': '','filename1': '','filename2': '' }
  form: any = {

    first: { 'document_caption': '', 'document_file_path': '', 'document_id': '', 'document_number': '', 'expiry_date': '' },
    second: { 'document_caption': '', 'document_file_path': '', 'document_id': '', 'document_number': '', 'expiry_date': '' },

  }
  galleryinit:any;
  constructor(private aroute: ActivatedRoute, private router: Router, public global: AppGlobals,
    private loadingBar: LoadingBarService, private api: Api) { this.state = this.global.getAppState(); }

  ngOnInit() {
    
    setTimeout(() => {
      this.galleryinit = new FgGallery('.fg-gallery', {
        cols: 1,
        style: {
          width: '50px',
          height: '50px',
        }
      });
      this.galleryinit = new FgGallery('.fg-gallery-2', {
        cols: 1,
        style: {
          width: '50px',
          height: '50px',
        }
      })
    }, 200);
 

    setTimeout(() => {
      
      $('.list a').removeClass('active');
      $('#profilesetup').addClass('active');
      $(".style .input").on('click keypress',function(){
        $(this).parent(".style").addClass("inpActive");
                
        $(this).blur(function(){
          var getitemval=$(this).val();						
            if(getitemval==''){
              $(this).parent(".style").removeClass("inpActive");
            }
        
        });
        
      });

      // $('.meterBar').on('change.owl.carousel', function(e) {
      //   if (e.namespace && e.property.name === 'position' 
      //   && e.relatedTarget.relative(e.property.value) === e.relatedTarget.items().length - 1) {
      //   // put your stuff here ...
      //   console.log('last slide')
      //   }
      //   });

     
    }, 20);

 

    $('.drugLicenceList').hide();

    let list = this.global.getNextYearList(10);
    this.expirymonth = list.month;
    this.expiryyear = list.year;
    this.getDLDetails();
 
    $("html, body").animate({ scrollTop: 0 }, "slow");

  }

  getDLDetails() {

    let data = "user_id=" + this.state.user.id + "&data_for=2" + "&user_type_id=" + this.state.user.user_type_id;

    this.loadingBar.start();
    this.api.getProfileDetails(data).subscribe(
      (response) => {
      

        var dt: any = response;

        console.log(dt);  

        if (dt.status == 200) {

          this.setFormData(dt.data);
          // this.dllist=dt.data;
          // console.log(this.dllist);
          // this.dlistarr=dt.data.document_data;

          // if( this.dllist.document_data.length>0){


          // }
 


          this.loadingBar.stop();


        }
        else if (dt.status == 201) {
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


  setFormData(form) {
    //   first:{'document_caption':'','document_file_path':'','document_id':'','document_number':'','expiry_date':''},

    if(form.document_data.length==2){
      
    this.form.first.document_caption = form.document_data[0].document_caption;
    this.form.first.document_file_path = form.document_data[0].document_file_path;
    this.form.first.document_id = form.document_data[0].document_id;
    this.form.first.document_number = form.document_data[0].document_number;
    this.form.first.expiry_date_mm = form.document_data[0].expiry_date.split('-')[0];
    this.form.first.expiry_date_yy = form.document_data[0].expiry_date.split('-')[1];


    this.form.second.document_caption = form.document_data[1].document_caption;
    this.form.second.document_file_path = form.document_data[1].document_file_path;
    this.form.second.document_id = form.document_data[1].document_id;
    this.form.second.document_number = form.document_data[1].document_number;
    this.form.second.expiry_date_mm = form.document_data[1].expiry_date.split('-')[0];
    this.form.second.expiry_date_yy = form.document_data[1].expiry_date.split('-')[1];

    }else{

      if(form.document_data.length==0){

        this.form.first.document_caption = form.document_list[0].document_caption;
        this.form.first.document_id=form.document_list[0].id;
        this.form.second.document_caption = form.document_list[1].document_caption;
        this.form.second.document_id = form.document_list[1].id;
      }
      else   if(form.document_data.length==1){

        this.form.first.document_caption = form.document_data[0].document_caption;
        this.form.first.document_file_path = form.document_data[0].document_file_path;
        this.form.first.document_id = form.document_data[0].document_id;
        this.form.first.document_number = form.document_data[0].document_number;
        this.form.first.expiry_date_mm = form.document_data[0].expiry_date.split('-')[0];
        this.form.first.expiry_date_yy = form.document_data[0].expiry_date.split('-')[1];

        this.form.second.document_caption = form.document_list[1].document_caption;
        this.form.second.document_id = form.document_list[1].id;
        // this.form.second.document_caption = form.document_list[1].document_caption;
        // this.form.second.document_id = form.document_list[1].id;
      }else{

        this.form.first.document_caption = form.document_list[0].document_caption;
        this.form.first.document_id=form.document_list[0].id;
        this.form.second.document_caption = form.document_list[1].document_caption;
        this.form.second.document_id = form.document_list[1].id;
      }
      
    }
    
    setTimeout(() => {
      
      $(document).ready(function(){
     
        if ($(".form_list  .input").val() == '') {
          $(".form_list  .style").removeClass("inpActive");
        }
        else {
          $(".form_list  .style").addClass("inpActive");
        }
  });
    }, 20);
    

  }
  onChangeImage(fileInput: any, type) {


    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e: any) {

        if (type == '1') {
          $('#img1').attr('src', e.target.result);

        }
        else{
          $('#img2').attr('src', e.target.result);
        }
       
      }

      this.details.document_file = fileInput.target.files[0];
      this.details.filename = fileInput.target.files[0].name;
      if (type == '1') {

        this.form.first.document_file = fileInput.target.files[0];
        this.details.filename1 = fileInput.target.files[0].name;
      //  $("#img1").attr("src", fileInput.target.files[0]);
    
      }
      else if (type == '2') {

        this.form.second.document_file = fileInput.target.files[0];
        this.details.filename2 = fileInput.target.files[0].name;
      }


      //console.log(this.details.document_file);
      // this.uploadImage(fileInput.target.files[0]);
      reader.readAsDataURL(fileInput.target.files[0]);
    }


  }



  onNext(type) {

    let url = this.global.baseAppUrl + this.global.apiUrl;
    if (type == '1') {

  
      this.state.user.id
      this.state.user.user_type_id;
      this.details.document_number;
   

      let expirydate = this.form.first.expiry_date_mm + "-" + this.form.first.expiry_date_yy;
   
      var formData = new FormData();
      formData.set('user_id', this.state.user.id);
      formData.set('user_type_id', this.state.user.user_type_id);
      formData.set('document_id',  this.form.first.document_id);
      formData.set('document_number', this.form.first.document_number);
      formData.set('expiry_date', expirydate);
      formData.set('document_file', this.form.first.document_file);

      //formData.append('document_file',  this.details.document_file);


      //let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&document_id="+this.details.document_id+
      //     "&document_number="+this.details.document_number+"&expiry_date="+expirydate+"&document_file="+this.details.document_file;
      this.loadingBar.start();
   
      $.ajax({
        type: 'POST',
        url: url + 'user/savedocumentregistration',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: (data) => {
  
      //    console.log(this.details);
           this.global.setToast('info', data.message);
          // this.dlistarr = data.data.document_data;
          // let details: any = { 'user_id': '', 'user_type_id': '', 'document_id': '0', 'document_number': '', 'expiry_month': '', 'expiry_year': '', 'document_file': '', 'filename': '' }
          // this.details = details;
          this.loadingBar.stop();
        },
        error: function (data) {
          console.log("error");
          console.log(data);
        }
      });



    }
    else if (type == '2') {

      
      this.state.user.id
      this.state.user.user_type_id;
      this.details.document_number;
     

      let expirydate = this.form.second.expiry_date_mm + "-" + this.form.second.expiry_date_yy;

      var formData = new FormData();
      formData.set('user_id', this.state.user.id);
      formData.set('user_type_id', this.state.user.user_type_id);
      formData.set('document_id',  this.form.second.document_id);
      formData.set('document_number', this.form.second.document_number);
      formData.set('expiry_date', expirydate);
      formData.set('document_file', this.form.second.document_file);

      //formData.append('document_file',  this.details.document_file);


      let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&document_id="+this.details.document_id+
          "&document_number="+this.details.document_number+"&expiry_date="+expirydate+"&document_file="+this.details.document_file;
      this.loadingBar.start();

      $.ajax({
        type: 'POST',
        url: url + 'user/savedocumentregistration',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: (data) => {

      //    console.log(this.details);
          this.global.setToast('info', data.message);
          // this.dlistarr = data.data.document_data;
          // let details: any = { 'user_id': '', 'user_type_id': '', 'document_id': '0', 'document_number': '', 'expiry_month': '', 'expiry_year': '', 'document_file': '', 'filename': '' }
          // this.details = details;
          this.loadingBar.stop();
        },
        error: function (data) {
          console.log("error");
          console.log(data);
        }
      });


    }
    else{
      this.router.navigate(['/chemist-account/profile-setup'],{queryParams:{'step':'3'}})
    }

    // this.step=
    //   let expirydate=this.details.expiry_month+"-"+this.details.expiry_year;
    //   let url=this.global.baseAppUrl+this.global.apiUrl;
    //   var  formData= new FormData();
    //   formData.set('user_id', this.state.user.id);
    //   formData.set('user_type_id', this.state.user.user_type_id);
    //   formData.set('document_id', this.details.document_id);
    //   formData.set('document_number', this.details.document_number);
    //   formData.set('expiry_date', expirydate);
    //   formData.set('document_file', this.details.document_file);

    //   //formData.append('document_file',  this.details.document_file);


    //    //let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&document_id="+this.details.document_id+
    //       //     "&document_number="+this.details.document_number+"&expiry_date="+expirydate+"&document_file="+this.details.document_file;
    //   this.loadingBar.start();
    //   console.log(formData);
    //   console.log(formData.get('user_id'));
    //   $.ajax({
    //     type:'POST',
    //     url: url+'user/savedocumentregistration',
    //     data:formData,
    //     cache:false,
    //     contentType: false,
    //     processData: false,
    //     success:(data)=>{
    //         console.log("success");
    //         console.log(data);
    //         console.log(this.details);
    //         this.global.setToast('info',data.message);
    //        this.dlistarr=data.data.document_data;
    //        let details:any={'user_id':'','user_type_id':'','document_id':'0','document_number':'','expiry_month':'','expiry_year':'','document_file':'','filename':''}
    //        this.details=details;
    //        this.loadingBar.stop();
    //     },
    //     error: function(data){
    //         console.log("error");
    //         console.log(data);
    //     }
    // });


  }

  toggleList() {

    if (!this.is_show_list) {

      this.is_show_list = true;
      $('.drugLicenceList').slideDown()
    }
    else if (this.is_show_list) {

      this.is_show_list = false;
      $('.drugLicenceList').slideUp()
    }

  }

  onEdit(list) {

    let expiry: any = list.expiry_date.split('-');
    let e_month = expiry[0];
    let e_year = expiry[1];

    this.details.document_id = list.document_id;
    this.details.document_number = list.document_number;
    this.details.expiry_month = e_month;
    this.details.expiry_year = e_year;
    this.details.document_id = list.document_id;
    this.details.document_id = list.document_id;

    $('.input--nao').addClass('input--filled');
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }


  onDelete(list) {

    this.loadingBar.start();
    let data = "user_id=" + this.state.user.id + "&user_type_id=" + this.state.user.user_type_id + "&document_id=" + list.id;

    this.api.removeRetailerReg(data).subscribe(
      (response) => {
   
        var dt: any = response;



        if (dt.status == 200) {

          this.dlistarr = dt.data.document_data;
          this.global.setToast('info', dt.message);



        }
        else if (dt.status == 201) {

        }
        this.loadingBar.stop();
      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );
  }

  formatString(str) {

    let first = str.slice(0, 2);
    let second = str.slice(5, 7);
    let final_string = first + "/" + second;
 
    return final_string;
  }
}
