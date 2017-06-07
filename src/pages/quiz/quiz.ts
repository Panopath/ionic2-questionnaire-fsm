import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import quizDataRaw from '../../quiz.json';
import * as _ from "lodash";
import {Util} from "../../services/singleton/util";
interface histroyInterface {
  question: string,
  vars: object
}

interface stateInterface {
  vars?: object,
  answers?: { [key: string]: string | Array<string> },
  currentQuestion?: string,
  history?: Array<histroyInterface>,
  etc?: { [key: string]: string | Array<string> }
}

interface questionInterface {
  text?: string,
  multiple?: boolean,
  options?: Array<optionInterface>
}

interface optionInterface {
  text?: string,
  value?: string,
  next?: string | Array<Array<string>>,
  setvar?: Array<setVarInterface>,
  isEtc?: boolean
}

interface setVarInterface {
  key?: string,
  value: any
}

interface quizDataInterface {
  initial?: string,
  questions?: object,
  mixins?: object,
}

interface quizJsonInterface {
  mixins?: object
}

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class Quiz {
  public quizData: quizDataInterface = null;
  public question: questionInterface = null;
  public state: stateInterface = {answers: {}, vars: {}, history: [], etc: {}};
  public history = [];
  public checked = {};


  private etcSelected = false;
  private onCheckedLock = false;

  lockOnChecked() {
    this.onCheckedLock = true;
    setTimeout(() => {
      this.onCheckedLock = false;
    });
  }

  onChecked(key) {
    if (this.onCheckedLock)
      return;
    this.lockOnChecked();
    this.etcSelected = false;

    if (!this.question.multiple) {
      for (let _key of Object.keys(this.checked)) {
        if (_key == key)
          continue;
        delete this.checked[_key];
      }
    }

    if (this.question.multiple) {
      let ans = [];
      for (let _key of Object.keys(this.checked)) {
        if (this.checked[_key])
          ans.push(_key);
      }
      this.state.answers[this.state.currentQuestion] = ans;
      this.question.options.forEach(option => {
        if (this.state.answers[this.state.currentQuestion].indexOf(option.value) >= 0 && option.isEtc) {
          this.etcSelected = true;
        }
      })
    } else {
      this.state.answers[this.state.currentQuestion] = null;
      for (let _key of Object.keys(this.checked)) {
        if (this.checked[_key]) {
          this.state.answers[this.state.currentQuestion] = _key;
          break;
        }
      }
      this.question.options.forEach(option => {
        if (this.state.answers[this.state.currentQuestion] == option.value && option.isEtc) {
          this.etcSelected = true;
        }
      })
    }
  }

  processMixin(data: quizJsonInterface, mixins: any) {
    if (typeof data !== 'object')
      return;
    let _mixins = data.mixins || {};
    for (let key of Object.keys(_mixins)) {
      mixins[key] = _mixins[key];
    }
    for (let key of Object.keys(data)) {
      if (key == '@mixin') {
        let _mixin = mixins[data[key]];
        for (let key2 of Object.keys(_mixin)) {
          data[key2] = _mixin[key2];
        }
      }
      else {
        this.processMixin(data[key], mixins);
      }
    }
    return data;
  }

  public setQuestion() {
    this.question = this.quizData.questions[this.state.currentQuestion];
  }

  handleSetVars(setv: Array<setVarInterface>) {
    if (!setv) return;
    setv.forEach((value, index, array) => {
      this.state.vars[value.key] = value.value;
    })
  }

  prev() {
    let history: histroyInterface = this.state.history.pop();
    console.log("vars", this.state.vars, "=>", history.vars);
    this.state.vars = history.vars;
    this.goto(history.question);
  }

  next() {
    let nextQuestion: string | Array<Array<string>> = '';
    let oldVars = Object.assign({}, _.clone(this.state.vars));
    this.state.history.push({
      question: this.state.currentQuestion,
      vars: oldVars
    });
    if (this.question.multiple) {
      this.question.options.forEach((option: optionInterface) => {
        if (this.state.answers[this.state.currentQuestion].indexOf(option.value) >= 0) {
          this.handleSetVars(option.setvar);
          if (!nextQuestion) nextQuestion = option.next;
        }
      });
    } else {
      this.question.options.forEach((option: optionInterface) => {
        if (this.state.answers[this.state.currentQuestion] == option.value) {
          this.handleSetVars(option.setvar);
          nextQuestion = option.next;
        }
      });
    }
    console.log("vars", oldVars, "=>", this.state.vars);
    if (typeof nextQuestion == 'string') {
      this.goto(nextQuestion);
    } else {
      this.goto(this.resolveConditional(nextQuestion["conditionals"]));
    }
  }

  resolveConditional(conditional: Array<Array<string>>): string {
    console.log("resolving conditional", conditional);
    for (let i = 0; i < conditional.length; i++) {
      let script = conditional[i][0].replace(/\$([a-zA-Z0-9_]+)/g, "this.state.vars[\"$1\"]");
      if (eval(script)) {
        console.log(script, "resolved", conditional[i][1]);
        return conditional[i][1];
      }


    }
    return "";
  }

  onResult(type: string, vars: Object, answers: Object, etc: object) {
    console.info("RESULT", type, vars, answers, etc);
  }

  goto(key) {
    if (key.startsWith("result.")) {
      if (this.util.confirm("确定吗？选定的内容在一周内无法修改，请谨慎填写真实信息哦～", "确定吗")) {
        this.onResult(key.substr(7), this.state.vars, this.state.answers, this.state.etc);
      } else {
        this.prev();
      }
      return;
    }
    console.log("current question:", key);
    this.state.currentQuestion = key;
    this.setQuestion();

    this.lockOnChecked();
    this.checked = {};
    this.etcSelected = false;
    if (this.question.multiple) {
      this.question.options.forEach(option => {
        if (this.state.answers[this.state.currentQuestion].indexOf(option.value) >= 0) {
          this.checked[option.value] = true;
          if (option.isEtc)
            this.etcSelected = true;
        }
      });
    } else {
      this.question.options.forEach(option => {
        if (this.state.answers[this.state.currentQuestion] == option.value) {
          this.checked[option.value] = true;
          if (option.isEtc)
            this.etcSelected = true;
        }
      });
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private util: Util) {
  }

  ionViewDidLoad() {
    this.quizData = this.processMixin(this.processMixin(quizDataRaw, {}), {});
    console.log("compiled quiz data:", this.quizData);
    this.state.currentQuestion = this.quizData.initial;
    this.setQuestion();
  }

}
