'use strict';

module.exports = pet => {

	if(!pet || typeof pet !== 'object' || Array.isArray(pet))
		throw new Error('Pet should be an object');

	if(!pet.name)
		throw new Error('Pet must have a name!');

	if(!pet.kind)
		throw new Error('Pet must have a kind!');
};