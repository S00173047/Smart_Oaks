import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(private notification: ToastrService) {}

  showSuccess(title: string, message?: string) {
    this.notification.success(message, title, { progressBar: true});
  }
  showError(title: string, message?: string) {
    this.notification.error(message, title, { progressBar: true});
  }
  showWarning(title: string, message?: string) {
    this.notification.warning(message, title, { progressBar: true});
  }
  showInfo(title: string, message?: string) {
    this.notification.info(message, title, { progressBar: true});
  }
}
