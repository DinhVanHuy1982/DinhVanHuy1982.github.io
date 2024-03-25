import {Injectable} from "@angular/core";
import {MessagingService} from "../messaging.service";

export enum ObjectIDManager {
  DEFAULT = 0,
  TEACHER_CLOSE_NOTIFY = 1,
  NOTICE_BEFORE_LESSON_OR_EXAM_TEACHER = 2,
  UPDATE_NOTICE_TEACHER = 3,
  STUDENT_CLOSE_NOTIFY = 4,
  NOTICE_BEFORE_LESSON_OR_EXAM_STUDENT = 5,
  UPDATE_NOTICE_STUDENT = 6,
  PROCTOR_REMIND = 7,
  UPDATE_STATUS_EXAM_MONITORING = 8,
  PROCTOR_STOP = 9,
  DO_EXAM = 10,
  SUBMIT = 11,
  PING = 12,
  REPLY_PING = 13,
}


@Injectable({
  providedIn: 'root'
})
export class SocketClientService {

}
