import { Injectable } from '@angular/core';
import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class MyRxStompConfigService {

  constructor() { }
}

export const myRxStompConfigAdmin: InjectableRxStompConfig = {

  brokerURL: `${environment.URL_SERVER_SOCKET_RX}`,

  // connectHeaders: {
  //     login: 'ichat',
  //     passcode: '7d9cef42-e718-4274-927b-83c5cd0a3c42',
  // },

  heartbeatIncoming: 0,

  heartbeatOutgoing: 20000,

  reconnectDelay: 200,

  debug: (msg: string): void => {
      // console.log(new Date(), msg);
  }
};

export const myRxStompConfigSeller: InjectableRxStompConfig = {

brokerURL: `${environment.URL_SERVER_SOCKET_RX}`,

// connectHeaders: {
//   login: 'ichat',
//   passcode: '7d9cef42-e718-4274-927b-83c5cd0a3c42',
// },

heartbeatIncoming: 0,

heartbeatOutgoing: 20000,

reconnectDelay: 200,

debug: (msg: string): void => {
  // console.log(new Date(), msg);
}
};


export const myRxStompConfigUser: InjectableRxStompConfig = {

brokerURL: `${environment.URL_SERVER_SOCKET_RX}`,

// connectHeaders: {
//   login: 'ichat',
//   passcode: '7d9cef42-e718-4274-927b-83c5cd0a3c42',
// },

heartbeatIncoming: 0,

heartbeatOutgoing: 20000,

reconnectDelay: 200,

debug: (msg: string): void => {
  // console.log(new Date(), msg);
}
};
