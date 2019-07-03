import fs from 'fs';
import { InvoiceModel } from './interfaces.d';

export default class Invoice {

	private storage:string;

	constructor() {
		this.storage = __dirname + '/../../storage/invoices.json';
	}

	async save(invoice: InvoiceModel):Promise<void> {
		await this.createFile();
		const readFile = this.readFile();

		readFile.then(async (data) => {
			const json = JSON.parse(data.toString());

			json.push(invoice);
			await this.writeToFile(JSON.stringify(json));
			return;
		});

		readFile.catch((err) => { throw err });
	}

	readFile():Promise<Buffer> {
		return new Promise((resolve, reject) => {
			fs.readFile(this.storage, function (err, data) {
				if (err) reject(err);
				resolve(data);
			});
		});
	}

	async createFile():Promise<void> {
		if (fs.existsSync(this.storage)) {
			return;
		} else {
			fs.writeFile(this.storage, JSON.stringify([]), function (err) {
				if (err) throw err;
				return;
			});
		}
	}

	async writeToFile(data:string):Promise<void> {
		fs.writeFile(this.storage, data, function(err) {
			if (err) throw err;
			return;
		});
	}
}

