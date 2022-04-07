import { Injectable  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: any[] = [];

  // Push error notifications
  showError(message: string) {
    let options = {
      classname: 'bg-danger text-light position-absolute top-0 start-0',
      delay: 10000,
      autohide: true,
      body: message
    }
    this.notifications = []
    this.notifications.push({ ...options });
  }

  // Remove notification
  remove(notification: any) {
    this.notifications = this.notifications.filter(t => t !== notification);
  }
}
