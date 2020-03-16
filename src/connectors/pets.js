'use strict';

const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

const dbPath = path.resolve(__dirname, '../../.db/pets.json');

let petsDb;

const loadDb = () => {
	if(petsDb)
		return;

	if(fs.existsSync(dbPath)) {
		const dbContent = fs.readFileSync(dbPath);
		petsDb = dbContent ? JSON.parse(dbContent) : [];
	} else
		petsDb = [];

	return petsDb;
}

const updateDb = () => {
	return fs.writeFileSync(dbPath, JSON.stringify(petsDb));
}

/**
* Dummy pet db for test purposes
*/
module.exports = class PetsConnector {

	get({ pageSize, pageNumber }) {

		loadDb();

		const start = pageSize * (pageNumber - 1);
		const end = start + pageSize;
		return petsDb.slice(start, end);
	}

	getOne(id) {

		loadDb();

		return petsDb.find(({ id: petId }) => petId === id);
	}

	insertOne(pet) {

		loadDb();

		const id = uuidv4();

		petsDb.push({
			...pet,
			id
		});

		updateDb();

		return id;
	}

	updateOne(id, pet) {

		loadDb();

		let currentPet = this.getOne(id);

		if(!currentPet)
			return 0;

		Object.assign(currentPet, pet);

		updateDb();

		return 1;
	}

};