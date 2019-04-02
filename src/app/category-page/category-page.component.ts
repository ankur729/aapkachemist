import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../api.service';
import { AppGlobals } from '../app.global';
import { Meta, Title } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  state: any;

  respdata: any = {

    'category_id': '',
    'categories_list': [],
    'categories_banner_list': [],
    'top_offer_list': [],
    'top_sellers_list': [],
    'top_selling_products_list': [],
    'seo_url': ''
  }
  constructor(private aroute: ActivatedRoute, private router: Router,

    private loadingBar: LoadingBarService, private api: Api,

    public global: AppGlobals, private title: Title, private meta: Meta) { this.state = this.global.getAppState() }

  ngOnInit() {



    this.aroute.params.subscribe(params => {

      $('.categoryPage').css('visibility', 'hidden');
      //  this.respdata.category_id = this.aroute.snapshot.queryParams["id"];
      // this.respdata.name = this.aroute.snapshot.queryParams["name"];

      if (this.aroute.snapshot.paramMap.get('seourl') == undefined) {

        this.respdata.name = 'All categories';
        this.respdata.seo_url = '';

      }
      else {
        this.respdata.name = this.aroute.snapshot.paramMap.get('seourl');
        this.respdata.seo_url = this.aroute.snapshot.paramMap.get('seourl');
      }



      this.respdata.categories_list = [];
      this.respdata.categories_banner_list = [];
      this.respdata.top_offer_list = [];
      this.respdata.top_sellers_list = [];
      this.respdata.top_selling_products_list = [];

      this.getCategoriesById();

    });


    $("html, body").animate({ scrollTop: 0 }, "slow");

  }

  getCategoriesById() {


    let data;
    // if (!this.state.is_logged_in) {
    //   data = "from_user_id=&from_user_type_id=&to_user_id=" + this.todata.to_user_id + "&to_user_type_id=" + this.todata.to_user_type_id;
    // }
    // else {
    //   data = "from_user_id=" + this.state.user.id + "&from_user_type_id=" + this.state.user.user_type_id + "&to_user_id=" + this.todata.to_user_id + "&to_user_type_id=" + this.todata.to_user_type_id;
    // }
    // data = "parent_id=" +this.respdata.category_id+"&user_entity_type="+this.state.user_type+"&lat="+this.state.userloc.lat+"&long="+this.state.userloc.long;
    data = "seo_url=" + this.respdata.seo_url + "&user_entity_type=" + this.state.user_type + "&lat=" + this.state.userloc.lat + "&long=" + this.state.userloc.long;

    this.loadingBar.start();
    this.api.getCategoriesById(data).subscribe(
      (response) => {




        var dt: any = response;
        // console.log(dt);
        if (dt.status == 200) {

          this.setSEO(dt.data.categories_list);


          this.respdata.categories_list = dt.data.categories_list;
          this.respdata.categories_banner_list = dt.data.categories_banner_list;
          this.respdata.top_offer_list = dt.data.top_offer_list;
          this.respdata.top_sellers_list = dt.data.top_sellers_list;


          this.respdata.top_selling_products_list = dt.data.top_selling_products_list;
          this.callJS();
          $('.categoryPage').css('visibility', 'unset');
          $('.categoryPage').fadeIn(500);
          // let timingarr = [];
          // let timings = dt.data.business_timing;
          // timings.map(elem => { elem.istoday = '0' });

          // this.respdata.business_timing = timings;

          // if (dt.data.business_timing.length > 0) {

          //   timingarr = dt.data.business_delivery.payment_mode.split(',');
          //   dt.data.payment_mode.map(elem => {
          //     elem['ischecked'] = '0';
          //   });
          //   console.log(timingarr);
          //   for (let i = 0; i < timingarr.length; i++) {
          //     dt.data.payment_mode.map(elem => {

          //       if (elem.id == timingarr[i]) {

          //         elem['ischecked'] = '1';
          //       }

          //     })

          //   }


          // }
          // this.respdata.payment_mode = dt.data.payment_mode;

          // this.respdata.gallery_img = dt.data.gallery_img;

          // this.respdata.business_delivery.min_amt_free_delivery = dt.data.business_delivery.min_amt_free_delivery;
          // this.respdata.business_delivery.open_time = dt.data.business_delivery.open_time;
          // this.respdata.business_delivery.close_time = dt.data.business_delivery.close_time;
          // this.respdata.business_delivery.discount_percent = dt.data.business_delivery.discount_percent;
          // this.respdata.business_delivery.open_close_status = dt.data.business_delivery.open_close_status;



          // this.respdata.social_data.facebook_url = dt.data.social_data.facebook_url;
          // this.respdata.social_data.google_plus_url = dt.data.social_data.google_plus_url;
          // this.respdata.social_data.instagram_url = dt.data.social_data.instagram_url;
          // this.respdata.social_data.linkedin_url = dt.data.social_data.linkedin_url;
          // this.respdata.social_data.pinterest_url = dt.data.social_data.pinterest_url;
          // this.respdata.social_data.twitter_url = dt.data.social_data.twitter_url;

          // this.respdata.user_data.vendor_shopname = dt.data.user_data.vendor_shopname;
          // this.respdata.user_data.address = dt.data.user_data.address;
          // this.respdata.user_data.area = dt.data.user_data.area;
          // this.respdata.user_data.vendor_mobile = dt.data.user_data.vendor_mobile;
          // this.respdata.user_data.whatsapp_no = dt.data.user_data.whatsapp_no;
          // this.respdata.user_data.landline = dt.data.user_data.landline;
          // this.respdata.user_data.vendor_summary = dt.data.user_data.vendor_summary;
          // this.respdata.user_data.vendor_rating = dt.data.user_data.vendor_rating;
          // this.respdata.user_data.is_favourite = dt.data.user_data.is_favourite;
          // this.respdata.user_data.total_favourite = dt.data.user_data.total_favourite;
          //   $('.chemistDetail_page').fadeIn(800);

          //this.callJS();
          this.loadingBar.stop();

          $("html, body").animate({ scrollTop: 0 }, "slow");
          // if(this.respdata.business_timing.length>0){
          //   this.checkIfDateIsTodaysDate();
          // }

        }
        else if (dt.status == 201) {

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

  setSEO(list) {

    let parent_id = list[0].parent_id;

    if (parent_id == '190') {


      this.title.setTitle("Personal Care Products in your location : Aapka Chemist");
      this.meta.updateTag({
        name: 'description', content: "Buy Medicines online from your nearby chemist through Aapka Chemist marketplace.Get medicine delivery at doorstep through Aapka Chemist delivery app"
      });

    }
    else if (parent_id == '194') {


      this.title.setTitle("Buy Ayurvedic products Online from nearby Ayurveda medical store:Aapka Chemist App");
      this.meta.updateTag({
        name: 'description', content: "Find Ayurveda products Online through Aapka Chemist Ayurvedic Medicine App from Indian Ayurvedic medicine Store near you"
      });

    }
    else if (parent_id == '69') {


      this.title.setTitle("Buy Medical Devices Online for Healthcare : Aapka Chemist");
      this.meta.updateTag({
        name: 'description', content: "Buy Medical Devices Online from your local pharmacy with Aapka Chemist. All healthcare devices at the best prices"
      });

    }
    else if (parent_id == '983') {


      this.title.setTitle("Find medicines for your health condition : Aapka Chemist is Now Online");
      this.meta.updateTag({
        name: 'description', content: "Search for your prescriptions from your neighborhood pharmacist on Aapka Chemist. Medicine for fever and body pain, cold and cough, eye and ear care, first aid medicine, kidney care medicine, liver care medicine, menopause medicine."
      });

    }
    else if (parent_id == '974') {


      this.title.setTitle("Health and Fitness Products Online from Aapka Chemist");
      this.meta.updateTag({
        name: 'description', content: "Health and Weight loss products in India from your nearest pharmacist."
      });

    }

  }

  callJS() {

    setTimeout(() => {
      $(".OurBrands").owlCarousel({
        items: 6,
        navigation: true,
        trueslideSpeed: 300,
        paginationSpeed: 500,
        autoPlay: 5000,
        autoplayTimeout: 500,
        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: window,
      });



      // $(".banner").owlCarousel({
      //   items : 1,
      //   navigation : true,
      //   trueslideSpeed : 300,
      // paginationSpeed : 500,
      // autoPlay : 5000,
      // autoplayTimeout:500,    
      // responsive: true,
      // // responsiveRefreshRate : 200,
      // // responsiveBaseWidth: window,
      // });
      $(".banner").owlCarousel({
        // items: 1,
        // navigation: true,
        // autoPlay: true,
        // trueslideSpeed: 300,
        // paginationSpeed: 500,
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 1,
        itemsDesktop: false,
        itemsDesktopSmall: false,
        itemsTablet: false,
        itemsMobile: false

        // responsiveRefreshRate : 200,
        // responsiveBaseWidth: window,
      });

      $(".chemist_listing").owlCarousel({
        items: 3,
        navigation: true,
        trueslideSpeed: 300,
        paginationSpeed: 500,
        autoPlay: 5000,
        autoplayTimeout: 500,
        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: window,
      });


      $(".topSellingsList").owlCarousel({
        items: 5,
        navigation: true,
        trueslideSpeed: 300,
        paginationSpeed: 500,
        autoPlay: 5000,
        autoplayTimeout: 500,
        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: window,
      });





    }, 20);

  }
  navigate(category) {


    if (parseInt(category.total_count) > 0) {

      this.router.navigate(['/category/' + category.seo_url]);

    }
    else {

      this.router.navigate(['/medicine-listing/' + category.seo_url])

    }
  }

}
