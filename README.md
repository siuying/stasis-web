## stasis

`stasis` is a command line utility to scrape webpage and create local version.

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

After convert the web site to static file, you can publish it with zeit [now-static](https://zeit.co/blog/now-static):

```
cd ./static && now
> Ready! https://static-xasaxasasax.now.sh (copied to clipboard) [3s]
```

Or upload to [s3](http://docs.aws.amazon.com/cli/latest/reference/s3/index.html)

```
aws s3 website s3://my-bucket/ --index-document index.html --error-document error.html
aws s3 cp --acl=public-read ./static s3://my-bucket/ --recursive
```

You might also upload with Apex [up](https://github.com/apex/up)