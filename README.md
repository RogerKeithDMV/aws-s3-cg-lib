[![N|Solid](https://cloudgensys.com/cg-demo/wp-content/uploads/2019/05/CG-Logo-01.png)](https://www.cloudgensys.com/)

# aws-s3-cg-lib

https://github.com/CloudGenUser/aws-s3-cg-lib

## _1. Introduction_

This code has the objective to stablish a connection with the AWS S3 bucket service and depending of the flag it will make an diferent action.

The next are the possible flags and their corresponding actions:

- GETLISTBUCKETS - Get the list of all buckets of the account
- CREATETBUCKET - Create a new bucket for the account.
- UPLOADFILE - Uoload a file from a local machine to an specific S3 bucket.
- GETLISTFILESINBUCKET - Get the list of files in a specific bucket.
- DELETEBUCKET - Delete an specific bucket inside the account.
- GETFILE - Get a file that is inside a bucket.
- GETBUCKETGRANTS - Get the grant of a bucket.

Any other flag will be consider as an invalid values and will return an error message.

The purpose of this library is to handle S3 buckets in the AWS, getting information from the files in the bucket. Also, directories inside the bucket can be handled.

## _2.	Library usage_

The library can be installed from npm page with the next:

**`npm install aws-s3-cg-lib`**, **`npm i aws-s3-cg-lib`** or **`yarn install aws-s3-cg-lib`**


### _2.1. CREATETBUCKET_

- **Arguments:** 
    - Required:
    flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
    accessKey: Is the key to grant you access to the Amazon services.
    secretKey: Is the password access related to the key.
    region: Is a code that corresponds to the zone of the services in wich the Amazon services are alocated according with the user contract to use the AWS services, the list of codes and what is the neares code in user zone can be reviewed in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
    bucketName: The name of the bucket that user wants to create.


- **Description:** This request will create a new bucket inside the S3 account.
- **Sample request:**
```
{
	"flag":"CREATETBUCKET",
    "region":"us-east-1",
    "accessKey":"ACCESSKEYSTRING",
    "secretKey":"SECRETKEYSTRING",
	"bucketName": "bucketTest"
}
```
Resultant sample:
```
{
	response: "Bucket created successfully at x location."
}
```

In case of some error the library will return the corresponding exception in the S3 service.

### _2.2. DELETEBUCKET_

- **Arguments:** 
    - Required:
    flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
    accessKey: Is the key to grant you access to the Amazon services.
    secretKey: Is the password access related to the key.
    region: Is a code that corresponds to the zone of the services in wich the Amazon services are alocated according with the user contract to use the AWS services, the list of codes and what is the neares code in user zone can be reviewed in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
    bucketName: The name of the bucket to be deleted.

- **Description:** This request is used to delete one of the buckets inside a S3 account.
- **Sample request:**
```
{
	"flag":"DELETEBUCKET",
    "region":"us-east-1",
    "accessKey":"ACCESSKEYSTRING",
    "secretKey":"SECRETKEYSTRING",
	"bucketName": "bucketTest"
}
```
Resultant sample:
```
{
    response:"Bucket bucketTest was successfully removed."
}
```
In case of some error the library will return the corresponding exception in the S3 service.

### _2.3. GETBUCKETGRANTS_

- **Arguments:** 
    - Required:
    flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
    accessKey: Is the key to grant you access to the Amazon services.
    secretKey: Is the password access related to the key.
    region: Is a code that corresponds to the zone of the services in wich the Amazon services are alocated according with the user contract to use the AWS services, the list of codes and what is the neares code in user zone can be reviewed in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
    bucketName: the name of the bucket whose grants are wanted to know.

- **Description:** This request will show the grants related to the bucket in the S3 account.
- **Sample request:**
```
{
	"flag":"GETBUCKETGRANTS",
	"region":"us-east-1",
	"accessKey":"ACCESSKEYSTRING",
	"secretKey":"SECRETKEYSTRING",
	"bucketName":"bucketGrants"
}
```
Resultant sample:
```
{
    "grants": [
        {
            "Grantee": {
                "DisplayName": "displayName",
                "ID": "1234567890123456789012345678901234567890123456789012345678901234",
                "Type": "CanonicalUser"
            },
            "Permission": "FULL_CONTROL"
        }
    ]
}
```
In case of some error the library will return the corresponding exception in the S3 service.

### _2.4. GETFILE_

- **Arguments:** 
    - Required:
    flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
    accessKey: Is the key to grant you access to the Amazon services.
    secretKey: Is the password access related to the key.
    region: Is a code that corresponds to the zone of the services in wich the Amazon services are alocated according with the user contract to use the AWS services, the list of codes and what is the neares code in user zone can be reviewed in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
    bucketName: The name of the bucket where the required file is stored.
    fileName: The name of the file to get from the bucket.

- **Description:** This request will get a file in a bucket inside the S3 account.
- **Sample request:**
```
{
	"flag":"GETFILE",
	"region":"us-east-1",
	"accessKey":"ACCESSKEYSTRING",
	"secretKey":"SECRETKEYSTRING",
	"bucketName":"scdf-cg-bucket",
	"fileName":"testFile.txt"
}
```
Resultant sample:
```
{
    "content": "[{"mailFrom": "test@mail.com", "mailPerson": "john Smith"}]"
}
```
In case of some error the library will return the corresponding exception in the S3 service.

### _2.5. GETLISTBUCKETS_

- **Arguments:** 
    - Required:
    flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
    accessKey: Is the key to grant you access to the Amazon services.
    secretKey: Is the password access related to the key.
    region: Is a code that corresponds to the zone of the services in wich the Amazon services are alocated according with the user contract to use the AWS services, the list of codes and what is the neares code in user zone can be reviewed in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/

- **Description:** This request will get a JSON with a list of all the buckets inside the S3 account.
- **Sample request:**
```
{
	"flag":"GETLISTBUCKETS",
    "region":"us-east-1",
    "accessKey":"ACCESSKEYSTRING",
    "secretKey":"SECRETKEYSTRING"
}
```
Resultant sample:
```
{
    "response": [
        {
            "Name": "bucket1",
            "CreationDate": "2022-01-01T10:10:10.000Z"
        },
        {
            "Name": "bucket2",
            "CreationDate": "2022-01-01T10:10:10.000Z"
        }
    ]
}
```
In case of some error the library will return the corresponding exception in the S3 service.

### _2.6. GETLISTFILESINBUCKET_

- **Arguments:** 
    - Required:
    flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
    accessKey: Is the key to grant you access to the Amazon services.
    secretKey: Is the password access related to the key.
    region: Is a code that corresponds to the zone of the services in wich the Amazon services are alocated according with the user contract to use the AWS services, the list of codes and what is the neares code in user zone can be reviewed in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
    bucketName: The name of the bucket which is wanted to get the list of files.

- **Description:** This request will get a JSON with a list of all the files inside a bucket in the S3 account.
- **Sample request:**
```
{
	"flag":"GETLISTFILESINBUCKET",
	"region":"us-east-1",
	"accessKey":"ACCESSKEYSTRING",
	"secretKey":"SECRETKEYSTRING",
	"bucketName":"bucketTest"
}
```
Resultant sample:
```
{
    "response": {
        "IsTruncated": false,
        "Marker": "",
        "Contents": [
            {
                "Key": "testFile.txt",
                "LastModified": "2022-01-01T10:10:22.000Z",
                "ETag": "\"e8d78389ed292fbbe91153exb8e0bae4-9\"",
                "ChecksumAlgorithm": [],
                "Size": 78858823,
                "StorageClass": "STANDARD",
                "Owner": {
                    "DisplayName": "xrnadmin_us",
                    "ID": "efdba54569b1468058a276bcd4b0f662b728f4a9401186dda9357d949e123456"
                }
            },
            {
                "Key": "buckets-s3/",
                "LastModified": "2022-01-01T10:10:22.000Z",
                "ETag": "\"d41d8cd98f00b204e9812345acf8427e\"",
                "ChecksumAlgorithm": [],
                "Size": 0,
                "StorageClass": "STANDARD",
                "Owner": {
                    "DisplayName": "xraadmin_us",
                    "ID": "efdba14219b4546789a276bcd4b0f662b728f4a9401186dda9357d949e179520"
                }
            }
        ],
        "Name": "listBucket",
        "Prefix": "",
        "MaxKeys": 1000,
        "CommonPrefixes": []
    }
}
```
In case of some error the library will return the corresponding exception in the S3 service.

### _2.7. UPLOADFILE_

- **Arguments:** 
    - Required:
    flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
    accessKey: Is the key to grant you access to the Amazon services.
    secretKey: Is the password access related to the key.
    region: Is a code that corresponds to the zone of the services in wich the Amazon services are alocated according with the user contract to use the AWS services, the list of codes and what is the neares code in user zone can be reviewed in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
    bucketName: The name of the bucket where is required to create the file.
    content: The content of the file to be created.
    fileName: The name of the file to be created.

- **Description:** This request will create a copy of a file inside a specific bucket in the S3 account.
- **Sample request:**
```
{
	"flag":"GETLISTFILESINBUCKET",
	"region":"us-east-1",
	"accessKey":"ACCESSKEYSTRING",
	"secretKey":"SECRETKEYSTRING",
	"bucketName":"bucketTest",
	"content": "Hello World.",
	"fileName": "myFile.txt"
}
```
Resultant sample:
```
{
    response:"File myFile.txt was successfully uploaded in bucketTest."
}
```
In case of some error the library will return the corresponding exception in the S3 service.
