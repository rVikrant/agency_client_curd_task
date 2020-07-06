'use strict';

// npm modules
const mongoose	=	require('mongoose');

// constants imported
// const MONGO_URI	=	require('../config').dbConf.MONGO_URI;
const MONGO_URI	=	require('../config/db-config').MONGO_URI;


// local modules
const Logger	=	require('../lib/log-manager').logger;

global.ObjectId =  mongoose.Types.ObjectId;
 
module.exports = {
	connect: () => {
		return mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(data => Logger.info('Mongodb connected.....'))
    .catch(err => {
			Logger.error('Mongodb connection error.....',new Error(err));
			process.exit(1);
		})
	}
};
