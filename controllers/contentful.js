'use strict';

const contentful = require('contentful')
const client = contentful.createClient({
  "space": "v5eaxhcz73sm",
  "accessToken": "e153690c52c89f1a0c468a980afdddd8b03b97114cb1597c751f496b4a771eec"
})

exports.getPage = (req, res, next) => {
  client.getEntries({
    content_type: 'page',
    'fields.slug': req.path,
    include: 2
  }).then(response => {
    if (response.items.length == 0) return next()
    res.locals.page = response.items[0].fields
    res.locals.title = response.items[0].fields.title
    next()
  }).catch(err => {
    console.log(err);
  })
}
