import { Component, TemplateRef, ViewChild } from '@angular/core';
declare var CKEDITOR: any;
import option from '../../../../assets/constants/ngSelectvalues';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import * as moment from 'moment';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { uploadAdapter } from './uploadAdapter';
import { ActivatedRoute } from '@angular/router';
import { Buffer } from 'buffer';
import { CommonService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent {
  @ViewChild('ckeditor') ckeditor: any;
  page = 1;
  title = 'angular';
  option = option.status;
  blogData: FormGroup;
  modalRef?: BsModalRef;
  picture: any;
  fileViewer = '';
  blogList: any;
  desc: string = '';
  desc2: string = '';
  permission: any;
  config = {
    alignment: {
      options: [
        { name: 'left', className: 'my-align-left' },
        { name: 'right', className: 'my-align-right' },
      ],
    },
    toolbar: [
      'alignment', // Displaying the proper UI element in the toolbar.
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
      '|',
      'alignment:left',
      'alignment:right',
      'alignment:center',
      'alignment:justify',
      'linkImage'
    ],

    image: {
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        'imageLink'
      ],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
  };
  public Editor = ClassicEditor;
  constructor(
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService
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
  get registerFormControl() {
    return this.blogData.controls;
  }
  onReady(editor: ClassicEditor): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new uploadAdapter(loader);
    };
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

  getPermisson(p_type: any) {
    return this._CommonService.getPermission(this.permission, p_type);
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
  getAllblogs(blogId = null) {
    this.blogData.reset();
    this._SpinnerService.setState(true);
    this._AdminService
      .fetchBlogs({ page: this.page, blogId: blogId })
      .then((data) => {
        if (data?.status) {
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