import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  public errorMsg='';
  public employees:any=[];
  constructor(private fb:FormBuilder,private servive:ApiService){
    this.getData()
  }
  ngForm=this.fb.group({
    userName:['venkat',Validators.required],
    password:['',Validators.compose([Validators.required,Validators.minLength(3)])],
    confirmPassword:['',[Validators.minLength(3),Validators.required]]
  })

  get userName(){
    return this.ngForm.controls['userName'];
  }

  get password(){
    return this.ngForm.controls['password'];
  }
 get confirmPassword(){
   return this.ngForm.controls['confirmPassword'];
 }

 getData(){
   this.servive.get().subscribe(data=>{
     this.employees=data
    })
  
 }

 enroll(){
  this.servive.post(this.ngForm.value).subscribe(data=>{
    this.getData()
    console.log(data);
  })
  ,(error:any)=>{
    this.errorMsg=error.statusText;
}
 }

}
