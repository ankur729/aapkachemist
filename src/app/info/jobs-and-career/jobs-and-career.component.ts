import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
import { DomSanitizer } from '@angular/platform-browser';
 

declare var $: any;
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-jobs-and-career',
  templateUrl: './jobs-and-career.component.html',
  styleUrls: ['./jobs-and-career.component.css']
})
export class JobsAndCareerComponent implements OnInit {

  postdata:any={'job_category':'','name':'','email':'','education':'','starting_first_job':'','compnay_name':'','present_job_titile':'',
                'total_year_experience':'','notice_period':'','picture':'','company_location':'','job_categories':[]};
  success:boolean=false;
  
  constructor(private router: Router, private aroute: ActivatedRoute,
    private loadingBar: LoadingBarService, private api: Api, public global: AppGlobals,public sanitizer: DomSanitizer,
    private title: Title, private meta: Meta) {

 }
  ngOnInit() {

         
    this.title.setTitle('Jobs and Careers at Aapka Chemist');    
    this.meta.updateTag({
      name: 'description', content: "Join us at Aapka Chemist in upgrading the Indian Pharmaceutical Industry"
    });
    $("html, body").animate({ scrollTop: 0 }, "slow");

    setTimeout(() => {
   

$(".career_form .left_part .form_steps .list .next_btn").click(function(){

  var text_field = $(this).parent('.next_btn_div').next(".inside_design").find(".get_val").val();
  if (text_field != "") {
    $(this).parents(".list").removeClass("active");
    $(this).parents(".list").removeClass("active");
    $(this).parents(".list").next(".list").addClass("active");

    var total_steps = $(".career_form .left_part .form_steps .list").length
    var total_steps_number = $(".career_form .right_part .steps_count_display .list").length
    var index = $(".career_form .left_part .form_steps .list .next_btn").index(this);
    $(".career_form .right_part .steps_count_display .list").eq(index).addClass("filled");
    $(".career_form .right_part .steps_count_display .list").eq(index).find(".name").text(text_field);
    var text_length = $(".career_form .right_part .steps_count_display .list").eq(index).find(".name").text().length;
    $(".career_form .right_part .steps_count_display .list").removeClass("edit_mode");
    var name = $(".cand_name").val();
    var cand_post = $(".cand_post").val();
    $("#cand_name").text(name);
    $("#cand_post").text(cand_post);

  }

}); 

$(document).on("click" , ".career_form .right_part .steps_count_display .list.filled .style" , function(){
  $(this).parent(".list").removeClass("filled");
  $(this).parent(".list").nextAll(".list").removeClass("filled , edit_mode");
  $(this).parent(".list").addClass("edit_mode");
  var index = $(".career_form .right_part .steps_count_display .list .style").index(this);
  $(".career_form .left_part .form_steps .list").removeClass("active");
  $(".career_form .left_part .form_steps .list").eq(index).addClass("active");

});


  $().ready(function(){
  
    // Activate countdownTimer plugin on a '.countdown' element
    // $(".countdown").countdownTimer({
    //   // Set the end date for the countdown
    //   endTime: new Date("April 21, 2015 11:13:00 UTC+0200")
    // });
    
    
    // Activate notifyMe plugin on a '#notifyMe' element  
    // $("#notifyMe").notifyMe();
    
    
    // Activate bezierCanvas plugin on a #bg-canvas element
    // $("#bg-canvas").bezierCanvas({
    //   maxStyles: 10,
    //   maxLines: 100,
    //   lineSpacing: 1,
    //   colorBase: {r: 100,g: 100,b: 100},
    //   colorVariation: {r: 150, g: 120, b: 150},
    //   delayVariation: 0.5,
    //   globalAlpha: 0.5,
    //   globalSpeed: 500,
    // });
    
    // Add handler on 'Scroll down to learn more' link
    $().ready(function(){
      $(".overlap .more").click(function(e){
        e.preventDefault();
        $("body,html").animate({scrollTop: $(window).height()});
      });
    });   

    
  });



jQuery('select').each(function () {


    var $this = jQuery(this),

        numberOfOptions = jQuery(this).children('option').length;

    $this.addClass('s-hidden');

    $this.wrap('<div class="select"></div>');

    $this.after('<div class="styledSelect"></div>');

    var $styledSelect = $this.next('div.styledSelect');

    $styledSelect.text($this.children('option').eq(0).text());

    var $list = jQuery('<ul />', {

        'class': 'options'

    }).insertAfter($styledSelect);


    for (var i = 0; i < numberOfOptions; i++) {

        jQuery('<li />', {

            text: $this.children('option').eq(i).text(),

            rel: $this.children('option').eq(i).val()

        }).appendTo($list);

    }


    var $listItems = $list.children('li');


    $styledSelect.click(function (e) {

        e.stopPropagation();

        jQuery('div.styledSelect.active').each(function () {

            jQuery(this).removeClass('active').next('ul.options').hide();

        });

        jQuery(this).toggleClass('active').next('ul.options').toggle();

    });


    $listItems.click(function (e) {

        e.stopPropagation();

        $styledSelect.text(jQuery(this).text()).removeClass('active');

        $this.val(jQuery(this).attr('rel'));

        $list.hide();

    });


    jQuery(document).click(function () {

        $styledSelect.removeClass('active');

        $list.hide();

    });



});

 
    }, 200);
    this.getJobCategory();
  }

  getJobCategory(){

    this.loadingBar.start();

    let data='';

    this.api.getJobCategory(data).subscribe(
      (response) => {

        
        var dt: any = response;

        console.log(dt);
        this.loadingBar.stop();

        if (dt.status == 200) {

          this.postdata.job_categories=dt.data;
      //    this.data=dt.data;

        }
        else if (dt.status == 201) {
      //    this.router.navigate(['unauth-access']);
          //  this.global.setToast('error','Sorry, no result found');
          this.loadingBar.stop();

        }

      },
      (error) => {
       // this.router.navigate(['unauth-access']);
        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


  }

  onNext(type:any){

    // postdata:any={'job_category':'','name':'','email':'','education':'','starting_first_job':'','compnay_name':'','present_job_titile':'',
    // 'total_year_experience':'','notice_period':'','picture':'','company_location':''};


    if(type =='name'){

      if(this.postdata.name ==''){
        this.global.setToast('error','Name is required');
      }
     // console.log('name');
    }
    else if(type == 'email'){

      if(this.postdata.email ==''){
        this.global.setToast('error','Email is required');
      }


    
    }
    else if(type == 'education'){

      if(this.postdata.education ==''){
        this.global.setToast('error','Please select your education');
      }
 
    }
    else if(type == 'starting_first_job'){

      console.log(this.postdata.starting_first_job);
      if(this.postdata.starting_first_job =='' || this.postdata.starting_first_job==undefined){
        this.global.setToast('error','Please tell us are your fresher or experience');
      }

 
    }
    else if(type == 'compnay_name'){

      if(this.postdata.compnay_name ==''){
        this.global.setToast('error','Company name is required');
      }
 
    }
    else if(type == 'present_job_titile'){

      if(this.postdata.present_job_titile ==''){
        this.global.setToast('error','Please select your education');
      }
 
    }
    else if(type == 'total_year_experience'){
  
      if(this.postdata.total_year_experience ==''){
        this.global.setToast('error','Please tell us your total experience');
      }

    }
    else if(type == 'notice_period'){
    
      if(this.postdata.notice_period ==''){
        this.global.setToast('error','Please tell us your notice period');
      }

    }
    else if(type == 'picture'){

      if(this.postdata.picture ==''){
        this.global.setToast('error','Please attach your resume');
      }

 
    }
    else if(type == 'company_location'){

      if(this.postdata.company_location ==''){
        this.global.setToast('error','Please tell us your current or previous company location');
      }

 
    }
  }

  onChangeImage(fileInput: any) {


    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e: any) {
        $('#res_doc').attr('src', e.target.result);
      }
     
     // this.profiledata.image = fileInput.target.files[0];
      this.postdata.picture=fileInput.target.files[0];
      //this.uploadImage(fileInput.target.files[0]);
      reader.readAsDataURL(fileInput.target.files[0]);
    }

  }

  uploadImage(fileobj) {

    console.log(fileobj);
  
 
 



  }

  onSubmit(){

   
      console.log(this.postdata);
         // append your data
         const formData = new FormData();
    formData.append('job_category', this.postdata.job_category);
    formData.append('name',  this.postdata.name);
    formData.append('email', this.postdata.email);
    formData.append('education', this.postdata.education);
    formData.append('starting_first_job', this.postdata.starting_first_job);
    formData.append('compnay_name', this.postdata.compnay_name);
    formData.append('present_job_titile', this.postdata.present_job_titile);
    formData.append('total_year_experience', this.postdata.total_year_experience);
    formData.append('notice_period', this.postdata.notice_period);
    formData.append('company_location',this.postdata.company_location);
    formData.append('picture', this.postdata.picture);
 
    let appurl:any=this.global.baseAppUrl+this.global.apiUrl;
   
    this.loadingBar.start();
    $.ajax({
      type:'POST',
      url: appurl+'/support/addjob',
      data:formData,
      cache:false,
      contentType: false,
      processData: false,
      success:(data)=>{
        
        console.log(data);
        this.success=true;
          this.loadingBar.stop();
          //this.global.setToast('info',data.message);

      },
      error: (data)=>{
          console.log("error");
          console.log(data);
      }
  });
 

      //   formData.append('user_id', this.state.user.id);
  //   formData.append('user_type_id', this.state.user.user_type_id);
  //   formData.append('profile_image', fileobj);
  //   let appurl:any=this.global.baseAppUrl+this.global.apiUrl;
   
  //   this.loadingBar.start();
  //   $.ajax({
  //     type:'POST',
  //     url: appurl+'/support/addjob',
  //     data:formData,
  //     cache:false,
  //     contentType: false,
  //     processData: false,
  //     success:(data)=>{
   
  //         this.loadingBar.stop();
  //         //this.global.setToast('info',data.message);

  //     },
  //     error: (data)=>{
  //         console.log("error");
  //         console.log(data);
  //     }
  // });

  }

  setExperienceType(type){

    if(type=='fresher'){
      this.postdata.starting_first_job='fresher';

    }
    else if(type=='experience'){
      this.postdata.starting_first_job='experience';
      
    }
  }

  onSelectJobCategory(category:any){

    console.log(category);
    $('.job_Field_listing .list').removeClass('active');
    setTimeout(() => {
      $('#cat_'+category.id).addClass('active');
      this.postdata.job_category=category.id;
    }, 20);
    //console.log


  }

  onClosePopup(){
    this.success=false;
    this.router.navigate(['/']);

  }

}
