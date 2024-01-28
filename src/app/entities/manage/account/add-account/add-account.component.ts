import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss'
})
export class AddAccountComponent implements OnInit{
  hidePassword: boolean = true;
  currentLanguage: any;
  createAccountForm!: FormGroup;
  constructor(
    private translateService: TranslateService,
    private dialogRef: MatDialogRef<AddAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.currentLanguage = localStorage.getItem('lang');
    console.log(this.currentLanguage)
  }

  ngOnInit() {
    this.createAccountForm = this.fb.group({
      username: [
        '',
        [Validators.required]
      ],
      password:[
        '',
        [Validators.pattern('^[0-9]*$'),Validators.required]
      ],
      confirmPassword:[
        '',
        [Validators.required]
      ],
    });

  }


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  submit(){
    console.log(this.createAccountForm.value)
  }

  handleLang(): void{
    this.translateService.use(this.currentLanguage ==='vi' ? 'en': 'vi')

  }

  close(){
    this.dialogRef.close()
  }
}
