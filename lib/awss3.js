var AWS = require('aws-sdk');

const {constants, helpers, log} = require('utils-nxg-cg');
const {objectAWSS3Req,objectAWSS3Opt} = require('./objects');

module.exports.awss3 = async (msg, cfg, test = false) => {
  return new Promise(async (resolve, reject) => {
  try {
    log.info('Inside awss3 lib');
    log.debug('Msg=', JSON.stringify(msg));
    log.debug('Config=', JSON.stringify(cfg));
  
    const {data} = msg;
  
    let properties = {...objectAWSS3Req};
    let extraProp = {...objectAWSS3Opt};

    if (!test && !data) {throw new Error(`${constants.ERROR_PROPERTY} data`);}
      const valid = await helpers.validProperties(properties, data, cfg);

      if (valid) {
        await helpers.validProperties(extraProp, data, cfg, true);
        properties = {...properties, ...extraProp};

        try{
          let flag;
          let awsResponse="";
          if(properties.flag){
            flag = properties.flag.toUpperCase();
            log.info("Flag: "+properties.flag);

            AWS.config.update({
                              accessKeyId: properties.accessKey,
                              secretAccessKey: properties.secretKey,
                              region: properties.region
                            });

            s3 = new AWS.S3();
            log.info("Instanció el s3");
          }

          else{
            resolve({error:"No flag was provided."});
            return;
          }

          log.info("Listo para determina la acción");
          let bucketParams;

          if(flag=="GETLISTBUCKETS"){
            log.info("deberia traer la lista");
            s3.listBuckets(function(err, data) {
              if (err) {
                resolve({error:err});
              } else {
                resolve({response:data.Buckets});
              }
            });
          }

          if(flag=="CREATETBUCKET"){
            bucketParams = {
              Bucket : properties.bucketName
            };
            // call S3 to create the bucket
            s3.createBucket(bucketParams, function(err, data) {
              if (err) {
                resolve({error:err});
              } else {
                resolve({response:"Bucket created successfully at "+data.Location+" location."});
              }
            });
          }
          if(flag=="UPLOADFILE"){
            let uploadParams = {Bucket: properties.bucketName, Key: '', Body: ''};
            let file = properties.fileName;

            // Configure the file stream and obtain the upload parameters
            let fs = require('fs');
            let fileStream = fs.createReadStream(properties.content);
            fileStream.on('error', function(err) {
              resolve({'File Error': err});
              return;
            });
            uploadParams.Body = fileStream;
            let path = require('path');
            uploadParams.Key = path.basename(properties.fileName);
            
            // call S3 to retrieve upload file to specified bucket
            s3.upload (uploadParams, function (err, data) {
              if (err) {
                resolve({error:err});
              } if (data) {
                resolve({response:"File "+properties.fileName+" was successfully uploaded in "+data.Location+"."});
                console.log("Upload Success", data.Location);
              }
            });
          }
          if(flag=="GETLISTFILESINBUCKET"){
            bucketParams = {
              Bucket : properties.bucketName,
            };
            
            // Call S3 to obtain a list of the objects in the bucket
            s3.listObjects(bucketParams, function(err, data) {
              if (err) {
                resolve({error:err});
              } else {
                resolve({response:data});
                console.log("Success", data);
              }
            });
          }
          if(flag=="DELETEBUCKET"){
            bucketParams = {
              Bucket : properties.bucketName
            };
            
            // Call S3 to delete the bucket
            s3.deleteBucket(bucketParams, function(err, data) {
              if (err) {
                resolve({error:err});
              } else {
                resolve({response:"Bucket "+properties.bucketName+" was successfully removed."});
                console.log("Success", data);
              }
            });
          }
          if(flag=="GETFILE"){
            bucketParams = {
              Bucket : properties.bucketName,
              Key : properties.fileName
            };

            s3.getObject(bucketParams , 
              function(err, data) {
                if (err) {
                  resolve({error:err});
                } else {
                  const contentFile = Buffer.from(data.Body).toString('utf-8');
                  resolve({content:contentFile});
                }
              }
            );
          }
          if(flag=="GETBUCKETGRANTS"){
            bucketParams = {
              Bucket : properties.bucketName
            };

            s3.getBucketAcl(bucketParams, function(err, data) {
              if (err) {
                resolve({error:err});
              } else if (data) {
                resolve({grants:data.Grants});
              }
            });
          }
        }

        catch(err){
          reject({error:err});
        }
      }
    }

    catch(e){
      reject({error:err});
    }

    finally{
      
    }
  });
};