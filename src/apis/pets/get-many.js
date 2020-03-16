'use strict';

const { GetManyApi, ApiHandler } = require('aws-http-api-gateway');

const PetConnector = require('../../connectors/pets');

const petConnector = new PetConnector();

class PetGetManyApi extends GetManyApi {

	get dataConnector() {
		return petConnector;
	}

};

module.exports.handler = ApiHandler(PetGetManyApi);
