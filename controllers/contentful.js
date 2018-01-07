'use strict';

const contentful = require('contentful')
const isDevMode = require('express')().get('env') === 'development';
const contentfulConfig = require('../contentful.config.json');

const client = contentful.createClient({
  space: 'v5eaxhcz73sm',
  accessToken: isDevMode ? contentfulConfig.devAccessToken : contentfulConfig.prodAccessToken,
  host: isDevMode ? 'preview.contentful.com' : undefined
});

exports.getPage = (req, res, next) => {
  client.getEntries({
    content_type: 'page',
    'fields.slug': req.path,
    include: 2
  }).then(response => {
    if (response.items.length == 0) return next({status:404, message: "Soz, that page doesn't exist."})
    res.locals.page = response.items[0].fields
    res.locals.title = response.items[0].fields.title
    next()
  }).catch(err => {
    console.log(err);
  })
}
