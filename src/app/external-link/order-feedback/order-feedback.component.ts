import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-feedback',
  templateUrl: './order-feedback.component.html',
  styleUrls: ['./order-feedback.component.scss']
})
export class OrderFeedbackComponent implements OnInit {

  @Input() rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  maxRating: number = 0;

  setRating(rating: number): void {
    this.rating = rating;
    this.maxRating = rating;
  }

  constructor(private fb: FormBuilder) {  }

  // customer feedback form
  customerFeedbackForm = this.fb.group({
    deliveryTime: this.fb.group({
      levelId: [''],
      level: [''],
    }),
    foodQuality: this.fb.group({
      levelId: [''],
      level: [''],
    }),
    deliveryPerson: this.fb.group({
      levelId: [''],
      level: [''],
    }),
    overallExperience: this.fb.group({
      levelId: [''],
      level: [''],
    }),
    feedbackComments: ['']
  })
  get feedbackForm() {
    return this.customerFeedbackForm;
  }

  ngOnInit(): void {
    this.setupFormListeners();
  }

  // setting levelId
  setupFormListeners() {
    this.setupQuestionListener('deliveryTime');
    this.setupQuestionListener('foodQuality');
    this.setupQuestionListener('deliveryPerson');
    this.setupQuestionListener('overallExperience');
  }
  setupQuestionListener(questionName: string) {
    const questionControl = this.customerFeedbackForm.get(questionName);
    if (questionControl) {
      questionControl.valueChanges.subscribe((newValues) => {
        this.updateLevelId(newValues.level, questionName);
      });
    }
  }
  updateLevelId(newLevelValue: string, questionName: string) {
    const levelIdControl = this.customerFeedbackForm.get(`${questionName}.levelId`);
      if (levelIdControl instanceof FormControl) {
      let levelIdValue: string;
        switch (newLevelValue) {
        case 'Terrible':
          levelIdValue = '1';
          break;
        case 'Bad':
          levelIdValue = '2';
          break;
        case 'Average':
          levelIdValue = '3';
          break;
        case 'Good':
          levelIdValue = '4';
          break;
        case 'Amazing':
          levelIdValue = '5';
          break;
        default:
          levelIdValue = '';
      }
        if (levelIdControl.value !== levelIdValue) {
        levelIdControl.setValue(levelIdValue);
      }
    }
  }
  
  // save
  onSubmitFeedback() {
    console.log('Form Elements', this.feedbackForm);
  }


}
