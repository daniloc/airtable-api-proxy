node.js Airtable API Proxy by [Future Fluent](http://futurefluent.com)
=================

Here's a project demonstrating the basics of an Airtable API proxy using node.js and Express. Click here to [see the source and remix for your own purposes](https://glitch.com/edit/#!/airtable-api-proxy).

## Why does Airtable need an API Proxy?

Airtable's rate limit is five requests per second per base. Anything more than that and the API will lock down for thirty seconds. By implementing an API proxy, it's possible to cache common results for quick responses and enforce a rate limit for requests.

Additionally, an API proxy allows you to keep your API key a secret. Since all Airtable API keys allow full CRUD access, using the key in client-side JavaScript code would leave your data subject to outside tampering.

Click here for [example output](https://airtable-api-proxy.glitch.me/api/ai/list/0). Records are returned as a JSON dictionary, keyed with their Airtable record IDs. This facilitates stitching together relationship fields on the client.

Click here to see the [source data](https://airtable.com/shrK9YNbrZa8MsyCw).

## How does it work?

Three files drive the proxy:

## server.js

An API route, `/api/:table/list/:page`, demonstrates how to serve JSON in response to a request.

## caching.js

Simple, file-based caching.

`readCacheWithPath(path)`

Returns cached JSON, if it's not too stale. Use `cacheInterval` to adjust this.

`writeCacheWithPath(path, object)`

Writes a JavaScript object to JSON at the specified path, creating intermediate directories as needed.

## database-connection.js

This is the meat of the project. It uses the Airtable node.js client to connect to a base and writes the results out as a JSON response.

`tableRoutes` maps between API paths and the names of tables in your Airtable base.

Base ID and Airtable API key are in 🗝.env.

For more on accessing Airtable via the API, see [the interactive Airtable documentation](https://airtable.com/api).

### Rate limiting

[Bottleneck](https://www.npmjs.com/package/bottleneck) handles rate limiting. The Airtable database interactions are handled using Bottleneck's `wrap` function.