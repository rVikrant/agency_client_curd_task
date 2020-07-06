'use strict';

let saveData = function(model,data){
    return new model(data).save();
};

let getData = function (model, query, projection, options) {
    return model.find(query, projection, options);
};

let findOne = function (model, query, projection, options) {
    return model.findOne(query, projection, options);
};

let findAndUpdate = function (model, conditions, update, options) {
    return  model.findOneAndUpdate(conditions, update, options);
};

let findAndRemove = function (model, conditions, update, options) {
    return  model.findOneAndRemove(conditions, update, options);
};

let update = function (model, conditions, update, options) {
    return model.update(conditions, update, options);
};

let remove = function (model, condition) {
    return model.remove(condition);
};
/*------------------------------------------------------------------------
 * FIND WITH REFERENCE
 * -----------------------------------------------------------------------*/
let populateData = function (model, query, projection, options, collectionOptions) {
    return model.find(query, projection, options).populate(collectionOptions).exec();
};

let findOneAndPopulateData = function (model, query, projection, options, collectionOptions) {
    return model.findOne(query, projection, options).populate(collectionOptions).exec();
};

let count = function (model, condition) {
    return model.countDocuments(condition);
};
/*
 ----------------------------------------
 AGGREGATE DATA
 ----------------------------------------
 */
let aggregateData = function (model, aggregateArray,options) {

    let aggregation = model.aggregate(aggregateArray);

    if(options) {
      aggregation.options = options;
    }

    return aggregation.exec();
};

let insert = function(model, data, options){
    return model.collection.insert(data,options);
};

let insertMany = function(model, data, options){
    return model.collection.insertMany(data,options);
};

let aggregateDataWithPopulate = function (model, group, populateOptions, callback) {
    model.aggregate(group, (err, data) => {

        if (err){
          return callback(err);
        }

        model.populate(data, populateOptions,
            function (err, populatedDocs) {

                if (err) {
                  return callback(err);
                }
                return callback(null, populatedDocs);// This object should now be populated accordingly.
            });
    });
};

let bulkFindAndUpdate= function(bulk,query,update,options) {
    bulk.find(query).upsert().update(update,options);
};

let bulkFindAndUpdateOne= function(bulk,query,update,options) {
    bulk.find(query).upsert().updateOne(update,options);
};


// =============== getting distinct records in array =======

let gettingDistinctValues= function(model,field,criteria) {
    return model.distinct(field,criteria);
};


module.exports = {
    saveData : saveData,
    getData: getData,
    update : update,
    remove : remove,
    insert : insert,
    insertMany:insertMany,
    count  : count,
    findOne: findOne,
    findAndUpdate : findAndUpdate,
    findAndRemove : findAndRemove,
    populateData : populateData,
    aggregateData : aggregateData,
    findOneWithPopulate: findOneAndPopulateData,
    aggregateDataWithPopulate: aggregateDataWithPopulate,
    bulkFindAndUpdate : bulkFindAndUpdate,
    bulkFindAndUpdateOne : bulkFindAndUpdateOne,
    gettingDistinctValues : gettingDistinctValues
};
