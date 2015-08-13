"use strict";

var fs   = require("fs");
var rest = require("restler");
var uuid = require("node-uuid");
var Promise = require("bluebird");

const GetSatPublisher = function(username, password){

  const URL = "https://api.getsatisfaction.com/topics.json?company_domain=servicerocket";

  this.username = username;
  this.password = password;


  this.publish = function(product, subject, content) {

    console.log('Destination: ' + URL);
  
    return new Promise(function(f, j) {
  
      let data = { topic: { 
        company_domain: "servicerocket",
        style: "update",
        products: [product],
        subject: subject,
        content: content,
      }};
      let options = {
        username: this.username,
        password: this.password,
      };
     
      console.log("Content: " + JSON.stringify(data));
  
      rest.postJson(URL, data, options).on("complete", function(r, p) {
          //console.log(p);
          if (r instanceof Error || p.statusCode >= 400) j(JSON.stringify(r)); else f(r);
        });
  
    }.bind(this));
  
  };
}

if (!process.env.PRODUCT || !process.env.FILE || !process.env.USERNAME || !process.env.PASSWORD) {
  throw new Error("One or more of these variables are missing: USERNAME, PASSWORD, SPACE, FILE");
}


Promise.onPossiblyUnhandledRejection(function(e){ throw e; });

fs.readFile(process.env.FILE, "UTF-8", (e, r) => {

  if (e) throw e;

  console.log("Format: " + (process.env.MARKDOWN == 1 ? "Markdown" : "Plain/HTML"));
  console.log("File: " + process.env.FILE);

  var cp = new GetSatPublisher(
    process.env.USERNAME,
    process.env.PASSWORD
  )

  cp.publish(process.env.PRODUCT, process.env.TITLE ? process.env.TITLE : uuid.v1(), r).then(
    (r) =>  console.log("OK!")
  );


});

