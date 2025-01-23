const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Novu } = require("@novu/node");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(
    require(process.env.SERVICE_ACCOUNT_KEY_PATH)
  ),
});

const novu = new Novu(process.env.NOVU_API_KEY);

app.post("/send-notification", async (req, res) => {
  const { title, body, token, email } = req.body;

  const message = {
    notification: {
      title,
      body,
    },
    token: token,
  };

  try {
    await admin.messaging().send(message);
    console.log("Successfully sent message");

    // Send notification using Novu
    await novu.trigger("push-notification", {
      to: {
        subscriberId: token,
        email: email,
        firstName: "Chidi",
        lastName: "Eze",
      },
      payload: {
        title: title,
        body: body,
      },
    });

    res.status(200).send("Notification sent successfully");
  } catch (error) {
    console.log("Error sending message:", error);
    res.status(500).send("Error sending notification");
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
