'use strict';

let MONGO_URI	= `mongodb://${process.env.MONGO_HOST}:27017/${process.env.MONGO_DB_NAME}`;

if(process.env.MONGO_USER_NAME && MONGO_USER_PASSWORD){
	MONGO_URI = `mongodb://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@${process.env.MONGO_HOST}:27017/${process.env.MONGO_DB_NAME}`;
}

module.exports = {
	MONGO_URI
};
