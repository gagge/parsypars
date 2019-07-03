import * as fs from 'fs';
import Invoice from './invoice';
import { InvoiceModel } from './interfaces.d';
import { InvoicePeriodModel } from './interfaces.d';

export default class Parse {
	path:string;
	vendor:string;
	driverPath	:string;
	driver:any;

	constructor(vendor:string, path:string) {
		this.vendor = vendor;
		this.path = path;
		this.driverPath = __dirname + '/parsing_drivers/' + this.vendor + '.js';
	}

	async checkVendor():Promise<boolean> {
		if (fs.existsSync(this.driverPath)) return true;
		throw new Error('Not a valid vendor');
	}

	async checkPath():Promise<boolean> {
		if (fs.existsSync(this.path)) return true;
		throw new Error('Source not found');
	}

	async validate():Promise<void>  {
		await this.checkPath();
		await this.checkVendor();
	}

	async loadDriver():Promise<void> {
		this.driver = require(this.driverPath);
		return;
	}

	async import():Promise<void> {
		await this.validate();
		await this.loadDriver();

		this.readFile()
			.then(() => { return })
			.catch((err) => { throw err });
	}

	readFile():Promise<string> {
		return new Promise((resolve, reject) => {
			const invoice = new Invoice();

			fs.readFile(this.path, async (err, data) => {
				const rawData:string = data.toString();
				const invoicePeriod:InvoicePeriodModel = this.driver.getInvoicePeriod(rawData);
				const invoiceData:InvoiceModel = {
					imported: new Date(),
					invoicePeriodStarts: invoicePeriod.start,
					invoicePeriodEnds: invoicePeriod.end,
					buildingId: this.driver.getBuildingId(rawData),
					meterNumber: this.driver.getMeterNumber(rawData),
					totalCost: this.driver.getTotalCost(rawData),
					totalCostVat: this.driver.getTotalCostVat(rawData),
					energyPrice: this.driver.getEnergyPrice(rawData),
					effectPrice: this.driver.getEffectPrice(rawData),
					flowPrice: this.driver.getFlowPrice(rawData),
					currency:this.driver.getCurrency()
				};

				if (err) reject(err);

				await invoice.save(invoiceData);
				resolve();
			});
		});
	}
}