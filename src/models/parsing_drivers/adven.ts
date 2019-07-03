import moment from 'moment';
import { InvoicePeriodModel } from '../interfaces.d';

export function getInvoicePeriod(data:string):InvoicePeriodModel {
	let line:string[]|null = null;
	let dates:any[]|null = null;
	let start:Date|null = null;
	let end:Date|null = null;

	// Find line
	line = data.match(/.*Fakturaperiod .*\n/g);

	// Find dates
	if (line) dates = line[0].match(/([12]\d{3} (0[1-9]|1[0-2]) (0[1-9]|[12]\d|3[01])[^\\]+)/g);

	// Seperate dates
	if (dates) {
		dates = dates[0].replace(/\s/g, '').split((/\-+/g));

		// Convert to date objects
		if (dates && dates.length === 2) {
			for (let i = 0; dates[i] !== undefined; i++) {
				dates[i] = moment(dates[i], 'YYYYMMDD').toDate();
			}

			if (moment(dates[0]).isBefore(dates[1])) {
				start = dates[0];
				end = dates[1];
			}
		}
	}

	return {start: start, end: end}
}

export function getBuildingId(data:string):string|null {
	let line:string[]|null = null;
	let id:string[]|null = null;
	let buildId:string|null = null;

	// Find line
	line = data.match(/.*Anl.nr: .*\n/g);

	// Get the id number
	if (line) id = line[0].match(/\d{6,10}/g);
	if (id) buildId = id.join();

	return buildId;
}

export function getMeterNumber(data:string):string|null {
	let line:string[]|null = null;
	let id:string[]|null = null;
	let meterNumber:string|null = null;

	// Find line
	line = data.match(/.*Mätarnr: .*\n/g);

	// Get the id number
	if (line) id = line[0].match(/\d{4,8}/g);
	if (id) meterNumber = id.join();

	return meterNumber;
}

export function getTotalCost(data:string):number|null {
	let line:string[]|null = null;
	let cost:string[]|null = null;
	let totalCost:number|null = null;

	// Find line
	line = data.match(/.*Summa exkl. moms.*\n/g);

	// Get the id number
	if (line) cost = line[0].match(/(\d+\ \d+\d+\,\d{1,2})/g);

	if (cost) {
		let converted:any;
		converted = cost.join();
		converted = converted.replace(' ', '');
		converted = converted.replace(',', '.');
		totalCost = Number(converted);
	}
	return totalCost;
}

export function getTotalCostVat(data:string):number|null {
	let line:string[]|null = null;
	let cost:string[]|null = null;
	let totalCostVat:number|null = null;

	// Find line
	line = data.match(/.*Summa inkl. moms.*\n/g);

	// Get the id number
	if (line) cost = line[0].match(/(\d+\ \d+\d+\,\d{1,2})/g);

	if (cost) {
		let converted:any;
		converted = cost.join();
		converted = converted.replace(' ', '');
		converted = converted.replace(',', '.');
		totalCostVat = Number(converted);
	}
	return totalCostVat;
}

export function getEnergyPrice(data:string):number|null {
	let line:string[]|null = null;
	let price:string[]|null = null;
	let energyPrice:number|null = null;

	// Find line
	line = data.match(/.*Energipris fjärrvärme.*\n/g);

	// Get the id number
	if (line) price = line[0].match(/(\d+\ \d+\d+\,\d{1,2} kr)/g);

	if (price) {
		let converted:any;
		converted = price.join();
		converted = converted.replace(' ', '');
		converted = converted.replace('kr', '');
		converted = converted.replace(',', '.');
		energyPrice = Number(converted);
	}
	return energyPrice;
}

export function getEffectPrice(data:string):number|null {
	let line:string[]|null = null;
	let price:string[]|null = null;
	let effectPrice:number|null = null;

	// Find line
	line = data.match(/.*Effektpris.*\n/g);

	// Get the id number
	if (line) price = line[0].match(/(\d+\ \d+\d+\,\d{1,2} kr)/g);

	if (price) {
		let converted:any;
		converted = price.join();
		converted = converted.replace(' ', '');
		converted = converted.replace('kr', '');
		converted = converted.replace(',', '.');
		effectPrice = Number(converted);
	}
	return effectPrice;
}

export function getFlowPrice(data:string):number|null {
	let line:string[]|null = null;
	let price:string[]|null = null;
	let flowPrice:number|null = null;

	// Find line
	line = data.match(/.*Flödespris.*\n/g);

	// Get the id number
	if (line) price = line[0].match(/(\d+\ \d+\d+\,\d{1,2} kr)/g);

	if (price) {
		let converted:any;
		converted = price.join();
		converted = converted.replace(' ', '');
		converted = converted.replace('kr', '');
		converted = converted.replace(',', '.');
		flowPrice = Number(converted);
	}
	return flowPrice;
}

export function getCurrency():string {
	return 'SEK';
}