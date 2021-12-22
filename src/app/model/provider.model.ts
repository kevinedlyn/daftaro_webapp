export class Provider {
    constructor(
        public provider_id: number,
        public provider_name: string,
        public address: string,
        public city: string,
        public province: string,
        public country: string,
        public phone_number: number,
       ) { }
}

export class ProviderResponse {
    constructor(
        public count: number,
        public rows: Provider[]) { }
}
