export class Invoice{
    constructor(
        public id:number,
        public name:string,
        public address:string,
        public medicine_id:number,
        public medicine_name:string,
        public medicine_quantity:number,
        public medicine_mrp:number,
        public total_amount:number,
        public subtotal:number,
        public discount:number,
        public grand_total:number,
        public date:string

    
    ){}
    
}