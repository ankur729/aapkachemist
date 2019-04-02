import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Api} from '../../../api.service';
import {AppGlobals} from '../../../app.global';
 
declare var $:any;
@Component({
  selector: 'app-map-category',
  templateUrl: './map-category.component.html',
  styleUrls: ['./map-category.component.css']
})
export class MapCategoryComponent implements OnInit {

  state:any;
  respdata:any={'mapping_type_list':[],'categories':[],'keywords':[],'selected_category':'','selected_map_id':''}

  constructor(private aroute:ActivatedRoute,private router:Router,private api:Api,public global:AppGlobals,
				private loadingBar:LoadingBarService) { this.state=this.global.getAppState();}

  ngOnInit() {

    setTimeout(() => {
      $('.nameDesigns').removeClass('active');
      $('#profilesetup').addClass('active');
    }, 20);
    this.getProfileDetails();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  getProfileDetails(){

    let data="user_id="+this.state.user.id+"&data_for=7"+"&user_type_id="+this.state.user.user_type_id;

    this.loadingBar.start();
    this.api.getProfileDetails(data).subscribe(
      (response) => {
     

        let dt: any = response;
        
        this.loadingBar.stop();
         

        if (dt.status == 200) {
        
          this.respdata.mapping_type_list=dt.data.mapping_type_list;
          
 

         

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
  onSelectMapItem(list){

    let data="mapping_type="+list.id;
    this.respdata.selected_map_id=list.id;

    this.loadingBar.start();
    this.api.getMappingCategoryByType(data).subscribe(
      (response) => {
   

        let dt: any = response;
        
        this.loadingBar.stop();
         

        if (dt.status == 200) {
        
          this.respdata.categories=dt.data;
          this.respdata.selected_category= 0;
          

         

        }
        else if (dt.status == 201) {
          this.respdata.categories=dt.data;
        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );
  }

  onSelectCategory(list){

 
  //  this.respdata.selected_category=categoryid;
  this.respdata.selected_map_id=list.id;
  
    let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&mapping_type="+list.id+"&mapping_category=0";
    
    this.loadingBar.start();
    this.api.getKeywordsByMapCategory(data).subscribe(
      (response) => {
         
     

        let dt: any = response;
        
        this.loadingBar.stop();
         

        if (dt.status == 200) {
        
           this.respdata.keywords=dt.data;
          // this.respdata.selected_category= this.respdata.categories[0].id;
 
 
        }
        else if (dt.status == 201) {
          this.respdata.keywords=dt.data;
        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );



  }
  // onSelectCategory(categoryid){

  //   console.log(categoryid);
  //   this.respdata.selected_category=categoryid;
  //   let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&mapping_type="+this.respdata.selected_map_id+"&mapping_category="+categoryid;
  //   console.log(data);
  //   this.loadingBar.start();
  //   this.api.getKeywordsByMapCategory(data).subscribe(
  //     (response) => {
         
  //       console.log(response);


  //       let dt: any = response;
        
  //       this.loadingBar.stop();
         

  //       if (dt.status == 200) {
        
  //          this.respdata.keywords=dt.data;
  //         // this.respdata.selected_category= this.respdata.categories[0].id;
 
 
  //       }
  //       else if (dt.status == 201) {
  //         this.respdata.keywords=dt.data;
  //       }

  //     },
  //     (error) => {

  //       this.loadingBar.stop();
  //       //   this.spinnerService.hide();
  //       console.log('RESPONSE FAILED'); console.log(error)
  //     }
  //   );



  // }

  onInputChange(keyword){

     

      let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&mapping_type="+this.respdata.selected_map_id+"&mapping_category="+ this.respdata.selected_category+"&keyword="+keyword;
   
      this.loadingBar.start();
      this.api.getKeywordsByMapCategory(data).subscribe(
        (response) => {
           
        
  
          let dt: any = response;
          
          this.loadingBar.stop();
           
  
          if (dt.status == 200) {
          
             this.respdata.keywords=dt.data;
            // this.respdata.selected_category= this.respdata.categories[0].id;
   
   
          }
          else if (dt.status == 201) {
        //    this.respdata.categories=dt.data;
          }
  
        },
        (error) => {
  
          this.loadingBar.stop();
          //   this.spinnerService.hide();
          console.log('RESPONSE FAILED'); console.log(error)
        }
      );

  //     //var array = [{ category: 'Business', users: [{ name: 'Sally', tags: [{ tag: 'accounting' }, { tag: 'marketing' }] }, { name: 'Bob', tags: [{ tag: 'sales' }, { tag: 'accounting' }] }] }, { category: 'Heritage', users: [{ name: 'Linda', tags: [{ tag: 'Italy' }, { tag: 'Macedonia' }] }, { name: 'George', tags: [{ tag: 'South Africa' }, { tag: 'Chile' }] }] }],
  //   //tag = 'marketing',
  //   let res:any=[];
  // let  result = this.respdata.keywords.filter(key=>{


  //       if(key.keyword_name==val){
  //         alert('2');
  //         res.push(key) ;
  //       }
  //   });

  //  console.log(res);
    //a => a.users.some(u => u.tags.some(t => t.tag.includes(tag)))

   // this.respdata.filter(a => a.users.some(u => u.tags.some(t => t.tag.includes(tag))));

//console.log(result);
  }

  onCheckKeyword(keyword){

   
    let data="user_id="+this.state.user.id+"&user_type_id="+this.state.user.user_type_id+"&mapping_type="+this.respdata.selected_map_id+"&mapping_category="+ this.respdata.selected_category+"&keyword_id="+keyword.id;
  
    this.loadingBar.start();
    this.api.saveBussinessMapping(data).subscribe(
      (response) => {
         
      
        let dt: any = response;
        
        this.loadingBar.stop();
         

        if (dt.status == 200) {
        
        //   this.respdata.keywords=dt.data;
          // this.respdata.selected_category= this.respdata.categories[0].id;
 
 
        }
        else if (dt.status == 201) {
      //    this.respdata.categories=dt.data;
        }

      },
      (error) => {

        this.loadingBar.stop();
        //   this.spinnerService.hide();
        console.log('RESPONSE FAILED'); console.log(error)
      }
    );


  }

}
