var fs = require('fs'),
    parser = require('./parser'),
    Scope = require('./scope'),
    inputFile = process.argv[2],
    input = fs.readFileSync(inputFile, 'utf-8'),
    tree = parser.parse(input);

tree.eval(new Scope.TopLevel);
