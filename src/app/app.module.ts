import {NgModule, ErrorHandler, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule} from 'ionic-angular';
import {App} from './app.component';
import {Config} from '../config/config';
import {User} from '../services/singleton/user';
import {IonicStorageModule} from '@ionic/storage';
import {Home} from '../pages/home/home';
// import {Login} from '../pages/login/login';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Api} from "../services/singleton/api";
import {HttpModule} from '@angular/http';
import {Util} from "../services/singleton/util";
import {CustomErrorHandler} from "./error-handler";
import {env} from "../config/environment";
import {CalendarView} from "../pages/calendar-view/calendar-view";
import {Quiz} from "../pages/quiz/quiz";

window["env"] = env;

@NgModule({
  declarations: [
    App,
    Home,
    // Login,
    Quiz,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App),
    IonicStorageModule.forRoot({
      name: 'app',
      driverOrder: env.prod ? ['indexeddb', 'sqlite', 'websql'] : ['localstorage']
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    Home,
    Quiz,
  ],
  providers: [
    Util,
    StatusBar,
    SplashScreen,
    Config,
    User,
    Api,
    {provide: LOCALE_ID, useValue: "zh-CN"},
    {provide: ErrorHandler, useClass: CustomErrorHandler}
  ]
})
export class AppModule {
}
