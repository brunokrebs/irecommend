# irecommend

A FaaS (Function as a Service) that tweets a link whenever I recommend an article,
that is related to Javascript, on Medium.

## How does this works?

The function is run on [webtask.io](https://webtask.io/) and it works as a webhook
that is triggered by [IFTTT (IF This Than That)](https://ifttt.com). Since there is
a lot of different articles on Medium, I decided to use this function to filter
articles that talk about Javascript. If I recommend an article that talks about
something else, like politics, this function will ignore it.

This ignore/tweet is based on the (Medium) tags that the article's author configured.

## How do I use it?

### Twitter

You must create a [new app on Twitter](https://apps.twitter.com/app/new) and
get the 'consumer key', 'consumer secret', 'access token' and 'access token
secret' in there.

These info will be added to the FaaS in order to allow it to post for you.

### Webtask.io

- Clone this repo.

- Install [webtask-cli](https://webtask.io/cli).

- Issue (replacing each secret with you own credentials):
wt create index.js
--secret consumerKey=CONSUMERKEY
--secret consumerSecret=CONSUMERSECRET
--secret accessToken=ACCESSTOKEN
--secret accessTokenSecret=ACCESSTOKENSECRET

- Take note on url produced by this command.

### IFTTT

- Now you need to create an account on [IFTTT](https://ifttt.com/join).

- Having an account and being properly logged, it is time to create a
[new applet](https://ifttt.com/create).

- The first step requires us to select a service. Select 'Medium' and accept the
permissions that it asks.

- On step two - Choose trigger - select 'Post recommend by me' option.

- Now click on '+ That' and choose 'Maker' as the action service.

- Step four will show only one action, called 'Make a web request'.

- Step five, fill the URL field with the url produced by wt-cli and add
'&url={{PostUrl}}' to the end of it.

- Click create action and then click 'Finish'.

Now, whenever you recommend an article on Medium, that have javascript as a tag,
this FaaS will tweet on your behalf.
