import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../products.service";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup} from "@angular/forms";
interface Comment {
  comment_id: string;
  product_id: string;
  content: string;
  timestamp: string;
}
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
  commentList: Comment[] = [];
  dataDetail: any;
  nodata = false;
  showScrollButton = false;
  currentLanguage = '';
  commentValue = ''
  formComment!: FormGroup;
  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private productService: ProductsService,
              private translateService: TranslateService,
              ) {
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const res = {
        id: id,
      }
      this.productService.getDetailId(res).subscribe(
        res=>{
          this.dataDetail = res.product[0]

          this.commentList = res.comments
          this.commentList.sort((a, b) => {
            const timestampA = new Date(a.timestamp).getTime();
            const timestampB = new Date(b.timestamp).getTime();
            return timestampB - timestampA;
          });
        },
        error => {
          this.nodata  = true
        }
      )
    });
    this.formComment = this.fb.group({
      commentValue: ['']
    })


  }

  bookmark(){
    const res = {
      category: this.dataDetail.category,
      mark: this.dataDetail?.InStock === "1" ? false : true,
      id: this.dataDetail.product_id
    }
    this.productService.handleBookMark(res).subscribe(
      req =>{
       const newDetail = req.filter((item: any) => item.product_id === this.dataDetail.product_id);
       this.dataDetail = newDetail[0]

      }
    )
  }

  changeProduct():void{

  }

  comment(): void{
    console.log(this.formComment.value)
  }

  handleLang(): void{
    this.currentLanguage = this.currentLanguage === 'en' ? 'vi' : 'en';
    this.translateService.use(this.currentLanguage);
    localStorage.setItem('lang', this.currentLanguage);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    this.showScrollButton = scrollY > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected readonly decodeURI = decodeURI;
}
