'use strict';

const { GetOneApi, ApiHandler } = require('aws-http-api-gateway');

const PetConnector = require('../../connectors/pets');

const petConnector = new PetConnector();

class PetGetOneApi extends GetOneApi {

	get dataConnector() {
		return petConnector;
	}

};

module.exports.handler = ApiHandler(PetGetOneApi);
