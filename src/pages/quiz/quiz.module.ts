import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Quiz } from './quiz';

@NgModule({
  declarations: [
    Quiz,
  ],
  imports: [
    IonicPageModule.forChild(Quiz),
  ],
  exports: [
    Quiz
  ]
})
export class QuizModule {}
