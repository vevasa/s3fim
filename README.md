3 FIM - Know when your critical files on S3 have been ACCESSED or MODIFIED


## Architecture

 * AWS has now capabilities for putting object level access into cloudtrail events , so we use that
 * The architecture then uses cloudwatch rules to capture relevant `eventNames` and calls a lambda function to do the rest of the job
 * The lambda function then parses the output of the cloudwatch to log which file has been modified by which user and which from source IP

## Scenario
You have a S3 bucket (`fimfilesjan7`) that has PCI or HIPAA data and you want to monitor and log who is accessing them and get alerted when accessed by wrong users

### Events Generated


The following are the events are generated whe

1. Event Name `GetObject` gets generated into Cloudtrail when a file is accessed
2. Event Name `PutObject` gets generated into Cloudtrail when a file is removed or a new file is put into a bucket

## Steps

1. Create a S3 bucket - `fimfilejan7`
2. Create a Trail select read/write events in event selector ![Alt text](https://www.evernote.com/l/ACMCdbR7IpJBDIQnQjDvkxW62G7LTPOLYP4B/image.png)
3. Clone the code 
4. zip the files `zip -r s3fim.zip`
5. create a lambda function ![Alt text](https://www.evernote.com/l/ACPg1T526ThHd6ZTMPrqWZrL-ZRTNUP3KlcB/image.png)
6. Create a cloud watch rule to capture GetObject and PutObject and select the just uploaded lambda job ![Alt text](https://www.evernote.com/l/ACOietsRZ6VAtouQb02x3bvIT2VI-qVfNFMB/image.png)
7. Copy a file into the bucket
8. Lambda should have put the bucket name into logs - ![Alt text](https://www.evernote.com/l/ACPacDZcKPlJ3aaB_iQMlJWBDApp3-pwo18B/image.png)
