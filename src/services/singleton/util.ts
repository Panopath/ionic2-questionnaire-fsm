import {Injectable} from "@angular/core";
import {ToastController, AlertController} from "ionic-angular";
@Injectable()
export class Util {
  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController) {
  }

  public showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 1500,
      position: 'bottom'
    }).present();
  }


  public confirm(text, title = '请确认', yes = "是", no = "否") {
    return new Promise(
      (resolve, reject) => {
        this.alertCtrl.create({
          title: title,
          message: text,
          buttons: [
            {
              text: no,
              role: 'cancel',
              handler: () => {
                resolve(false);
              }
            },
            {
              text: yes,
              handler: () => {
                resolve(true);
              }
            }
          ]
        }).present();
      }
    );
  }

  public static removeFromArray<T>(array: Array<T>, item: T) {
    let index: number = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
