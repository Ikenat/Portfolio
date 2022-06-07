import AWS from 'aws-sdk'

function sendEmail(name, email, entreprise, message) {
  

AWS.config.update({
  accessKeyId: 'AKIAU2C7GXUGZG34E53G',
  secretAccessKey: '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',
  region: 'eu-west-3'
})

const ses = new AWS.SES({ apiVersion: "2010-12-01" })

const params = {
  Destination: {
    ToAddresses: ['dev.demanet@gmail.com'] // Email address/addresses that you want to send your email
  },
//   ConfigurationSetName: <<ConfigurationSetName>>,
  Message: {
    Body: {
      Html: {
        // HTML Format of the email
        Charset: "UTF-8",
        Data:
          `<html>
              <body>
                From: ${name} de ${entreprise}
                <br />
                Message: ${message}
                <br />
                Afin de recontacter : ${email}
              </body>
          </html>`
      },
      Text: {
        Charset: "UTF-8",
        Data: ""
      }
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Portfolio Contact Form"
    }
  },
  Source: "dev.demanet@gmail.com"
}
ses.sendEmail(params).promise().then(data => {
    console.log('email submitted to ses', data);
    return {
        statusCode: 200,
        body: `Message sent`
    }
})
.catch(err => {
    console.log(err);
    return {
        statusCode: 500,
        body: `Message unsucesfully sent, error: ${error}`
  }
})
}


export default sendEmail;