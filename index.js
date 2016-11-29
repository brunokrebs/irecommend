"use strict";

const request = require('request@2.67.0');
const cheerio = require('cheerio@0.19.0');
const util = require('util');
const Twit = require('twit@2.2.3');
const JAVASCRIPT_TAG = 'javascript';

var T = null;

function handlePost(url, title, tags, cb) {
  console.log(`Do we tweet ${title}?`);
  let containsJavascriptTag = false;
  tags.forEach(function(element) {
    if (element.toLowerCase() === JAVASCRIPT_TAG) {
      containsJavascriptTag = true;
    }
  });
  if (containsJavascriptTag) {
    console.log(`Yes, we do not tweet ${title}.`);
    title = title.substring(0, 30);
    T.post('statuses/update', {
      status: `I just read a great javascript article: ${title} (${url})`
    }, function(err) {
      if (!err) {
        console.log(`Just tweeted ${title}.`);
      }
      cb(err);
    });
  } else {
    console.log(`No, we do not tweet ${title}.`);
    cb(null);
  }
}

function handleHTTPResponse(response, body, cb) {
  let url = response.request.href;
  console.log(`200: ${url}`);
  let $ = cheerio.load(body);
  let title = $('title').text();
  let tags = [];
  $('div.tags a.link').each(function(i, el) {
    tags[i] = $(this).text();
  });
  handlePost(url, title, tags, cb);
}

module.exports = function(context, cb) {
  console.log(`Let's begin.`);
  T = new Twit({
    consumer_key: context.secrets.consumerKey,
    consumer_secret: context.secrets.consumerSecret,
    access_token: context.secrets.accessToken,
    access_token_secret: context.secrets.accessTokenSecret,
    timeout_ms: 60 * 1000
  });

  request(context.query.url, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      return handleHTTPResponse(response, body, cb);
    }
    cb(response);
  });
}
