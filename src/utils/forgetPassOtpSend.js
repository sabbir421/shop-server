const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

exports.vendorForgetPassword = async (data) => {
  const { otp, email } = data;
  const htmlContent = `
    <html>
    <head>
        <meta charset='UTF-8' />
        <title>Forget Password for DoorAp</title>
        <style>
            body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
            }
            .header {
                background-color: #007bff;
                color: #ffffff;
                padding: 10px;
                border-radius: 8px 8px 0 0;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
            }
            .content h4 {
                color: #333333;
                margin-bottom: 20px;
            }
            .content p {
                color: #555555;
                margin-bottom: 10px;
            }
            .otp-box {
                background-color: #f0f0f0;
                border: 2px dashed #007bff;
                padding: 15px;
                text-align: center;
                margin: 20px 0;
                border-radius: 8px;
            }
            .otp-box p {
                margin: 0;
                font-size: 18px;
                font-weight: bold;
                color: #007bff;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 10px;
                border-top: 1px solid #dddddd;
            }
            .footer p {
                color: #777777;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>DoorApp Forget Password OTP</h1>
            </div>
            <div class='content'>
                <h4>Hello,</h4>
                <p>We received a request to forget the password for your DoorAp account associated with ${email}. By the OTP below you are allowed to create new password:</p>
                <div class='otp-box'>
                    <p>${otp}</p>
                </div>
                <p>If you did not request a forget password, please ignore this email or contact our support team if you have any questions.</p>
                <p>Thank you for using DoorAp!</p>
                <p>Best regards,<br>The DoorAp Team</p>
            </div>
            <div class='footer'>
                <p>&copy; ${new Date().getFullYear()} DoorAp. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  const msg = {
    to: email,
    from: "support@doorap.com",
    subject: "Forget Password Request",
    html: htmlContent,
  };
  try {
    sgMail
      .send(msg)
      .then(() => {
        console.log("Forget Password OTP sent");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log("------------------------>", error);
  }
};
