# node-po2json

Simple tool for converting `.po` files to `.json` files

```
Usage: node-json2po [options] <source> <target>


  Options:

    -V, --version    output the version number
    -r, --recursive  Recursively convert all files in directory
    -h, --help       output usage information
```

### Installation
```
npm install --save node-json2po
```

### Usage
```
node-json2po source.po target.json
```
```
node-json2po -r sourceDir targetDir
```

or in `package.json`
```
{
    // ...
    "scripts": {
        //...
        "convert:json": "node-json2po -r sourceDir targetDir"
    },
    // ...
}
```

### License

MIT