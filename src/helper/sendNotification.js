const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase_notification_sdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.sendMobileNotification = async (token, title, body) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };
  try {
    const response = await admin.messaging().send(message);
    return response;
  } catch (error) {
    console.error(
      error
    );
    if (
      error.errorInfo &&
      error.errorInfo.code === "messaging/registration-token-not-registered"
    ) {
      console.error(
        "The provided FCM token is not registered. It might have expired or been invalidated."
      );
    }
  }
};
