/* eslint-disable no-console */
const fs = require("fs");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");
const variables = require("../config/variables");

function renderEmail(templatePath, data) {
  const source = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(source);
  return template(data);
}

const sendEmail = async (params) => {
  const { toEmail, subjectName, html } = params;
  const port = parseInt(variables.emailPort, 10);
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      user: "2deb82c253a7de",
      pass: "04c21aeac60fa7",
    },
  });
  const mailOptions = {
    from: "sabbir.a@coppanet.com",
    to: toEmail,
    subject: subjectName,
    html,
  };
  transporter.sendMail(mailOptions, () => {});
};

exports.sendEmailToAssignee = async (params) => {
  try {
    const {
      email,
      taskName,
      updatedByName,
      projectName,
      storyPoint,
      updatedOn,
      taskNumber,
      name,
    } = params;
    const renderedHtml = renderEmail("Adapters/templates/notification.hbs", {
      projectName,
      taskName,
      updatedByName,
      storyPoint,
      updatedOn,
      name,
      taskNumber,
    });
    const mailOptions = {
      toEmail: email,
      subjectName: `The task description has been updated for task number  ${taskNumber}`,
      html: renderedHtml,
    };
    await sendEmail(mailOptions);
  } catch (error) {
    console.log(`Error at sending invitation email - ${error}`);
  }
};
exports.orderPlaceConformation = async (params) => {
  try {
    const {
      price,
      customrName,
      customerId,
      storeName,
      status,
      paymentStatus,
      quantity,
      startDate,
      endDate,
      startTime,
      endTime,
      providerEmail,
      location,
      bookingId,
      providerName,
    } = params;
    const renderedHtml = renderEmail(
      "src/Adapters/templates/sendBookingInfoToVendor.hbs",
      {
        price,
        customrName,
        customerId,
        storeName,
        status,
        paymentStatus,
        quantity,
        startDate,
        endDate,
        startTime,
        endTime,
        location,
        bookingId,
        providerName,
      }
    );
    const mailOptions = {
      toEmail: providerEmail,
      subjectName: `Luggage booking info  ${bookingId}`,
      html: renderedHtml,
    };
    await sendEmail(mailOptions);
  } catch (error) {
    console.log(`Error at sending invitation email - ${error}`);
  }
};
