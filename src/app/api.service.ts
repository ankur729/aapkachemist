import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, } from '@angular/router';

//import { Headers} from '@angular/http';
// import {HomeCleaning } from './home-cleaning.model';
import { AppGlobals } from './app.global';

import 'rxjs/Rx';

@Injectable()

export class Api {

  options: any;
  retryval: number = 2;
    //  headers:any = new HttpHeaders();
    // headers.append("Authorization", "Basic " + btoa('accessapiapcad8923YN23' + ":" + 'X45$%&8mnhj%67^7SDfds#$35'));
    // headers.append("Authorization", "Basic AIzaSyBZyR2OW1Ddjd8F9RvBOWEh_Tc8r6C2wYM"); 
    // headers.append("Content-Type", "application/x-www-form-urlencoded");
    
  constructor(private http: HttpClient, private _global: AppGlobals, private router: Router) {



  }

  //    getHomeData(id){

  //     return  this.http.get(this._global.baseAppUrl+this._global.apiUrl+'home/home/'+id).map(x=>{
  //         return x;
  //     });

  //   }


  getHomeData(id: any) {

    return this.http.get(this._global.baseAppUrl + this._global.apiUrl + 'baseapi/home/' + id, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);


  }

  loginUser(data: any) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/logincustomer',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getRegisterOTP(data: any) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/registerotp',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  registerUser(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/registercustomer',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getUserTypes(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getusertypes',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }




  forgetOTP(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/userforgotpassotp',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);


  }

  resetPassword(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/userresetpass',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);



  }

  getSearchData(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'product/getsearch/', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);



  }

  addAddress(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/saveuseraddress/', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);
  }

  getUserAddressList(data) {


    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getaddressdata/', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);

  }

  removeAddressById(data) {


    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/removeaddress/', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);

  }

  getAddressById(data) {


    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getaddressdata/', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);
  }

  getProductDataById(data) {


    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'product/getproductdetails/', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);
  }

  updateCart(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + '/cart/addtocart/', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);

  }

  removeCartItemApi(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + '/cart/removecart', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);

  }


  validateOrCreateSession() {

    let state = this._global.getAppState();

    console.log(state);
    return true;
    // if (state.cartdata.session_id == '' && state.is_logged_in == false) {


    //   return false;

    // }
    // else if (state.cartdata.session_id != '' && state.is_logged_in == false) {


    //   return false;

    // }
    // else if (state.cartdata.session_id != '' && state.is_logged_in == true) {


    //   return true;

    // }
    // else{

    // }
  }

  addToCartFn(productdata) {

    let state = this._global.getAppState();

    let cdata = { 'sessionid': '', 'user_id': '', 'product_id': '', 'product_qty': '' };


    cdata.sessionid = state.cartdata.session_id;
    cdata.user_id = state.user.id;
    cdata.product_id = productdata.product_id;
    cdata.product_qty = productdata.product_qty;


    // this.global.updateCart(cdata);
    console.log(cdata);

    let data = "session_id=" + cdata.sessionid + "&user_id=" + cdata.user_id + "&product_id=" + cdata.product_id + "&product_qty=" + cdata.product_qty;
    console.log(data);

    this.updateCart(data).subscribe(
      (response) => {
        console.log('IN SEO');
        console.log(response);

        var dt: any = response;

        //    this.global.setToast('info',dt.message);

        if (dt.status == 200) {

          this._global.setToast('info', dt.message);

          // let state:any=this._global.getAppState();
          // state.cartdata.customer_discount_wallet_amount=dt.customer_discount_wallet_amount;
          // this._global.saveAppState(state);
          //this.state.cartdata.
          //     this.addresses=dt.data;
          this.router.navigate(['/cart-step-one']);

        }
        else if (dt.status == 201) {

          // this.is_result_get=false;
          // this.searchresp=[];
        }




      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );




  }


  removeCartItem(productdata) {


    let state = this._global.getAppState();

    let cdata = { 'removecart': '1', 'rowid': '', 'session_id': '', 'user_id': '' };



    cdata.user_id = state.user.id;
    cdata.rowid = productdata.rowid;
    cdata.session_id = state.cartdata.session_id;


    // this.global.updateCart(cdata);
    console.log(cdata);

    let data = "session_id=" + cdata.session_id + "&user_id=" + cdata.user_id + "&rowid=" + cdata.rowid + "&removecart=" + cdata.removecart;
    console.log(data);

    this.removeCartItemApi(data).subscribe(
      (response) => {
        console.log('IN SEO');
        console.log(response);


        var dt: any = response;

        //    this.global.setToast('info',dt.message);

        if (dt.status == 200) {

          this._global.setToast('info', dt.message);
          //     this.addresses=dt.data;
          //      this.router.navigate(['/cart-step-one']);


        }
        else if (dt.status == 201) {

          // this.is_result_get=false;
          // this.searchresp=[];
        }




      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );



  }

  getPreferences(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'cart/getpreferences',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }



  generateEnquiry(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/generateenquiry',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getOrdersOrEnquires(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/getorderlist',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getOrderOrEnquiryDetail(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/getorderdetails',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getUserProfile(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getuserprofile',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  updateUserProfile(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/updateprofile',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }





  fetchCartData(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'cart/getcartdata',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);


  }

  getUserRealtions(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getuserrelation',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getBusinessTypes(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getuserbusinesstype',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  updateBusinessDetails(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/updatebusinessdetails',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  getProfileDetails(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getprofiledetails',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  updateUserPassword(data) {


    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/updatepassword',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  addRetailerReg(data) {

    console.log(data);
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/savedocumentregistration',
      data, this._global.httpOptionsWithFileUpload).map(x => {

        return x;
      }).retry(this.retryval);

  }

  removeRetailerReg(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/removedocumentregistration',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);


  }
  updateBusinessTiming(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/updatebusinesstime',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  updateBusinessTime(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/updatebusinessopenclosetime',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  updateBusinessDelivery(data) {


    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/updatebusinessdelivery',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  updateSocialLinks(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/updatesociallinks',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  removeShopImage(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/removeimagegallery',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  getUserListing(data) {

    return this.http.get(this._global.baseAppUrl + this._global.apiUrl + 'user/getuserlist' + data, this._global.httpOptions).map(x => {

      return x;
    }).retry(this.retryval);

  }

  getVendorDetail(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getuserdetails',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  addRemoveToFavourites(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/addremovetofavourite',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);


  }

  getProductListing(data) {

    return this.http.get(this._global.baseAppUrl + this._global.apiUrl + 'product/getproductlist' + data,
      this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  getDateTimeSlots(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'cart/getdatetimeslots',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);


  }

  makeDefaultAddress(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/makedefaultaddress',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }


  getKeywordsByMapCategory(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getkeywordsbymapcategory',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);


  }

  saveBussinessMapping(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/savebussinessmapping',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getMappingCategoryByType(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getmappingcategorybytype',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  enquiryOTP(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/enquiryotp',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  enquiryNow(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/enquirynow',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  fetchHomeData(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'home/gethomedata',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  getUserListByType(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'home/getuserlistbytype',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  getVendorEnquiryList(data) {

    return this.http.get(this._global.baseAppUrl + this._global.apiUrl + 'enquiry/getvendorenquirylist' + data,
      this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getVendorEnquiryDetail(data) {


    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'enquiry/getvendorenquiryitemdetail',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);


  }

  sendQuotation(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'enquiry/sendquotation',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  confirmOrder(data) {


    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/confirmorder',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  getCategoriesById(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'home/getcategories',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getNotificationList(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'notifications/getnotificationlist',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  getFavourites(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getfavourites',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  helpCenter(data) {



    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'support/help',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }
  addMoneyToWallet(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/addmoneytowallet',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  walletList(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getwalletlistbyuserid',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  buyInquiryByVendor(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/buyinquirybyvendor',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  sendAppThroughSMS(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'support/sendappthroughsms',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }
  getFooterCategories(data) {
    return this.http.get(this._global.baseAppUrl + this._global.apiUrl + 'support/getfootercat').map(x => {
      return x;
    });

  }

  getVendorDashboard(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getvendordashboard',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  updateOrderStatus(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/updateorderstatus',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  clearUserDeviceData(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'notifications/cleandevicetoken',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  deactivateAccount(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/deactivateaccount',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  generateChecksum(data) {

    return this.http.post(this._global.baseAppUrl + 'paytm/generatechecksum',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  generateChecksumPayu(data) {

    return this.http.post(this._global.baseAppUrl + 'paytm/generatechecksumpayu',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }


  getCmsData(seourl) {

    console.log(this._global.baseAppUrl + this._global.apiUrl + 'pages/' + seourl);
    
    return this.http.get(this._global.baseAppUrl + this._global.apiUrl + 'pages/' + seourl).map(x => {
      return x;
    });

  }

  getWalletNormalListByUserid(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getwalletnormallistbyuserid',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  getPlanListByTime(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'plan/getplanlistbytime',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  getPackageHistory(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getplanhistory',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  onConfirmDelivery(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/confirmorderdeliverypin',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }
  searchDistributor(data) {

    console.log(this._global.baseAppUrl + this._global.apiUrl + 'user/' + data);
    return this.http.get(this._global.baseAppUrl + this._global.apiUrl + 'user/getdistributorsearch' + data).map(x => {
      return x;
    });

  }

  getPressrelease(data) {

    // return this.http.get(this._global.baseAppUrl + this._global.apiUrl + 'media/medialist').map(x => {
    //   return x;
    // });
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'media/medialist',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }
  getEventDetail(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'media/mediadetail',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }
  getContactUsData(data) {


    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'support/getcontactusdata',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);


  }

  submitContactUsData(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'support/help',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }
  getUserRefferal(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getuserreferral',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getMyOfferList(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'offer/getmyofferlist',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }
  getVendorOffersList(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'offer/getvendoroffers',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  addOffer(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'offer/addoffer',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  subscribeEmail(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'newsletter/subscribenewsletter',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  editOffer(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'offer/editoffer',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  updateOffer(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'offer/updateoffer',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  emptyCart(data) {


    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'cart/emptycart',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  showProductDetail(data) {


    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'enquiry/getproductdetail',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  getJobCategory(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'support/jobandcarrers',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getSiteMap(data) {
    return this.http.get(this._global.baseAppUrl + this._global.apiUrl + 'support/sitemap').map(x => {
      return x;
    });

  }

  getNewEnquiryList(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'enquiry/getnewenquirylist',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getOrderBillInvoice(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/getorderbillinvoice',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }
  saveOrderBillInvoice(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/saveorderbillinvoice',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getUserListMapView(data) {

    return this.http.get(this._global.baseAppUrl + this._global.apiUrl + 'user/getuserlistmapview' + data, this._global.httpOptions).map(x => {

      return x;
    }).retry(this.retryval);
  }

  onCancelOrder(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'enquiry/cancelorder',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }


  verifyReferralCode(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/checkrefcodeexist',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getBidCoinHistory(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getbidcoinhistory',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  assignEnquiryToVendor(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/assignenquirytovendor',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  vendorPaymentRaise(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/vendorpaymentraise',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  getVendorHistory(data) {
    console.log(this._global.baseAppUrl + this._global.apiUrl + 'user/getvendorhistory');
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getvendorhistory',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  removePrescriptionImg(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/removeprescriptionimg',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  updateOrderModifyAcess(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/updateordermodifyacess',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  getOrderModifyData(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'ordercart/getcartdata',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);

  }

  updateModifiedCart(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'ordercart/addtocart/', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);

  }
  removeMoidifiedCart(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'ordercart/removecart/', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);
  }

  sendQuotationForModifiedOrder(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'ordercart/sendquotationformodifiedorder/', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);
  }

  confirmModifyOrder(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'ordercart/confirmmodifyorder/', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);

  }

  modifyOrder(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'ordercart/modifyorder/', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);
  }
  getVendorModifyEnquiryItemDetail(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'ordercart/getvendormodifyenquiryitemdetail/', data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);

  }
  sendModifyOrderQuotation(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'ordercart/sendquotation',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  onConfirMmodifyOrder(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'ordercart/confirmmodifyorder',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  getBankaccountDetail(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getbankaccountdetail',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  addBankaccountDetail(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/addbankaccountdetail',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  getReferralHistory(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getreferralhistory',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  getInvoiceList(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getinvoicelist',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  walletToBidCoinPurchase(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/wallettobidcoinpurchase',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  testapi(data){
    // let headers = new HttpHeaders();
    // headers.append("Authorization", "Basic " + btoa('accessapiapcad8923YN23' + ":" + 'X45$%&8mnhj%67^7SDfds#$35'));
    // headers.append("Authorization", "Basic AIzaSyBZyR2OW1Ddjd8F9RvBOWEh_Tc8r6C2wYM"); 
    // headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'testapi/ordertracking',
    data, this._global.httpOptions).map(x => {

      return x;
    }).retry(this.retryval);

    // return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'pages/testapi',
    // data, this._global.httpOptions).map(x => {

    //   return x;
    // }).retry(this.retryval);
  }

  broadcastList(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/broadcastlist',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  broadcastDetail(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getbroadcastdetail',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  howToWork(data) {

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'pages/howtowork',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  getTestimonialDeatil(data){

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'home/testimonialdetail',
    data, this._global.httpOptions).map(x => {

      return x;
    }).retry(this.retryval);
  }
  cartReOrder(data){
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/cartreorder',
    data, this._global.httpOptions).map(x => {

      return x;
    }).retry(this.retryval);

  }
  
  validateIFSCCode(data){

  

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getdetailusingifsccode/',data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);


  }
  updateOrderReviewStatus(data){

 

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/updateorderreviewstatus',data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);


  }
  onSubmitOrderReview(data){

 

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/orderreview',data, this._global.httpOptions).map(x => {
      return x;
    }).retry(this.retryval);


  }
  
  getComplaintList(data){

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/complaintlist',
    data, this._global.httpOptions).map(x => {

      return x;
    }).retry(this.retryval);
  }
  getComplaintParameter(data){

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getcomplaintparameter',
    data, this._global.httpOptions).map(x => {

      return x;
    }).retry(this.retryval);
  }

  removeComplaintImg(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/removecomplaintimage',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  
  addComplaint(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/addcomplaint',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  getComplaintDetails(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/getcomplaintdetails',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }
  replyComplaintMessage(data) {
    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/replymessage',
      data, this._global.httpOptions).map(x => {

        return x;
      }).retry(this.retryval);
  }

  getOrderPrescription(data){

    return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'orders/getorderprescription',
    data, this._global.httpOptions).map(x => {

      return x;
    }).retry(this.retryval);

  }

  getReviewList(data){

  

  return this.http.get(this._global.baseAppUrl + this._global.apiUrl + 'user/getreviewlist' + data, this._global.httpOptions).map(x => {

    return x;
  }).retry(this.retryval);
}

vendorCancelRaisePayment(data){

  return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'user/vendorcancelraisepayment',
  data, this._global.httpOptions).map(x => {

    return x;
  }).retry(this.retryval);

}

modifyUserLogin(data){

  return this.http.post(this._global.baseAppUrl + this._global.apiUrl + 'misfrontlogin/modifyuserlogin',
  data, this._global.httpOptions).map(x => {

    return x;
  }).retry(this.retryval);

}

}