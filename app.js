// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// ================= ROUTES =================

// Signup page
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// Success page
app.get("/success", function (req, res) {
  res.sendFile(__dirname + "/success.html");
});

// Failure page
app.get("/failure", function (req, res) {
  res.sendFile(__dirname + "/failure.html");
});

// ================= FORM SUBMIT =================
app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const API_KEY = "YOUR_API_KEY";
  const AUDIENCE_ID = "AUDIECNCE_ID";
  const DATACENTER = "usX";

  // ❌ Safety check
  if (
    API_KEY.includes("YOUR_") ||
    AUDIENCE_ID.includes("YOUR_") ||
    DATACENTER === "usX"
  ) {
    console.error("Mailchimp keys not configured");
    return res.redirect("/failure");
  }

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}`;

  const options = {
    method: "POST",
    auth: "anystring:" + API_KEY
  };

  const mailchimpRequest = https.request(url, options, function (response) {
    let body = "";

    response.on("data", function (chunk) {
      body += chunk;
    });

    response.on("end", function () {
      let parsedData;

      try {
        parsedData = JSON.parse(body);
      } catch (err) {
        console.error("Invalid JSON from Mailchimp");
        return res.redirect("/failure");
      }

      console.log(parsedData);

      // ✅ REAL MAILCHIMP SUCCESS LOGIC
      if (
        response.statusCode === 200 &&
        parsedData.error_count === 0
      ) {
        return res.redirect("/success");
      } else {
        return res.redirect("/failure");
      }
    });
  });

  mailchimpRequest.on("error", function (error) {
    console.error(error);
    return res.redirect("/failure");
  });

  mailchimpRequest.write(jsonData);
  mailchimpRequest.end();
});

// Retry from failure page
app.post("/failure", function (req, res) {
  res.redirect("/");
});

// ================= SERVER =================
app.listen(3000, function () {
  console.log("Server running on port 3000");
});

