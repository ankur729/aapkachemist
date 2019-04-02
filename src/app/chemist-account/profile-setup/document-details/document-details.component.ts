import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../../api.service';
import { AppGlobals } from '../../../app.global';

declare var $: any;
declare var classie: any;
declare var FgGallery: any;

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {

  docdetail: any = { 'gst_number': '', 'pan_no': '', 'id_proff_name': '', 'id_proff_image': '', 'filename': '', 'id_proff_image_path': '' };
  state: any;
  idproffimage: any = '';
  constructor(private aroute: ActivatedRoute, private router: Router, public global: AppGlobals,
    private loadingBar: LoadingBarService, private api: Api) { this.state = this.global.getAppState(); }
  galleryinit: any;
  ngOnInit() {

    setTimeout(() => {
      this.galleryinit = new FgGallery('.fg-gallery', {
        cols: 1,
        style: {
          width: '50px',
          height: '50px',
        }
      })
    }, 200);

    setTimeout(() => {


      $(".style .input").on('click keypress', function () {
        $(this).parent(".style").addClass("inpActive");

        $(this).blur(function () {
          var getitemval = $(this).val();
          if (getitemval == '') {
            $(this).parent(".style").removeClass("inpActive");
          }

        });

      });

      $('.list a').removeClass('active');
      $('#profilesetup').addClass('active');

    }, 20);
    $('.fromGroup').hide();
    this.getDocumentDetails();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  getDocumentDetails() {

    let data = "user_id=" + this.state.user.id + "&data_for=4" + "&user_type_id=" + this.state.user.user_type_id;

    this.loadingBar.start();
    this.api.getProfileDetails(data).subscribe(
      (response) => {


        var dt: any = response;
        console.log(dt);


        if (dt.status == 200) {

          this.docdetail.gst_number = dt.data.doc_data.gst_number;
          this.docdetail.pan_no = dt.data.doc_data.pan_no;
          console.log(this.docdetail.id_proff_name);
          this.docdetail.id_proff_name = dt.data.doc_data.id_proff_name;
          console.log(this.docdetail.id_proff_name);
          //   this.docdetail.id_proff_image=dt.data.doc_data.id_proff_image;
          this.docdetail.id_proff_image_path = dt.data.doc_data.id_proff_image_path;
          this.idproffimage = dt.data.doc_data.id_proff_image;


          setTimeout(() => {

            
          }, 1000);


          //  this.businesstypes=dt.data;

          //  this.business_details=
          this.loadingBar.stop();
          setTimeout(() => {


            $('.fromGroup').fadeIn(800);
          }, 20);

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

  //   onNext(){
  //     // this.step=
  //      this.router.navigate(['/chemist-account/profile-setup'], { queryParams: { step:'5' } });
  //    }

  ngAfterViewInit() {

    // $(document).on('load',function () {
          
    //   if ($(".form_list  .input").val() == '') {
    //    // alert(2);
    //     $(".form_list  .style").removeClass("inpActive");
    //   }
    //   else {
       
    //     $(".form_list  .style").addClass("inpActive");
    //   }

    //  });

     $(".form_list  .style").addClass("inpActive");
  }

  onChangeImage(fileInput: any) {


    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e: any) {
        $('#idimg').attr('src', e.target.result);
      }

      this.docdetail.id_proff_image = fileInput.target.files[0];
      this.docdetail.filename = fileInput.target.files[0].name;
      this.idproffimage = this.docdetail.filename;
      // this.uploadImage(fileInput.target.files[0]);
      reader.readAsDataURL(fileInput.target.files[0]);
    }


  }

  onNext() {

    console.log(this.docdetail.id_proff_name);
    let url = this.global.baseAppUrl + this.global.apiUrl;
    var formData = new FormData();
    formData.set('user_id', this.state.user.id);
    formData.set('user_type_id', this.state.user.user_type_id);
    formData.set('gst_number', this.docdetail.gst_number);
    formData.set('pan_no', this.docdetail.pan_no);
    formData.set('id_proff_name', this.docdetail.id_proff_name);

    formData.set('id_proff_image', (this.docdetail.id_proff_image == '') ? new File([], "") : this.docdetail.id_proff_image);

    //formData.append('document_file',  this.details.document_file);


    //let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&document_id="+this.details.document_id+
    //     "&document_number="+this.details.document_number+"&expiry_date="+expirydate+"&document_file="+this.details.document_file;
    this.loadingBar.start();

    $.ajax({
      type: 'POST',
      url: url + 'user/saveproofdocument',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: (data) => {

        //   console.log(this.details);
        console.log(data);
        this.global.setToast('info', data.message);
        //    this.router.navigate(['/chemist-account/profile-setup'], { queryParams: { step:'5' } });
        //  this.dlistarr=data.data.document_data;
        //  let details:any={'user_id':'','user_type_id':'','document_id':'0','document_number':'','expiry_month':'','expiry_year':'','document_file':'','filename':''}
        //  this.details=details;
        this.loadingBar.stop();
      },
      error: function (data) {
        console.log("error");
        console.log(data);
      }
    });


  }



}
