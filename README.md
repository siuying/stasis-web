## stasis

`stasis` is a command line utility to scrape a remote webpage to store locally.

### Usage

With [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/):

```
npm install -g stasis-web
```

You can now use `stasis` from the command line.

### Examples

Download a site to a local folder:

```
stasis -a https://yourblog.com -d ./static
```

Download a site running locally to a local folder, and replace the local url of the file to new address:

```
stasis -a http://localhost:2368 -d ./static
replace 'http://localhost:2368' 'http://mynewdomain.com' './static' -r -q
```

After convert the web site to static file, you can publish it with anything you like:

```
```