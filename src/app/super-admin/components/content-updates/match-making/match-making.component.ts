import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { Buffer } from 'buffer'
@Component({
  selector: 'app-match-making',
  templateUrl: './match-making.component.html',
  styleUrls: ['./match-making.component.css']
})
export class MatchMakingComponent {
  content: any;
  permission: any;
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
      bullist numlist outdent indent | removeformat | help | wordcount'
  }
  constructor(
    private _AdminService: AdminService,
    private _SpinnerService: SpinnerService,
    private _NotifierService: NotifierService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService
  ) {

  }
  ngOnInit(): void {
    this.showContent();
    this._ActivatedRoute.queryParams.subscribe((params) => {
      if (params['permit'])
        this.permission = Buffer.from(params['permit'], 'base64').toString(
          'ascii'
        );
    });
  }

  updateContent() {
    const encyContent = Buffer.from(this.content, 'utf8').toString('base64');
    this._SpinnerService.setState(true);
    this._AdminService.updateContent({ type: "match", content: encyContent }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess('Update Success');
      } else {
        this._NotifierService.showError('Some Error Occurred');
      }
    });
    this._SpinnerService.setState(false);
    this.showContent();
    this.showContent();
  }

  showContent() {
    this._SpinnerService.setState(true);
    this.content = "";
    this._AdminService.showContent({ type: "match" }).then((data) => {
      if (data?.status) {
        this.content = Buffer?.from(data?.data?.DescP, 'base64').toString();
      } else {
        this._NotifierService.showError('Some Error Occurred');
      }
    });
    this._SpinnerService.setState(false);
  }
}
