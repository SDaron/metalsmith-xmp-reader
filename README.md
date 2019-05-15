# metalsmith-xmp-reader 
This is a metalsmith integration for xmp-reader.

Extracts some commonly used XMP/RDF metadata tags from JPEG files.
Does not pretend to be a complete metadata management tool, but allows you to extract some information other EXIF-management tools on NPM fail to retrieve.

## Usage

To install the module add it to your project's ``package.json`` dependencies or install manually running:
```
npm install metalsmith-xmp-reader
```

Then pull it in your code:
```javascript
const Metalsmith = require('metalsmith')
const xmpReader = require('metalsmith-xmp-reader')
Metalsmith(__dirname)
  .use(
    xmpReader({
      pattern: '**/*.+(jpeg|jpg)',
      property: 'xmp'
    })
  )
  .build((err) => {
    if (err) return console.error(err)
    console.log('Build successfully finished! It is 🥙 time!')
  })
```

This will add a xmp field to your jpg files. Output will look something like that, depending on your metadata:
```javascript
{
	"raw": {
		"MicrosoftPhoto:Rating": "50",
		"dc:title": "Title",
		"dc:description": "Description",
		"dc:creator": "Creator",
		"Iptc4xmpCore:Location": "Location",
		"MicrosoftPhoto:LastKeywordXMP": ["tag1", "tag2"],
		"MicrosoftPhoto:LastKeywordIPTC": ["tag1", "tag2"],
		"xmp:Rating": "3"
	},
	"rating": 3,
	"title": "Title",
	"description": "Location",
	"creator": "Creator",
	"location": "Bruxelles",
	"keywords": ["tag1", "tag2"]
}
```
``raw`` property contains vendor-specific tag names.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)