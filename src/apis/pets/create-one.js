'use strict';

const { CreateOneApi, ApiHandler } = require('aws-http-api-gateway');

const PetValidator = require('./validator');
const PetConnector = require('../../connectors/pets');

const petConnector = new PetConnector();

class PetCreateOneApi extends CreateOneApi {

	get dataConnector() {
		return petConnector;
	}

	bodyValidator(pet) {
		return PetValidator(pet);
	}
};

module.exports.handler = ApiHandler(PetCreateOneApi);
