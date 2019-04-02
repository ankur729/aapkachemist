import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Api } from '../api.service';
import { AppGlobals } from '../app.global';
declare var $: any;

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.css']
})
export class HelpCenterComponent implements OnInit {

  user: any = { 'name': '', 'email': '', 'mobile': '', 'message': '','captcha_code':'' };
  mode:any={'type':'','txt':'','val':''};
  state: any;
  constructor(private api: Api, public global: AppGlobals, private loadingBar: LoadingBarService,private aroute:ActivatedRoute
    , private router: Router) { this.state = this.global.getAppState(); }
  ngOnInit() {
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

    this.aroute.queryParams.subscribe(params => { 
    
      this.mode.type= this.aroute.snapshot.queryParams["type"];

      if(this.mode.type=='help'){
          this.mode.txt='May I Help You ?';
          this.mode.val='0';
      }
      if(this.mode.type=='feedback'){
        this.mode.txt='Feedback';
        this.mode.val='2';
    }
    });




  }

  onSubmit() {

    this.loadingBar.start();
    
  
    
    let data = "name=" + this.user.name + "&email=" + this.user.email +
               "&mobile=" + this.user.mobile + "&message=" + 
               this.user.message+"&page_type="+this.mode.val+"&login_type=0"+"&captcha_code="+this.user.captcha_code;;

    
    this.api.helpCenter(data).subscribe(
      (response) => {
      
        


        var dt: any = response;



        if (dt.status == 200) {

       //   this.global.setToast('info', dt.message);
          this.router.navigate(['/thank-you'],{queryParams:{'page':'enquiry'}});
         

        }
        else if (dt.status == 201) {
          this.global.onRefreshCaptcha('logincaptcha');
          this.global.setToast('error', dt.message);
          
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

  onRefreshCaptcha(id){
    this.global.onRefreshCaptcha(id);
  }
}
