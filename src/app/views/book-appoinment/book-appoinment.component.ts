import { Component, OnInit, Provider } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProviderService } from '../../services/provider.service';
import { Healthcareservices } from '../../services/myservice.service';
import { myServices } from 'src/app/model/services.model';
import { GlobalService } from 'src/app/services/global.service';
import { ProfileService } from 'src/app/services/profile.service';

import { PractitionersService } from 'src/app/services/practitioners.service';
import { ProviderScheduleService } from 'src/app/services/provider-schedule.service';
import { User } from 'src/app/model/user.model';
import { Patient } from 'src/app/model/patient.model';
import { Practitioners } from 'src/app/model/practitioners';
import { ProviderSchedule, ProviderScheduleResponse } from 'src/app/model/provider-schedule';
import { PaymentMethod, PaymentMethodResponse } from 'src/app/model/payment-method';
import { DatepickerViewModel } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import {MatIconModule} from '@angular/material/icon';
import { PaymentService } from 'src/app/services/payment.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AddAppointmentClass } from 'src/app/model/add-appointment.model';
import { ProviderScheduleDetail } from 'src/app/model/provider-schedule-detail';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Promocode } from 'src/app/model/promocode';
import { PromocodeService } from 'src/app/services/promocode.service';

import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-book-appoinment',
  templateUrl: './book-appoinment.component.html',
  styleUrls: ['./book-appoinment.component.css']
})


export class BookAppoinmentComponent implements OnInit {

  subscription : Subscription;

  paymentMethodResult : PaymentMethod[];
  paymentMethodOffset = 0;
  paymentSelected = "";
  paymentSubscription: Subscription; 

  //provider schedule
  providerScheduleTemp : any;
  providerDateSchedule = []; //for array of schedule date
  providerArrofDetailSchedule = []; //for array detail 

  providerResult: Provider[];
  providersubscription: Subscription;
  providerOffset = 0;

  serviceResult : myServices[];
  serviceOffset= 0;
  serviceSubscription: Subscription; 
  
  profilesSubscription : Subscription;
  users : User;
  profiles : Patient[];

  practitionerResult : Practitioners[];
  practitionerOffset= 0;
  practitionerSubscription: Subscription; 

  providerscheduleResult : ProviderSchedule[];
  providerschedulesubscription : Subscription;
  providerscheduleOffset = 0

  promocode : Promocode[];
  filteredpromocode : Promocode[];
  promocodesubscription : Subscription;
  promocodeOffset : 0;


  isLoading: boolean;
  isUserTriggered = true;

  providerSelected  : number;
  serviceSelected : number;
  patientSelected  : number;
  doctorSelected : number;
  scheduleSelected : number;
  promoSelected : string;
  ConsultationFee = 0;

  datefrompicker : Date;

  tempData : AddAppointmentClass;
  tempAppointmentDetail : ProviderScheduleDetail;
  message: string;

  addAppointmentForm : FormGroup;

  constructor(
    private _providerService: ProviderService, private _myserviceService : Healthcareservices, private _globalService : GlobalService,
    private _profileService : ProfileService, private _practitionerService : PractitionersService, private _providerscheduleService : ProviderScheduleService,
    private _paymentService : PaymentService, private _appointmentService : AppointmentService,  private _formBuilder: FormBuilder, public datepipe: DatePipe, private _promoCode : PromocodeService
  ) { }

  //for provider dropdown
  providerUpdate(e){
    this.providerSelected = e.target.value;
    this.refreshService();
    this.practitionerResult = [];
    this.getPaymentMethod();
  }

  //for patient dropdown
  patientUpdate(e){
    this.patientSelected = e.target.value;
    this.getProviderSchedule();
  }

   //for doctor dropdown
   doctorUpdate(e){
    this.doctorSelected = e.target.value;
  }

   //for promocode dropdown
   promocodeUpdate(e){
    this.promoSelected = e.target.value;
  }

   //for schedule dropdown
   scheduleUpdate(e){
    this.scheduleSelected = e.target.value;
    this.ConsultationFee = this.providerArrofDetailSchedule[this.scheduleSelected]["consultation_fee"];
    this.getPromoCode();
  }

  //for provider dropdown
  serviceUpdate(e){
    this.serviceSelected = e.target.value;
    this.refreshPractitioner()
  }

  //for payment dropdonw
  paymentUpdate(e){
    this.paymentSelected = e.target.value;
  }

  ngOnInit() {
    this.restart();
  }

  restart() {
    this.providerOffset = 0;
    this.providerResult = [];

    this.serviceOffset = 0;
    this.serviceResult = [];

    this.practitionerOffset = 0;
    this.practitionerResult = [];

    this.providerscheduleOffset = 0;
    this.providerscheduleResult = [];

    this.promocodeOffset = 0;
    this.promocode = [];
    this.filteredpromocode = [];

    this.refreshProviderData();
    this.getAllProfiles();
  }

  async refreshProviderData() {
    this.isUserTriggered = false;
    this.isLoading = true;
    
    try {
        let provider$ = await this._providerService.getProvider(this.providerOffset);
        
        this.providersubscription = provider$.subscribe(
            data => {
                if (data.rows.length > 0) {
                    this.providerOffset += data.rows.length;
                    this.providerResult = this.providerResult.concat(data.rows);
                }
                
                this.isUserTriggered = false;
                this.isLoading = false;
                console.log ("Result Provide= ", this.providerResult);
                
            }, err => {
                this.isUserTriggered = false;
                this.isLoading = false;
            }
        );
    } catch(err) {
        console.log ("error in booking index = ", err);
    };
  }
  
  async getPaymentMethod()
  {
    try {
      this.paymentMethodResult = [];
      let payment$ = await this._paymentService.getPaymentMethod(this.paymentMethodOffset, this.providerSelected);
      
      this.paymentSubscription = payment$.subscribe(
          data => {
              if (data) {
                  console.log ("Payment Method Result= ", data);
                  this.paymentMethodResult = data;
              }
              this.isUserTriggered = false;
              this.isLoading = false;
          }, err => {
              this.isUserTriggered = false;
              this.isLoading = false;
          }
      );
  } catch(err) {
      console.log ("error in booking index = ", err);
  };
  }

  async getAllProfiles() {
    const user = await this._globalService.getUserData();
    const patient$ = await this._profileService.getUserProfiles(user.patient_id);
    
    this.profilesSubscription = patient$.subscribe(
        data => {
            this.users = data.patient;
            this.profiles = data.profiles;
            this.isLoading = false;
            console.log("User",this.profiles.length);
        }, error => {
            this.isLoading = false;
        }
    );
  }

  //GET PROVIDER SCHEDULE WITH ANY (NO DATA MODELLING)
  async getProviderSchedule()
  {
    if(!this.datefrompicker)
    {
      this.datefrompicker = (<HTMLInputElement>document.getElementById("inputBookingTime")).valueAsDate;
    }
    console.log("Date : ", this.datefrompicker);
    console.log("Month : ", this.datefrompicker.getMonth());
    console.log("Year : ", this.datefrompicker.getFullYear());
    const service = await this._providerscheduleService.getProviderSchedule(this.providerscheduleOffset,this.datefrompicker.getFullYear(),this.datefrompicker.getMonth(), this.serviceSelected, this.doctorSelected, this.providerSelected);
    
    this.providerschedulesubscription = service.subscribe(
        data => {
            this.providerScheduleTemp = data;
            console.log("Provider Schedule : ", this.providerScheduleTemp);
          
          for(var i in this.providerScheduleTemp)
          {
            this.providerDateSchedule.push(i);
            this.providerArrofDetailSchedule.push(this.providerScheduleTemp[i][0]);
          }

          console.log("Provider Date Schedule as Array :", this.providerDateSchedule);
          console.log("Provider Detail Schedule as Array :", this.providerArrofDetailSchedule);

        }, error => {
            this.isLoading = false;
        }
    );
  }

  
  // async getProviderSchedule() {
  //   try {
  //     this.providerscheduleResult = [];
  //     let service$ = await this._providerscheduleService.getProviderSchedule(this.providerscheduleOffset,2021,7, this.serviceSelected, this.doctorSelected, this.providerSelected);

  //     this.providerschedulesubscription = service$.subscribe(
  //         data => {
  //             if (data) {
  //                 this.providerscheduleOffset += this.providerscheduleOffset + 1;
  //                 this.providerscheduleResult = this.providerscheduleResult.concat(data.contain);
  //             }
              
  //             this.isUserTriggered = false;
  //             this.isLoading = false;
  //             console.log ("Provider Schedule Services= ", this.providerscheduleResult);
              
  //         }, err => {
  //             this.isUserTriggered = false;
  //             this.isLoading = false;
  //         }
  //         );
  //     } catch(err) {
  //         console.log ("error in booking index = ", err);
  //     };
  // }
 
  async refreshService()
  {
      try {
        this.serviceResult = [];
        let service$ = await this._myserviceService.getProvider(this.serviceOffset, this.providerSelected);
        
        this.serviceSubscription = service$.subscribe(
            data => {
                if (data.rows.length > 0) {
                    this.serviceOffset += data.rows.length;
                    this.serviceResult = this.serviceResult.concat(data.rows);
                }
                
                this.isUserTriggered = false;
                this.isLoading = false;
                console.log ("Result Services= ", this.serviceResult);
            }, err => {
                this.isUserTriggered = false;
                this.isLoading = false;
            }
        );
    } catch(err) {
        console.log ("error in booking index = ", err);
    };
  }

  async refreshPractitioner()
  {
      try {
        this.practitionerResult = [];
        let practitioner$ = await this._practitionerService.getPractitioner(this.practitionerOffset, this.providerSelected, this.serviceSelected);
        
        this.practitionerSubscription = practitioner$.subscribe(
            data => {
                if (data.rows.length > 0) {
                    this.practitionerOffset += data.rows.length;
                    this.practitionerResult = this.practitionerResult.concat(data.rows);
                }
                
                this.isUserTriggered = false;
                this.isLoading = false;
                console.log ("Practitioner Result= ", this.practitionerResult);
            }, err => {
                this.isUserTriggered = false;
                this.isLoading = false;
            }
        );
    } catch(err) {
        console.log ("error in booking index = ", err);
    };
  }
  

  async createAppointment() {
    
    if(this.promoSelected == "default")
    {
      this.promoSelected = "";
    }

    let tempDateString =  this.providerDateSchedule[this.scheduleSelected] + " " + this.providerArrofDetailSchedule[this.scheduleSelected].start_time;
    let tempDateTime = new Date (tempDateString);

    console.log("Date Awal : ", tempDateTime );

    let readyDate =this.datepipe.transform(tempDateTime, 'yyyy-MM-dd hh:mm:ss'); 
    console.log("Date Ready : ", readyDate );

    this.tempAppointmentDetail = {
      schedule_id : this.providerArrofDetailSchedule[this.scheduleSelected].schedule_id,
      appointment_datetime : readyDate,
      profile_id :this.patientSelected
    }

    console.log("Temp Appointment Details Data for Add Appointment :",this.tempAppointmentDetail );

    this.tempData = {
      total_fee : this.ConsultationFee,
      provider_id : this.providerSelected,
      payment_method : this.paymentSelected,
      appointment_details : [this.tempAppointmentDetail],
      card_token : "",
      promo_code : this.promoSelected
    }

    console.log("Temp Data for Add Appointment :",this.tempData );

    const auth$ = await this._appointmentService.addAppointment(this.tempData);

    auth$.subscribe(token => {
      console.log("Token : ", token)
      console.log("Add Appointment berhasil dilakukan!");
      alert("Appointment berhasil dibuat!")
  }, err => {
      this.message = err;
      alert("Appointment tidak berhasil dibuat!");
  });

  }

  bookAnotherService() {  

  }

  async getPromoCode()
  {

    let tempDateString =  this.providerDateSchedule[this.scheduleSelected] + " " + this.providerArrofDetailSchedule[this.scheduleSelected].start_time;
    let tempDateTime = new Date (tempDateString);

    let readyDate = this.datepipe.transform(tempDateTime, 'yyyy-MM-dd'); 
    console.log("Date Ready for Promocode: ", readyDate );

    try {
      let promocode$ = await this._promoCode.getPromocode(this.promocodeOffset,readyDate,"ACTIVE");
      
      this.promocodesubscription = promocode$.subscribe(
          data => {
              if (data.rows.length > 0) {
                console.log("Data :", data);
                this.promocodeOffset += data.rows.length;
                console.log("Data rows : ",data.rows);
                this.promocode = this.promocode.concat(data.rows);           
              }
              this.isUserTriggered = false;
              this.isLoading = false;
              console.log ("All Promo Code Result= ", this.promocode);
              this.filteringPromoCode();       
          }, err => {
              this.isUserTriggered = false;
              this.isLoading = false;
          }
      );
  } catch(err) {
      console.log ("error in booking index = ", err);
  };
  }

  filteringPromoCode()
  {
    for(let i = 0; i < this.promocode.length; i++)
    {
      //console.log("TEMP : ",this.promocode[i]["provider_id"]);
      if(this.promocode[i]["provider_id"] == this.providerSelected || this.promocode[i]["practitioner_id"] == this.doctorSelected || this.promocode[i]["service_id"] == this.serviceSelected)
      {
        this.filteredpromocode = this.filteredpromocode.concat(this.promocode[i]);
      }

       console.log("Filtered Promo Code : ",this.filteredpromocode);
    }
  }


}
