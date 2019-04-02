import { Component, OnInit,Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../../api.service';
import { AppGlobals } from '../../app.global';
 
declare var $: any;
@Component({
  selector: 'app-search-distributor',
  templateUrl: './search-distributor.component.html',
  styleUrls: ['./search-distributor.component.css']
})
export class SearchDistributorComponent implements OnInit {

  state:any;
  filter: any = {
    'area':'',
    'city':'',
    'pincode':'',
    
  };
data:any=[];
  lists:any=[];
  isnodatafound: boolean = false;

  @Output() nodataobj: any = { 'page': '', 'txt': '' };
  constructor(private api: Api, private loadingBar: LoadingBarService, public global: AppGlobals, private router: Router, private aroute: ActivatedRoute) { this.state = this.global.getAppState(); }

  ngOnInit() {

    $('.right_pannel').hide();
    this.data = [
      { text: 'Male', id: '5fe2555b-f201-4165-8845-115039221463' },
      { text: 'FeMale', id: 'ca22406c-350a-49e5-b0db-2714b164c560' }
    ];
    this.getList();
    setTimeout(() => {
      $('.list a').removeClass('active');
      $('#searchdistributor').addClass('active');
    }, 20);

    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  ngAfterViewInit(){
  
  }

  getCityList(){
    let url=this.global.baseAppUrl;

    // $('.js-example-basic-single').select2({
      
    //   ajax: {    
    //     url: "https://www.aapkachemist.com/admin/api/user/getcityareaajax",
    //       dataType: 'json',
    //       delay: 250,
    //       data: function (params) {
        
    //         return {
    //           q: params.term 
    //         };
    //       },
    //       processResults: function (data, params) {        
    //         console.log(data);
    //         return {
         
    //           results: data,
            
    //         };
    //       },
    //       cache: true
    //     },
    //     minimumInputLength: 1,
    //     templateResult: function (repo) {
    //       console.log(repo);
    //       if (repo.loading) return repo.text;
    
    //       var markup = repo.name;
    
    //       return markup;
    //     },
    //     templateSelection: function (repo) {		
    //       return (repo.name) || repo.text;
    //     }
    // });
  }

  getList(){

  
    if($('#areasearch').val()==null){
      this.filter.area='';
    }
    else{
      this.filter.area=$('#areasearch').val();
    }
    if($('#citysearch').val()==null){
      this.filter.city='';
    }
    else{
      this.filter.city=$('#citysearch').val();
    }
   
    let data;
 
     data="?to_user_type_id=2&lat="+this.state.userloc.lat+"&long="+this.state.userloc.long
      +"&sort_by=&page=&area="+this.filter.area+"&city="+this.filter.city+"&pincode="+this.filter.pincode;


  
    this.loadingBar.start();

    // if (this.listing.length == 0) {
    //   $('.chemist_listing').hide();
    // }

    this.api.searchDistributor(data).subscribe(
      (response) => {
     
        var dt: any = response;

        console.log(dt);
        this.callJS();
        $('.right_pannel').fadeIn(500);
        if (dt.status == 200) {

          this.isnodatafound = false;
          this.lists=dt.data.distributer_list;
          //  this.businesstypes=dt.data;
          // if(this.isfilter){
          //   //alert('3');
          //   this.listing=[];
          // }
          // let listing = dt.data.user_list;
          // this.usertypes = dt.data.login_type_list;
          // this.unitlist = dt.data.unit_list;
          // this.enquiry.product_unit = this.unitlist[0].id;
          // $('.chemist_listing').fadeIn(500);
          // for (let i = 0; i < listing.length; i++) {
          //   this.listing.push(listing[i]);
          // }
          // if (!this.iscalledjs) {
          //   this.callJs();
          // }

          // $('.Chemistlisting_Page').fadeIn(500);
          // //  this.business_details=
          // this.loadingBar.stop();

          // if(this.state.redirectdata!=''){
          //   this.state.redirectdata='';
          //   this.global.saveAppState(this.state);
          //   if(this.aroute.snapshot.queryParams["enquirytype"]!=undefined){
          //     this.toggleEnquiryPopup('',this.aroute.snapshot.queryParams["enquirytype"]);
          //     this.enquiry.vendor_id=this.aroute.snapshot.queryParams["vendorid"];
          //     this.enquiry.sendtype=this.aroute.snapshot.queryParams["enquirytype"];
          //   }
          // }
          this.loadingBar.stop();
        }
        else if (dt.status == 201) {

          this.lists=[];
          this.isnodatafound = true;
          this.nodataobj.page = 'enquiry';
          this.nodataobj.txt = "No result found";
          //  this.global.setToast('error','Sorry, no result found');
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

  onChangeCity(){
 
  }
valueChange(event:any){

 
}

resetCriteria(){


  this.filter.area='';
 
  $(".areasearch").select2("val", "");
}

callJS(){


  let url=this.global.baseAppUrl+this.global.apiUrl;
    
  setTimeout(() => {
    $('.citysearch').select2({
      placeholder: "Select City",
      allowClear: true,
      ajax: {    
        url: url+"user/getcityareaajax",
          dataType: 'json',
          delay: 250,
          data: function (params) {
        
            return {
              q: params.term,
              type:'city' 
            };
          },
          processResults: function (data, params) {        
           
            return {
         
              results: data,
            
            };
          },
          cache: true
        },
        minimumInputLength: 1,
        templateResult: function (repo) {
          
          if (repo.loading) return repo.text;
    
          var markup = repo.name;
    
          return markup;
        },
        templateSelection: function (repo) {		
          return (repo.name) || repo.text;
        }
    });

    $('.areasearch').select2({
      placeholder: "Select Area",
      ajax: {    
        url: url+"user/getcityareaajax",
          dataType: 'json',
          delay: 250,
          data: function (params) {
        
            return {
              q: params.term,
              type:'area' 
            };
          },
          processResults: function (data, params) {        
           
            return {
         
              results: data,
            
            };
          },
          cache: true
        },
        minimumInputLength: 1,
        templateResult: function (repo) {
          
          if (repo.loading) return repo.text;
    
          var markup = repo.name;
    
          return markup;
        },
        templateSelection: function (repo) {		
          return (repo.name) || repo.text;
        }
    });

  }, 20);



}
}
