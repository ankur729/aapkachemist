import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';

import {AppGlobals} from '../app.global';
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
  state:any;
  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging,
    public global:AppGlobals) {
    this.angularFireMessaging.messaging.subscribe(

      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);

      }
    )

   // alert('1');
      //this.requestPermission('11');
  }

  /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    // this.angularFireAuth.authState.pipe(take(1)).subscribe(
    //   () => {
    //     const data = {};
    //     data[userId] = token
    //     this.angularFireDB.object('fcmTokens/').update(data)
    //   })
  }

  /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
  requestPermission() {

    
    
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
       
        
       console.log(token);
        this.state=this.global.getAppState();
     
        
        this.state.device_token=token;
        this.state.device_id=this.generateUUID();
        this.global.saveAppState(this.state);
        //this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );

  }

  generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    // this.angularFireMessaging.messages.subscribe(
    //   (payload) => {
    //     console.log("new message received. ", payload);
    //     this.currentMessage.next(payload);
      
    //   })
   return this.angularFireMessaging.messages.map(
      (payload) => {

        return payload;
      })

  }

 
  
}