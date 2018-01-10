var program = require('commander');
const path = require('path');

function convert_file(source, target) {
    if(path.extname(source) !== '.json') {
        console.error('Source file is not in json format! ('+ source +')');
        process.exit(1)
    }
    if(path.extname(target) !== '.po') {
        console.error('Target file is not in po format! ('+ target +')');
        process.exit(1)
    }
}

var source, target;

program
    .version('1.0.0')
    .usage('[oprions] <source> <target>')
    .arguments('<source> <target>')
    .option('-r, --recursive', 'Recursively convert all files in directory')
    .action(function (src, trg) {
        source = src;
        target = trg;
      })
    .parse(process.argv);

var NO_COMMAND_SPECIFIED = program.args.length === 0;

if(NO_COMMAND_SPECIFIED) {
   program.help();
}

console.log(source, target, program.recursive);