import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ShareService} from "../../../../share/share.service";
import {CreatProductService} from "./creat-product.service";
import {ProductsService} from "../products.service";


@Component({
  selector: 'app-creat-product',
  templateUrl: './creat-product.component.html',
  styleUrl: './creat-product.component.scss'
})
export class CreatProductComponent implements OnInit{

  product: any
  fileToUpload: any;
  imageUrl: any;
  missingImg = false
  form!: FormGroup;
  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedService: ShareService,
    private creatProductService: CreatProductService,
    private productService : ProductsService,
  ) {
  }
  ngOnInit(): void {
    this.product = this.data.type === 3 ? this.data.data : this.data
    this.imageUrl = this.data.type === 3 ?  this.product.image_url : ''
    this.form = this.fb.group({
      nameproduct: [
        '',
        [Validators.required]
      ],
      price:[
        '',
        [Validators.pattern('^[0-9]*$'),Validators.required]
      ],
      description:[
        ''
      ],
      category: ['', Validators.required]
    });
    if(this.data.type === 3){
      this.form.get('nameproduct')?.patchValue(this.product.name)
      this.form.get('price')?.patchValue(this.product.price)
      this.form.get('description')?.patchValue(this.product.description)
    }
  }

  handleFileInput(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.fileToUpload = files.item(0);
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }

  submit(): void{
    if(this.data.type === 3){
      const res= {
        id: this.product.product_id,
        image_url: this.missingImg ? '' : this.imageUrl,
        name: this.form.value?.nameproduct,
        price: this.form.value?.price,
        description: this.form.value?.description,
        category: this.product.category
      }

      this.creatProductService.editProduct(res).subscribe(res =>{
        this.close()
      })
    }else {
      const res= {
        image_url: this.missingImg ? '' : this.imageUrl,
        name: this.form.value?.nameproduct,
        price: this.form.value?.price,
        description: this.form.value?.description,
        category: this.form.value?.category
      }
      if(this.imageUrl === null || this.imageUrl.length === 0){
        alert('vui lòng chọn ảnh!')
      }else {
        this.productService.createProduct(res).subscribe(
          resq =>{
            localStorage.setItem('category', res.category)
            this.close()
          },
          error => {
            console.log('lỗi ')
          }
        )
      }
    }
  }

  bookmark(data: any): void{
    const res = {
      category: data.category,
      mark: data.InStock === "1" ? false : true,
      id: data.product_id
    }
    this.productService.handleBookMark(res).subscribe(
      req => {
        console.log(this.product.product_id)
        req.filter((item: any) =>{
          if (item.product_id === this.product.product_id){
            this.product = item
          }
        })
        this.sharedService.triggerRefresh()
      },
      error => {
        console.log('lỗi')
      }
    )


  }

  closeImg(): void{
    this.missingImg = true
    this.imageUrl = null
  }


  close(): void{
    this.dialogRef.close()
  }

}
