export interface InvoiceModel {
	imported:Date;
	invoicePeriodStarts:Date|null;
	invoicePeriodEnds:Date|null;
	buildingId:string|null;
	meterNumber:string|null;
	totalCost:number|null;
	totalCostVat:number|null;
	energyPrice:number|null;
	effectPrice:number|null;
	flowPrice:number|null;
	currency:string|null;
}

export interface InvoicePeriodModel {
	start:Date|null;
	end:Date|null;
}