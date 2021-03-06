import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../api.service';
import {AppGlobals} from '../../app.global';
declare var $:any;
declare var classie:any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    user:any={'current_pass':'','new_pass':'','confirm_pass':''};
  
    state:any;
    constructor(private api:Api,public global:AppGlobals,private loadingBar:LoadingBarService
              ,private router:Router) {this.state=this.global.getAppState(); }
  ngOnInit() {

    setTimeout(() => {

      $('.list a').removeClass('active');
      $('#changepass').addClass('active');
       
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }, 20);

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
      this.global.callOnLoadJS();
  }

  onSubmit(){

   
    
    let data="user_id="+this.state.user.id+"&current_pass="+this.user.current_pass+"&new_pass="+this.user.new_pass+"&confirm_pass="+this.user.confirm_pass;
    console.log(data);
    this.api.updateUserPassword(data).subscribe(
      (response) => {
      
        

        var dt: any = response;
        
     

        if (dt.status == 200) {

          this.global.setToast('info',dt.message);
          this.user.current_pass='';
          this.user.new_pass='';
          this.user.confirm_pass='';
          localStorage.removeItem('user');
 
          this.state.user='';
          this.state.is_logged_in=false;
          this.state.is_logged_out=true;
        
          this.global.setToast('error','Logout successfully');
        
          this.global.saveAppState(this.state);
           this.router.navigate(['home']);
           $(".menu_Popup .slide_right").animate({
            right: "-300px"
          });
          $(".menu_Popup").fadeOut(500);
          // setTimeout(() => {
          //   $('.input input--nao input--filled').removeClass('input--filled');
          // }, 200);
          
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


  ngAfterViewInit(){

    setTimeout(() => {
        
    //   (function() {
    //     // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    //     if (!String.prototype.trim) {
    //         (function() {
    //             // Make sure we trim BOM and NBSP
    //             var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    //             String.prototype.trim = function() {
    //                 return this.replace(rtrim, '');
    //             };
    //         })();
    //     }

    //     [].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {
    //         // in case the input is already filled..
    //         if( inputEl.value.trim() !== '' ) {
    //             classie.add( inputEl.parentNode, 'input--filled' );
    //         }

    //         // events:
    //         inputEl.addEventListener( 'focus', onInputFocus );
    //         inputEl.addEventListener( 'blur', onInputBlur );
    //     } );

    //     function onInputFocus( ev ) {
    //         classie.add( ev.target.parentNode, 'input--filled' );
    //     }

    //     function onInputBlur( ev ) {
    //         if( ev.target.value.trim() === '' ) {
    //             classie.remove( ev.target.parentNode, 'input--filled' );
    //         }
    //     }
    // })();
    }, 20);
  }

}
