import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessagingService} from '../messaging.service';
import { environment } from 'src/environment/environment';
import {BehaviorSubject, EMPTY, from, interval, Observable, Subject, Subscription} from "rxjs";
import {ObjectIDManager} from "./socket-client.service";
import { RxStompService } from '@stomp/ng2-stompjs';
import {debounce, takeUntil} from "rxjs/operators";
import { myRxStompConfigUser } from '../utils/my-rx-stomp.config.service';

export interface Payload<T> {
  data: T;
  objectId: number;
}

@Injectable({
  providedIn: 'root'
})
export class StompService {
  private SERVER_URL = `${environment.URL_SERVER_SOCKET}`;
  private URI_BROADCAST = '/topic/socket';

  private stompClient:any;
  private _status = new BehaviorSubject<'NOT_CONNECT' | 'CONNECTED' | 'CONNECTING' | 'CLOSED'>('NOT_CONNECT');

  changeUser$ = new Subject<string>();
  destroyUser$ = new Subject<void>();

  private TIME_RECONNECT = `${environment.SOCKET.TIME_RECONNECT}`;
  private CONNECT_SOCKET_USER = `${environment.CONNECT_SOCKET_USER}`;
  private TIME_CONNECT_ONCE = `${environment.SOCKET.TIME_CONNECT_ONCE}`;

  countWatchUser = 0;
  subscriptionsUser: { [key: string]: Subscription } = {};
  stateOldUser:any;
  stateCurUser:any;
  userNameConnect : any;

  constructor(private http: HttpClient,
              private messageService: MessagingService,
              private rxStompServiceUser: RxStompService,
  ) {
    this.rxStompServiceUser = new RxStompService();

    this.changeUser$
      .pipe(
        debounce(() => interval(Number(this.TIME_RECONNECT))),
        takeUntil(this.destroyUser$)
      )
      .subscribe(() => {
        if (!this.isConnectedUser) {
          console.log('da vao connect user');
          // this.isConnectedSeller = true;
          this.connectSocketUser(this.userNameConnect, false);
        }
      });

  }

  isLogin = false;
  isConnectedUser= false;
  connectSockect( userName: string, currentStatusUser: boolean){
    this.isLogin = true;

    this.userNameConnect = userName;

    // if(!this.userNameConnect){
    //   return;
    // }

    if(this.CONNECT_SOCKET_USER){
      this.connectSocketUser(userName, currentStatusUser);
      // todo: TH kết nối socket thất bại => thực hiện call lại
      const connectUser = setInterval(() => {
        if(!this.isConnectedUser){
          this.connectSocketUser(userName, currentStatusUser);
        }else {
          clearInterval(connectUser);
        }
      }, Number(this.TIME_CONNECT_ONCE));
    }
  }

  connectSocketUser(userName: string, currentStatusAdmin: boolean){
  // connectSocketUser(userName: string, currentStatusAdmin: boolean){
    this.rxStompServiceUser.deactivate();
    this.rxStompServiceUser = new RxStompService();
    console.log('connect socketAdmin')

    // const destination = `/topic/${userName}`;

    console.log('this.rxStompServiceAdmin', this.rxStompServiceUser);
    console.log('myRxStompConfigAdmin', myRxStompConfigUser);
    this.rxStompServiceUser.configure(myRxStompConfigUser);
    this.rxStompServiceUser.activate();

    this.rxStompServiceUser.connected$.subscribe(() => {


      if(this.countWatchUser > 0){
        return;
      }
      // Sự kiện này sẽ được gọi khi máy chủ WebSocket tái kết nối
      console.log('WebSocket admin reconnected.', new Date());
      this.isConnectedUser = true;
      this.countWatchUser++;

      // todo: kiểm tra nếu đăng ký kênh lắng nghe thì hủy bỏ
      for (const key in this.subscriptionsUser) {
        if (this.subscriptionsUser.hasOwnProperty(key)) {
          const subscription = this.subscriptionsUser[key];
          if (subscription) {
            subscription.unsubscribe();
          }
        }
      }

      this._status.next('CONNECTED');

      // this.subscriptionsUser[destination] = this.rxStompServiceUser.watch(destination).subscribe((message) => {
      this.subscriptionsUser[this.URI_BROADCAST] = this.rxStompServiceUser.watch(this.URI_BROADCAST).subscribe((message) => {
        // console.log('messssss', message);
        if (message.body) {
          const _json = JSON.parse(message.body)
          // console.log('DATA');
          // console.log(_json.data);
          this.messageService.publish({topic: _json.objectId, data: _json.data});
        }
      });

    });

    // Theo dõi sự kiện ngắt kết nối
    this.rxStompServiceUser.connectionState$.subscribe((state) => {
      // console.log('state admin', state + '-----' + new Date());
      this.stateOldUser = this.stateCurUser;
      this.stateCurUser = state;
      // console.log('this.stateOldAdmin', this.stateOldAdmin + '-----' + new Date() + '-----------------------------------------');
      // console.log('this.stateCurAdmin', this.stateCurAdmin + '-----' + new Date() + '-----------------------------------------');
      if(state === 3 && this.isLogin && this.stateOldUser === 0){
        this.isConnectedUser = false;
        this.countWatchUser= 0;
        this.changeUser$.next('');
      }
    });

  }


  // disConnectUser() {
  disconnect() {

    this.countWatchUser = 0;

    if (this.rxStompServiceUser.connected()) {
      // Đã có kết nối, vì vậy ngắt kết nối
      this.rxStompServiceUser.deactivate();
      console.log('da disconnect')
      this._status.next('CLOSED')
    }

  }



  disConnectAll(isLogin : boolean){
    this.isLogin = isLogin;
    if(!isLogin){
      this.userNameConnect = null;
    }
    // this.disConnectUser();
    this.disconnect();
  }

  ngOnDestroy(): void {
    console.log('da vao ngOnDestroy to close')
    this.disConnectAll(false);
  }

  connect(){
    console.log('vao----------------')
    this.connectSockect('', true);
  }












  // connect() {
  //
  //   this.disconnect();
  //
  //   const authToken = sessionStorage.getItem(environment.authTokenKey);
  //   const lang = localStorage.getItem('language');
  //   const headers = {
  //     Authorization: `Bearer ${authToken}`,
  //     'Accept-Language': lang
  //   };
  //   const ws = new SockJS(this.SERVER_URL,{
  //     transports: ["websocket"]
  //   },headers);
  //   this._status.next('CONNECTING');
  //   this.stompClient = Stomp.over(ws);
  //   this.stompClient.heartbeat.incoming = 0; // Tắt heartbeat
  //   this.stompClient.connect({}, () => {
  //     this._status.next('CONNECTED');
  //
  //     this.stompClient.subscribe(this.URI_BROADCAST, (message) => {
  //       if (message.body) {
  //         const _json = JSON.parse(message.body)
  //         console.log('DATA');
  //         console.log(_json.data);
  //         this.messageService.publish({topic: _json.objectId, data: _json.data});
  //       }
  //     });
  //   }, (error) => {
  //     console.error('Error during connection:', error);
  //   });
  // }

  get status$(): Observable<'NOT_CONNECT' | 'CONNECTED' | 'CONNECTING' | 'CLOSED'> {
    return this._status.asObservable();
  }

  // disconnect() {
  //   console.log(' da vao disconnect');
  //   if (this.stompClient && this.stompClient.connected) {
  //     this.stompClient.disconnect(() => {
  //       console.log('Disconnected from WebSocket');
  //     },
  //     (error) => {
  //       console.error('Error during disconnection:', error);
  //     });
  //     this._status.next('CLOSED')
  //   }
  // }



  // private send<T>(destination: string, body: Payload<T>, headers?): void {
  //   const message = JSON.stringify(body);
  //   headers = headers || {}
  //   this.stompClient.send(destination, headers, message);
  // }
  // reConnect(uri: string): void {
  //   console.log('status:'+this._status.value);
  //   this.stompClient.subscribe(uri, (message) => {
  //     if (message.body) {
  //       const _json = JSON.parse(message.body)
  //       const payload = {
  //         data: {..._json} as ExamineesExamInformationModel,
  //         objectId: ObjectIDManager.REPLY_PING
  //       } as Payload<ExamineesExamInformationModel>;
  //       this.redirectMessage<ExamineesExamInformationModel>(payload)
  //     }
  //   });
  // }

  private sendMessage<T>(uri: string, payload: Payload<T>) {
    if (this._status.value === 'CONNECTED') {
      const authToken = sessionStorage.getItem(environment.authTokenKey);
      const lang = localStorage.getItem('language');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Accept-Language': lang
      };
      this.send<T>(uri, payload, headers);
    }
  }
  private send<T>(destination: string, body: Payload<T>, headers:any): void {
    const message = JSON.stringify(body);
    this.rxStompServiceUser.publish({
      destination,
      body: message
    });
  }

  redirectMessage<T>(payload: Payload<T>): void {
    switch (payload.objectId) {
      case ObjectIDManager.TEACHER_CLOSE_NOTIFY:
        this.sendMessage<T>(`/websocket/app/closed-teacher`, payload);
        break;
      case ObjectIDManager.NOTICE_BEFORE_LESSON_OR_EXAM_TEACHER:
        this.sendMessage<T>('/websocket/app/notify-teacher', payload);
        break;
      case ObjectIDManager.STUDENT_CLOSE_NOTIFY:
        this.sendMessage<T>(`/websocket/app/closed-student`, payload);
        break;
      case ObjectIDManager.NOTICE_BEFORE_LESSON_OR_EXAM_STUDENT:
        this.sendMessage<T>('/websocket/app/notify-student', payload);
        break;
      case ObjectIDManager.REPLY_PING:
        this.sendMessage<T>('/websocket/app/reply', payload);
        break;
      default:
    }
  }

}
