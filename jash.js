var fs = require('fs'),
    parser = require('./parser'),
    Scope = require('./scope'),
    inputFile = process.argv[2],
    input = fs.readFileSync(inputFile, 'utf-8'),
    program = parser.parse(input);

program.eval(new Scope.TopLevel, process.stdin, process.stdout, function(){

});
