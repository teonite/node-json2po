const program = require('commander');
const path = require('path');
const fs = require('fs');

function normalize_string(str) {
    return str.replace(/\\?"/g, '\\"').replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ' ').trim();
}

function convert_file(source, target) {
    if(path.extname(source) !== '.json') {
        console.error('Source file is not in json format! ('+ source +')');
        process.exit(1);
    }
    if(path.extname(target) !== '.po') {
        console.error('Target file is not in po format! ('+ target +')');
        process.exit(1);
    }
    console.log('Converting! ', source, target);

    const stream = fs.createWriteStream(path.resolve(target), {flags: 'w'});

    const source_obj = require(path.resolve(source));
    for(const key in source_obj) {
        if (source_obj.hasOwnProperty(key)) {
            stream.write(`msgid "${key}"\n`);
            stream.write(`msgstr "${normalize_string(source_obj[key])}"\n`);
            stream.write('\n');
        }
    }
}

program
    .version('1.0.0')
    .usage('[oprions] <source> <target>')
    .arguments('<source> <target>')
    .option('-r, --recursive', 'Recursively convert all files in directory')
    .parse(process.argv);

const NO_COMMAND_SPECIFIED = program.args.length === 0;

if(NO_COMMAND_SPECIFIED) {
   program.help();
}

const source = program.args[0], target = program.args[1];

if(!program.recursive) {
    convert_file(source, target);
} else {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }
    fs.readdir(source, (err, filenames) => {
        if(!filenames) {
            console.error('No files in target directory!');
            process.exit(1);
        }
        const files = filenames.filter(file => path.extname(file) === '.json');

        if(files.length === 0) {
            console.error('No .json files to convert in target directory!');
            process.exit(1);
        }

        files.forEach(file => {
            const target_file = path.basename(file, path.extname(file)) + '.po';
            convert_file(path.join(source, file), path.join(target, target_file));
        })
    })
}
