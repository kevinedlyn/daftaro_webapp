import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs/observable';

@Injectable({
    providedIn: 'root'
})
export class ReceiptLocalService {
    selectedReceiptSubject: Subject<string>;
    selectedReceipt$: Observable<string>;
    
    constructor() {
        this.selectedReceiptSubject = new Subject();
        this.selectedReceipt$ = this.selectedReceiptSubject.asObservable();
    }
        
    selectReceipt(receiptId: string) {
        this.selectedReceiptSubject.next(receiptId);
    }
}