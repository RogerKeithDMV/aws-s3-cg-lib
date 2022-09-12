/**
 * Object who contains the required properties of the sftp component.
 */
 const objectAWSS3Req = {
    flag:null,
    region:null,
    accessKey:null,
    secretKey:null
};

/**
 * Object who contains the optionals properties of the sftp component.
 */

const objectAWSS3Opt = {
    bucketName:null,
    fileName:null,
    content:null,
};

module.exports = {
    objectAWSS3Req,
    objectAWSS3Opt
}