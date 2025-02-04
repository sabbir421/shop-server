const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

// const msg = {
//   to: 'abdul.m@coppanet.com', // Change to your recipient
//   from: 'support@doorap.com', // Change to your verified sender
//   subject: 'Offer for you',
//   text: 'You get 1 box mara',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
exports.dropOfEmailToPartner = async (data) => {
  const {
    providerEmail,
    providerName,
    customrName,
    storeName,
    bookingId,
    quantity,
    price,
    paymentStatus,
    status,
    startDate,
    endDate,
    startTime,
    endTime,
    updatedOn,
  } = data;
  const htmlContent = `
    <html>
    <head>
        <meta charset='UTF-8' />
        <title>Notification from DoorApp</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
            }
            h4 {
                color: #080808;
            }
            p {
                color: #444444;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color:  #f7f1ea;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .notification-card {
                background-color:white;
                border-radius: 10px;
                padding: 10px;
                margin-bottom: 10px;
            }
            .notification-header {
                margin-bottom: 5px;
            }
            .notification-header h3 {
                font-size: 16px;
                font-weight: bold;
            }
            .notification-body p {
                margin-bottom: 5px;
                color: #444444;
            }
            .notification-timestamp {
                font-size: 12px;
                color: #888;
            }
            .notification-body{
                background-color:white;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>Dear ${providerName},</h2>

            <p>New booking arrived from ${customrName} on your store ${storeName}</p>

            <div class='notification-card'>
                <div class='notification-header'>
                    <p>Store Name: ${storeName}</p>
                </div>
                <div class='notification-body'>
                    <p>Booking Id: ${bookingId}</p>
                    <p>Store Name: ${storeName}</p>
                    <p>Provider: ${providerName},</p>
                    <p>Customer Name: ${customrName} </p>
                    <p>Quantity: ${quantity} </p>
                    <p>Price: ${price} </p>
                    <p>Payment Status: ${paymentStatus} </p>
                    <p>Status: ${status} </p>
                    <p>Start Date: ${startDate} </p>
                    <p>End Date: ${endDate} </p>
                    <p>Start Time: ${startTime} </p>
                    <p>End Time: ${endTime} </p>
                    <p>If you have any questions or need further assistance, please don't
                        hesitate to reach out to our support team at
                        <a href='mailto:support@doorapp.com'>support@doorapp.com</a>
                       
                    </p>

                    <p class='notification-timestamp'>${updatedOn}</p>
                </div>
            </div>

            <h4>Thank you for using DoorApp!</h4>

            <p>Best regards,</p>
            <p>The DoorAp Team</p>
        </div>
    </body>
    </html>
    `;
  const msg = {
    to: providerEmail,
    from: "support@doorap.com",
    subject: "luggage booking",
    html: htmlContent,
  };
  try {
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent partner");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log("------------------------>", error);
  }
};

exports.dropOfEmailToCustomer = async (data) => {
  const {
    to,
    providerName,
    customrName,
    storeName,
    bookingId,
    quantity,
    price,
    paymentStatus,
    status,
    startDate,
    endDate,
    startTime,
    endTime,
    updatedOn,
  } = data;
  const htmlContent = `
      <html>
      <head>
          <meta charset='UTF-8' />
          <title>Notification from DoorApp</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
                  background-color: #f5f5f5;
              }
              h4 {
                  color: #080808;
              }
              p {
                  color: #444444;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color:  #f7f1ea;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              .notification-card {
                  background-color:white;
                  border-radius: 10px;
                  padding: 10px;
                  margin-bottom: 10px;
              }
              .notification-header {
                  margin-bottom: 5px;
              }
              .notification-header h3 {
                  font-size: 16px;
                  font-weight: bold;
              }
              .notification-body p {
                  margin-bottom: 5px;
                  color: #444444;
              }
              .notification-timestamp {
                  font-size: 12px;
                  color: #888;
              }
              .notification-body{
                  background-color:white;
              }
          </style>
      </head>
      <body>
          <div class='container'>
              <h2>Dear ${customrName},</h2>
  
              <p>Your booking placed successfully your booking status is ${status} on store ${storeName}</p>
  
              <div class='notification-card'>
                  <div class='notification-header'>
                      <p>Store Name: ${storeName}</p>
                  </div>
                  <div class='notification-body'>
                      <p>Booking Id: ${bookingId}</p>
                      <p>Store Name: ${storeName}</p>
                      <p>Provider: ${providerName},</p>
                      <p>Customer Name: ${customrName} </p>
                      <p>Quantity: ${quantity} </p>
                      <p>Price: ${price} </p>
                      <p>Payment Status: ${paymentStatus} </p>
                      <p>Status: ${status} </p>
                      <p>Start Date: ${startDate} </p>
                      <p>End Date: ${endDate} </p>
                      <p>Start Time: ${startTime} </p>
                      <p>End Time: ${endTime} </p>
                      <p>If you have any questions or need further assistance, please don't
                          hesitate to reach out to our support team at
                          <a href='mailto:support@doorapp.com'>support@doorapp.com</a>
                         
                      </p>
  
                      <p class='notification-timestamp'>${updatedOn}</p>
                  </div>
              </div>
  
              <h4>Thank you for using DoorApp!</h4>
  
              <p>Best regards,</p>
              <p>The DoorAp Team</p>
          </div>
      </body>
      </html>
      `;
  const msg = {
    to: to,
    from: "support@doorap.com",
    subject: "luggage booking",
    html: htmlContent,
  };
  try {
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent customer");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log("------------------------>", error);
  }
};

exports.statusChangeEmailToCustomer = async (data) => {
  const { to, customrName, storeName, status, updatedOn } = data;
  const htmlContent = `
      <html>
      <head>
          <meta charset='UTF-8' />
          <title>Notification from DoorApp</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
                  background-color: #f5f5f5;
              }
              h4 {
                  color: #080808;
              }
              p {
                  color: #444444;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color:  #f7f1ea;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              .notification-card {
                  background-color:white;
                  border-radius: 10px;
                  padding: 10px;
                  margin-bottom: 10px;
              }
              .notification-header {
                  margin-bottom: 5px;
              }
              .notification-header h3 {
                  font-size: 16px;
                  font-weight: bold;
              }
              .notification-body p {
                  margin-bottom: 5px;
                  color: #444444;
              }
              .notification-timestamp {
                  font-size: 12px;
                  color: #888;
              }
              .notification-body{
                  background-color:white;
              }
          </style>
      </head>
      <body>
          <div class='container'>
              <h2>Dear ${customrName},</h2>
  
              <p>Your booking status change now ypur booking status is ${status} on store ${storeName}</p>
  
              <div class='notification-card'>
                  <div class='notification-header'>
                      <h3>Store Name: ${storeName}</h3>
                  </div>
                  <div class='notification-body'>
                      <p>If you have any questions or need further assistance, please don't
                          hesitate to reach out to our support team at
                          <a href='mailto:support@doorapp.com'>support@doorapp.com</a>
                         
                      </p>
  
                      <p class='notification-timestamp'>${updatedOn}</p>
                  </div>
              </div>
  
              <h4>Thank you for using DoorApp!</h4>
  
              <p>Best regards,</p>
              <p>The DoorAp Team</p>
          </div>
      </body>
      </html>
      `;
  const msg = {
    to: to,
    from: "support@doorap.com",
    subject: "Booking status",
    html: htmlContent,
  };
  try {
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log("------------------------>", error);
  }
};

exports.statusChangeEmailToPartner = async (data) => {
  const { to, providerName, customrName, storeName, status, updatedOn } = data;
  const htmlContent = `
      <html>
      <head>
          <meta charset='UTF-8' />
          <title>Notification from DoorApp</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
                  background-color: #f5f5f5;
              }
              h4 {
                  color: #080808;
              }
              p {
                  color: #444444;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color:  #f7f1ea;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              .notification-card {
                  background-color:white;
                  border-radius: 10px;
                  padding: 10px;
                  margin-bottom: 10px;
              }
              .notification-header {
                  margin-bottom: 5px;
              }
              .notification-header h3 {
                  font-size: 16px;
                  font-weight: bold;
              }
              .notification-body p {
                  margin-bottom: 5px;
                  color: #444444;
              }
              .notification-timestamp {
                  font-size: 12px;
                  color: #888;
              }
              .notification-body{
                  background-color:white;
              }
          </style>
      </head>
      <body>
          <div class='container'>
              <h2>Dear ${providerName},</h2>
  
              <p>Booking status change for ${customrName} now current status is ${status} on store ${storeName}</p>
  
              <div class='notification-card'>
                  <div class='notification-header'>
                      <h3>Store Name: ${storeName}</h3>
                  </div>
                  <div class='notification-body'>
                      <p>If you have any questions or need further assistance, please don't
                          hesitate to reach out to our support team at
                          <a href='mailto:support@doorapp.com'>support@doorapp.com</a>
                      </p>
  
                      <p class='notification-timestamp'>${updatedOn}</p>
                  </div>
              </div>
  
              <h4>Thank you for using DoorApp!</h4>
  
              <p>Best regards,</p>
              <p>The DoorAp Team</p>
          </div>
      </body>
      </html>
      `;
  const msg = {
    to: to,
    from: "support@doorap.com",
    subject: "Booking status",
    html: htmlContent,
  };
  try {
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log("------------------------>", error);
  }
};

exports.sendOtpEmail = async (to, customerName, otp) => {
  const htmlContent = `
      <html>
      <head>
          <meta charset='UTF-8' />
          <title>OTP Verification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
                  background-color: #f5f5f5;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                  text-align: center;
              }
              h2 {
                  color: #080808;
              }
              p {
                  color: #444444;
              }
              .otp {
                  font-size: 24px;
                  font-weight: bold;
                  color: #333333;
                  margin: 20px 0;
              }
          </style>
      </head>
      <body>
          <div class='container'>
              <h2>Hello ${customerName || ""},</h2>
              <p>Use the following OTP to verify your account:</p>
              <div class="otp">${otp}</div>
              <p>This OTP is valid for a limited time. Please do not share it with anyone.</p>
              <p>Thank you for choosing Doorap!</p>
              <p>Best regards,<br />The Doorap Team</p>
          </div>
      </body>
      </html>
    `;

  const msg = {
    to: to,
    from: "support@doorap.com",
    subject: "Doorap Email validation OTP",
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log("OTP email sent");
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

exports.sendRejectionEmail = async ({
  to,
  customerName,
  companyName,
  rejectionReason,
}) => {
  console.log(to, customerName, companyName, rejectionReason);

  const htmlContent = `
      <html>
      <head>
        <meta charset='UTF-8' />
        <title>Company Application Status</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h2 {
            color: #d9534f;
          }
          h4 {
            color: #333333;
          }
          p {
            color: #444444;
            font-size: 16px;
          }
          .company-name {
            font-size: 20px;
            font-weight: bold;
            color: #333333;
            margin: 15px 0;
          }
          .rejection-reason {
            font-size: 16px;
            color: #d9534f;
          }
          .footer {
            margin-top: 20px;
            color: #888888;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class='container'>
          <h2>Important Update on Your Company Application</h2>
          <p>Hello ${customerName},</p>
          <p>We appreciate your interest in partnering with Doorap. After careful review, we regret to inform you that the application for your company, <span class="company-name">${companyName}</span>, has not been approved at this time.</p>
          <p class="rejection-reason">Reason: ${rejectionReason}</p>
          <p>If you have any questions or need further assistance, please don't
                          hesitate to reach out to our support team at
                          <a href='mailto:support@doorapp.com'>support@doorapp.com</a>
                         
                      </p>
          <p>We encourage you to reapply in the future if circumstances change.</p>
          <p>Thank you for considering Doorap.</p>
          <p>Best regards,<br />The Doorap Team</p>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Doorap. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

  const msg = {
    to: to,
    from: "support@doorap.com",
    subject: "Update on Your Doorap Company Application",
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log("Rejection email sent");
  } catch (error) {
    console.error("Error sending rejection email:", error);
  }
};
