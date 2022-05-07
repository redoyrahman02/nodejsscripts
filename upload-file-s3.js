const AWS = require('aws-sdk');

async function saveToS3(data) {
  const s3 = new AWS.S3({});
  const today = new Date();

  const filename = 'deletedat-' + today.getDate() + '-' + (today.getMonth() + 1 ) + '-' + today.getFullYear() ; 

  // console.log( filename );
  const bucketName = process.env.AWS_BUCKET_NAME ; 

  const params = {
      Bucket: bucketName,
      Key: filename +'.json',
      Body: JSON.stringify(data),
      ContentType: 'application/json',
  };

  const uploadedDocument = await s3.upload( params ).promise(); 

  console.log( uploadedDocument.Location );
}
