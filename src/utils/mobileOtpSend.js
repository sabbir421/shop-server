const axios = require("axios");
exports.mobileOtp = async ({ userName, otp }) => {
  const greenwebsms = new URLSearchParams();
  greenwebsms.append(
    "token",
    "930215042016799942603064c6b63203838ad38b8f0fc7fcc9cd"
  );
  greenwebsms.append("to", userName);
  greenwebsms.append(
    "message",
    `For security purposes, do not share this code with anyone. This code is valid for 5 minutes.

If you did not request this code, please ignore this message.
OTP: ${otp}`
  );
  axios
    .post("https://api.bdbulksms.net/api.php", greenwebsms)
    .then((response) => {
      console.log(response.data);
      return otp;
    });
};
