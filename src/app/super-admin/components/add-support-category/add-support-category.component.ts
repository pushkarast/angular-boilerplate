import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin-api/admin-api.service';
import { NotifierService } from 'src/app/shared/services/toaster.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { Buffer } from 'buffer'
@Component({
  selector: 'app-add-support-category',
  templateUrl: './add-support-category.component.html',
  styleUrls: ['./add-support-category.component.css']
})
export class AddSupportCategoryComponent {
  modalRef?: BsModalRef;
  getInfo: FormGroup
  getSubCatInfo: FormGroup
  updateDataInfo: FormGroup
  singleData: FormGroup
  singleSubCat: FormGroup
  relatedTags = []
  TabOption: number = 0
  categoryList = []
  allCategogryData: any = []
  tagsList: any = []
  singleCategoryDetail: any = []
  newRelatedTags: any = []
  subcategoryDetails: any = []
  singleSubcategoryDetails: any = {}
  singleSubCatData: any = []
  permission: any;
  constructor(
    private _NotifierService: NotifierService,
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService,
    private modalService: BsModalService,
    private _ActivatedRoute: ActivatedRoute,
    private _CommonService: CommonService
  ) {
    this.getInfo = this._FormBuilder.group({
      categoryName: [""],
      relatedTags: [""],
    })
    this.getSubCatInfo = this._FormBuilder.group({
      SubcategoryName: [""],
      categoryList: [""],
      SubcategoryDescp: [""]
    })
    this.updateDataInfo = this._FormBuilder.group({
      updatedCategoryName: "",
      ticketId: null,
      newRelatedTags: [""]
    })
    this.singleData = this._FormBuilder.group({
      categoryId: null,
      updatedCategoryName: "",
      newRelatedTags: [""]
    })
    this.singleSubCat = this._FormBuilder.group({
      id: null,
      updatedSubCategoryName: "",
      updatedSubCategoryDescp: "",
    })
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.gettagNames();
    this.getSubcategoryDetail();
    this._ActivatedRoute.queryParams.subscribe(params => {
      if (params["permit"])
        this.permission = Buffer.from(params["permit"], 'base64').toString('ascii');
    })
  }
  getPermisson(p_type: any) {
    return this._CommonService.getPermission(this.permission, p_type)
  }
  getTags(event: any = null) {
    this._AdminService.fetchMasterTags({ name: "support" }).then((data) => {
      if (data?.status) {
        this.relatedTags = data?.data?.tags;
      }
    })
  }

  getData(edited = false) {
    if (this.TabOption == 0) {
      this._AdminService.addSupportCategory(this.getInfo.value).then((data) => {
        if (data?.status) {
          this._NotifierService.showSuccess("Success");
          this.getInfo = this._FormBuilder.group({
            categoryName: [""],
            relatedTags: [""],
          })
        }
        else
          this._NotifierService.showError("Some Error Occurred");
      })
    }
    else if (this.TabOption == 1) {
      this._AdminService.addSupportSubCategory(this.getSubCatInfo.value).then((data) => {
        if (data?.status) {
          this._NotifierService.showSuccess("Success");
          this.getSubCatInfo = this._FormBuilder.group({
            SubcategoryName: [""],
            categoryList: [""],
            SubcategoryDescp: [""],
          })
        }
        else
          this._NotifierService.showError("Some Error Occurred");
      })
    }
  }

  getCategoryData() {
    this._AdminService.fetchSupportCatList().then((data) => {
      if (data?.status) {
        this.categoryList = data?.data?.categoryList;
      }
    })
  }

  setTabOption(data: any) {
    this.TabOption = data;
  }

  getAllCategory() {
    this._AdminService.fetchSupportCatLists().then((data) => {
      if (data?.status) {
        // this._NotifierService.showSuccess("Success");
        this.allCategogryData = data?.data
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    })
  }

  openModal(template: TemplateRef<any>, categoryId: any, categoryName: any, prevTags: any) {
    // console.log(prevTags, 'prev tagss')
    this.getSingleTicketData(categoryId, categoryName, prevTags)
    this.modalRef = this.modalService.show(template);
  }

  openDeleteCatModal(template: TemplateRef<any>, categoryId: any) {
    this.deleteCategory(categoryId)
  }

  openDeleteSubCatModal(template: TemplateRef<any>, subcategoryId: any) {
    this.deletesubCategory(subcategoryId)
  }

  gettagNames() {
    this._AdminService.fetchMasterTags({ name: "support" }).then((data) => {
      if (data?.status) {
        // this._NotifierService.showSuccess("Success");
        this.tagsList = data?.data?.tags
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    })
  }
  updateData() {
    this._AdminService.editSupportCategory({ ...this.singleData.value }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Success");
        this.singleData = this._FormBuilder.group({
          categoryId: null,
          updatedCategoryName: "",
          newRelatedTags: [""]
        })
        this.modalRef?.hide();
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    })
  }

  getSingleTicketData(categoryId: any, categoryName: any, prevTags: any) {
    this._AdminService.getCategoryDetailById({ categoryId: categoryId }).then((data) => {
      if (data?.status) {
        this.singleCategoryDetail = data?.data?.catDetails
        this.singleData.get('categoryId')?.setValue(categoryId)
        this.singleData.get('updatedCategoryName')?.setValue(categoryName)
        // console.log(prevTags=["free","Session"], 'from singleee')
        this.singleData.get('newRelatedTags')?.setValue(prevTags)
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    })
  }

  getSubcategoryDetail() {
    this._AdminService.getSupportSubcategory().then((data) => {
      if (data?.status) {
        this.subcategoryDetails = data?.data
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    })
  }
  openModalSubCategory(template: TemplateRef<any>, subcategoryId: any, subCatName: any, description: any) {
    this.getSingleSubCatDetail(subcategoryId, subCatName, description)
    this.modalRef = this.modalService.show(template);
  }
  getSingleSubCatDetail(subcategoryId: any, subCatName: any, description: any) {
    try {
      this._AdminService.getSupportSubcategoryById({ id: subcategoryId }).then((data) => {
        if (data?.status) {
          this.singleSubcategoryDetails = data?.data
          this.singleSubCat.get('updatedSubCategoryName')?.setValue(subCatName)
          this.singleSubCat.get('id')?.setValue(subcategoryId)
          this.singleSubCat.get('updatedSubCategoryDescp')?.setValue(description)
          // console.log(this.singleSubcategoryDetails, 'singleSubcategoryDetails')
        }
        else
          this._NotifierService.showError("Some Error Occurred");
      })
    } catch (error) {
      console.log(error)
    }
  }
  updateSubCat() {
    // console.log('inside update sub cat')
    this._AdminService.editSupportSubCatById({ ...this.singleSubCat.value }).then((data) => {
      if (data?.status) {
        this.singleSubcategoryDetails = data?.data
        this._NotifierService.showSuccess("Data updated successfully");
        this.singleData = this._FormBuilder.group({
          id: null,
          updatedSubCategoryName: "",
        })
        this.modalRef?.hide();
        this.getSubcategoryDetail();
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    })
  }

  deleteCategory(categoryId: any) {
    this._AdminService.deleteSupportCategory({ id: categoryId }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("category deleted successfully");
        this.getAllCategory();
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    })
  }
  deletesubCategory(subcategoryId: any) {
    this._AdminService.deleteSupportSubCategory({ id: subcategoryId }).then((data) => {
      if (data?.status) {
        this._NotifierService.showSuccess("Subcategory deleted successfully");
        this.getSubcategoryDetail();
      }
      else
        this._NotifierService.showError("Some Error Occurred");
    })
  }

  addAstrologers(event: Event) {
    console.log('inside add astrologers selected..')
  }
}
