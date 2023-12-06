import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  chatData: any = [];
  chatId: any = ""
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _AdminService: AdminService,
    private _NotifierService: NotifierService,
  ) { }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(($: any) => {
      this.chatId = $.chatId;
      this._AdminService.showChat({ chatId: $.chatId }).then((data) => {
        if (data?.status && data?.data) {
          this.chatData = data?.data;
        }
        else if (!data?.data && data?.status)
          this._NotifierService.showError("No Chat found for this User");
        else {
          this._NotifierService.showError("Some Error Occurred");
        }
      });
    });

  }
}
