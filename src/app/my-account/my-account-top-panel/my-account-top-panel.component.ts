import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-account-top-panel',
  templateUrl: './my-account-top-panel.component.html',
  styleUrls: ['./my-account-top-panel.component.css']
})
export class MyAccountTopPanelComponent implements OnInit {

  isshow:boolean;

  constructor(private aroute:ActivatedRoute,private router:Router) { }

  ngOnInit() {

    this.aroute.params.subscribe(params => {

      let url = this.router.url;
     
      if (url.includes('update-profile')) {
        this.isshow=true;
      }
      else{
        this.isshow=false;
      }
    });

  }

}
