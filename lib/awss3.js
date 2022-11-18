const AWS = require('aws-sdk');
const {constants, helpers} = require('utils-nxg-cg');
const {objectAWSS3Req,objectAWSS3Opt} = require('./objects');

const process = async (msg, cfg, test = false) => {
  try {
    const {data} = msg;

    let properties = {...objectAWSS3Req};
    let extraProp = {...objectAWSS3Opt};
    let result;
    let client;

    if (!test && !data) {throw new Error(`${constants.ERROR_PROPERTY} data`);}
      const valid = await helpers.validProperties(properties, data, cfg);

      if (valid) {
        await helpers.validProperties(extraProp, data, cfg, true);
        properties = {...properties, ...extraProp};

        //try{
          let flag;
          if(properties.flag){
            flag = properties.flag.toUpperCase();

            AWS.config.update({
                              accessKeyId: properties.accessKey,
                              secretAccessKey: properties.secretKey,
                              region: properties.region
                            });

            s3 = new AWS.S3();
          }

          else{
            return "No flag was provided.";
          }

          let bucketParams;

          if(flag=="GETLISTBUCKETS"){
            return new Promise((resolve, reject)=>{
              s3.listBuckets(function(err, data) {
                if (err) {
                  reject (err);
                } else {
                  if(!helpers.isObjectValid(data.Buckets)){
                    throw Error(constants.ERROR_JSON_FORMAT);
                  }
                  else{
                    resolve ({"response":data.Buckets, flag: properties.flag});
                  }
                }
              })
            });
          }

          if(flag=="CREATETBUCKET"){
            bucketParams = {
              Bucket : properties.bucketName
            };

            return new Promise((resolve, reject)=>{
              s3.createBucket(bucketParams, function(err, data) {
                if (err) {
                  reject (err);
                } else {
                  resolve ({"response":"Bucket created successfully at "+data.Location+" location.", flag: properties.flag});
                }
              })
            });
          }

          if(flag=="UPLOADFILE"){
            let uploadParams = {Bucket: properties.bucketName, Key: '', Body: ''};
            let file = properties.fileName;

            let fs = require('fs');
            let fileStream = fs.createReadStream(properties.content);
            fileStream.on('error', function(err) {
              throw Error(err);
            });
            uploadParams.Body = fileStream;
            let path = require('path');
            uploadParams.Key = path.basename(properties.fileName);

            return new Promise((resolve, reject)=>{
              s3.upload(uploadParams.Body, function(err, data) {
                if (err) {
                  reject (err);
                } else {
                  resolve ({"response":"File "+properties.fileName+" was successfully uploaded in "+data.Location+".", flag: properties.flag});
                }
              })
            });
          }

          if(flag=="GETLISTFILESINBUCKET"){
            bucketParams = {
              Bucket : properties.bucketName,
            };

            return new Promise((resolve, reject)=>{
              s3.listObjects(bucketParams, function(err, data) {
                if (err) {
                  reject (err);
                } else {
                  if(!helpers.isObjectValid(data)){
                    throw Error(constants.ERROR_JSON_FORMAT);
                  }
                  else{
                    resolve ({"response":data, flag: properties.flag});
                  }
                }
              })
            });
          }

          if(flag=="DELETEBUCKET"){
            bucketParams = {
              Bucket : properties.bucketName
            };

            return new Promise((resolve, reject)=>{
              s3.deleteBucket(bucketParams, function(err, data) {
                if (err) {
                  reject (err);
                } else {
                  resolve ({"response":"Bucket "+properties.bucketName+" was successfully removed.", flag: properties.flag});
                }
              })
            });
          }

          if(flag=="GETFILE"){
            bucketParams = {
              Bucket : properties.bucketName,
              Key : properties.fileName
            };

            return new Promise((resolve, reject)=>{
              s3.getObject(bucketParams, function(err, data) {
                if (err) {
                  reject (err);
                } else {
                  resolve ({"response":Buffer.from(data.Body).toString('utf-8'), flag: properties.flag});
                }
              })
            });
          }
          if(flag=="GETBUCKETGRANTS"){
            bucketParams = {
              Bucket : properties.bucketName
            };

            s3.getBucketAcl(bucketParams, function(err, data) {
              if (err) {
                throw Error(err);
              } else if (data) {
                result = data.Grants;
              }
            });

            return new Promise((resolve, reject)=>{
              s3.getBucketAcl(bucketParams, function(err, data) {
                if (err) {
                  reject (err);
                } else {
                  if(!helpers.isObjectValid(data.Grants)){
                    throw Error(constants.ERROR_JSON_FORMAT);
                  }
                  else{
                    resolve ({"response":data.Grants, flag: properties.flag});
                  }
                }
              })
            });
          }

          return result;
      }
    }

    catch(e){
      return e;
    }
};

/**
 * Method for valid properties
 * Custom validations for each process
 * @param properties
 * @returns {Promise<boolean>}
 */
 const validProperties = async (properties) => {
  switch (properties.flag) {
      case 'CREATETBUCKET':
        if (!properties.bucketName)
            throw Error(`${constants.ERROR_PROPERTY} bucketName`);
        break;
      case 'UPLOADFILE':
        if (!properties.bucketName || !properties.fileName)
          throw Error(`${constants.ERROR_PROPERTY} bucketName and fileName`);
        break;
      case 'GETLISTFILESINBUCKET':
        if (!bucketName)
            throw Error(`${constants.ERROR_PROPERTY} bucketName`);
        break;
      case 'DELETEBUCKET':
        if (!bucketName)
            throw Error(`${constants.ERROR_PROPERTY} bucketName`);
        break;
      case 'GETFILE':
        if (!bucketName || !properties.fileName)
            throw Error(`${constants.ERROR_PROPERTY} bucketName and fileName`);
        break;
      case 'GETBUCKETGRANTS':
        if (!bucketName)
            throw Error(`${constants.ERROR_PROPERTY} bucketName`);
        break;
  }
  return true;
};

module.exports = {
  awss3:process
};