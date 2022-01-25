import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddtask: EventEmitter<Task> = new EventEmitter();
  @Input() title!: string;  
  showAddTask!: boolean;
  subsription!: Subscription;
  // text!: string;
  // day!: string;
  // reminder: boolean = false;

  form!: FormGroup;

  // person = {
  //   id: 1,
  //   name: 'asd',
  //   description: 'qwe'
  // }

  get getChekcbox(): FormControl {
    return this.form.get('isReminder') as FormControl
  }

  constructor(
    private uiService: UiService,
    private fb: FormBuilder
  ) {this.subsription = this.uiService.onToggle().subscribe(value => this.showAddTask = value); }

  ngOnInit(): void {
    this.setForm()
    // this.listenForChanges()
  }

  private setForm(): void {
    this.form = this.fb.group({
      text: [null, Validators.required],
      day: [null, Validators.required],
      reminder: false
    })
  }

  // To get only value
  // this.form.get('isReminder').value

  // private listenForChanges(): void {
  //   this.getChekcbox.valueChanges.pipe(
  //     distinctUntilChanged(value => value)
  //   ).subscribe(value => {
  //     console.log(value)
  //   })
  // }

  saveForm(): void {
    const task = this.form.getRawValue()
    console.log(task)
    // const tasks = {
    //   text: this.form.get('text').value,
    //   day: this.form.get('day').value,
    //   isReminder: this.form.get('isReminder').value
    // }
    this.onAddtask.emit(task)
  }

  // onSubmit(){
  //   if(!this.text){
  //     alert('Please add a task!');
  //     return;
  //   }
  
  // const newTask: Task = {
  //   text: this.text,
  //   day: this.day,
  //   reminder: this.reminder,
  // }

  // this.onAddtask.emit(newTask);

  // this.text='';
  // this.day = '';
  // this.reminder = false;
  // }
}
