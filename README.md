[![N|Solid](https://cloudgensys.com/cg-demo/wp-content/uploads/2019/05/CG-Logo-01.png)](https://www.cloudgensys.com/)

# aws-s3-cg-lib

https://github.com/CloudGenUser/aws-s3-cg-lib

## _1. Introduction_

This code has the objective to stablish connection with a aws s3 bucket and depending of the flag it will make an diferent action.

Possible flags and their actions:

GETLISTBUCKETS - Get the list of all buckets of the account
CREATETBUCKET - Create a new bucket for the account.
UPLOADFILE - Uoload a file from a local machine to an specific S3 bucket.
GETLISTFILESINBUCKET - Get the list of files in a specific bucket.
DELETEBUCKET - Delete an specific bucket inside the account.
GETFILE - Get a file that is inside a bucket.
GETBUCKETGRANTS - Get the grant of a bucket.

Any other flag will be consider as an invalid value and will return an error message.

As components are used in the NXGP flows regardless that the library should be added on component code, when the flow is running, an exchange and some queues are created using the ID flow (assigned from NXGP).

## _2.	Library usage

The library can be installed from npm page with the next:

**`npm install aws-s3-cg-lib`**, **`npm i aws-s3-cg-lib`** or **`yarn install aws-s3-cg-lib`**


### _2.1. CREATETBUCKET_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
accessKey: Is the key that gives you access to the Amazon services.
secretKey: Is the password related to and access key.
region: Is a code that Amazon use to give a fast service depending of your zone, you can see the codes and what is the neares code in your zone in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
bucketName: The name of the bucket that you want to create.
Optionals:

- **Description:** This request will create a new bucket inside the s3 account.
.
- **Sample of a request:**
{
	"flag":"CREATETBUCKET",
    "region":"us-east-1",
    "accessKey":"ACCESSKEYSTRING",
    "secretKey":"SECRETKEYSTRING",
	"bucketName": "bucketTest"
}

```

Resultant sample:

{
	response: "Bucket created successfully at x location."
}

In case of some error the library will return the exception thrown by the S3 service.


```

### _2.2. DELETEBUCKET_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
accessKey: Is the key that gives you access to the Amazon services.
secretKey: Is the password related to and access key.
region: Is a code that Amazon use to give a fast service depending of your zone, you can see the codes and what is the neares code in your zone in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
bucketName: The name of the bucket that will be deleted.
Optionals:

- **Description:** This request is used to delete one of the buckets inside a s3 account.
.
- **Sample of a request:**
{
	"flag":"DELETEBUCKET",
    "region":"us-east-1",
    "accessKey":"ACCESSKEYSTRING",
    "secretKey":"SECRETKEYSTRING",
	"bucketName": "bucketTest"
}

```

Resultant sample:

{response:"Bucket bucketTest was successfully removed."}

In case of some error the library will return the exception thrown by the S3 service.

```


### _2.3. GETBUCKETGRANTS_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
accessKey: Is the key that gives you access to the Amazon services.
secretKey: Is the password related to and access key.
region: Is a code that Amazon use to give a fast service depending of your zone, you can see the codes and what is the neares code in your zone in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
bucketName: the name of the bucket whose grants you want to know.
Optionals:

- **Description:** This request will give you the grants in a bucket inside the s3 account.
.
- **Sample of a request:**
{
	"flag":"GETBUCKETGRANTS",
	"region":"us-east-1",
	"accessKey":"ACCESSKEYSTRING",
	"secretKey":"SECRETKEYSTRING",
	"bucketName":"bucketGrants"
}

```

Resultant sample:

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

In case of some error the library will return the exception thrown by the S3 service.

```


### _2.4. GETFILE_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
accessKey: Is the key that gives you access to the Amazon services.
secretKey: Is the password related to and access key.
region: Is a code that Amazon use to give a fast service depending of your zone, you can see the codes and what is the neares code in your zone in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
bucketName: The name of the bucket where you want to search a file.
fileName: The name of the file wich you want to get.
Optionals:

- **Description:** This request will get a file in a bucket inside the s3 account.
.
- **Sample of a request:**
{
	"flag":"GETFILE",
	"region":"us-east-1",
	"accessKey":"ACCESSKEYSTRING",
	"secretKey":"SECRETKEYSTRING",
	"bucketName":"scdf-cg-bucket",
	"fileName":"testFile.txt"}

```

Resultant sample:

{
    "content": "[{"mailFrom": "test@mail.com", "mailPerson": "john Smith"}]"
}

In case of some error the library will return the exception thrown by the S3 service.

```


### _2.5. GETLISTBUCKETS_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
accessKey: Is the key that gives you access to the Amazon services.
secretKey: Is the password related to and access key.
region: Is a code that Amazon use to give a fast service depending of your zone, you can see the codes and what is the neares code in your zone in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
Optionals:

- **Description:** This request will get a JSon with all the buckets inside an account.
.
- **Sample of a request:**
{
	"flag":"GETLISTBUCKETS",
    "region":"us-east-1",
    "accessKey":"ACCESSKEYSTRING",
    "secretKey":"SECRETKEYSTRING"
}

```

Resultant sample:

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

In case of some error the library will return the exception thrown by the S3 service.

```


### _2.6. GETLISTFILESINBUCKET_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
accessKey: Is the key that gives you access to the Amazon services.
secretKey: Is the password related to and access key.
region: Is a code that Amazon use to give a fast service depending of your zone, you can see the codes and what is the neares code in your zone in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
bucketName: The name of the bucket which you want to get the list of files.
Optionals:

- **Description:** This request will get a JSon with all the files inside a bucket.
.
- **Sample of a request:**
{
	"flag":"GETLISTFILESINBUCKET",
	"region":"us-east-1",
	"accessKey":"ACCESSKEYSTRING",
	"secretKey":"SECRETKEYSTRING",
	"bucketName":"bucketTest"
}

```

Resultant sample:

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

In case of some error the library will return the exception thrown by the S3 service.

```


### _2.7. UPLOADFILE_

- **Args:** 
Needed:
flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
accessKey: Is the key that gives you access to the Amazon services.
secretKey: Is the password related to and access key.
region: Is a code that Amazon use to give a fast service depending of your zone, you can see the codes and what is the neares code in your zone in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
bucketName: The name of the bucket where you want to create the file.
content: The text you want to contain the file.
fileName: The name of the file you want to create.

Optionals:

- **Description:** This request will take a file inside our local environment and will create a copy of it inside a specific bucket.
.
- **Sample of a request:**
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

{response:"File myFile.txt was successfully uploaded in bucketTest."}

In case of some error the library will return the exception thrown by the S3 service.

```