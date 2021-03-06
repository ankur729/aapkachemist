import { Component, OnInit, Output } from '@angular/core';
import { AppGlobals } from '../../app.global';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
import { Api } from '../../api.service';
declare var $: any;

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css']
})
export class FamilyTreeComponent implements OnInit {

  state: any;
  addresses: any = [];
  isnodatafound: boolean = false;

  @Output() nodataobj: any = { 'page': '', 'txt': '' };

  constructor(public global: AppGlobals, private loadingBar: LoadingBarService, private router: Router, private api: Api) { this.state = this.global.getAppState(); }

  ngOnInit() {
    $('.page_name').hide();
    $('.mainPage').hide();

    setTimeout(() => {

      $('.list a').removeClass('active');
      $('#familytree').addClass('active');


    }, 20);
    this.getUserAddressList();
  }

  getUserAddressList() {

    this.loadingBar.start();
    let data = "user_id=" + this.state.user.id + "&address_id=";

    /// console.log(this.address);
    this.api.getUserAddressList(data).subscribe(
      (response) => {


        var dt: any = response;
        console.log(dt);
        this.global.setToast('info', dt.message);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if (dt.status == 200) {

          this.addresses = dt.data;
          $('.page_name').show();
          $('.mainPage').fadeIn(500);
          // this.is_result_get=true;
          // this.searchresp=dt.user_data;
          //    this.address=this.addressinit;

          //   this.global.setToast('info', dt.message);

        }
        else if (dt.status == 201) {
          $('.page_name').show();
          this.isnodatafound = true;
          this.nodataobj.page = 'enquiry';
          this.nodataobj.txt = "No family member found";
          this.nodataobj.img_url = this.global.noimgfound.no_address_found;
          // this.is_result_get=false;
          // this.searchresp=[];
        }

        setTimeout(() => {
          $(".ellipse_wrapper").click(function () {
            $(this).siblings(".address_options").toggleClass("show");
          });
          $(document).click(function (e) {
            if (!$(e.target).is(".manage_address_wrapper, .manage_address_wrapper *,.address_options, .address_options *")) {
              $(".address_options").removeClass("show");
            }
          });

        }, 200);
        this.loadingBar.stop();



      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );

  }

  navigate(field) {

    if (field == 'add-address') {

      this.router.navigate(['my-account/add-address']);
      //routerLink="/my-account/add-address" 
    }
  }

  removeAddressById(addressid) {

    let data = "user_id=" + this.state.user.id + "&address_id=" + addressid;
    console.log(data);
    /// console.log(this.address);
    this.api.removeAddressById(data).subscribe(
      (response) => {

        var dt: any = response;
        console.log(dt);
        this.global.setToast('info', dt.message);

        if (dt.status == 200) {

          this.addresses = [];
          this.addresses = dt.data;

          
          // this.is_result_get=true;
          // this.searchresp=dt.user_data;
          //    this.address=this.addressinit;
          this.getUserAddressList();
          this.global.setToast('info', 'Record deleted successfully');

        }
        else if (dt.status == 201) {

          this.addresses = dt.data;
          this.getUserAddressList();
          // this.is_result_get=false;
          // this.searchresp=[];
        }

        this.loadingBar.stop();



      },
      (error) => {


        console.log('RESPONSE FAILED'); console.log(error)
      }
    );



  }

}
