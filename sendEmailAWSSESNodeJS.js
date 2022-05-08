'use strict';
const AWS = require("aws-sdk");


module.exports.sendEmail = async (event) => {

  const awsRegion = process.env.REGION;
  const fromEmail = process.env.FROMEMAIL;

  AWS.config.update({region: awsRegion });
  let replyToaddresses  = [] ;
  let carbonCopy = [] ;  

  const email = [event.Records[0].messageAttributes.email.stringValue]  ; 
  const message = event.Records[0].messageAttributes.message.stringValue ; 
  const subject = event.Records[0].messageAttributes.subject.stringValue ; 

  const params = {
    Destination: {
      CcAddresses: carbonCopy ,
      ToAddresses: email
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: message
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject
      }
    },
    Source: fromEmail , 
    ReplyToAddresses: replyToaddresses , 
  };

  // Create the promise and SES service object
  const AWS_SES = new AWS.SES({ apiVersion: "2010-12-01" }); 
  const result =  await AWS_SES.sendEmail(params).promise();

  // // Handle promise's fulfilled/rejected states
  // await sendPromise.then(data => {
  //     console.log(data.MessageId);
  //     context.done(null, "Success");
  //     return { message: 'Email Sent Successfully' };
  //   }).catch(err => {
  //     console.error(err, err.stack);
  //     context.done(null, "Failed");
  //     return { message: 'Email Sent failed' };
  //   });

  console.log( result );

  return result ; 
  

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  
};
