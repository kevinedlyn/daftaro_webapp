import { Component, OnInit, Provider } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-book-appoinment',
  templateUrl: './book-appoinment.component.html',
  styleUrls: ['./book-appoinment.component.css']
})
export class BookAppoinmentComponent implements OnInit {

  result: Provider[];
  subscription: Subscription;
  offset = 0;
  isLoading: boolean;
  isUserTriggered = true;
  providerSelected = "------"


  constructor(
    private _providerService: ProviderService
  ) { }

  //for dropdown
  providerUpdate(e){
    this.providerSelected = e.target.value;
  }

  ngOnInit() {
    this.restart();
  }

  restart() {
    this.offset = 0;
    this.result = [];

    this.refreshData();
  }

  async refreshData() {
    this.isUserTriggered = false;
    this.isLoading = true;
    
    try {
        let provider$ = await this._providerService.getProvider(this.offset);
        
        this.subscription = provider$.subscribe(
            data => {
                if (data.rows.length > 0) {
                    this.offset += data.rows.length;
                    this.result = this.result.concat(data.rows);
                }
                
                this.isUserTriggered = false;
                this.isLoading = false;
                console.log ("Result Provider Atas= ", this.result);
            }, err => {
                this.isUserTriggered = false;
                this.isLoading = false;
            }
        );
    } catch(err) {
        console.log ("error in booking index = ", err);
    };
}

  createBookingFee() {

  }

  bookAnotherService() {

  }
}
