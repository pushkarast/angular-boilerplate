import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import option from '../../../../assets/constants/ngSelectvalues';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { Buffer } from 'buffer';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
declare var CKEDITOR: any;
@Component({
  selector: 'app-horo-signprediction',
  templateUrl: './horo-signprediction.component.html',
  styleUrls: ['./horo-signprediction.component.css'],
})
export class HoroSignpredictionComponent implements OnInit {
  @ViewChild('ckeditor') ckeditor: any;
  rashiOptions: any;
  types = option.typeforRashi;
  status = option.status;
  horoscopeList: any;
  horoFilter: FormGroup;
  rashiInfo: FormGroup;
  initialValues: any;
  now = new Date();
  modalRef?: BsModalRef;
  public Editor = ClassicEditor;
  permission: any;
  weekOptions: any;
  monthOptions = option.month;
  metaObj: any;
  longDesc: any;
  shortDesc: any;
  isFormSubmitted: Boolean = false;
  add = true;
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
      'alignment:left',
      'alignment:right',
      'alignment:center',
      'alignment:justify',
    ],

    image: {
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
      ],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
  };
  ckArr = {
    Love: null,
    Career: null,
    Finance: null,
    Travel: null,
    Wellness: null,
  };
  constructor(
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _SpinnerService: SpinnerService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService
  ) {
    this.getMasterdata('rashi');
    this.horoFilter = this._FormBuilder.group({
      rashi: [null],
      type: ['Daily'],
      status: [1],
      date: [moment().format('yyyy-MM-DD')],
    });
    this.rashiInfo = this._FormBuilder.group({
      id: [],
      rashi: [null, Validators.required],
      status: [1, Validators.required],
      type: [null, Validators.required],
      short_desc: [],
      long_desc: [],
      date: [null, Validators.required],
      week: [1, Validators.required],
      month: [new Date().getMonth() + 1, Validators.required],
      year: [new Date().getFullYear(), Validators.required],
      meta_data: [],
      Love: [''],
      Career: [''],
      Finance: [''],
      Travel: [''],
      Wellness: [''],
      luckyColorName: [null],
      luckyColorCode: [null],
      luckyStones: [null],
      luckyNumbers: [null],
      luckyday: [null],
      luckyDay: [null],
      luckyAlphabets: [null],
      luckyMonths: [null],
      rulingPlanet: [null],
      symbol: [null],
      unluckyStones: [null],
      element: [null],
      businessPartner: [null],
      bestProfession: [null],
      bestBoss: [null],
      goodPoints: [null],
      badPoints: [null],
      soulMates: [null],
      tip: [null],
      tipOfTheWeek: [null],
      adviceOfTheWeek: [null]
    });
  }
  ngOnInit(): void {
    console.log("WORKING")
    this.initialValues = this.rashiInfo.value;
    this.fetchHoroscopes();
    this._ActivatedRoute.queryParams.subscribe((params) => {
      if (params['permit'])
        this.permission = Buffer.from(params['permit'], 'base64').toString(
          'ascii'
        );
    });
    this.weekOptions = this.getWeeksInMonth(
      new Date().getMonth(),
      new Date().getFullYear()
    );
  }
  getMasterdata(masterName: any) {
    this._SpinnerService.setState(true)
    this.rashiInfo?.reset(this.initialValues);
    this._AdminService
      .getMasterDetailData({ masterName: masterName })
      .then((data) => {
        if (data?.status) {
          this.rashiOptions = data?.data;
        }
      });
    this._SpinnerService.setState(false)

  }
  fetchHoroscopes(rashiName = null) {
    this._SpinnerService.setState(true)
    if (rashiName) this.horoFilter.get('rashi')?.setValue(rashiName);
    this._AdminService.getHoroscope(this.horoFilter.value).then((data) => {
      if (data?.status) {
        if (rashiName) {
          {
            this.rashiInfo.patchValue(data?.data);
            this.rashiInfo.patchValue(JSON?.parse(data?.data?.meta_data));
            this.rashiInfo
              .get('type')
              ?.setValue(this.horoFilter.get('type')?.value);

            this.weekOptions = this.getWeeksInMonth(
              this.rashiInfo.get('year')?.value,
              this.rashiInfo.get('month')?.value
            );
          }
        } else this.horoscopeList = data?.data;
      }
    });
    this._SpinnerService.setState(false)
  }
  setData(type: any, event: any) {
    switch (type) {
      case 'rashi':
        this.rashiInfo.get('rashi')?.setValue(event.value);
        break;
      case 'type':
        this.horoFilter.get('type')?.setValue(event.value);
        break;
      case 'status':
        this.horoFilter.get('status')?.setValue(event.value);
        break;
      case 'date':
        this.horoFilter.get('date')?.setValue(event.target.value);
        break;
    }
    this.fetchHoroscopes();
  }
  getPermisson(p_type: any) {
    return this._CommonService.getPermission(this.permission, p_type);
  }

  openModal(template: TemplateRef<any>, rashiName: any) {
    if (rashiName) {
      this.fetchHoroscopes(rashiName);
      this.add = false;
    } else {
      this.add = true;
    }
    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl',
      backdrop: 'static',
      keyboard: false,
    });
  }
  closeModal() {
    console.log(this.initialValues);
    this.rashiInfo.reset(this.initialValues);
    this.modalRef?.hide();
    this.add = true;
    this.horoFilter.get('rashi')?.setValue(null);
    this.fetchHoroscopes();
  }

  onSubmit() {
    this.isFormSubmitted = true;
    //array to stringify
    let metaArray = {
      luckyColorName: this.rashiInfo.get('luckyColorName')?.value,
      luckyColorCode: this.rashiInfo.get('luckyColorCode')?.value,
      luckyStones: this.rashiInfo.get('luckyStones')?.value,
      luckyNumbers: this.rashiInfo.get('luckyNumbers')?.value,
      luckyday: this.rashiInfo.get('luckyday')?.value,
      luckyDay: this.rashiInfo.get('luckyDay')?.value,
      luckyAlphabets: this.rashiInfo.get('luckyAlphabets')?.value,
      luckyMonths: this.rashiInfo.get('luckyMonths')?.value,
      rulingPlanet: this.rashiInfo.get('rulingPlanet')?.value,
      symbol: this.rashiInfo.get('symbol')?.value,
      unluckyStones: this.rashiInfo.get('unluckyStones')?.value,
      element: this.rashiInfo.get('element')?.value,
      businessPartner: this.rashiInfo.get('businessPartner')?.value,
      bestProfession: this.rashiInfo.get('bestProfession')?.value,
      bestBoss: this.rashiInfo.get('bestBoss')?.value,
      goodPoints: this.rashiInfo.get('goodPoints')?.value,
      badPoints: this.rashiInfo.get('badPoints')?.value,
      soulMates: this.rashiInfo.get('soulMates')?.value,
      tip: this.rashiInfo.get('tip')?.value,
      tipOfTheWeek: this.rashiInfo.get('tipOfTheWeek')?.value,
      adviceOfTheWeek: this.rashiInfo.get('adviceOfTheWeek')?.value,
      ...this.ckArr,
    };
    // converting data to base64 for better data passing to BE
    this.rashiInfo
      .get('meta_data')
      ?.setValue(Buffer?.from(JSON.stringify(metaArray)).toString('base64'));
    this.rashiInfo.get('long_desc')?.setValue(this.longDesc);
    this.rashiInfo.get('short_desc')?.setValue(this.shortDesc);
    //update records array

    if (this.add) {
      this._AdminService.addHoroscope(this.rashiInfo?.value).then((data) => {
        if (data?.status) {
          this._NotifierService.showSuccess(data?.message);
          this.closeModal();
        }
        this.isFormSubmitted = false;
      });
    } else {
      this._AdminService.updateHoroscope(this.rashiInfo?.value).then((data) => {
        this._SpinnerService.setState(true)
        if (data?.status) {
          this.closeModal();
        } else this._NotifierService.showError('Some Error Occurred');
        this.isFormSubmitted = false;
        this._SpinnerService.setState(false)
      });
    }

  }
  setCkvalues(editor: any, type: any) {
    //setting value for ckeditor so that it will be bind at submit time
    switch (type) {
      case 'Love':
        this.ckArr.Love = editor?.editor?.getData();
        break;
      case 'Career':
        this.ckArr.Career = editor?.editor?.getData();
        break;
      case 'Finance':
        this.ckArr.Finance = editor?.editor?.getData();
        break;
      case 'Travel':
        this.ckArr.Travel = editor?.editor?.getData();
        break;
      case 'Wellness':
        this.ckArr.Wellness = editor?.editor?.getData();
        break;
      case 'long_desc':
        this.longDesc = Buffer?.from(editor?.editor?.getData())?.toString(
          'base64'
        );
        break;
      case 'short_desc':
        this.shortDesc = Buffer?.from(editor?.editor?.getData())?.toString(
          'base64'
        );
        break;
    }
  }
  getWeeksInMonth(year: any, month: any) {
    //function to get week number from year and month passed
    const weeks: any = [],
      firstDate = new Date(year, month, 1),
      lastDate = new Date(year, month + 1, 0),
      numDays = lastDate.getDate();
    const monthName = firstDate.toLocaleString('default', { month: 'short' });
    let dayOfWeekCounter = firstDate.getDay();
    for (let date: any = 1; date <= numDays; date++) {
      if (dayOfWeekCounter === 1 || weeks.length === 0) {
        weeks.push([]);
      }
      weeks[weeks.length - 1].push(date);
      dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
    }
    return weeks
      .filter((w: any) => !!w.length)
      .map((w: any, index: any) => ({
        name: `${w[0]} ${monthName} - ${w[w.length - 1]} ${monthName} (week ${index + 1
          })`,
        value: index + 1,
      }));
  }
  setWeekOption() {
    this.weekOptions = this.getWeeksInMonth(
      this.rashiInfo.get('year')?.value,
      this.rashiInfo.get('month')?.value - 1
    );
  }
  deleteHoroscope(id: any, type: any) {
    this._SpinnerService.setState(true);
    this._AdminService.deleteHoroscope({ id: id, type: type }).then((data) => {
      if (data.status) {
        this.fetchHoroscopes();
      }
    });
    this._SpinnerService.setState(false);
  }
}