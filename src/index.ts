import Parse from './models/parse.js';

const args:string[] = process.argv.slice(2);

if (args.length < 2) {
	console.log('Error: Not enough arguments given');
	process.exit();
}

async function run() {
	let parser = new Parse(args[0], args[1]);

	try {
		await parser.import();
		console.log('\\o/ YAY! Imported file succesfully');
	} catch(err) {
		console.log('Error: ' + err.message);
	}
}

run();