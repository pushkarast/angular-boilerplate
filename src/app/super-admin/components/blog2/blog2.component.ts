import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { Buffer } from 'buffer';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import option from '../../../../assets/constants/ngSelectvalues';
import * as moment from 'moment';
import { ConfigService } from 'src/app/shared/services/config.service';
@Component({
  selector: 'app-blog2',
  templateUrl: './blog2.component.html',
  styleUrls: ['./blog2.component.css']
})
export class Blog2Component {
  permission: any;
  blogData: FormGroup;
  fileViewer = '';
  picture: any;
  page = 1;
  desc: string = '';
  desc2: string = '';
  modalRef?: BsModalRef;
  blogList: any;
  option = option.status;
  content = `<p>According to Astrology, it is the firm belief that the “Date Of Birth” of any person reveals a lot about his character and personality. Using the date of birth, based on the position of stars and planets, astrologers take into view the naming ceremony of a kid or the name of someone. When the date of birth is combined with the place and time of birth, then we get to see the combined Horoscope also called the Birth chart or natal chart of a person in astrology.&nbsp;</p><p>&nbsp;</p><p>Basically, there are few people out who do not give much preference to astrology but in reality, it is the science of Stars which links various events happening on earth with the movements of celestial bodies (sun, moon, stars, and planets). The position of celestial bodies helps us to understand various concepts like predictions, horoscopes, Sade-Sati, Kundli, and Nakshatra Phal. All these types of predictions are evaluated only on the basis of one’s date of birth.</p><p>So you should consult your&nbsp;<a href="https://www.myastroguruji.com/kundli"><strong>janam kundli in Hindi</strong></a><strong>&nbsp;</strong>in order to know the varying details about yourself.&nbsp;</p><p>&nbsp;</p><p><strong>Zodiac Signs on the basis of date of birth&nbsp;</strong></p><p>The 12 zodiac signs have been defined on the basis of date of birth. Each zodiac sign represents a particular period of time in an entire year. Here you can relate to your own date of birth and find out accordingly.&nbsp;</p><p>&nbsp;</p><p>1. Aries: March 21 to April 19</p><p>2. Taurus: April 20 to May 20</p><p>3. Gemini: May 21-June 20</p><p>4. Cancer: June 21 to July 22</p><p>5. Leo: July 23 to August 22</p><p>6. Virgo: August 23 – September 22</p><p>7. Libra: September 23 to October 22</p><p>8. Scorpio: October 23 – November 21</p><p>9. Sagittarius: November 22 – December 21</p><p>10. Capricorn: December 22 to January 19</p><p>11. Aquarius: January 20 to February 18</p><p>12. Pisces: February 19 to March 20</p><p>&nbsp;</p><p><strong>How significant is your date of birth?</strong></p><p>Based on the date of birth, astrology is done by looking at various factors. Here are the basic details—&nbsp;</p><p>&nbsp;</p><p><strong>Dasha:</strong> “Dasha” basically refers to the time period of the planets. The time period of the Planets dictates what good and bad effects will be there in the zodiac when the Planets change their positions.</p><p>&nbsp;</p><p><strong>Sade-Sati:</strong> This is a long period of about seven years for the planet Saturn. Indians are very worried about this whole period. Shani (the planet of hard work and discipline), and shows its effect only with time. This is the only planet that decides the time of your achievement and success. Remedies are given on the basis of the date of birth at the time of Sade Sati.</p><p>&nbsp;</p><p><strong>Nakshatra Phal:</strong> Nakshatra Phal indicates your personality, behavior, nature, favorable-unfavorable aspects, strengths, and weaknesses. It also helps you in taking decisions and making the right choices, so that you can lead a more productive and prosperous life.</p><p>&nbsp;</p><p><strong>Varshphal:</strong> Yearly Horoscope. It is constructed for one year until the Sun returns to its natural state. It is prepared on the basis of your date of birth. It is Sun ba</p>`
  config = {
    height: 500,
    selector: 'textarea#local-upload',
    block_unsupported_drop: false,
    image_title: true,
    automatic_uploads: true,
    toolbar_sticky: true,
    plugins: ["preview", "pagebreak", "lists", "link", "charmap", "table", "advlist", "table"],
    toolbar:
      'undo redo| bold underline italic blocks | link fontsize fontfamily | styles table | formatselect   |   backcolor forecolor | \
      alignleft aligncenter alignright alignjustify quicklink| pagebreak | \
      bullist numlist outdent indent | removeformat | help | wordcount',
    images_upload_url: `${this._ConfigService.config['api']?.commonApiRoot}/api/v1/common/upload`,
  }
  constructor(
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService,
    private _FormBuilder: FormBuilder,
    private modalService: BsModalService,
    private _ConfigService: ConfigService
  ) {
    this.blogData = this._FormBuilder.group({
      BlogId: '',
      Image: this.picture,
      Name: ['', Validators.required],
      EntryDate: ['', Validators.required],
      PostedBy: ['', Validators.required],
      meta_keywords: ['', Validators.required],
      meta_description: ['', Validators.required],
      Description: ['', Validators.required],
      Description2: ['', Validators.required],
      Slug: [null, Validators.required],
      Status: 1,
    });
  }
  ngOnInit(): void {
    this.getAllblogs();
    this._ActivatedRoute.queryParams.subscribe((params) => {
      if (params['permit'])
        this.permission = Buffer.from(params['permit'], 'base64').toString(
          'ascii'
        );
    });
  }
  getAllblogs(blogId = null) {
    this.blogData.reset();
    this._SpinnerService.setState(true);
    this._AdminService
      .fetchBlogs({ page: this.page, blogId: blogId })
      .then((data) => {
        if (data?.status) {
          console.log(this.desc)
          if (blogId) {
            this.blogData.patchValue(data?.data?.blogs);
            // console.log(Buffer?.from(data?.data?.blogs?.DescP, "base64").toString())
            this.desc = Buffer?.from(
              data?.data?.blogs?.DescP,
              'base64'
            ).toString();
            this.desc2 = Buffer?.from(
              data?.data?.blogs?.DescP2,
              'base64'
            ).toString();
            this.blogData.get('Image')?.setValue('');
            this.blogData.get('Description')?.setValue(this.desc);
            this.blogData.get('Description2')?.setValue(this.desc2);
          } else this.blogList = data?.data;
        } else {
          this._NotifierService.showError('Some Error Occurred');
        }
      });
    this._SpinnerService.setState(false);
  }
  fileupload(event: Event): void {
    if (event.target !== null) {
      const files = (<HTMLInputElement>event.target).files;
      if (files !== null) {
        const fileList: FileList = files;
        if (fileList && fileList.length > 0) {
          const file: File = fileList[0];
          this.picture = file;
          this.fileViewer = file.name;
        }
      }
    }
  }
  getPermisson(p_type: any) {
    return this._CommonService.getPermission(this.permission, p_type);
  }
  setDescr(editor: any, desc: any) {
    if (desc == 'desc') this.desc = editor.editor.getData();
    else if (desc == 'desc2') this.desc2 = editor.editor.getData();
  }
  setFormdata() {
    this.desc.replaceAll(
      '<h4>',
      '<h3 class="mb-2 mt-0 text-3xl font-medium leading-tight">'
    );
    this.desc.replaceAll('</h4>', '</h3>');
    this.desc.replaceAll(
      '<h5>',
      "<h4 class='mb-2 mt-0 text-2xl font-medium leading-tight'>"
    );
    this.desc.replaceAll('</h5>', '</h4>');
    this.desc.replaceAll(
      '<h3>',
      "<h2 class='mb-2 mt-0 text-4xl font-medium leading-tight'>"
    );
    this.desc.replaceAll('</h3>', '</h2>');
    this.desc.replaceAll(
      '<h1>',
      "<h2 class='mb-2 mt-0 text-4xl font-medium leading-tight'>"
    );
    this.desc.replaceAll('</h1>', '</h2 >');

    this.desc2.replaceAll(
      '<h4>',
      "<h3 class='mb-2 mt-0 text-3xl font-medium leading-tight'> "
    );
    this.desc2.replaceAll('</h4>', '</h3>');
    this.desc2.replaceAll(
      '<h5>',
      "<h4 class='mb-2 mt-0 text-2xl font-medium leading-tight'>"
    );
    this.desc2.replaceAll('</h5>', '</h4>');
    this.desc2.replaceAll(
      '<h3>',
      "<h2 class='mb-2 mt-0 text-4xl font-medium leading-tight'>"
    );
    this.desc2.replaceAll('</h3>', '</h2>');
    this.desc2.replaceAll(
      '<h1>',
      "<h2 class='mb-2 mt-0 text-4xl font-medium leading-tight'>"
    );
    this.desc2.replaceAll('</h1>', '</h2>');

    console.log(this.desc);
    const formData = new FormData();
    formData.set('blogImage', this.picture);
    formData.set('Image', this.blogData.get('Images')?.value);
    formData.set('Name', this.blogData.get('Name')?.value);
    formData.set(
      'BlogId',
      this.blogData.get('BlogId')?.value
        ? this.blogData.get('BlogId')?.value
        : ''
    );
    formData.set('EntryDate', moment().format('YYYY-MM-DD'));
    formData.set('PostedBy', this.blogData.get('PostedBy')?.value);
    formData.set('meta_keywords', this.blogData.get('meta_keywords')?.value);
    formData.set(
      'meta_description',
      this.blogData.get('meta_description')?.value
    );
    formData.set('DescP', Buffer.from(this.desc, 'utf8').toString('base64'));
    formData.set('DescP2', Buffer.from(this.desc2, 'utf8').toString('base64'));
    formData.set(
      'Slug',
      this.blogData.get('Slug')?.value == ''
        ? null
        : this.blogData.get('Slug')?.value
    );
    formData.set('Status', this.blogData.get('Status')?.value);
    return formData;
  }
  onSubmit() {
    this._SpinnerService.setState(true);
    this._AdminService.blog(this.setFormdata()).then((data) => {
      if (data?.status) {
        this._SpinnerService.setState(false);
        this._NotifierService.showSuccess('Blog Added Successfully');
        this.closeModal();
      } else {
        this._SpinnerService.setState(false);
        if (data?.data?.error && data?.data?.error == 'ERR:0002')
          this._NotifierService.showError(
            'Slug Already Exsist,Try with another slug'
          );
        else if (data?.data?.error && data?.data?.error == 'ERR:0003')
          this._NotifierService.showError('Please fill all the data');
        else this._NotifierService.showError('Some Error Occurred');
      }
    });
    this._SpinnerService.setState(false);
    this.getAllblogs();
  }
  deleteBlog(blogId = null) {
    this._SpinnerService.setState(true);
    this._AdminService.deleteBlog({ blogId: blogId }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess('Blog Deleted');
        this.getAllblogs();
      } else {
        this._NotifierService.showError('Some Error Occurred');
      }
    });
    this._SpinnerService.setState(false);
  }
  openModal(template: TemplateRef<any>, blogId = null) {
    this.blogData.reset();
    this.getAllblogs(blogId);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl',
      backdrop: 'static',
      keyboard: false,
    });
  }
  closeModal(type = '') {
    if (type == 'Close') {
      if (confirm('Do you want to Exit ?') == true) {
        this.blogData.reset();
        this.modalRef?.hide();
        this.getAllblogs();
      }
    } else {
      this.blogData.reset();
      this.modalRef?.hide();
      this.getAllblogs();
    }
  }
  pagination($: any) {
    this.page = $.pageIndex + 1;
    this.getAllblogs();
  }
}
