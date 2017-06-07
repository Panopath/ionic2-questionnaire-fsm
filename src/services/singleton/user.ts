import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {Api, getUserInfoResponse} from "./api";
import {Util} from "./util";
import {noop} from "rxjs/util/noop";

@Injectable()
export class User implements getUserInfoResponse {
  constructor(private storage: Storage, private api: Api, private util: Util) {
    if (window['UserService'])
      throw "User service must be a singleton !";
    window['UserService'] = this;
  }

  public id: number = 0;
  public username: string;
  public name: string;
  public avatar_url: string;
  public job_no: string;
  public token: string = "";


  public getUserInfo() {
    this.api.getUserInfo().then(data => {
      this.id = data.id;
      this.username = data.username;
      this.name = data.name;
      this.avatar_url = data.avatar_url;
      this.job_no = data.job_no;
    }).catch(noop);
  }

  public isLoggedIn(): boolean {
    return !!this.token;
  }

  public autoLogin(): Promise<null> {
    return new Promise((resolve, reject) => {
      this.storage.get("jwt_token").then((jwtToken) => {
        if (!jwtToken) {
          reject();
        } else {
          this.token = jwtToken;
          this.getUserInfo();
          resolve();
        }
      });
    });
  }

  public login(username: string, password: string) {
    return this.api.login(username, password).then(
      (data) => {
        this.token = data.token;
        this.storage.set("jwt_token", data.token);
        this.storage.set("username", username);
        this.util.showToast('登入成功');
        this.getUserInfo();
      }, (err) => {
        if (err['error'] == 'invalid_credentials') {
          this.util.showToast('用户名或密码错误');
        }
        return Promise.reject(err);
      });
  }

  public logout() {
    this.token = null;
    this.storage.remove("jwt_token");
  }
}
