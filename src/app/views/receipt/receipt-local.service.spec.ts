import { TestBed } from '@angular/core/testing';

import { ReceiptLocalService } from './receipt-local.service';

describe('ReceiptLocalService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ReceiptLocalService = TestBed.get(ReceiptLocalService);
        expect(service).toBeTruthy();
    });
});
