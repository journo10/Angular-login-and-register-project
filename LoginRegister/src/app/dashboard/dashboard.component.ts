import { AlertifyjsService } from './../services/alertifyjs.service';
import { DashboardService } from './../services/dashboard.service';
import { DashboardModel } from './dashboard.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AlertifyjsService],
})
export class DashboardComponent implements OnInit {
  FormV: any = FormGroup;
  dashboardModelObj: DashboardModel = new DashboardModel();
  dashboardData: any;
  showAdd: boolean;
  showUpdate: boolean;
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private alertifyjsService: AlertifyjsService
  ) {}

  ngOnInit(): void {
    this.FormV = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobile: ['',[Validators.required,Validators.minLength(11),Validators.pattern("^[0-9]*$")]],
      salary: ['',Validators.required],
    });

    this.dashboardDetailsGet();
  }

  //clickAdddashboard
  clickAddDashboard() {
    this.FormV.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  //Post
  dashboardDetailsPost() {
    this.dashboardModelObj.firstName = this.FormV.value.firstName;
    this.dashboardModelObj.lastName = this.FormV.value.lastName;
    this.dashboardModelObj.email = this.FormV.value.email;
    this.dashboardModelObj.mobile = this.FormV.value.mobile;
    this.dashboardModelObj.salary = this.FormV.value.salary;

    this.dashboardService
      .getPostDashboard(this.dashboardModelObj)
      .subscribe((res) => {
        console.log(res);
        let ref = document.getElementById('button1'); //form kayboluyor.
        ref?.click();
        this.alertifyjsService.success('Kişi başarılı bir şekilde eklendi.');
        this.FormV.reset();
        this.dashboardDetailsGet();
      });
  }
  //Get
  dashboardDetailsGet() {
    this.dashboardService.getDashboard().subscribe((res) => {
      this.dashboardData = res;
    });
  }

  //Delete
  dashboardDetailsDelete(item: any) {
    this.dashboardService.getDeleteDashboard(item.id).subscribe((res) => {
      this.alertifyjsService.error('Kişi başarılı bir şekilde silindi.');
      this.dashboardDetailsGet();
    });
  }

  //Edit
  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.dashboardModelObj.id = item.id;

    this.FormV.controls['firstName'].setValue(item.firstName);
    this.FormV.controls['lastName'].setValue(item.lastName);
    this.FormV.controls['email'].setValue(item.email);
    this.FormV.controls['mobile'].setValue(item.mobile);
    this.FormV.controls['salary'].setValue(item.salary);
  }

  dashboardDetailsUpdate() {
    this.dashboardModelObj.firstName = this.FormV.value.firstName;
    this.dashboardModelObj.lastName = this.FormV.value.lastName;
    this.dashboardModelObj.email = this.FormV.value.email;
    this.dashboardModelObj.mobile = this.FormV.value.mobile;
    this.dashboardModelObj.salary = this.FormV.value.salary;

    this.dashboardService
      .getUpdateDashboard(this.dashboardModelObj, this.dashboardModelObj.id)
      .subscribe((res) => {
        this.alertifyjsService.warning(
          'Kişi başarılı bir şekilde güncellendi.'
        );
        let ref = document.getElementById('button1'); //form kayboluyor.
        ref?.click();
        this.FormV.reset();
        this.dashboardDetailsGet();
      });
  }
}
