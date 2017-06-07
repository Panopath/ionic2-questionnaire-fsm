import {Component, enableProdMode, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {User} from '../services/singleton/user';
import {env} from "../config/environment";
import {Util} from "../services/singleton/util";
import {Quiz} from "../pages/quiz/quiz";

if (env.prod)
  enableProdMode();

@Component({
  templateUrl: 'app.html'
})
export class App {
  rootPage: any;
  @ViewChild(Nav) nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, user: User, private util: Util) {
    this.rootPage = Quiz;
    // // 尝试自动登入
    // user.autoLogin().then(() => {
    //   // 自动登入成功
    // }, () => {
    //   // 自动登入失败，进入登入界面
    //   this.rootPage = Login;
    // });


    // 为了防止循环引用的hack
    // setTimeout(() => {
    //   window['redirectToLogin'] = () => {
    //     this.util.showToast("请先登入");
    //     this.nav.push(Login).catch(() => {
    //     });
    //   };
    //   window['navRoot'] = this.nav;
    // });


    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
