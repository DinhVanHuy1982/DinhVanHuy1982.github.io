import { Injectable } from '@angular/core';
import { Subject, Observable, filter, map } from 'rxjs';
import { ObjectIDManager } from './service-model/socket-client.service';

interface Message {
  topic: ObjectIDManager;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private message$: Subject<Message>

  constructor() {
    this.message$ = new Subject<Message>();
  }

  public publish(message: Message): void {
    this.message$.next(message);
  }

  public of<T>(topic: ObjectIDManager): Observable<T> {
    return this.message$.pipe(
      filter((m) => m.topic === topic),
      map(m => m.data)
    );
  }
}
