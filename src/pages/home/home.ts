import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Config} from '../../config/config';
import {Api} from '../../services/singleton/api';
import {Util} from "../../services/singleton/util";
import {User} from "../../services/singleton/user";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class Home {
  constructor(public navCtrl: NavController, private config: Config, private api: Api, private util: Util, private user: User) {

  }
  private showUploadImages() {
  }

  private logout() {
    this.util.confirm('确定要退出吗？').then((res) => {
      if (res) {
        this.user.logout();
        // this.navCtrl.setRoot(Login);
        this.util.showToast("登出成功");
      }
    })
  }
}
