import { Component, OnInit,EventEmitter ,Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Output() onPopupActionPerformed = new EventEmitter<any>();

  popup:any={'type':'','is_process': false, 'is_sent': false, 'process_txt': '', 
  'sent_txt': '',
  'is_confirm_popup': false, 'confirm_txt': '','is_order_confirmed':false,'primary_btn_txt':'','secondary_btn_txt':'' }
  // status: any = { };


  constructor() { }

  ngOnInit() {
  }

  onReceivePopupData(popupdata:any){

  // console.log(popupdata);
    if(popupdata.type=='confirm'){

      this.popup.type=popupdata.type;
      this.popup.confirm_txt=popupdata.confirm_txt;
      this.popup.primary_btn_txt=popupdata.primary_btn_txt;
      this.popup.secondary_btn_txt=popupdata.secondary_btn_txt;
 
    }
    if(popupdata.type=='confirm2'){

      this.popup.type=popupdata.type;
      this.popup.confirm_txt=popupdata.confirm_txt;
      this.popup.primary_btn_txt=popupdata.primary_btn_txt;
      this.popup.secondary_btn_txt=popupdata.secondary_btn_txt;
 
    }
    if(popupdata.type=='confirm3'){

      this.popup.type=popupdata.type;
      this.popup.confirm_txt=popupdata.confirm_txt;
      this.popup.primary_btn_txt=popupdata.primary_btn_txt;
      this.popup.secondary_btn_txt=popupdata.secondary_btn_txt;
 
    }
    if(popupdata.type=='success'){

      this.popup.type=popupdata.type;
      this.popup.sent_txt=popupdata.sent_txt;
      this.popup.primary_btn_txt=popupdata.primary_btn_txt;
      this.popup.secondary_btn_txt=popupdata.secondary_btn_txt;
 
    }
    if(popupdata.type=='success2'){

      this.popup.type=popupdata.type;
      this.popup.sent_txt=popupdata.sent_txt;
      this.popup.primary_btn_txt=popupdata.primary_btn_txt;
      this.popup.secondary_btn_txt=popupdata.secondary_btn_txt;
 
    }
    if(popupdata.type=='success3'){

      this.popup.type=popupdata.type;
      this.popup.sent_txt=popupdata.sent_txt;
      this.popup.primary_btn_txt=popupdata.primary_btn_txt;
      this.popup.secondary_btn_txt=popupdata.secondary_btn_txt;
 
    }
    if(popupdata.type=='success4'){

      this.popup.type=popupdata.type;
      this.popup.sent_txt=popupdata.sent_txt;
      this.popup.primary_btn_txt=popupdata.primary_btn_txt;
      this.popup.secondary_btn_txt=popupdata.secondary_btn_txt;
 
    }
    if(popupdata.type=='error'){

      this.popup.type=popupdata.type;
      this.popup.sent_txt=popupdata.sent_txt;
      this.popup.primary_btn_txt=popupdata.primary_btn_txt;
      this.popup.secondary_btn_txt=popupdata.secondary_btn_txt;
 
    }
    if(popupdata.type=='error2'){

      this.popup.type=popupdata.type;
      this.popup.sent_txt=popupdata.sent_txt;
      this.popup.primary_btn_txt=popupdata.primary_btn_txt;
      this.popup.secondary_btn_txt=popupdata.secondary_btn_txt;
 
    }
    if(popupdata.type=='process'){

      this.popup.type=popupdata.type;
      this.popup.confirm_txt=popupdata.confirm_txt;
 
    }
    else  if(popupdata.type==''){

      this.popup.type='';
    }
    
  }

  actionPerformed(type:any,mode:any){

    this.onPopupActionPerformed.emit({'type':type,'mode':mode});
    
  }

}
