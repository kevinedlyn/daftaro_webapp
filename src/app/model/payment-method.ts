//BELUM DIGUNAKAN, karena pengambilan data dari API masih menggunakan any, no data modelling

export class PaymentMethod {
    constructor(
       public title : string,
       public code : string,
       public payment_group : string,
       public url : string 
    ){}
}

export class PaymentMethodResponse{
    constructor(
        public contain: PaymentMethod[]
    ){}
}
