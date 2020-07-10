"use strict";

// dependencies
const { logger } = require("../../lib/log-manager"),
  { agencyModel, clientModel } = require("../../models"),
  {AGENCY_CLIENT_EXISTS, AGENCY_EXIST} = require("../../config/constants/response-messages").STATUS_MSG.ERROR,
  { generateRandomString } = require("../../util/universal-functions"),
  {
      update,
      findOne,
      saveData,
      insertMany,
      aggregateData
  } = require("../../dao-manager/queries");

//////////////////////////// agency controller functions here //////////////////////////////

// save agency as well as client
const saveAgencyAndClient = async (payload) => {
  try {
    logger.info(`inside saveAgencyAndClient fn agency controller:`);

    let clients = payload.clients;

    // now delete clients from payload
    delete payload.clients;

    payload.agencyId = generateRandomString();
    payload.name = payload.name.toLowerCase();

    // check for agency name uniquesness
    let agency = await findOne(
      agencyModel,
      {
        status: status[0],
        name: payload.name,
      },
      { _id: 1 },
      { lean: true }
    );

    if(agency && agency._id) {
        throw AGENCY_EXIST;
    }

    // save agency
    agency = (await saveData(agencyModel, payload))._doc;

    // now create data to save in clients
    clients = clients.map(async (client) => {
      client.agencyId = agency._id;
      client.clientId = await generateRandomString();

      return client;
    });

    // now insert in bulk the data
    await insertMany(clientModel, clients);

    return agency;
  } catch (e) {
    logger.log(
      "error",
      `error in save agency and client fn in agency controller: ${e}`
    );
    throw e;
  }
};

// update client details
const updateClient = async (params, payload) => {
  try {
    logger.info(`inside updateClient fn agency controller:`);

    payload.updatedAt = Date.now();

    // check for email unique with client for agency -> clients with same email can have multiple agencies
    // but agency can't have multiple clients with same email
    let client = await findOne(
      clientModel,
      {
        status: status[0],
        email: payload.email,
        agencyId: payload.agencyId,
        _id: { $ne: params.id },
      },
      { _id: 1 },
      { lean: true }
    );

    if (client && client._id) {
      throw AGENCY_CLIENT_EXISTS;
    }

    // update client data
    await update(clientModel, { _id: params.id }, { $set: payload }, {});

    return {};
  } catch (e) {
    logger.log("error", `error in updateClient fn in agency controller: ${e}`);
    throw e;
  }
};

// get agency details as per id
const agencyDetails = async (params) => {
  try {
    logger.info(`inside agency fn agency controller:`);

    return await findOne(agencyModel, { _id: params.id }, {}, { lean: true });
  } catch (e) {
    logger.log("error", `error in agency fn in agency controller: ${e}`);
    throw e;
  }
};

// top clients as per total Bill controller
const topClients = async (query) => {
    try {
        logger.info(`inside topClients fn agency controller:`);

        let criteria = {
          status: status[0],                 // only active clients if all then remove this
          // agencyId: params.id           // for particular agency    
      };

      if(query.agencyId) {
        criteria.agencyId = query.agencyId;
      }

        let {count, data} = (await aggregateData(clientModel, [{
            $match: criteria
        }, {
            $facet: {
                count: [{$count: "count"}],
                data:[
                    {
                        $sort: {totalBill: -1}
                    },
                    {
                        $skip: parseInt(query.skip || 0)
                    },
                    {
                        $limit: parseInt(query.limit) || 20
                    },
                    {
                        $lookup: {
                            from: "agencies",
                            localField: "agencyId",
                            foreignField: "_id",
                            as: "agencyId"
                        }
                    },
                    {$unwind: "agencyId"},
                    {
                        $project: {
                            totalBill: "$totalBill",
                            agencyName: "$agencyId.name",
                            clientName: "$name",
                        }
                    }
                ]
            }
        }, {
            $project: {
                count: {$arrayElemAt: ["$count.count", 0]},
                data: "$data"
            }
        }]
        ))[0];

        return {count, data};
    } catch(e) {
        logger.log("error", `error in topClients fn in agency controller: ${e}`);
    throw e;
    }
};



// export functions required out side
module.exports = {
    topClients: topClients,
    updateClient: updateClient,
    agencyDetails: agencyDetails,
    saveAgencyAndClient: saveAgencyAndClient
}
