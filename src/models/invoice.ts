import fs from 'fs';
import { InvoiceModel } from './interfaces.d';

export default class Invoice {

	private storage:string;

	constructor() {
		this.storage = __dirname + '/../../storage/invoices.json';
	}

	async save(invoice: InvoiceModel):Promise<void> {
		await this.createFile();

		const data = await this.readFile();
		const json = JSON.parse(data.toString());

		json.push(invoice);

		await this.writeToFile(JSON.stringify(json));
	}

	readFile():Promise<Buffer> {
		return new Promise((resolve, reject) => {
			fs.readFile(this.storage, (err, data) => {
				if (err) reject(err);
				resolve(data);
			});
		});
	}

	createFile():Promise<void> {
		return new Promise((resolve, reject) => {
			if (fs.existsSync(this.storage)) {
				resolve();
			} else {
				fs.writeFile(this.storage, '[]', (err) => {
					if (err) reject(err);
					resolve();
				});
			}
		});
	}

	writeToFile(data:string):Promise<void> {
		return new Promise((resolve, reject) => {
			fs.writeFile(this.storage, data, (err) => {
				if (err) reject(err);
				resolve();
			});
		});
	}
}

