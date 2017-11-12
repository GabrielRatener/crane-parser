var Syntax$1;
Syntax$1 = {
    AssignmentExpression: 'AssignmentExpression',
    AssignmentPattern: 'AssignmentPattern',
    ArrayExpression: 'ArrayExpression',
    ArrayPattern: 'ArrayPattern',
    ArrowFunctionExpression: 'ArrowFunctionExpression',
    AwaitExpression: 'AwaitExpression', // CAUTION: It's deferred to ES7.
    BlockStatement: 'BlockStatement',
    BinaryExpression: 'BinaryExpression',
    BreakStatement: 'BreakStatement',
    CallExpression: 'CallExpression',
    CatchClause: 'CatchClause',
    ClassBody: 'ClassBody',
    ClassDeclaration: 'ClassDeclaration',
    ClassExpression: 'ClassExpression',
    ComprehensionBlock: 'ComprehensionBlock',  // CAUTION: It's deferred to ES7.
    ComprehensionExpression: 'ComprehensionExpression',  // CAUTION: It's deferred to ES7.
    ConditionalExpression: 'ConditionalExpression',
    ContinueStatement: 'ContinueStatement',
    DebuggerStatement: 'DebuggerStatement',
    DirectiveStatement: 'DirectiveStatement',
    DoWhileStatement: 'DoWhileStatement',
    EmptyStatement: 'EmptyStatement',
    ExportAllDeclaration: 'ExportAllDeclaration',
    ExportDefaultDeclaration: 'ExportDefaultDeclaration',
    ExportNamedDeclaration: 'ExportNamedDeclaration',
    ExportSpecifier: 'ExportSpecifier',
    ExpressionStatement: 'ExpressionStatement',
    ForStatement: 'ForStatement',
    ForInStatement: 'ForInStatement',
    ForOfStatement: 'ForOfStatement',
    FunctionDeclaration: 'FunctionDeclaration',
    FunctionExpression: 'FunctionExpression',
    GeneratorExpression: 'GeneratorExpression',  // CAUTION: It's deferred to ES7.
    Identifier: 'Identifier',
    IfStatement: 'IfStatement',
    ImportDeclaration: 'ImportDeclaration',
    ImportDefaultSpecifier: 'ImportDefaultSpecifier',
    ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
    ImportSpecifier: 'ImportSpecifier',
    Literal: 'Literal',
    LabeledStatement: 'LabeledStatement',
    LogicalExpression: 'LogicalExpression',
    MemberExpression: 'MemberExpression',
    MetaProperty: 'MetaProperty',
    MethodDefinition: 'MethodDefinition',
    ModuleSpecifier: 'ModuleSpecifier',
    NewExpression: 'NewExpression',
    ObjectExpression: 'ObjectExpression',
    ObjectPattern: 'ObjectPattern',
    Program: 'Program',
    Property: 'Property',
    RestElement: 'RestElement',
    ReturnStatement: 'ReturnStatement',
    SequenceExpression: 'SequenceExpression',
    SpreadElement: 'SpreadElement',
    Super: 'Super',
    SwitchStatement: 'SwitchStatement',
    SwitchCase: 'SwitchCase',
    TaggedTemplateExpression: 'TaggedTemplateExpression',
    TemplateElement: 'TemplateElement',
    TemplateLiteral: 'TemplateLiteral',
    ThisExpression: 'ThisExpression',
    ThrowStatement: 'ThrowStatement',
    TryStatement: 'TryStatement',
    UnaryExpression: 'UnaryExpression',
    UpdateExpression: 'UpdateExpression',
    VariableDeclaration: 'VariableDeclaration',
    VariableDeclarator: 'VariableDeclarator',
    WhileStatement: 'WhileStatement',
    WithStatement: 'WithStatement',
    YieldExpression: 'YieldExpression'
};

var ES5Regex;
var NON_ASCII_WHITESPACES;
var IDENTIFIER_START;
var IDENTIFIER_PART;
var ch;
// See `tools/generate-identifier-regex.js`.
ES5Regex = {
    // ECMAScript 5.1/Unicode v7.0.0 NonAsciiIdentifierStart:
    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
    // ECMAScript 5.1/Unicode v7.0.0 NonAsciiIdentifierPart:
    NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
};

function isDecimalDigit(ch) {
    return 0x30 <= ch && ch <= 0x39;  // 0..9
}

// 7.2 White Space

NON_ASCII_WHITESPACES = [
    0x1680, 0x180E,
    0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A,
    0x202F, 0x205F,
    0x3000,
    0xFEFF
];

function isWhiteSpace(ch) {
    return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 ||
        ch >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0;
}

// 7.3 Line Terminators

function isLineTerminator(ch) {
    return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
}

// 7.6 Identifier Names and Identifiers

function fromCodePoint(cp) {
    if (cp <= 0xFFFF) { return String.fromCharCode(cp); }
    var cu1 = String.fromCharCode(Math.floor((cp - 0x10000) / 0x400) + 0xD800);
    var cu2 = String.fromCharCode(((cp - 0x10000) % 0x400) + 0xDC00);
    return cu1 + cu2;
}

IDENTIFIER_START = new Array(0x80);
for(ch = 0; ch < 0x80; ++ch) {
    IDENTIFIER_START[ch] =
        ch >= 0x61 && ch <= 0x7A ||  // a..z
        ch >= 0x41 && ch <= 0x5A ||  // A..Z
        ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
}

IDENTIFIER_PART = new Array(0x80);
for(ch = 0; ch < 0x80; ++ch) {
    IDENTIFIER_PART[ch] =
        ch >= 0x61 && ch <= 0x7A ||  // a..z
        ch >= 0x41 && ch <= 0x5A ||  // A..Z
        ch >= 0x30 && ch <= 0x39 ||  // 0..9
        ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
}

function isIdentifierPartES5(ch) {
    return ch < 0x80 ? IDENTIFIER_PART[ch] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
}

var Syntax;
var Precedence;
var BinaryPrecedence;
var SourceNode;
var isArray;
var base;
var indent;
var json;
var renumber;
var hexadecimal;
var quotes;
var escapeless;
var newline;
var space;
var parentheses;
var semicolons;
var safeConcatenation;
var directive;
var extra;
var parse$1;
var sourceMap;
var sourceCode;
var preserveBlankLines;
Syntax = Syntax$1;

// Generation is done by generateExpression.
function isExpression(node) {
    return CodeGenerator.Expression.hasOwnProperty(node.type);
}

// Generation is done by generateStatement.
function isStatement(node) {
    return CodeGenerator.Statement.hasOwnProperty(node.type);
}

Precedence = {
    Sequence: 0,
    Yield: 1,
    Await: 1,
    Assignment: 1,
    Conditional: 2,
    ArrowFunction: 2,
    LogicalOR: 3,
    LogicalAND: 4,
    BitwiseOR: 5,
    BitwiseXOR: 6,
    BitwiseAND: 7,
    Equality: 8,
    Relational: 9,
    BitwiseSHIFT: 10,
    Additive: 11,
    Multiplicative: 12,
    Unary: 13,
    Postfix: 14,
    Call: 15,
    New: 16,
    TaggedTemplate: 17,
    Member: 18,
    Primary: 19
};

BinaryPrecedence = {
    '||': Precedence.LogicalOR,
    '&&': Precedence.LogicalAND,
    '|': Precedence.BitwiseOR,
    '^': Precedence.BitwiseXOR,
    '&': Precedence.BitwiseAND,
    '==': Precedence.Equality,
    '!=': Precedence.Equality,
    '===': Precedence.Equality,
    '!==': Precedence.Equality,
    'is': Precedence.Equality,
    'isnt': Precedence.Equality,
    '<': Precedence.Relational,
    '>': Precedence.Relational,
    '<=': Precedence.Relational,
    '>=': Precedence.Relational,
    'in': Precedence.Relational,
    'instanceof': Precedence.Relational,
    '<<': Precedence.BitwiseSHIFT,
    '>>': Precedence.BitwiseSHIFT,
    '>>>': Precedence.BitwiseSHIFT,
    '+': Precedence.Additive,
    '-': Precedence.Additive,
    '*': Precedence.Multiplicative,
    '%': Precedence.Multiplicative,
    '/': Precedence.Multiplicative
};

//Flags
var F_ALLOW_IN = 1;
var F_ALLOW_CALL = 1 << 1;
var F_ALLOW_UNPARATH_NEW = 1 << 2;
var F_FUNC_BODY = 1 << 3;
var F_DIRECTIVE_CTX = 1 << 4;
var F_SEMICOLON_OPT = 1 << 5;
var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW;
var E_TTF = F_ALLOW_IN | F_ALLOW_CALL;
var E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW;
var E_TFF = F_ALLOW_IN;
var E_FFT = F_ALLOW_UNPARATH_NEW;
var E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;
var S_TFFF = F_ALLOW_IN;
var S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT;
var S_FFFF = 0x00;
var S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX;
var S_TTFF = F_ALLOW_IN | F_FUNC_BODY;
function getDefaultOptions() {
    // default options
    return {
        indent: null,
        base: null,
        parse: null,
        comment: false,
        format: {
            indent: {
                style: '    ',
                base: 0,
                adjustMultilineComment: false
            },
            newline: '\n',
            space: ' ',
            json: false,
            renumber: false,
            hexadecimal: false,
            quotes: 'single',
            escapeless: false,
            compact: false,
            parentheses: true,
            semicolons: true,
            safeConcatenation: false,
            preserveBlankLines: false
        },
        moz: {
            comprehensionExpressionStartsWithAssignment: false,
            starlessGenerator: false
        },
        sourceMap: null,
        sourceMapRoot: null,
        sourceMapWithCode: false,
        directive: false,
        raw: true,
        verbatim: null,
        sourceCode: null
    };
}

function stringRepeat(str, num) {
    var result = '';

    for (num |= 0; num > 0; num >>>= 1, str += str) {
        if (num & 1) {
            result += str;
        }
    }

    return result;
}

isArray = Array.isArray;
if (!isArray) {
    isArray = function isArray(array) {
        return Object.prototype.toString.call(array) === '[object Array]';
    };
}

function hasLineTerminator(str) {
    return (/[\r\n]/g).test(str);
}

function endsWithLineTerminator(str) {
    var len = str.length;
    return len && isLineTerminator(str.charCodeAt(len - 1));
}

function merge(target, override) {
    var key;
    for (key in override) {
        if (override.hasOwnProperty(key)) {
            target[key] = override[key];
        }
    }
    return target;
}

function updateDeeply(target, override) {
    var key, val;

    function isHashObject(target) {
        return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
    }

    for (key in override) {
        if (override.hasOwnProperty(key)) {
            val = override[key];
            if (isHashObject(val)) {
                if (isHashObject(target[key])) {
                    updateDeeply(target[key], val);
                } else {
                    target[key] = updateDeeply({}, val);
                }
            } else {
                target[key] = val;
            }
        }
    }
    return target;
}

function generateNumber(value) {
    var result, point, temp, exponent, pos;

    if (value !== value) {
        throw new Error('Numeric literal whose value is NaN');
    }
    if (value < 0 || (value === 0 && 1 / value < 0)) {
        throw new Error('Numeric literal whose value is negative');
    }

    if (value === 1 / 0) {
        return json ? 'null' : renumber ? '1e400' : '1e+400';
    }

    result = '' + value;
    if (!renumber || result.length < 3) {
        return result;
    }

    point = result.indexOf('.');
    if (!json && result.charCodeAt(0) === 0x30  /* 0 */ && point === 1) {
        point = 0;
        result = result.slice(1);
    }
    temp = result;
    result = result.replace('e+', 'e');
    exponent = 0;
    if ((pos = temp.indexOf('e')) > 0) {
        exponent = +temp.slice(pos + 1);
        temp = temp.slice(0, pos);
    }
    if (point >= 0) {
        exponent -= temp.length - point - 1;
        temp = +(temp.slice(0, point) + temp.slice(point + 1)) + '';
    }
    pos = 0;
    while (temp.charCodeAt(temp.length + pos - 1) === 0x30  /* 0 */) {
        --pos;
    }
    if (pos !== 0) {
        exponent -= pos;
        temp = temp.slice(0, pos);
    }
    if (exponent !== 0) {
        temp += 'e' + exponent;
    }
    if ((temp.length < result.length ||
                (hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = '0x' + value.toString(16)).length < result.length)) &&
            +temp === value) {
        result = temp;
    }

    return result;
}

// Generate valid RegExp expression.
// This function is based on https://github.com/Constellation/iv Engine

function escapeRegExpCharacter(ch, previousIsBackslash) {
    // not handling '\' and handling \u2028 or \u2029 to unicode escape sequence
    if ((ch & ~1) === 0x2028) {
        return (previousIsBackslash ? 'u' : '\\u') + ((ch === 0x2028) ? '2028' : '2029');
    } else if (ch === 10 || ch === 13) {  // \n, \r
        return (previousIsBackslash ? '' : '\\') + ((ch === 10) ? 'n' : 'r');
    }
    return String.fromCharCode(ch);
}

function generateRegExp(reg) {
    var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;

    result = reg.toString();

    if (reg.source) {
        // extract flag from toString result
        match = result.match(/\/([^/]*)$/);
        if (!match) {
            return result;
        }

        flags = match[1];
        result = '';

        characterInBrack = false;
        previousIsBackslash = false;
        for (i = 0, iz = reg.source.length; i < iz; ++i) {
            ch = reg.source.charCodeAt(i);

            if (!previousIsBackslash) {
                if (characterInBrack) {
                    if (ch === 93) {  // ]
                        characterInBrack = false;
                    }
                } else {
                    if (ch === 47) {  // /
                        result += '\\';
                    } else if (ch === 91) {  // [
                        characterInBrack = true;
                    }
                }
                result += escapeRegExpCharacter(ch, previousIsBackslash);
                previousIsBackslash = ch === 92;  // \
            } else {
                // if new RegExp("\\\n') is provided, create /\n/
                result += escapeRegExpCharacter(ch, previousIsBackslash);
                // prevent like /\\[/]/
                previousIsBackslash = false;
            }
        }

        return '/' + result + '/' + flags;
    }

    return result;
}

function escapeAllowedCharacter(code, next) {
    var hex;

    if (code === 0x08  /* \b */) {
        return '\\b';
    }

    if (code === 0x0C  /* \f */) {
        return '\\f';
    }

    if (code === 0x09  /* \t */) {
        return '\\t';
    }

    hex = code.toString(16).toUpperCase();
    if (json || code > 0xFF) {
        return '\\u' + '0000'.slice(hex.length) + hex;
    } else if (code === 0x0000 && !isDecimalDigit(next)) {
        return '\\0';
    } else if (code === 0x000B  /* \v */) { // '\v'
        return '\\x0B';
    } else {
        return '\\x' + '00'.slice(hex.length) + hex;
    }
}

function escapeDisallowedCharacter(code) {
    if (code === 0x5C  /* \ */) {
        return '\\\\';
    }

    if (code === 0x0A  /* \n */) {
        return '\\n';
    }

    if (code === 0x0D  /* \r */) {
        return '\\r';
    }

    if (code === 0x2028) {
        return '\\u2028';
    }

    if (code === 0x2029) {
        return '\\u2029';
    }

    throw new Error('Incorrectly classified character');
}

function escapeDirective(str) {
    var i, iz, code, quote;

    quote = quotes === 'double' ? '"' : '\'';
    for (i = 0, iz = str.length; i < iz; ++i) {
        code = str.charCodeAt(i);
        if (code === 0x27  /* ' */) {
            quote = '"';
            break;
        } else if (code === 0x22  /* " */) {
            quote = '\'';
            break;
        } else if (code === 0x5C  /* \ */) {
            ++i;
        }
    }

    return quote + str + quote;
}

function escapeString(str) {
    var result = '', i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;

    for (i = 0, len = str.length; i < len; ++i) {
        code = str.charCodeAt(i);
        if (code === 0x27  /* ' */) {
            ++singleQuotes;
        } else if (code === 0x22  /* " */) {
            ++doubleQuotes;
        } else if (code === 0x2F  /* / */ && json) {
            result += '\\';
        } else if (isLineTerminator(code) || code === 0x5C  /* \ */) {
            result += escapeDisallowedCharacter(code);
            continue;
        } else if (!isIdentifierPartES5(code) && (json && code < 0x20  /* SP */ || !json && !escapeless && (code < 0x20  /* SP */ || code > 0x7E  /* ~ */))) {
            result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
            continue;
        }
        result += String.fromCharCode(code);
    }

    single = !(quotes === 'double' || (quotes === 'auto' && doubleQuotes < singleQuotes));
    quote = single ? '\'' : '"';

    if (!(single ? singleQuotes : doubleQuotes)) {
        return quote + result + quote;
    }

    str = result;
    result = quote;

    for (i = 0, len = str.length; i < len; ++i) {
        code = str.charCodeAt(i);
        if ((code === 0x27  /* ' */ && single) || (code === 0x22  /* " */ && !single)) {
            result += '\\';
        }
        result += String.fromCharCode(code);
    }

    return result + quote;
}

/**
 * flatten an array to a string, where the array can contain
 * either strings or nested arrays
 */
function flattenToString(arr) {
    var i, iz, elem, result = '';
    for (i = 0, iz = arr.length; i < iz; ++i) {
        elem = arr[i];
        result += isArray(elem) ? flattenToString(elem) : elem;
    }
    return result;
}

/**
 * convert generated to a SourceNode when source maps are enabled.
 */
function toSourceNodeWhenNeeded(generated, node) {
    if (!sourceMap) {
        // with no source maps, generated is either an
        // array or a string.  if an array, flatten it.
        // if a string, just return it
        if (isArray(generated)) {
            return flattenToString(generated);
        } else {
            return generated;
        }
    }
    if (node == null) {
        if (generated instanceof SourceNode) {
            return generated;
        } else {
            node = {};
        }
    }
    if (node.loc == null) {
        return new SourceNode(null, null, sourceMap, generated, node.name || null);
    }
    return new SourceNode(node.loc.start.line, node.loc.start.column, (sourceMap === true ? node.loc.source || null : sourceMap), generated, node.name || null);
}

function noEmptySpace() {
    return (space) ? space : ' ';
}

function join(left, right) {
    var leftSource,
        rightSource,
        leftCharCode,
        rightCharCode;

    leftSource = toSourceNodeWhenNeeded(left).toString();
    if (leftSource.length === 0) {
        return [right];
    }

    rightSource = toSourceNodeWhenNeeded(right).toString();
    if (rightSource.length === 0) {
        return [left];
    }

    leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
    rightCharCode = rightSource.charCodeAt(0);

    if ((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode ||
        isIdentifierPartES5(leftCharCode) && isIdentifierPartES5(rightCharCode) ||
        leftCharCode === 0x2F  /* / */ && rightCharCode === 0x69  /* i */) { // infix word operators all start with `i`
        return [left, noEmptySpace(), right];
    } else if (isWhiteSpace(leftCharCode) || isLineTerminator(leftCharCode) ||
            isWhiteSpace(rightCharCode) || isLineTerminator(rightCharCode)) {
        return [left, right];
    }
    return [left, space, right];
}

function addIndent(stmt) {
    return [base, stmt];
}

function withIndent(fn) {
    var previousBase;
    previousBase = base;
    base += indent;
    fn(base);
    base = previousBase;
}

function calculateSpaces(str) {
    var i;
    for (i = str.length - 1; i >= 0; --i) {
        if (isLineTerminator(str.charCodeAt(i))) {
            break;
        }
    }
    return (str.length - 1) - i;
}

function adjustMultilineComment(value, specialBase) {
    var array, i, len, line, j, spaces, previousBase, sn;

    array = value.split(/\r\n|[\r\n]/);
    spaces = Number.MAX_VALUE;

    // first line doesn't have indentation
    for (i = 1, len = array.length; i < len; ++i) {
        line = array[i];
        j = 0;
        while (j < line.length && isWhiteSpace(line.charCodeAt(j))) {
            ++j;
        }
        if (spaces > j) {
            spaces = j;
        }
    }

    if (typeof specialBase !== 'undefined') {
        // pattern like
        // {
        //   var t = 20;  /*
        //                 * this is comment
        //                 */
        // }
        previousBase = base;
        if (array[1][spaces] === '*') {
            specialBase += ' ';
        }
        base = specialBase;
    } else {
        if (spaces & 1) {
            // /*
            //  *
            //  */
            // If spaces are odd number, above pattern is considered.
            // We waste 1 space.
            --spaces;
        }
        previousBase = base;
    }

    for (i = 1, len = array.length; i < len; ++i) {
        sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
        array[i] = sourceMap ? sn.join('') : sn;
    }

    base = previousBase;

    return array.join('\n');
}

function generateComment(comment, specialBase) {
    if (comment.type === 'Line') {
        if (endsWithLineTerminator(comment.value)) {
            return '//' + comment.value;
        } else {
            // Always use LineTerminator
            var result = '//' + comment.value;
            if (!preserveBlankLines) {
                result += '\n';
            }
            return result;
        }
    }
    if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
        return adjustMultilineComment('/*' + comment.value + '*/', specialBase);
    }
    return '/*' + comment.value + '*/';
}

function addComments(stmt, result) {
    var i, len, comment, save, tailingToStatement, specialBase, fragment,
        extRange, range, prevRange, prefix, infix, suffix, count;

    if (stmt.leadingComments && stmt.leadingComments.length > 0) {
        save = result;

        if (preserveBlankLines) {
            comment = stmt.leadingComments[0];
            result = [];

            extRange = comment.extendedRange;
            range = comment.range;

            prefix = sourceCode.substring(extRange[0], range[0]);
            count = (prefix.match(/\n/g) || []).length;
            if (count > 0) {
                result.push(stringRepeat('\n', count));
                result.push(addIndent(generateComment(comment)));
            } else {
                result.push(prefix);
                result.push(generateComment(comment));
            }

            prevRange = range;

            for (i = 1, len = stmt.leadingComments.length; i < len; i++) {
                comment = stmt.leadingComments[i];
                range = comment.range;

                infix = sourceCode.substring(prevRange[1], range[0]);
                count = (infix.match(/\n/g) || []).length;
                result.push(stringRepeat('\n', count));
                result.push(addIndent(generateComment(comment)));

                prevRange = range;
            }

            suffix = sourceCode.substring(range[1], extRange[1]);
            count = (suffix.match(/\n/g) || []).length;
            result.push(stringRepeat('\n', count));
        } else {
            comment = stmt.leadingComments[0];
            result = [];
            if (safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0) {
                result.push('\n');
            }
            result.push(generateComment(comment));
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push('\n');
            }

            for (i = 1, len = stmt.leadingComments.length; i < len; ++i) {
                comment = stmt.leadingComments[i];
                fragment = [generateComment(comment)];
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    fragment.push('\n');
                }
                result.push(addIndent(fragment));
            }
        }

        result.push(addIndent(save));
    }

    if (stmt.trailingComments) {

        if (preserveBlankLines) {
            comment = stmt.trailingComments[0];
            extRange = comment.extendedRange;
            range = comment.range;

            prefix = sourceCode.substring(extRange[0], range[0]);
            count = (prefix.match(/\n/g) || []).length;

            if (count > 0) {
                result.push(stringRepeat('\n', count));
                result.push(addIndent(generateComment(comment)));
            } else {
                result.push(prefix);
                result.push(generateComment(comment));
            }
        } else {
            tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
            specialBase = stringRepeat(' ', calculateSpaces(toSourceNodeWhenNeeded([base, result, indent]).toString()));
            for (i = 0, len = stmt.trailingComments.length; i < len; ++i) {
                comment = stmt.trailingComments[i];
                if (tailingToStatement) {
                    // We assume target like following script
                    //
                    // var t = 20;  /**
                    //               * This is comment of t
                    //               */
                    if (i === 0) {
                        // first case
                        result = [result, indent];
                    } else {
                        result = [result, specialBase];
                    }
                    result.push(generateComment(comment, specialBase));
                } else {
                    result = [result, addIndent(generateComment(comment))];
                }
                if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result = [result, '\n'];
                }
            }
        }
    }

    return result;
}

function generateBlankLines(start, end, result) {
    var j, newlineCount = 0;

    for (j = start; j < end; j++) {
        if (sourceCode[j] === '\n') {
            newlineCount++;
        }
    }

    for (j = 1; j < newlineCount; j++) {
        result.push(newline);
    }
}

function parenthesize(text, current, should) {
    if (current < should) {
        return ['(', text, ')'];
    }
    return text;
}

function generateVerbatimString(string) {
    var i, iz, result;
    result = string.split(/\r\n|\n/);
    for (i = 1, iz = result.length; i < iz; i++) {
        result[i] = newline + base + result[i];
    }
    return result;
}

function generateVerbatim(expr, precedence) {
    var verbatim, result, prec;
    verbatim = expr[extra.verbatim];

    if (typeof verbatim === 'string') {
        result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, precedence);
    } else {
        // verbatim is object
        result = generateVerbatimString(verbatim.content);
        prec = (verbatim.precedence != null) ? verbatim.precedence : Precedence.Sequence;
        result = parenthesize(result, prec, precedence);
    }

    return toSourceNodeWhenNeeded(result, expr);
}

function CodeGenerator() {
}

// Helpers.

CodeGenerator.prototype.maybeBlock = function(stmt, flags) {
    var result, noLeadingComment, that = this;

    noLeadingComment = !extra.comment || !stmt.leadingComments;

    if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
        return [space, this.generateStatement(stmt, flags)];
    }

    if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
        return ';';
    }

    withIndent(function () {
        result = [
            newline,
            addIndent(that.generateStatement(stmt, flags))
        ];
    });

    return result;
};

CodeGenerator.prototype.maybeBlockSuffix = function (stmt, result) {
    var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
    if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
        return [result, space];
    }
    if (ends) {
        return [result, base];
    }
    return [result, newline, base];
};

function generateIdentifier(node) {
    return toSourceNodeWhenNeeded(node.name, node);
}

function generateAsyncPrefix(node, spaceRequired) {
    return node.async ? 'async' + (spaceRequired ? noEmptySpace() : space) : '';
}

function generateStarSuffix(node) {
    var isGenerator = node.generator && !extra.moz.starlessGenerator;
    return isGenerator ? '*' + space : '';
}

function generateMethodPrefix(prop) {
    var func = prop.value;
    if (func.async) {
        return generateAsyncPrefix(func, !prop.computed);
    } else {
        // avoid space before method name
        return generateStarSuffix(func) ? '*' : '';
    }
}

CodeGenerator.prototype.generatePattern = function (node, precedence, flags) {
    if (node.type === Syntax.Identifier) {
        return generateIdentifier(node);
    }
    return this.generateExpression(node, precedence, flags);
};

CodeGenerator.prototype.generateFunctionParams = function (node) {
    var i, iz, result, hasDefault;

    hasDefault = false;

    if (node.type === Syntax.ArrowFunctionExpression &&
            !node.rest && (!node.defaults || node.defaults.length === 0) &&
            node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
        // arg => { } case
        result = [generateAsyncPrefix(node, true), generateIdentifier(node.params[0])];
    } else {
        result = node.type === Syntax.ArrowFunctionExpression ? [generateAsyncPrefix(node, false)] : [];
        result.push('(');
        if (node.defaults) {
            hasDefault = true;
        }
        for (i = 0, iz = node.params.length; i < iz; ++i) {
            if (hasDefault && node.defaults[i]) {
                // Handle default values.
                result.push(this.generateAssignment(node.params[i], node.defaults[i], '=', Precedence.Assignment, E_TTT));
            } else {
                result.push(this.generatePattern(node.params[i], Precedence.Assignment, E_TTT));
            }
            if (i + 1 < iz) {
                result.push(',' + space);
            }
        }

        if (node.rest) {
            if (node.params.length) {
                result.push(',' + space);
            }
            result.push('...');
            result.push(generateIdentifier(node.rest));
        }

        result.push(')');
    }

    return result;
};

CodeGenerator.prototype.generateFunctionBody = function (node) {
    var result, expr;

    result = this.generateFunctionParams(node);

    if (node.type === Syntax.ArrowFunctionExpression) {
        result.push(space);
        result.push('=>');
    }

    if (node.expression) {
        result.push(space);
        expr = this.generateExpression(node.body, Precedence.Assignment, E_TTT);
        if (expr.toString().charAt(0) === '{') {
            expr = ['(', expr, ')'];
        }
        result.push(expr);
    } else {
        result.push(this.maybeBlock(node.body, S_TTFF));
    }

    return result;
};

CodeGenerator.prototype.generateIterationForStatement = function (operator, stmt, flags) {
    var result = ['for' + space + '('], that = this;
    withIndent(function () {
        if (stmt.left.type === Syntax.VariableDeclaration) {
            withIndent(function () {
                result.push(stmt.left.kind + noEmptySpace());
                result.push(that.generateStatement(stmt.left.declarations[0], S_FFFF));
            });
        } else {
            result.push(that.generateExpression(stmt.left, Precedence.Call, E_TTT));
        }

        result = join(result, operator);
        result = [join(
            result,
            that.generateExpression(stmt.right, Precedence.Sequence, E_TTT)
        ), ')'];
    });
    result.push(this.maybeBlock(stmt.body, flags));
    return result;
};

CodeGenerator.prototype.generatePropertyKey = function (expr, computed) {
    var result = [];

    if (computed) {
        result.push('[');
    }

    result.push(this.generateExpression(expr, Precedence.Sequence, E_TTT));
    if (computed) {
        result.push(']');
    }

    return result;
};

CodeGenerator.prototype.generateAssignment = function (left, right, operator, precedence, flags) {
    if (Precedence.Assignment < precedence) {
        flags |= F_ALLOW_IN;
    }

    return parenthesize(
        [
            this.generateExpression(left, Precedence.Call, flags),
            space + operator + space,
            this.generateExpression(right, Precedence.Assignment, flags)
        ],
        Precedence.Assignment,
        precedence
    );
};

CodeGenerator.prototype.semicolon = function (flags) {
    if (!semicolons && flags & F_SEMICOLON_OPT) {
        return '';
    }
    return ';';
};

// Statements.

CodeGenerator.Statement = {

    BlockStatement: function (stmt, flags) {
        var range, content, result = ['{', newline], that = this;

        withIndent(function () {
            // handle functions without any code
            if (stmt.body.length === 0 && preserveBlankLines) {
                range = stmt.range;
                if (range[1] - range[0] > 2) {
                    content = sourceCode.substring(range[0] + 1, range[1] - 1);
                    if (content[0] === '\n') {
                        result = ['{'];
                    }
                    result.push(content);
                }
            }

            var i, iz, fragment, bodyFlags;
            bodyFlags = S_TFFF;
            if (flags & F_FUNC_BODY) {
                bodyFlags |= F_DIRECTIVE_CTX;
            }

            for (i = 0, iz = stmt.body.length; i < iz; ++i) {
                if (preserveBlankLines) {
                    // handle spaces before the first line
                    if (i === 0) {
                        if (stmt.body[0].leadingComments) {
                            range = stmt.body[0].leadingComments[0].extendedRange;
                            content = sourceCode.substring(range[0], range[1]);
                            if (content[0] === '\n') {
                                result = ['{'];
                            }
                        }
                        if (!stmt.body[0].leadingComments) {
                            generateBlankLines(stmt.range[0], stmt.body[0].range[0], result);
                        }
                    }

                    // handle spaces between lines
                    if (i > 0) {
                        if (!stmt.body[i - 1].trailingComments  && !stmt.body[i].leadingComments) {
                            generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                        }
                    }
                }

                if (i === iz - 1) {
                    bodyFlags |= F_SEMICOLON_OPT;
                }

                if (stmt.body[i].leadingComments && preserveBlankLines) {
                    fragment = that.generateStatement(stmt.body[i], bodyFlags);
                } else {
                    fragment = addIndent(that.generateStatement(stmt.body[i], bodyFlags));
                }

                result.push(fragment);
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    if (preserveBlankLines && i < iz - 1) {
                        // don't add a new line if there are leading coments
                        // in the next statement
                        if (!stmt.body[i + 1].leadingComments) {
                            result.push(newline);
                        }
                    } else {
                        result.push(newline);
                    }
                }

                if (preserveBlankLines) {
                    // handle spaces after the last line
                    if (i === iz - 1) {
                        if (!stmt.body[i].trailingComments) {
                            generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                        }
                    }
                }
            }
        });

        result.push(addIndent('}'));
        return result;
    },

    BreakStatement: function (stmt, flags) {
        if (stmt.label) {
            return 'break ' + stmt.label.name + this.semicolon(flags);
        }
        return 'break' + this.semicolon(flags);
    },

    ContinueStatement: function (stmt, flags) {
        if (stmt.label) {
            return 'continue ' + stmt.label.name + this.semicolon(flags);
        }
        return 'continue' + this.semicolon(flags);
    },

    ClassBody: function (stmt, flags) {
        var result = [ '{', newline], that = this;

        withIndent(function (indent) {
            var i, iz;

            for (i = 0, iz = stmt.body.length; i < iz; ++i) {
                result.push(indent);
                result.push(that.generateExpression(stmt.body[i], Precedence.Sequence, E_TTT));
                if (i + 1 < iz) {
                    result.push(newline);
                }
            }
        });

        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
        }
        result.push(base);
        result.push('}');
        return result;
    },

    ClassDeclaration: function (stmt, flags) {
        var result, fragment;
        result  = ['class'];
        if (stmt.id) {
            result = join(result, this.generateExpression(stmt.id, Precedence.Sequence, E_TTT));
        }
        if (stmt.superClass) {
            fragment = join('extends', this.generateExpression(stmt.superClass, Precedence.Assignment, E_TTT));
            result = join(result, fragment);
        }
        result.push(space);
        result.push(this.generateStatement(stmt.body, S_TFFT));
        return result;
    },

    DirectiveStatement: function (stmt, flags) {
        if (extra.raw && stmt.raw) {
            return stmt.raw + this.semicolon(flags);
        }
        return escapeDirective(stmt.directive) + this.semicolon(flags);
    },

    DoWhileStatement: function (stmt, flags) {
        // Because `do 42 while (cond)` is Syntax Error. We need semicolon.
        var result = join('do', this.maybeBlock(stmt.body, S_TFFF));
        result = this.maybeBlockSuffix(stmt.body, result);
        return join(result, [
            'while' + space + '(',
            this.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
            ')' + this.semicolon(flags)
        ]);
    },

    CatchClause: function (stmt, flags) {
        var result, that = this;
        withIndent(function () {
            var guard;

            result = [
                'catch' + space + '(',
                that.generateExpression(stmt.param, Precedence.Sequence, E_TTT),
                ')'
            ];

            if (stmt.guard) {
                guard = that.generateExpression(stmt.guard, Precedence.Sequence, E_TTT);
                result.splice(2, 0, ' if ', guard);
            }
        });
        result.push(this.maybeBlock(stmt.body, S_TFFF));
        return result;
    },

    DebuggerStatement: function (stmt, flags) {
        return 'debugger' + this.semicolon(flags);
    },

    EmptyStatement: function (stmt, flags) {
        return ';';
    },

    ExportDefaultDeclaration: function (stmt, flags) {
        var result = [ 'export' ], bodyFlags;

        bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

        // export default HoistableDeclaration[Default]
        // export default AssignmentExpression[In] ;
        result = join(result, 'default');
        if (isStatement(stmt.declaration)) {
            result = join(result, this.generateStatement(stmt.declaration, bodyFlags));
        } else {
            result = join(result, this.generateExpression(stmt.declaration, Precedence.Assignment, E_TTT) + this.semicolon(flags));
        }
        return result;
    },

    ExportNamedDeclaration: function (stmt, flags) {
        var result = [ 'export' ], bodyFlags, that = this;

        bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

        // export VariableStatement
        // export Declaration[Default]
        if (stmt.declaration) {
            return join(result, this.generateStatement(stmt.declaration, bodyFlags));
        }

        // export ExportClause[NoReference] FromClause ;
        // export ExportClause ;
        if (stmt.specifiers) {
            if (stmt.specifiers.length === 0) {
                result = join(result, '{' + space + '}');
            } else if (stmt.specifiers[0].type === Syntax.ExportBatchSpecifier) {
                result = join(result, this.generateExpression(stmt.specifiers[0], Precedence.Sequence, E_TTT));
            } else {
                result = join(result, '{');
                withIndent(function (indent) {
                    var i, iz;
                    result.push(newline);
                    for (i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                        result.push(indent);
                        result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                        if (i + 1 < iz) {
                            result.push(',' + newline);
                        }
                    }
                });
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push(newline);
                }
                result.push(base + '}');
            }

            if (stmt.source) {
                result = join(result, [
                    'from' + space,
                    // ModuleSpecifier
                    this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                    this.semicolon(flags)
                ]);
            } else {
                result.push(this.semicolon(flags));
            }
        }
        return result;
    },

    ExportAllDeclaration: function (stmt, flags) {
        // export * FromClause ;
        return [
            'export' + space,
            '*' + space,
            'from' + space,
            // ModuleSpecifier
            this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
            this.semicolon(flags)
        ];
    },

    ExpressionStatement: function (stmt, flags) {
        var result, fragment;

        function isClassPrefixed(fragment) {
            var code;
            if (fragment.slice(0, 5) !== 'class') {
                return false;
            }
            code = fragment.charCodeAt(5);
            return code === 0x7B  /* '{' */ || isWhiteSpace(code) || isLineTerminator(code);
        }

        function isFunctionPrefixed(fragment) {
            var code;
            if (fragment.slice(0, 8) !== 'function') {
                return false;
            }
            code = fragment.charCodeAt(8);
            return code === 0x28 /* '(' */ || isWhiteSpace(code) || code === 0x2A  /* '*' */ || isLineTerminator(code);
        }

        function isAsyncPrefixed(fragment) {
            var code, i, iz;
            if (fragment.slice(0, 5) !== 'async') {
                return false;
            }
            if (!isWhiteSpace(fragment.charCodeAt(5))) {
                return false;
            }
            for (i = 6, iz = fragment.length; i < iz; ++i) {
                if (!isWhiteSpace(fragment.charCodeAt(i))) {
                    break;
                }
            }
            if (i === iz) {
                return false;
            }
            if (fragment.slice(i, i + 8) !== 'function') {
                return false;
            }
            code = fragment.charCodeAt(i + 8);
            return code === 0x28 /* '(' */ || isWhiteSpace(code) || code === 0x2A  /* '*' */ || isLineTerminator(code);
        }

        result = [this.generateExpression(stmt.expression, Precedence.Sequence, E_TTT)];
        // 12.4 '{', 'function', 'class' is not allowed in this position.
        // wrap expression with parentheses
        fragment = toSourceNodeWhenNeeded(result).toString();
        if (fragment.charCodeAt(0) === 0x7B  /* '{' */ ||  // ObjectExpression
                isClassPrefixed(fragment) ||
                isFunctionPrefixed(fragment) ||
                isAsyncPrefixed(fragment) ||
                (directive && (flags & F_DIRECTIVE_CTX) && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value === 'string')) {
            result = ['(', result, ')' + this.semicolon(flags)];
        } else {
            result.push(this.semicolon(flags));
        }
        return result;
    },

    ImportDeclaration: function (stmt, flags) {
        // ES6: 15.2.1 valid import declarations:
        //     - import ImportClause FromClause ;
        //     - import ModuleSpecifier ;
        var result, cursor, that = this;

        // If no ImportClause is present,
        // this should be `import ModuleSpecifier` so skip `from`
        // ModuleSpecifier is StringLiteral.
        if (stmt.specifiers.length === 0) {
            // import ModuleSpecifier ;
            return [
                'import',
                space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ];
        }

        // import ImportClause FromClause ;
        result = [
            'import'
        ];
        cursor = 0;

        // ImportedBinding
        if (stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier) {
            result = join(result, [
                    this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
            ]);
            ++cursor;
        }

        if (stmt.specifiers[cursor]) {
            if (cursor !== 0) {
                result.push(',');
            }

            if (stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier) {
                // NameSpaceImport
                result = join(result, [
                        space,
                        this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                ]);
            } else {
                // NamedImports
                result.push(space + '{');

                if ((stmt.specifiers.length - cursor) === 1) {
                    // import { ... } from "...";
                    result.push(space);
                    result.push(this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT));
                    result.push(space + '}' + space);
                } else {
                    // import {
                    //    ...,
                    //    ...,
                    // } from "...";
                    withIndent(function (indent) {
                        var i, iz;
                        result.push(newline);
                        for (i = cursor, iz = stmt.specifiers.length; i < iz; ++i) {
                            result.push(indent);
                            result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                            if (i + 1 < iz) {
                                result.push(',' + newline);
                            }
                        }
                    });
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                        result.push(newline);
                    }
                    result.push(base + '}' + space);
                }
            }
        }

        result = join(result, [
            'from' + space,
            // ModuleSpecifier
            this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
            this.semicolon(flags)
        ]);
        return result;
    },

    VariableDeclarator: function (stmt, flags) {
        var itemFlags = (flags & F_ALLOW_IN) ? E_TTT : E_FTT;
        if (stmt.init) {
            return [
                this.generateExpression(stmt.id, Precedence.Assignment, itemFlags),
                space,
                '=',
                space,
                this.generateExpression(stmt.init, Precedence.Assignment, itemFlags)
            ];
        }
        return this.generatePattern(stmt.id, Precedence.Assignment, itemFlags);
    },

    VariableDeclaration: function (stmt, flags) {
        // VariableDeclarator is typed as Statement,
        // but joined with comma (not LineTerminator).
        // So if comment is attached to target node, we should specialize.
        var result, i, iz, node, bodyFlags, that = this;

        result = [ stmt.kind ];

        bodyFlags = (flags & F_ALLOW_IN) ? S_TFFF : S_FFFF;

        function block() {
            node = stmt.declarations[0];
            if (extra.comment && node.leadingComments) {
                result.push('\n');
                result.push(addIndent(that.generateStatement(node, bodyFlags)));
            } else {
                result.push(noEmptySpace());
                result.push(that.generateStatement(node, bodyFlags));
            }

            for (i = 1, iz = stmt.declarations.length; i < iz; ++i) {
                node = stmt.declarations[i];
                if (extra.comment && node.leadingComments) {
                    result.push(',' + newline);
                    result.push(addIndent(that.generateStatement(node, bodyFlags)));
                } else {
                    result.push(',' + space);
                    result.push(that.generateStatement(node, bodyFlags));
                }
            }
        }

        if (stmt.declarations.length > 1) {
            withIndent(block);
        } else {
            block();
        }

        result.push(this.semicolon(flags));

        return result;
    },

    ThrowStatement: function (stmt, flags) {
        return [join(
            'throw',
            this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
        ), this.semicolon(flags)];
    },

    TryStatement: function (stmt, flags) {
        var result, i, iz, guardedHandlers;

        result = ['try', this.maybeBlock(stmt.block, S_TFFF)];
        result = this.maybeBlockSuffix(stmt.block, result);

        if (stmt.handlers) {
            // old interface
            for (i = 0, iz = stmt.handlers.length; i < iz; ++i) {
                result = join(result, this.generateStatement(stmt.handlers[i], S_TFFF));
                if (stmt.finalizer || i + 1 !== iz) {
                    result = this.maybeBlockSuffix(stmt.handlers[i].body, result);
                }
            }
        } else {
            guardedHandlers = stmt.guardedHandlers || [];

            for (i = 0, iz = guardedHandlers.length; i < iz; ++i) {
                result = join(result, this.generateStatement(guardedHandlers[i], S_TFFF));
                if (stmt.finalizer || i + 1 !== iz) {
                    result = this.maybeBlockSuffix(guardedHandlers[i].body, result);
                }
            }

            // new interface
            if (stmt.handler) {
                if (isArray(stmt.handler)) {
                    for (i = 0, iz = stmt.handler.length; i < iz; ++i) {
                        result = join(result, this.generateStatement(stmt.handler[i], S_TFFF));
                        if (stmt.finalizer || i + 1 !== iz) {
                            result = this.maybeBlockSuffix(stmt.handler[i].body, result);
                        }
                    }
                } else {
                    result = join(result, this.generateStatement(stmt.handler, S_TFFF));
                    if (stmt.finalizer) {
                        result = this.maybeBlockSuffix(stmt.handler.body, result);
                    }
                }
            }
        }
        if (stmt.finalizer) {
            result = join(result, ['finally', this.maybeBlock(stmt.finalizer, S_TFFF)]);
        }
        return result;
    },

    SwitchStatement: function (stmt, flags) {
        var result, fragment, i, iz, bodyFlags, that = this;
        withIndent(function () {
            result = [
                'switch' + space + '(',
                that.generateExpression(stmt.discriminant, Precedence.Sequence, E_TTT),
                ')' + space + '{' + newline
            ];
        });
        if (stmt.cases) {
            bodyFlags = S_TFFF;
            for (i = 0, iz = stmt.cases.length; i < iz; ++i) {
                if (i === iz - 1) {
                    bodyFlags |= F_SEMICOLON_OPT;
                }
                fragment = addIndent(this.generateStatement(stmt.cases[i], bodyFlags));
                result.push(fragment);
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    result.push(newline);
                }
            }
        }
        result.push(addIndent('}'));
        return result;
    },

    SwitchCase: function (stmt, flags) {
        var result, fragment, i, iz, bodyFlags, that = this;
        withIndent(function () {
            if (stmt.test) {
                result = [
                    join('case', that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)),
                    ':'
                ];
            } else {
                result = ['default:'];
            }

            i = 0;
            iz = stmt.consequent.length;
            if (iz && stmt.consequent[0].type === Syntax.BlockStatement) {
                fragment = that.maybeBlock(stmt.consequent[0], S_TFFF);
                result.push(fragment);
                i = 1;
            }

            if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }

            bodyFlags = S_TFFF;
            for (; i < iz; ++i) {
                if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
                    bodyFlags |= F_SEMICOLON_OPT;
                }
                fragment = addIndent(that.generateStatement(stmt.consequent[i], bodyFlags));
                result.push(fragment);
                if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    result.push(newline);
                }
            }
        });
        return result;
    },

    IfStatement: function (stmt, flags) {
        var result, bodyFlags, semicolonOptional, that = this;
        withIndent(function () {
            result = [
                'if' + space + '(',
                that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                ')'
            ];
        });
        semicolonOptional = flags & F_SEMICOLON_OPT;
        bodyFlags = S_TFFF;
        if (semicolonOptional) {
            bodyFlags |= F_SEMICOLON_OPT;
        }
        if (stmt.alternate) {
            result.push(this.maybeBlock(stmt.consequent, S_TFFF));
            result = this.maybeBlockSuffix(stmt.consequent, result);
            if (stmt.alternate.type === Syntax.IfStatement) {
                result = join(result, ['else ', this.generateStatement(stmt.alternate, bodyFlags)]);
            } else {
                result = join(result, join('else', this.maybeBlock(stmt.alternate, bodyFlags)));
            }
        } else {
            result.push(this.maybeBlock(stmt.consequent, bodyFlags));
        }
        return result;
    },

    ForStatement: function (stmt, flags) {
        var result, that = this;
        withIndent(function () {
            result = ['for' + space + '('];
            if (stmt.init) {
                if (stmt.init.type === Syntax.VariableDeclaration) {
                    result.push(that.generateStatement(stmt.init, S_FFFF));
                } else {
                    // F_ALLOW_IN becomes false.
                    result.push(that.generateExpression(stmt.init, Precedence.Sequence, E_FTT));
                    result.push(';');
                }
            } else {
                result.push(';');
            }

            if (stmt.test) {
                result.push(space);
                result.push(that.generateExpression(stmt.test, Precedence.Sequence, E_TTT));
                result.push(';');
            } else {
                result.push(';');
            }

            if (stmt.update) {
                result.push(space);
                result.push(that.generateExpression(stmt.update, Precedence.Sequence, E_TTT));
                result.push(')');
            } else {
                result.push(')');
            }
        });

        result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
        return result;
    },

    ForInStatement: function (stmt, flags) {
        return this.generateIterationForStatement('in', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
    },

    ForOfStatement: function (stmt, flags) {
        return this.generateIterationForStatement('of', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
    },

    LabeledStatement: function (stmt, flags) {
        return [stmt.label.name + ':', this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)];
    },

    Program: function (stmt, flags) {
        var result, fragment, i, iz, bodyFlags;
        iz = stmt.body.length;
        result = [safeConcatenation && iz > 0 ? '\n' : ''];
        bodyFlags = S_TFTF;
        for (i = 0; i < iz; ++i) {
            if (!safeConcatenation && i === iz - 1) {
                bodyFlags |= F_SEMICOLON_OPT;
            }

            if (preserveBlankLines) {
                // handle spaces before the first line
                if (i === 0) {
                    if (!stmt.body[0].leadingComments) {
                        generateBlankLines(stmt.range[0], stmt.body[i].range[0], result);
                    }
                }

                // handle spaces between lines
                if (i > 0) {
                    if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
                        generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                    }
                }
            }

            fragment = addIndent(this.generateStatement(stmt.body[i], bodyFlags));
            result.push(fragment);
            if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                if (preserveBlankLines) {
                    if (!stmt.body[i + 1].leadingComments) {
                        result.push(newline);
                    }
                } else {
                    result.push(newline);
                }
            }

            if (preserveBlankLines) {
                // handle spaces after the last line
                if (i === iz - 1) {
                    if (!stmt.body[i].trailingComments) {
                        generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                    }
                }
            }
        }
        return result;
    },

    FunctionDeclaration: function (stmt, flags) {
        return [
            generateAsyncPrefix(stmt, true),
            'function',
            generateStarSuffix(stmt) || noEmptySpace(),
            stmt.id ? generateIdentifier(stmt.id) : '',
            this.generateFunctionBody(stmt)
        ];
    },

    ReturnStatement: function (stmt, flags) {
        if (stmt.argument) {
            return [join(
                'return',
                this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
            ), this.semicolon(flags)];
        }
        return ['return' + this.semicolon(flags)];
    },

    WhileStatement: function (stmt, flags) {
        var result, that = this;
        withIndent(function () {
            result = [
                'while' + space + '(',
                that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                ')'
            ];
        });
        result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
        return result;
    },

    WithStatement: function (stmt, flags) {
        var result, that = this;
        withIndent(function () {
            result = [
                'with' + space + '(',
                that.generateExpression(stmt.object, Precedence.Sequence, E_TTT),
                ')'
            ];
        });
        result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
        return result;
    }

};

merge(CodeGenerator.prototype, CodeGenerator.Statement);

// Expressions.

CodeGenerator.Expression = {

    SequenceExpression: function (expr, precedence, flags) {
        var result, i, iz;
        if (Precedence.Sequence < precedence) {
            flags |= F_ALLOW_IN;
        }
        result = [];
        for (i = 0, iz = expr.expressions.length; i < iz; ++i) {
            result.push(this.generateExpression(expr.expressions[i], Precedence.Assignment, flags));
            if (i + 1 < iz) {
                result.push(',' + space);
            }
        }
        return parenthesize(result, Precedence.Sequence, precedence);
    },

    AssignmentExpression: function (expr, precedence, flags) {
        return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
    },

    ArrowFunctionExpression: function (expr, precedence, flags) {
        return parenthesize(this.generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
    },

    ConditionalExpression: function (expr, precedence, flags) {
        if (Precedence.Conditional < precedence) {
            flags |= F_ALLOW_IN;
        }
        return parenthesize(
            [
                this.generateExpression(expr.test, Precedence.LogicalOR, flags),
                space + '?' + space,
                this.generateExpression(expr.consequent, Precedence.Assignment, flags),
                space + ':' + space,
                this.generateExpression(expr.alternate, Precedence.Assignment, flags)
            ],
            Precedence.Conditional,
            precedence
        );
    },

    LogicalExpression: function (expr, precedence, flags) {
        return this.BinaryExpression(expr, precedence, flags);
    },

    BinaryExpression: function (expr, precedence, flags) {
        var result, currentPrecedence, fragment, leftSource;
        currentPrecedence = BinaryPrecedence[expr.operator];

        if (currentPrecedence < precedence) {
            flags |= F_ALLOW_IN;
        }

        fragment = this.generateExpression(expr.left, currentPrecedence, flags);

        leftSource = fragment.toString();

        if (leftSource.charCodeAt(leftSource.length - 1) === 0x2F /* / */ && isIdentifierPartES5(expr.operator.charCodeAt(0))) {
            result = [fragment, noEmptySpace(), expr.operator];
        } else {
            result = join(fragment, expr.operator);
        }

        fragment = this.generateExpression(expr.right, currentPrecedence + 1, flags);

        if (expr.operator === '/' && fragment.toString().charAt(0) === '/' ||
        expr.operator.slice(-1) === '<' && fragment.toString().slice(0, 3) === '!--') {
            // If '/' concats with '/' or `<` concats with `!--`, it is interpreted as comment start
            result.push(noEmptySpace());
            result.push(fragment);
        } else {
            result = join(result, fragment);
        }

        if (expr.operator === 'in' && !(flags & F_ALLOW_IN)) {
            return ['(', result, ')'];
        }
        return parenthesize(result, currentPrecedence, precedence);
    },

    CallExpression: function (expr, precedence, flags) {
        var result, i, iz;
        // F_ALLOW_UNPARATH_NEW becomes false.
        result = [this.generateExpression(expr.callee, Precedence.Call, E_TTF)];
        result.push('(');
        for (i = 0, iz = expr['arguments'].length; i < iz; ++i) {
            result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
            if (i + 1 < iz) {
                result.push(',' + space);
            }
        }
        result.push(')');

        if (!(flags & F_ALLOW_CALL)) {
            return ['(', result, ')'];
        }
        return parenthesize(result, Precedence.Call, precedence);
    },

    NewExpression: function (expr, precedence, flags) {
        var result, length, i, iz, itemFlags;
        length = expr['arguments'].length;

        // F_ALLOW_CALL becomes false.
        // F_ALLOW_UNPARATH_NEW may become false.
        itemFlags = (flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0) ? E_TFT : E_TFF;

        result = join(
            'new',
            this.generateExpression(expr.callee, Precedence.New, itemFlags)
        );

        if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
            result.push('(');
            for (i = 0, iz = length; i < iz; ++i) {
                result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
                if (i + 1 < iz) {
                    result.push(',' + space);
                }
            }
            result.push(')');
        }

        return parenthesize(result, Precedence.New, precedence);
    },

    MemberExpression: function (expr, precedence, flags) {
        var result, fragment;

        // F_ALLOW_UNPARATH_NEW becomes false.
        result = [this.generateExpression(expr.object, Precedence.Call, (flags & F_ALLOW_CALL) ? E_TTF : E_TFF)];

        if (expr.computed) {
            result.push('[');
            result.push(this.generateExpression(expr.property, Precedence.Sequence, flags & F_ALLOW_CALL ? E_TTT : E_TFT));
            result.push(']');
        } else {
            if (expr.object.type === Syntax.Literal && typeof expr.object.value === 'number') {
                fragment = toSourceNodeWhenNeeded(result).toString();
                // When the following conditions are all true,
                //   1. No floating point
                //   2. Don't have exponents
                //   3. The last character is a decimal digit
                //   4. Not hexadecimal OR octal number literal
                // we should add a floating point.
                if (
                        fragment.indexOf('.') < 0 &&
                        !/[eExX]/.test(fragment) &&
                        isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) &&
                        !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)  // '0'
                        ) {
                    result.push('.');
                }
            }
            result.push('.');
            result.push(generateIdentifier(expr.property));
        }

        return parenthesize(result, Precedence.Member, precedence);
    },

    MetaProperty: function (expr, precedence, flags) {
        var result;
        result = [];
        result.push(expr.meta);
        result.push('.');
        result.push(expr.property);
        return parenthesize(result, Precedence.Member, precedence);
    },

    UnaryExpression: function (expr, precedence, flags) {
        var result, fragment, rightCharCode, leftSource, leftCharCode;
        fragment = this.generateExpression(expr.argument, Precedence.Unary, E_TTT);

        if (space === '') {
            result = join(expr.operator, fragment);
        } else {
            result = [expr.operator];
            if (expr.operator.length > 2) {
                // delete, void, typeof
                // get `typeof []`, not `typeof[]`
                result = join(result, fragment);
            } else {
                // Prevent inserting spaces between operator and argument if it is unnecessary
                // like, `!cond`
                leftSource = toSourceNodeWhenNeeded(result).toString();
                leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
                rightCharCode = fragment.toString().charCodeAt(0);

                if (((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode) ||
                        (isIdentifierPartES5(leftCharCode) && isIdentifierPartES5(rightCharCode))) {
                    result.push(noEmptySpace());
                    result.push(fragment);
                } else {
                    result.push(fragment);
                }
            }
        }
        return parenthesize(result, Precedence.Unary, precedence);
    },

    YieldExpression: function (expr, precedence, flags) {
        var result;
        if (expr.delegate) {
            result = 'yield*';
        } else {
            result = 'yield';
        }
        if (expr.argument) {
            result = join(
                result,
                this.generateExpression(expr.argument, Precedence.Yield, E_TTT)
            );
        }
        return parenthesize(result, Precedence.Yield, precedence);
    },

    AwaitExpression: function (expr, precedence, flags) {
        var result = join(
            expr.all ? 'await*' : 'await',
            this.generateExpression(expr.argument, Precedence.Await, E_TTT)
        );
        return parenthesize(result, Precedence.Await, precedence);
    },

    UpdateExpression: function (expr, precedence, flags) {
        if (expr.prefix) {
            return parenthesize(
                [
                    expr.operator,
                    this.generateExpression(expr.argument, Precedence.Unary, E_TTT)
                ],
                Precedence.Unary,
                precedence
            );
        }
        return parenthesize(
            [
                this.generateExpression(expr.argument, Precedence.Postfix, E_TTT),
                expr.operator
            ],
            Precedence.Postfix,
            precedence
        );
    },

    FunctionExpression: function (expr, precedence, flags) {
        var result = [
            generateAsyncPrefix(expr, true),
            'function'
        ];
        if (expr.id) {
            result.push(generateStarSuffix(expr) || noEmptySpace());
            result.push(generateIdentifier(expr.id));
        } else {
            result.push(generateStarSuffix(expr) || space);
        }
        result.push(this.generateFunctionBody(expr));
        return result;
    },

    ArrayPattern: function (expr, precedence, flags) {
        return this.ArrayExpression(expr, precedence, flags, true);
    },

    ArrayExpression: function (expr, precedence, flags, isPattern) {
        var result, multiline, that = this;
        if (!expr.elements.length) {
            return '[]';
        }
        multiline = isPattern ? false : expr.elements.length > 1;
        result = ['[', multiline ? newline : ''];
        withIndent(function (indent) {
            var i, iz;
            for (i = 0, iz = expr.elements.length; i < iz; ++i) {
                if (!expr.elements[i]) {
                    if (multiline) {
                        result.push(indent);
                    }
                    if (i + 1 === iz) {
                        result.push(',');
                    }
                } else {
                    result.push(multiline ? indent : '');
                    result.push(that.generateExpression(expr.elements[i], Precedence.Assignment, E_TTT));
                }
                if (i + 1 < iz) {
                    result.push(',' + (multiline ? newline : space));
                }
            }
        });
        if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
        }
        result.push(multiline ? base : '');
        result.push(']');
        return result;
    },

    RestElement: function(expr, precedence, flags) {
        return '...' + this.generatePattern(expr.argument);
    },

    ClassExpression: function (expr, precedence, flags) {
        var result, fragment;
        result = ['class'];
        if (expr.id) {
            result = join(result, this.generateExpression(expr.id, Precedence.Sequence, E_TTT));
        }
        if (expr.superClass) {
            fragment = join('extends', this.generateExpression(expr.superClass, Precedence.Assignment, E_TTT));
            result = join(result, fragment);
        }
        result.push(space);
        result.push(this.generateStatement(expr.body, S_TFFT));
        return result;
    },

    MethodDefinition: function (expr, precedence, flags) {
        var result, fragment;
        if (expr['static']) {
            result = ['static' + space];
        } else {
            result = [];
        }
        if (expr.kind === 'get' || expr.kind === 'set') {
            fragment = [
                join(expr.kind, this.generatePropertyKey(expr.key, expr.computed)),
                this.generateFunctionBody(expr.value)
            ];
        } else {
            fragment = [
                generateMethodPrefix(expr),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(expr.value)
            ];
        }
        return join(result, fragment);
    },

    Property: function (expr, precedence, flags) {
        if (expr.kind === 'get' || expr.kind === 'set') {
            return [
                expr.kind, noEmptySpace(),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(expr.value)
            ];
        }

        if (expr.shorthand) {
            return this.generatePropertyKey(expr.key, expr.computed);
        }

        if (expr.method) {
            return [
                generateMethodPrefix(expr),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(expr.value)
            ];
        }

        return [
            this.generatePropertyKey(expr.key, expr.computed),
            ':' + space,
            this.generateExpression(expr.value, Precedence.Assignment, E_TTT)
        ];
    },

    ObjectExpression: function (expr, precedence, flags) {
        var multiline, result, fragment, that = this;

        if (!expr.properties.length) {
            return '{}';
        }
        multiline = expr.properties.length > 1;

        withIndent(function () {
            fragment = that.generateExpression(expr.properties[0], Precedence.Sequence, E_TTT);
        });

        if (!multiline) {
            // issues 4
            // Do not transform from
            //   dejavu.Class.declare({
            //       method2: function () {}
            //   });
            // to
            //   dejavu.Class.declare({method2: function () {
            //       }});
            if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                return [ '{', space, fragment, space, '}' ];
            }
        }

        withIndent(function (indent) {
            var i, iz;
            result = [ '{', newline, indent, fragment ];

            if (multiline) {
                result.push(',' + newline);
                for (i = 1, iz = expr.properties.length; i < iz; ++i) {
                    result.push(indent);
                    result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) {
                        result.push(',' + newline);
                    }
                }
            }
        });

        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
        }
        result.push(base);
        result.push('}');
        return result;
    },

    AssignmentPattern: function(expr, precedence, flags) {
        return this.generateAssignment(expr.left, expr.right, '=', precedence, flags);
    },

    ObjectPattern: function (expr, precedence, flags) {
        var result, i, iz, multiline, property, that = this;
        if (!expr.properties.length) {
            return '{}';
        }

        multiline = false;
        if (expr.properties.length === 1) {
            property = expr.properties[0];
            if (property.value.type !== Syntax.Identifier) {
                multiline = true;
            }
        } else {
            for (i = 0, iz = expr.properties.length; i < iz; ++i) {
                property = expr.properties[i];
                if (!property.shorthand) {
                    multiline = true;
                    break;
                }
            }
        }
        result = ['{', multiline ? newline : '' ];

        withIndent(function (indent) {
            var i, iz;
            for (i = 0, iz = expr.properties.length; i < iz; ++i) {
                result.push(multiline ? indent : '');
                result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                if (i + 1 < iz) {
                    result.push(',' + (multiline ? newline : space));
                }
            }
        });

        if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
        }
        result.push(multiline ? base : '');
        result.push('}');
        return result;
    },

    ThisExpression: function (expr, precedence, flags) {
        return 'this';
    },

    Super: function (expr, precedence, flags) {
        return 'super';
    },

    Identifier: function (expr, precedence, flags) {
        return generateIdentifier(expr);
    },

    ImportDefaultSpecifier: function (expr, precedence, flags) {
        return generateIdentifier(expr.id || expr.local);
    },

    ImportNamespaceSpecifier: function (expr, precedence, flags) {
        var result = ['*'];
        var id = expr.id || expr.local;
        if (id) {
            result.push(space + 'as' + noEmptySpace() + generateIdentifier(id));
        }
        return result;
    },

    ImportSpecifier: function (expr, precedence, flags) {
        var imported = expr.imported;
        var result = [ imported.name ];
        var local = expr.local;
        if (local && local.name !== imported.name) {
            result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(local));
        }
        return result;
    },

    ExportSpecifier: function (expr, precedence, flags) {
        var local = expr.local;
        var result = [ local.name ];
        var exported = expr.exported;
        if (exported && exported.name !== local.name) {
            result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(exported));
        }
        return result;
    },

    Literal: function (expr, precedence, flags) {
        var raw;
        if (expr.hasOwnProperty('raw') && parse$1 && extra.raw) {
            try {
                raw = parse$1(expr.raw).body[0].expression;
                if (raw.type === Syntax.Literal) {
                    if (raw.value === expr.value) {
                        return expr.raw;
                    }
                }
            } catch (e) {
                // not use raw property
            }
        }

        if (expr.value === null) {
            return 'null';
        }

        if (typeof expr.value === 'string') {
            return escapeString(expr.value);
        }

        if (typeof expr.value === 'number') {
            return generateNumber(expr.value);
        }

        if (typeof expr.value === 'boolean') {
            return expr.value ? 'true' : 'false';
        }

        return generateRegExp(expr.value);
    },

    GeneratorExpression: function (expr, precedence, flags) {
        return this.ComprehensionExpression(expr, precedence, flags);
    },

    ComprehensionExpression: function (expr, precedence, flags) {
        // GeneratorExpression should be parenthesized with (...), ComprehensionExpression with [...]
        // Due to https://bugzilla.mozilla.org/show_bug.cgi?id=883468 position of expr.body can differ in Spidermonkey and ES6

        var result, i, iz, fragment, that = this;
        result = (expr.type === Syntax.GeneratorExpression) ? ['('] : ['['];

        if (extra.moz.comprehensionExpressionStartsWithAssignment) {
            fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
            result.push(fragment);
        }

        if (expr.blocks) {
            withIndent(function () {
                for (i = 0, iz = expr.blocks.length; i < iz; ++i) {
                    fragment = that.generateExpression(expr.blocks[i], Precedence.Sequence, E_TTT);
                    if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
                        result = join(result, fragment);
                    } else {
                        result.push(fragment);
                    }
                }
            });
        }

        if (expr.filter) {
            result = join(result, 'if' + space);
            fragment = this.generateExpression(expr.filter, Precedence.Sequence, E_TTT);
            result = join(result, [ '(', fragment, ')' ]);
        }

        if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
            fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);

            result = join(result, fragment);
        }

        result.push((expr.type === Syntax.GeneratorExpression) ? ')' : ']');
        return result;
    },

    ComprehensionBlock: function (expr, precedence, flags) {
        var fragment;
        if (expr.left.type === Syntax.VariableDeclaration) {
            fragment = [
                expr.left.kind, noEmptySpace(),
                this.generateStatement(expr.left.declarations[0], S_FFFF)
            ];
        } else {
            fragment = this.generateExpression(expr.left, Precedence.Call, E_TTT);
        }

        fragment = join(fragment, expr.of ? 'of' : 'in');
        fragment = join(fragment, this.generateExpression(expr.right, Precedence.Sequence, E_TTT));

        return [ 'for' + space + '(', fragment, ')' ];
    },

    SpreadElement: function (expr, precedence, flags) {
        return [
            '...',
            this.generateExpression(expr.argument, Precedence.Assignment, E_TTT)
        ];
    },

    TaggedTemplateExpression: function (expr, precedence, flags) {
        var itemFlags = E_TTF;
        if (!(flags & F_ALLOW_CALL)) {
            itemFlags = E_TFF;
        }
        var result = [
            this.generateExpression(expr.tag, Precedence.Call, itemFlags),
            this.generateExpression(expr.quasi, Precedence.Primary, E_FFT)
        ];
        return parenthesize(result, Precedence.TaggedTemplate, precedence);
    },

    TemplateElement: function (expr, precedence, flags) {
        // Don't use "cooked". Since tagged template can use raw template
        // representation. So if we do so, it breaks the script semantics.
        return expr.value.raw;
    },

    TemplateLiteral: function (expr, precedence, flags) {
        var result, i, iz;
        result = [ '`' ];
        for (i = 0, iz = expr.quasis.length; i < iz; ++i) {
            result.push(this.generateExpression(expr.quasis[i], Precedence.Primary, E_TTT));
            if (i + 1 < iz) {
                result.push('${' + space);
                result.push(this.generateExpression(expr.expressions[i], Precedence.Sequence, E_TTT));
                result.push(space + '}');
            }
        }
        result.push('`');
        return result;
    },

    ModuleSpecifier: function (expr, precedence, flags) {
        return this.Literal(expr, precedence, flags);
    }

};

merge(CodeGenerator.prototype, CodeGenerator.Expression);

CodeGenerator.prototype.generateExpression = function (expr, precedence, flags) {
    var result, type;

    type = expr.type || Syntax.Property;

    if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) {
        return generateVerbatim(expr, precedence);
    }

    result = this[type](expr, precedence, flags);


    if (extra.comment) {
        result = addComments(expr, result);
    }
    return toSourceNodeWhenNeeded(result, expr);
};

CodeGenerator.prototype.generateStatement = function (stmt, flags) {
    var result,
        fragment;

    result = this[stmt.type](stmt, flags);

    // Attach comments

    if (extra.comment) {
        result = addComments(stmt, result);
    }

    fragment = toSourceNodeWhenNeeded(result).toString();
    if (stmt.type === Syntax.Program && !safeConcatenation && newline === '' &&  fragment.charAt(fragment.length - 1) === '\n') {
        result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, '') : fragment.replace(/\s+$/, '');
    }

    return toSourceNodeWhenNeeded(result, stmt);
};

function generateInternal(node) {
    var codegen;

    codegen = new CodeGenerator();
    if (isStatement(node)) {
        return codegen.generateStatement(node, S_TFFF);
    }

    if (isExpression(node)) {
        return codegen.generateExpression(node, Precedence.Sequence, E_TTT);
    }

    throw new Error('Unknown node type: ' + node.type);
}

function generate(node, options) {
    var defaultOptions = getDefaultOptions(), result, pair;

    if (options != null) {
        // Obsolete options
        //
        //   `options.indent`
        //   `options.base`
        //
        // Instead of them, we can use `option.format.indent`.
        if (typeof options.indent === 'string') {
            defaultOptions.format.indent.style = options.indent;
        }
        if (typeof options.base === 'number') {
            defaultOptions.format.indent.base = options.base;
        }
        options = updateDeeply(defaultOptions, options);
        indent = options.format.indent.style;
        if (typeof options.base === 'string') {
            base = options.base;
        } else {
            base = stringRepeat(indent, options.format.indent.base);
        }
    } else {
        options = defaultOptions;
        indent = options.format.indent.style;
        base = stringRepeat(indent, options.format.indent.base);
    }
    json = options.format.json;
    renumber = options.format.renumber;
    hexadecimal = json ? false : options.format.hexadecimal;
    quotes = json ? 'double' : options.format.quotes;
    escapeless = options.format.escapeless;
    newline = options.format.newline;
    space = options.format.space;
    if (options.format.compact) {
        newline = space = indent = base = '';
    }
    parentheses = options.format.parentheses;
    semicolons = options.format.semicolons;
    safeConcatenation = options.format.safeConcatenation;
    directive = options.directive;
    parse$1 = json ? null : options.parse;
    sourceMap = options.sourceMap;
    sourceCode = options.sourceCode;
    preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null;
    extra = options;

    if (sourceMap) {
        if (!exports.browser) {
            // We assume environment is node.js
            // And prevent from including source-map by browserify
            SourceNode = require('source-map').SourceNode;
        } else {
            SourceNode = global.sourceMap.SourceNode;
        }
    }

    result = generateInternal(node);

    if (!sourceMap) {
        pair = {code: result.toString(), map: null};
        return options.sourceMapWithCode ? pair : pair.code;
    }


    pair = result.toStringWithSourceMap({
        file: options.file,
        sourceRoot: options.sourceMapRoot
    });

    if (options.sourceContent) {
        pair.map.setSourceContent(options.sourceMap,
                                  options.sourceContent);
    }

    if (options.sourceMapWithCode) {
        return pair;
    }

    return pair.map.toString();
}

Object.freeze(Precedence);

var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o};
var $V0=[1,82];
var $V1=[1,58];
var $V2=[1,35];
var $V3=[1,62];
var $V4=[1,36];
var $V5=[1,23];
var $V6=[1,24];
var $V7=[1,25];
var $V8=[1,77];
var $V9=[1,78];
var $Va=[1,79];
var $Vb=[1,80];
var $Vc=[1,81];
var $Vd=[1,64];
var $Ve=[1,65];
var $Vf=[1,66];
var $Vg=[1,67];
var $Vh=[1,61];
var $Vi=[1,63];
var $Vj=[1,56];
var $Vk=[1,57];
var $Vl=[1,52];
var $Vm=[1,53];
var $Vn=[1,54];
var $Vo=[1,55];
var $Vp=[1,71];
var $Vq=[1,70];
var $Vr=[1,33];
var $Vs=[1,34];
var $Vt=[1,69];
var $Vu=[1,72];
var $Vv=[1,94];
var $Vw=[1,96];
var $Vx=[1,87];
var $Vy=[1,9];
var $Vz=[1,59];
var $VA=[1,90];
var $VB=[1,89];
var $VC=[1,91];
var $VD=[1,92];
var $VE=[1,93];
var $VF=[1,73];
var $VG=[1,10];
var $VH=[1,22];
var $VI=[1,84];
var $VJ=[1,4,6,7,74];
var $VK=[1,101];
var $VL=[1,102];
var $VM=[1,104];
var $VN=[1,108];
var $VO=[1,110];
var $VP=[1,4,6,7,34,49,50,54,57,66,72,73,74,75,76,78,81,82,83,84,88,90,91,104,108,112,132,133,134,135,136,137,138,139,140,141,142,143,147,148,149,150,151,152,154,155,156];
var $VQ=[1,111];
var $VR=[1,120];
var $VS=[1,121];
var $VT=[1,131];
var $VU=[1,132];
var $VV=[1,119];
var $VW=[1,122];
var $VX=[1,123];
var $VY=[1,124];
var $VZ=[1,125];
var $V_=[1,126];
var $V$=[1,127];
var $V01=[1,128];
var $V11=[1,129];
var $V21=[1,130];
var $V31=[1,133];
var $V41=[1,113];
var $V51=[1,114];
var $V61=[1,115];
var $V71=[1,116];
var $V81=[1,118];
var $V91=[1,4,6,7,34,49,50,54,57,66,72,73,74,75,76,78,81,82,83,84,88,91,104,108,112,132,133,134,135,138,139,140,141,142,143,147,148,149,150,151,152,154,155,156];
var $Va1=[1,144];
var $Vb1=[2,16];
var $Vc1=[1,148];
var $Vd1=[2,17];
var $Ve1=[1,157];
var $Vf1=[2,25];
var $Vg1=[2,164];
var $Vh1=[1,168];
var $Vi1=[1,169];
var $Vj1=[1,4,6,7,34,49,50,54,57,66,72,73,74,75,76,78,81,82,83,84,86,88,90,91,104,108,112,132,133,134,135,136,137,138,139,140,141,142,143,147,148,149,150,151,152,154,155,156];
var $Vk1=[1,178];
var $Vl1=[1,183];
var $Vm1=[4,66,72,73,75,78,79,80,81,82,93,101,104,108,112];
var $Vn1=[1,204];
var $Vo1=[1,205];
var $Vp1=[1,4,6,7,34,49,50,66,72,73,74,75,76,78,81,82,83,84,88,90,91,104,108,112,149,155];
var $Vq1=[1,268];
var $Vr1=[1,269];
var $Vs1=[1,270];
var $Vt1=[2,79];
var $Vu1=[1,290];
var $Vv1=[1,291];
var $Vw1=[1,292];
var $Vx1=[1,4,6,7,34,49,50,54,57,66,72,73,74,75,76,78,81,82,83,84,88,90,91,93,101,104,108,112,132,133,134,135,136,137,138,139,140,141,142,143,147,148,149,150,151,152,154,155,156];
var $Vy1=[4,66,91];
var $Vz1=[4,66,88,155];
var $VA1=[54,57,132,133,134,135,136,137,138,139,140,141,142,143,147,148,150,151,152];
var $VB1=[1,4,6,7,34,49,50,54,66,72,73,74,75,76,78,81,82,83,84,88,90,91,104,108,112,149,155];
var $VC1=[1,4,6,7,34,49,50,54,66,72,73,74,75,76,78,81,82,83,84,88,90,91,104,108,112,132,133,134,135,136,137,138,139,140,141,142,147,149,155];
var $VD1=[113,114];
var $VE1=[4,66,112];
var $VF1=[1,314];
var $VG1=[54,57,132,133,134,135,136,137,138,139,140,141,142,143,147,148,150,151,152,154,156];
var $VH1=[2,144];
var $VI1=[1,315];
var $VJ1=[2,145];
var $VK1=[1,316];
var $VL1=[33,35,45,52,53,55,56,58,59,60,61,62,63,64,87,90,95,96,98,103,106,110,116,118,136,137,144,145,146,157,179];
var $VM1=[1,4,6,7,34,49,50,54,66,72,73,74,75,76,78,81,82,83,84,88,90,91,104,108,112,132,133,134,135,136,137,138,139,140,141,147,149,155];
var $VN1=[1,4,6,7,34,49,50,54,66,72,73,74,75,76,78,81,82,83,84,88,90,91,104,108,112,132,133,149,155];
var $VO1=[1,4,6,7,34,49,50,54,57,66,72,73,74,75,76,78,81,82,83,84,88,90,91,104,108,112,132,133,134,135,136,137,138,139,140,141,142,147,149,155];
var $VP1=[4,66,104];
var $VQ1=[2,116];
var $VR1=[2,117];
var $VS1=[4,66,108];
var $VT1=[1,337];
var $VU1=[4,66,168];
var $VV1=[1,4,6,7,34,49,50,54,66,72,73,74,75,76,78,81,82,83,84,88,90,91,104,108,112,132,133,134,149,155];
var $VW1=[1,4,6,7,34,49,50,54,66,72,73,74,75,76,78,81,82,83,84,88,90,91,104,108,112,132,133,134,135,136,137,147,149,155];
var $VX1=[4,66,177];
var $VY1=[1,357];
var $VZ1=[4,91];
var $V_1=[72,73];
var $V$1=[2,150];
var $V02=[2,151];
var $V12=[2,122];
var $V22=[2,123];
var $V32=[4,66,104,108,112];
var $V42=[2,131];
var $V52=[2,134];
var $V62=[2,137];
var $V72=[2,140];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Program":3,"ENDLN":4,"Lines":5,";":6,"EOF":7,"Line":8,"Super":9,"ImportDeclaration":10,"ExportDeclaration":11,"Statement":12,"Expression":13,"AssignmentExpression":14,"Number":15,"String":16,"FunctionExpression":17,"Identifier":18,"MemberExpression":19,"ObjectExpression":20,"ArrayExpression":21,"ThisExpression":22,"CallExpression":23,"Operation":24,"ComparativeExpression":25,"Continuation":26,"WrappedExpression":27,"ClassExpression":28,"ValueExpression":29,"Pattern":30,"ArrayPattern":31,"ObjectPattern":32,"(":33,")":34,"NAME":35,"ReturnStatement":36,"ThrowStatement":37,"BlockableStatement":38,"FunctionDeclaration":39,"ClassDeclaration":40,"VariableDeclaration":41,"BreakStatement":42,"ContinueStatement":43,"BREAK":44,"INT":45,"CONTINUE":46,"RETURN":47,"RETURN_LEFT":48,"RETURN_RIGHT":49,"THEN":50,"THROW":51,"YIELD":52,"YIELD_LEFT":53,"YIELD_RIGHT":54,"YIELD_FROM":55,"YF_LEFT":56,"YF_RIGHT":57,"AWAIT":58,"RICH_STRING":59,"RAW_STRING":60,"RICH_DOC":61,"RAW_DOC":62,"FLOAT":63,"HEX":64,"Separator":65,",":66,"IfStatement":67,"ForStatement":68,"WhileStatement":69,"TryStatement":70,"BlockStatement":71,"DO":72,"BLOCK_LEFT":73,"BLOCK_RIGHT":74,"IF":75,"ELSE":76,"Assignable":77,"FOR":78,"IN":79,"ON":80,"WHILE":81,"TRY":82,"CATCH":83,"FINALLY":84,"Property":85,":":86,"[":87,"]":88,"Properties":89,"{":90,"}":91,"VAR":92,"ASSIGN":93,"CONST":94,"@":95,"THIS":96,"SpreadElement":97,"SPLAT":98,"ExpressionLines":99,"Default":100,"DEFVAL":101,"ArrayPatternLines":102,"AP_LEFT":103,"AP_RIGHT":104,"ObjectPatternLines":105,"OP_LEFT":106,"=":107,"OP_RIGHT":108,"ParamLines":109,"PARAM_LEFT":110,"Parameters":111,"PARAM_RIGHT":112,"B_FUNC":113,"UB_FUNC":114,"FunctionModifier":115,"SUPER":116,"ClassExpressionHeader":117,"CLASS":118,"EXTENDS":119,"ClassDeclarationHeader":120,"ClassLine":121,"GET":122,"SET":123,"STATIC":124,"ClassBody":125,"FUNC_TYPE_GENERATOR":126,"FUNC_TYPE_ASYNC":127,"FUNC_TYPE_AGEN":128,"BinaryExpression":129,"LogicalExpression":130,"UnaryExpression":131,"OR":132,"AND":133,"COMPARE":134,"&":135,"+":136,"-":137,"*":138,"/":139,"//":140,"%":141,"^":142,"IS":143,"!":144,"NOT":145,"DELETE":146,"?":147,"INDEX_LEFT":148,"INDEX_RIGHT":149,"ACCESS":150,"Q_INDEX":151,"Q_ACCESS":152,"Arguments":153,"CALL_LEFT":154,"CALL_RIGHT":155,"Q_CALL":156,"NEW":157,"Path":158,"PATH":159,"SpecifierLines":160,"ImportSpecifier":161,"AS":162,"ImportNamespaceSpecifier":163,"ALL":164,"ImportDefaultSpecifier":165,"ImportList":166,"MOD_LEFT":167,"MOD_RIGHT":168,"IMPORT":169,"FROM":170,"ExportNamedDeclaration":171,"ExportDefaultDeclaration":172,"ExportSpecifier":173,"ExportSpecifiers":174,"EXPORT":175,"EXP_LEFT":176,"EXP_RIGHT":177,"DEFAULT":178,"$":179,"$accept":0,"$end":1},
terminals_: {2:"error",4:"ENDLN",6:";",7:"EOF",33:"(",34:")",35:"NAME",44:"BREAK",45:"INT",46:"CONTINUE",47:"RETURN",48:"RETURN_LEFT",49:"RETURN_RIGHT",50:"THEN",51:"THROW",52:"YIELD",53:"YIELD_LEFT",54:"YIELD_RIGHT",55:"YIELD_FROM",56:"YF_LEFT",57:"YF_RIGHT",58:"AWAIT",59:"RICH_STRING",60:"RAW_STRING",61:"RICH_DOC",62:"RAW_DOC",63:"FLOAT",64:"HEX",66:",",72:"DO",73:"BLOCK_LEFT",74:"BLOCK_RIGHT",75:"IF",76:"ELSE",78:"FOR",79:"IN",80:"ON",81:"WHILE",82:"TRY",83:"CATCH",84:"FINALLY",86:":",87:"[",88:"]",90:"{",91:"}",92:"VAR",93:"ASSIGN",94:"CONST",95:"@",96:"THIS",98:"SPLAT",101:"DEFVAL",103:"AP_LEFT",104:"AP_RIGHT",106:"OP_LEFT",107:"=",108:"OP_RIGHT",110:"PARAM_LEFT",112:"PARAM_RIGHT",113:"B_FUNC",114:"UB_FUNC",116:"SUPER",118:"CLASS",119:"EXTENDS",122:"GET",123:"SET",124:"STATIC",126:"FUNC_TYPE_GENERATOR",127:"FUNC_TYPE_ASYNC",128:"FUNC_TYPE_AGEN",132:"OR",133:"AND",134:"COMPARE",135:"&",136:"+",137:"-",138:"*",139:"/",140:"//",141:"%",142:"^",143:"IS",144:"!",145:"NOT",146:"DELETE",147:"?",148:"INDEX_LEFT",149:"INDEX_RIGHT",150:"ACCESS",151:"Q_INDEX",152:"Q_ACCESS",154:"CALL_LEFT",155:"CALL_RIGHT",156:"Q_CALL",157:"NEW",159:"PATH",162:"AS",164:"ALL",167:"MOD_LEFT",168:"MOD_RIGHT",169:"IMPORT",170:"FROM",175:"EXPORT",176:"EXP_LEFT",177:"EXP_RIGHT",178:"DEFAULT",179:"$"},
productions_: [0,[3,2],[3,3],[3,3],[3,3],[8,1],[8,1],[8,1],[8,1],[5,1],[5,3],[5,3],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[30,1],[30,1],[27,3],[18,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[42,1],[42,2],[43,1],[43,2],[36,1],[36,2],[36,2],[36,2],[36,4],[37,2],[26,1],[26,2],[26,2],[26,2],[26,2],[26,2],[26,2],[26,1],[26,2],[16,1],[16,1],[16,1],[16,1],[15,1],[15,1],[15,1],[65,1],[65,1],[38,1],[38,1],[38,1],[38,1],[38,1],[71,2],[71,3],[71,2],[67,3],[67,5],[77,1],[77,1],[68,5],[68,5],[69,3],[70,2],[70,5],[70,4],[70,7],[85,1],[85,3],[85,3],[85,5],[89,1],[89,3],[89,3],[20,2],[20,3],[41,4],[41,2],[41,4],[41,2],[41,5],[41,3],[22,1],[22,1],[97,2],[99,1],[99,1],[99,3],[99,3],[21,2],[21,3],[100,3],[100,3],[100,3],[102,2],[102,2],[102,2],[102,2],[102,3],[102,3],[102,3],[102,3],[102,3],[102,3],[102,4],[102,4],[31,2],[31,2],[105,2],[105,4],[105,4],[105,4],[105,4],[105,4],[105,3],[105,5],[105,5],[105,5],[105,5],[105,5],[32,2],[32,2],[109,2],[109,2],[109,2],[109,2],[109,3],[109,3],[109,3],[109,3],[109,3],[109,3],[109,4],[109,4],[111,2],[111,2],[17,3],[17,3],[17,3],[17,3],[17,4],[17,4],[9,1],[117,1],[117,3],[120,2],[120,4],[121,3],[121,2],[121,3],[121,3],[121,3],[121,4],[121,4],[125,1],[125,3],[28,4],[28,3],[40,4],[40,3],[39,2],[115,1],[115,1],[115,1],[24,1],[24,1],[24,1],[130,3],[130,3],[25,3],[25,3],[129,3],[129,3],[129,3],[129,3],[129,3],[129,3],[129,3],[129,3],[129,3],[131,2],[131,2],[131,2],[131,2],[131,2],[131,2],[19,4],[19,4],[19,3],[19,3],[19,5],[19,4],[19,2],[14,3],[14,3],[14,3],[153,3],[153,2],[23,2],[23,2],[23,3],[23,3],[23,4],[23,3],[23,4],[23,3],[23,4],[158,1],[160,1],[160,3],[160,3],[161,3],[161,1],[163,3],[165,1],[166,3],[10,4],[10,4],[10,4],[10,6],[10,6],[11,1],[11,1],[173,1],[173,3],[174,1],[174,3],[174,3],[171,2],[171,2],[171,2],[171,4],[172,3],[172,3],[172,3],[29,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return new yy.Program($$[$0]).pos(this._$)
break;
case 2: case 3: case 4:
 return new yy.Program($$[$0-1]).pos(this._$)
break;
case 9: case 92: case 106: case 107: case 115: case 116: case 117: case 118: case 129: case 143: case 144: case 145: case 146: case 175: case 229: case 246:
 this.$ = [$$[$0]]
break;
case 10: case 11: case 93: case 94: case 108: case 109: case 121: case 122: case 123: case 124: case 135: case 149: case 150: case 151: case 152: case 176: case 230: case 231: case 247: case 248:
 this.$ = $$[$0-2].concat($$[$0])
break;
case 30: case 156: case 217:
 this.$ = $$[$0-1]
break;
case 31:
 this.$ = new yy.Identifier($$[$0].value).pos(this._$)
break;
case 40:
 this.$ = new yy.ExpressionStatement($$[$0]).pos(this._$)
break;
case 41:
 this.$ = new yy.BreakStatement().pos(this._$)
break;
case 42:
 this.$ = new yy.BreakStatement($$[$0].value).pos(this._$)
break;
case 43:
 this.$ = new yy.ContinueStatement().pos(this._$)
break;
case 44:
 this.$ = new yy.ContinueStatement($$[$0].value).pos(this._$)
break;
case 45:
 this.$ = new yy.ReturnStatement(null).pos(this._$)
break;
case 46: case 47:
 this.$ = new yy.ReturnStatement($$[$0]).pos(this._$)
break;
case 48:
 this.$ = new yy.ReturnStatement($$[$0-1]).pos(this._$)
break;
case 49:
 this.$ = new yy.ReturnStatement($$[$0-2], $$[$0]).pos(this._$)
break;
case 50:
 this.$ = new yy.ThrowStatement($$[$0]).pos(this._$)
break;
case 51:
 this.$ = new yy.YieldExpression(null).pos(this._$)
break;
case 52: case 53:
 this.$ = new yy.YieldExpression($$[$0]).pos(this._$)
break;
case 54:
 this.$ = new yy.YieldExpression($$[$0-1]).pos(this._$)
break;
case 55: case 56:
 this.$ = new yy.YieldExpression($$[$0], true).pos(this._$)
break;
case 57:
 this.$ = new yy.YieldExpression($$[$0-1], true).pos(this._$)
break;
case 58:
 this.$ = new yy.AwaitExpression(null).pos(this._$)
break;
case 59:
 this.$ = new yy.AwaitExpression($$[$0]).pos(this._$)
break;
case 60:
 this.$ = new yy.TemplateString($$[$0].value, $$[$0].subtokens).pos(this._$)
break;
case 61:
 this.$ = new yy.StringLiteral($$[$0].value).pos(this._$)
break;
case 64: case 65: case 66:
 this.$ = new yy.NumberLiteral($$[$0].value).pos(this._$)
break;
case 74:

            if ($$[$0] instanceof yy.BlockStatement) this.$ = $$[$0].pos(this._$);
            else this.$ = new yy.BlockStatement([$$[$0]]).pos(this._$);

break;
case 75:
 this.$ = new yy.BlockStatement($$[$0-1]).pos(this._$)
break;
case 76:
 this.$ = new yy.BlockStatement([]).pos(this._$)
break;
case 77:
 this.$ = new yy.IfStatement($$[$0-1], $$[$0], null).pos(this._$)
break;
case 78:
 this.$ = new yy.IfStatement($$[$0-3], $$[$0-2], $$[$0]).pos(this._$)
break;
case 81:
 this.$ = new yy.ForStatement($$[$0-3], $$[$0-1], yy.wrap($$[$0])).pos(this._$)
break;
case 82:
 this.$ = new yy.ForStatement($$[$0-3], $$[$0-1], yy.wrap($$[$0]), true).pos(this._$)
break;
case 83:
 this.$ = new yy.WhileStatement($$[$0-1], $$[$0]).pos(this._$)
break;
case 84:

            this.$ = new yy.TryStatement($$[$0]).pos(this._$)

break;
case 85:

            this.$ = new yy.TryStatement(
                $$[$0-3],
                new yy.CatchClause($$[$0-1], $$[$0]).pos(_$[$0-1], _$[$0])
                ).pos(this._$)

break;
case 86:

            this.$ = new yy.TryStatement($$[$0-2], null, $$[$0]).pos(this._$)

break;
case 87:

            this.$ = new yy.TryStatement(
                $$[$0-5],
                new yy.CatchClause($$[$0-3], $$[$0-2]).pos(_$[$0-3], _$[$0-2]),
                $$[$0]
                ).pos(this._$)

break;
case 89: case 90:
 this.$ = new yy.Property($$[$0-2], $$[$0]).pos(this._$)
break;
case 91:
 this.$ = new yy.Property($$[$0-3], $$[$0]).pos(this._$)
break;
case 95:
 this.$ = new yy.ObjectExpression([]).pos(this._$)
break;
case 96:
 this.$ = new yy.ObjectExpression($$[$0-1]).pos(this._$)
break;
case 97:

        this.$ = new yy.VariableDeclaration([new yy.VariableDeclarator($$[$0-2], $$[$0]).pos(_$[$0-2], _$[$0])], false).pos(this._$);

break;
case 98:

        this.$ = new yy.VariableDeclaration([new yy.VariableDeclarator($$[$0], null).pos(_$[$0])], false).pos(this._$);

break;
case 99:

        this.$ = new yy.VariableDeclaration([new yy.VariableDeclarator($$[$0-2], $$[$0]).pos(_$[$0-2], _$[$0])], true).pos(this._$);

break;
case 100:

        this.$ = new yy.VariableDeclaration([new yy.VariableDeclarator($$[$0], null).pos(_$[$0])], true).pos(this._$);

break;
case 101:

        this.$ = $$[$0-4].add(new yy.VariableDeclarator($$[$0-2], $$[$0]).pos(_$[$0-2], _$[$0])).pos(this._$);

break;
case 102:

        this.$ = $$[$0-2].add(new yy.VariableDeclarator($$[$0], null).pos(_$[$0])).pos(this._$);

break;
case 103: case 104:
 this.$ = new yy.ThisExpression().pos(this._$)
break;
case 105:
 this.$ = new yy.SpreadElement($$[$0]).pos(this._$)
break;
case 110:
 this.$ = new yy.ArrayExpression([]).pos(this._$)
break;
case 111:
 this.$ = new yy.ArrayExpression($$[$0-1]).pos(this._$)
break;
case 112: case 113: case 114:
 this.$ = new yy.DefaultPattern($$[$0-2], $$[$0]).pos(this._$)
break;
case 119: case 120: case 147: case 148:
 this.$ = [new yy.SpreadPattern($$[$0]).pos(_$[$0-1], _$[$0])]
break;
case 125: case 126: case 153: case 154:
 this.$ = $$[$0-3].concat(new yy.SpreadPattern($$[$0]).pos(_$[$0-1], _$[$0]))
break;
case 127:
 this.$ = new yy.ArrayPattery([]).pos(this._$)
break;
case 128:
 this.$ = new yy.ArrayPattern($$[$0-1]).pos(this._$)
break;
case 130: case 131: case 133: case 134:
 this.$ = [new yy.PropertyAlias($$[$0-2], $$[$0]).pos(_$[$0-2], _$[$0])]
break;
case 132:
 this.$ = [new yy.Default($$[$0-2], $$[$0]).pos(_$[$0-2], _$[$0])]
break;
case 136: case 137: case 139: case 140:
 this.$ = $$[$0-4].concat(new yy.PropertyAlias($$[$0-2], $$[$0]).pos(_$[$0-2], _$[$0]))
break;
case 138:
 this.$ = $$[$0-4].concat(new yy.Default($$[$0-2], $$[$0]).pos(_$[$0-2], _$[$0]))
break;
case 141:
 this.$ = new yy.ObjectPattern([]).pos(this._$)
break;
case 142:
 this.$ = new yy.ObjectPattern($$[$0-1]).pos(this._$)
break;
case 155: case 218:
 this.$ = []
break;
case 157: case 158:

        this.$ = new yy.FunctionExpression($$[$0-2], $$[$0], true).pos(this._$)

break;
case 159: case 160:

        this.$ = new yy.FunctionExpression($$[$0-2], $$[$0], false).pos(this._$)

break;
case 161:

        this.$ = new yy.FunctionExpression($$[$0-3], $$[$0], true, $$[$0-1]).pos(this._$)

break;
case 162:

        this.$ = new yy.FunctionExpression($$[$0-3], $$[$0], false, $$[$0-1]).pos(this._$)

break;
case 163:
 this.$ = new yy.Super().pos(this._$)
break;
case 164:
 this.$ = [null, null]
break;
case 165:
 this.$ = [null, $$[$0]]
break;
case 166:
 this.$ = [$$[$0], null]
break;
case 167:
 this.$ = [$$[$0-2], $$[$0]]
break;
case 168:
 this.$ = new yy.ClassProperty($$[$0-2], $$[$0]).pos(this._$)
break;
case 169:
 this.$ = new yy.MethodDefinition($$[$0-1], $$[$0]).pos(this._$)
break;
case 170:
 this.$ = new yy.MethodDefinition($$[$0-1], $$[$0], 'get').pos(this._$)
break;
case 171:
 this.$ = new yy.MethodDefinition($$[$0-1], $$[$0], 'set').pos(this._$)
break;
case 172:
 this.$ = new yy.MethodDefinition($$[$0-1], $$[$0], 'method', true).pos(this._$)
break;
case 173:
 this.$ = new yy.MethodDefinition($$[$0-1], $$[$0], 'get', true).pos(this._$)
break;
case 174:
 this.$ = new yy.MethodDefinition($$[$0-1], $$[$0], 'set', true).pos(this._$)
break;
case 177: case 179:
 this.$ = new yy.ClassExpression($$[$0-3][0], $$[$0-3][1], $$[$0-1]).pos(this._$)
break;
case 178: case 180:
 this.$ = new yy.ClassExpression($$[$0-2][0], $$[$0-2][1], []).pos(this._$)
break;
case 181:
 this.$ = new yy.FunctionDeclaration($$[$0-1], $$[$0]).pos(this._$)
break;
case 182:
 this.$ = '*'
break;
case 183:
 this.$ = '~'
break;
case 184:
 this.$ = '~*'
break;
case 188:
 this.$ = new yy.LogicalExpression('||', $$[$0-2], $$[$0]).pos(this._$)
break;
case 189:
 this.$ = new yy.LogicalExpression('&&', $$[$0-2], $$[$0]).pos(this._$)
break;
case 190:
 this.$ = new yy.ComparativeExpression($$[$0-1].value, $$[$0-2], $$[$0]).pos(this._$)
break;
case 191:
 this.$ = $$[$0-2].chain($$[$0-1].value, $$[$0]).pos(this._$)
break;
case 192:
 this.$ = new yy.BinaryExpression('&', $$[$0-2], $$[$0]).pos(this._$)
break;
case 193:
 this.$ = new yy.BinaryExpression('+', $$[$0-2], $$[$0]).pos(this._$)
break;
case 194:
 this.$ = new yy.BinaryExpression('-', $$[$0-2], $$[$0]).pos(this._$)
break;
case 195:
 this.$ = new yy.BinaryExpression('*', $$[$0-2], $$[$0]).pos(this._$)
break;
case 196:
 this.$ = new yy.BinaryExpression('/', $$[$0-2], $$[$0]).pos(this._$)
break;
case 197:
 this.$ = new yy.BinaryExpression('//', $$[$0-2], $$[$0]).pos(this._$)
break;
case 198:
 this.$ = new yy.BinaryExpression('%', $$[$0-2], $$[$0]).pos(this._$)
break;
case 199:
 this.$ = new yy.BinaryExpression('^', $$[$0-2], $$[$0]).pos(this._$)
break;
case 200:
 this.$ = new yy.BinaryExpression('instanceof', $$[$0-2], $$[$0]).pos(this._$)
break;
case 201:
 this.$ = new yy.UnaryExpression('-', $$[$0]).pos(this._$)
break;
case 202:
 this.$ = new yy.UnaryExpression('+', $$[$0]).pos(this._$)
break;
case 203: case 204:
 this.$ = new yy.UnaryExpression('!', $$[$0]).pos(this._$)
break;
case 205:
 this.$ = new yy.UnaryExpression('delete', $$[$0]).pos(this._$)
break;
case 206:
 this.$ = new yy.DefinedExpression($$[$0-1]).pos(this._$)
break;
case 207: case 208:
 this.$ = new yy.MemberExpression($$[$0-3], $$[$0-1], true).pos(this._$)
break;
case 209: case 210:
 this.$ = new yy.MemberExpression($$[$0-2], $$[$0]).pos(this._$)
break;
case 211:
 this.$ = new yy.MemberExpression($$[$0-4], $$[$0-1], true, true).pos(this._$)
break;
case 212:
 this.$ = new yy.MemberExpression($$[$0-3], $$[$0], false, true).pos(this._$)
break;
case 213:
 this.$ = new yy.MemberExpression(new yy.ThisExpression().pos(_$[$0-1]), $$[$0]).pos(this._$)
break;
case 214: case 215: case 216:
 this.$ = new yy.AssignmentExpression($$[$0-1].value, $$[$0-2], $$[$0]).pos(this._$)
break;
case 219: case 220:
 this.$ = new yy.CallExpression($$[$0-1], $$[$0], false).pos(this._$)
break;
case 221:
 this.$ = new yy.CallExpression($$[$0-2], $$[$0], false, true).pos(this._$)
break;
case 222: case 224: case 226:
 this.$ = new yy.CallExpression($$[$0-1], $$[$0], true).pos(this._$)
break;
case 223: case 225: case 227:
 this.$ = new yy.CallExpression($$[$0-2], $$[$0], true, true).pos(this._$)
break;
case 228:
 this.$ = $$[$0].value
break;
case 232:
 this.$ = new yy.ImportSpecifier($$[$0-2], $$[$0]).pos(this._$)
break;
case 233:
 this.$ = new yy.ImportSpecifier($$[$0], $$[$0]).pos(this._$)
break;
case 234:
 this.$ = new yy.ImportNamespaceSpecifier($$[$0]).pos(this._$)
break;
case 235:
 this.$ = new yy.ImportDefaultSpecifier($$[$0]).pos(this._$)
break;
case 236:
 this.$ = $$[$0-1]
break;
case 237: case 238:
this.$ = new yy.ImportDeclaration([$$[$0-2]], $$[$0]).pos(this._$)
break;
case 239:
this.$ = new yy.ImportDeclaration($$[$0-2], $$[$0]).pos(this._$)
break;
case 240:
this.$ = new yy.ImportDeclaration([$$[$0-4], $$[$0-2]], $$[$0]).pos(this._$)
break;
case 241:
this.$ = new yy.ImportDeclaration([$$[$0-4]].concat($$[$0-2]), $$[$0]).pos(this._$)
break;
case 244:
 this.$ = new yy.ExportSpecifier($$[$0], $$[$0]).pos(this._$)
break;
case 245:
 this.$ = new yy.ExportSpecifier($$[$0-2], $$[$0]).pos(this._$)
break;
case 249: case 250: case 251:
 this.$ = new yy.ExportNamedDeclaration($$[$0], []).pos(this._$)
break;
case 252:
 this.$ = new yy.ExportNamedDeclaration(null, $$[$0-1]).pos(this._$)
break;
case 253: case 254: case 255:
 this.$ = new yy.ExportDefaultDeclaration($$[$0]).pos(this._$)
break;
case 256:
 this.$ = new yy.ValueExpression($$[$0]).pos(this._$)
break;
}
},
table: [{3:1,4:[1,2]},{1:[3]},{5:3,8:4,9:5,10:6,11:7,12:8,13:21,14:37,15:38,16:39,17:40,18:31,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,36:13,37:14,38:15,39:16,40:17,41:18,42:19,43:20,44:$V2,45:$V3,46:$V4,47:$V5,48:$V6,51:$V7,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo,87:$Vp,90:$Vq,92:$Vr,94:$Vs,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Vz,120:32,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,169:$VG,171:11,172:12,175:$VH,179:$VI},{1:[2,1],4:[1,98],6:[1,99],7:[1,100]},o($VJ,[2,9]),o($VJ,[2,5],{153:103,148:$VK,150:$VL,154:$VM}),o($VJ,[2,6]),o($VJ,[2,7]),o($VJ,[2,8]),o([1,4,6,7,74,148,150,154],[2,163]),{18:109,35:$V1,163:105,164:$VN,165:106,166:107,167:$VO},o($VJ,[2,242]),o($VJ,[2,243]),o($VP,[2,32]),o($VP,[2,33]),o($VP,[2,34]),o($VP,[2,35]),o($VP,[2,36]),o([1,4,6,7,34,49,50,54,57,72,73,74,75,76,78,81,82,83,84,88,90,91,104,108,112,132,133,134,135,136,137,138,139,140,141,142,143,147,148,149,150,151,152,154,155,156],[2,37],{66:$VQ}),o($VP,[2,38]),o($VP,[2,39]),o([1,4,6,7,34,50,66,72,73,74,75,76,78,81,82,83,84,88,90,91,104,108,112,149,155],[2,40],{153:117,49:[1,112],54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),{18:139,35:$V1,39:135,40:136,41:134,92:$Vr,94:$Vs,118:[1,140],120:32,176:[1,137],178:[1,138]},o($V91,[2,45],{14:37,15:38,16:39,17:40,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,111:68,129:74,130:75,131:76,117:83,31:85,32:86,109:88,102:95,105:97,13:141,18:142,9:143,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,103:$Vv,106:$Vw,110:$Vx,116:$Vy,118:$Va1,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI}),{9:143,13:145,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:146,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($VP,[2,69]),o($VP,[2,70]),o($VP,[2,71]),o($VP,[2,72]),o($VP,[2,73]),o($VP,$Vb1,{111:68,109:88,17:147,93:$Vc1,110:$Vx}),{90:[1,149]},{18:151,30:152,31:85,32:86,35:$V1,77:150,102:95,103:$Vv,105:97,106:$Vw},{18:154,30:152,31:85,32:86,35:$V1,77:153,102:95,103:$Vv,105:97,106:$Vw},o($VP,[2,41],{45:[1,155]}),o($VP,[2,43],{45:[1,156]}),o($VP,[2,12]),o($VP,[2,13]),o($VP,[2,14]),o($VP,[2,15]),o($VP,$Vd1,{93:$Ve1}),o($VP,[2,18]),o($VP,[2,19]),o($VP,[2,20]),o($VP,[2,21]),o($VP,[2,22]),o([1,4,6,7,34,49,50,54,57,66,72,73,74,75,76,78,81,82,83,84,88,90,91,104,108,112,132,133,135,136,137,138,139,140,141,142,143,147,148,149,150,151,152,154,155,156],[2,23],{134:[1,158]}),o($VP,[2,24]),o($VP,$Vf1),o($VP,[2,26]),o($VP,[2,27]),{9:143,13:159,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{18:161,30:152,31:85,32:86,35:$V1,77:160,102:95,103:$Vv,105:97,106:$Vw},{9:143,13:162,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{38:163,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo},{9:143,12:164,13:21,14:37,15:38,16:39,17:40,18:31,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,36:13,37:14,38:15,39:16,40:17,41:18,42:19,43:20,44:$V2,45:$V3,46:$V4,47:$V5,48:$V6,51:$V7,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo,87:$Vp,90:$Vq,92:$Vr,94:$Vs,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Vz,120:32,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{5:165,8:4,9:5,10:6,11:7,12:8,13:21,14:37,15:38,16:39,17:40,18:31,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,36:13,37:14,38:15,39:16,40:17,41:18,42:19,43:20,44:$V2,45:$V3,46:$V4,47:$V5,48:$V6,51:$V7,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,74:[1,166],75:$Vl,78:$Vm,81:$Vn,82:$Vo,87:$Vp,90:$Vq,92:$Vr,94:$Vs,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Vz,120:32,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,169:$VG,171:11,172:12,175:$VH,179:$VI},o([1,4,6,7,34,49,50,54,57,66,72,73,74,75,76,78,79,80,81,82,83,84,86,88,90,91,93,101,104,107,108,110,112,119,132,133,134,135,136,137,138,139,140,141,142,143,147,148,149,150,151,152,154,155,156,162,168,170,177],[2,31]),{18:167,35:$V1,90:$Vg1,119:$Vh1},{93:$Vi1},o($VP,[2,64]),o($VP,[2,65]),o($VP,[2,66]),o($Vj1,[2,60]),o($Vj1,[2,61]),o($Vj1,[2,62]),o($Vj1,[2,63]),{113:[1,170],114:[1,171]},o($VP,[2,103],{18:172,35:$V1}),{16:177,18:176,35:$V1,59:$Vd,60:$Ve,61:$Vf,62:$Vg,85:175,87:$Vk1,89:174,91:[1,173]},{9:143,13:181,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,88:[1,179],90:$Vq,95:$Vt,96:$Vu,97:182,98:$Vl1,99:180,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($VP,[2,104]),{9:143,13:187,14:37,15:38,16:39,17:40,18:185,19:184,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:186,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($VP,[2,185]),o($VP,[2,186]),o($VP,[2,187]),o($V91,[2,51],{14:37,15:38,16:39,17:40,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,111:68,129:74,130:75,131:76,117:83,31:85,32:86,109:88,102:95,105:97,18:142,9:143,13:188,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,103:$Vv,106:$Vw,110:$Vx,116:$Vy,118:$Va1,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI}),{9:143,13:189,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:190,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:191,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o([1,4,6,7,34,49,50,54,57,66,72,73,74,75,76,78,81,82,83,84,88,91,104,108,112,132,133,134,135,136,137,138,139,140,141,142,143,147,148,149,150,151,152,154,155,156],[2,58],{14:37,15:38,16:39,17:40,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,111:68,129:74,130:75,131:76,117:83,31:85,32:86,109:88,102:95,105:97,18:142,9:143,13:192,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,103:$Vv,106:$Vw,110:$Vx,116:$Vy,118:$Va1,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI}),{9:143,13:193,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{90:[1,194]},{38:195,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo},o($Vm1,[2,28]),o($Vm1,[2,29]),{9:143,13:187,14:37,15:38,16:39,17:40,18:198,19:199,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:197,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,98:[1,201],100:200,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,112:[1,196],116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{4:$Vn1,65:203,66:$Vo1,112:[1,202]},{9:143,13:206,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:207,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:208,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:209,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:210,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:187,14:37,15:38,16:39,17:40,18:213,19:214,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:212,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,98:[1,216],100:215,102:95,103:$Vv,104:[1,211],105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{4:$Vn1,65:218,66:$Vo1,104:[1,217]},{18:220,35:$V1,108:[1,219]},{4:$Vn1,65:222,66:$Vo1,108:[1,221]},{1:[2,2],8:223,9:5,10:6,11:7,12:8,13:21,14:37,15:38,16:39,17:40,18:31,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,36:13,37:14,38:15,39:16,40:17,41:18,42:19,43:20,44:$V2,45:$V3,46:$V4,47:$V5,48:$V6,51:$V7,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo,87:$Vp,90:$Vq,92:$Vr,94:$Vs,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Vz,120:32,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,169:$VG,171:11,172:12,175:$VH,179:$VI},{1:[2,3],8:224,9:5,10:6,11:7,12:8,13:21,14:37,15:38,16:39,17:40,18:31,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,36:13,37:14,38:15,39:16,40:17,41:18,42:19,43:20,44:$V2,45:$V3,46:$V4,47:$V5,48:$V6,51:$V7,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo,87:$Vp,90:$Vq,92:$Vr,94:$Vs,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Vz,120:32,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,169:$VG,171:11,172:12,175:$VH,179:$VI},{1:[2,4]},{9:143,13:225,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{18:226,35:$V1},o($VP,[2,220]),{9:143,13:181,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,97:182,98:$Vl1,99:227,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,155:[1,228],157:$VF,179:$VI},{170:[1,229]},{66:[1,231],170:[1,230]},{170:[1,232]},{162:[1,233]},o([66,170],[2,235]),{18:236,35:$V1,160:234,161:235},{18:238,30:152,31:85,32:86,35:$V1,77:237,102:95,103:$Vv,105:97,106:$Vw},o($VP,[2,48]),{9:143,13:239,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{18:240,35:$V1},{148:[1,241]},{150:[1,242]},o($VP,[2,219]),{153:243,154:$VM},{9:143,13:244,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($VP,[2,54]),o($VP,[2,57]),{9:143,13:245,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:246,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:247,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:248,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:249,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:250,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:251,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:252,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:253,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:254,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:255,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($VP,[2,206]),o($VJ,[2,249],{66:$VQ}),o($VJ,[2,250]),o($VJ,[2,251]),{18:258,35:$V1,173:257,174:256},{9:143,13:259,14:37,15:38,16:39,17:40,18:31,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,39:260,40:261,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Vz,120:32,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{17:147,109:88,110:$Vx,111:68},{18:167,35:$V1},o([1,4,6,7,34,49,66,72,73,74,75,76,78,81,82,83,84,88,90,91,104,108,112,149,155],[2,46],{153:117,50:[1,262],54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VP,$Vb1,{93:$Vc1}),{148:$VK,150:$VL,153:103,154:$VM},{90:$Vg1,119:$Vh1},o($Vp1,[2,47],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($Vp1,[2,50],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VP,[2,181]),{9:143,13:263,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{18:267,35:$V1,91:[1,265],121:266,122:$Vq1,123:$Vr1,124:$Vs1,125:264},{93:[1,271]},o($VP,[2,98],{93:$Vt1}),o([72,73,75,78,79,80,81,82,93],[2,80]),{93:[1,272]},o($VP,[2,100],{93:$Vt1}),o($VP,[2,42]),o($VP,[2,44]),{9:143,13:273,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:274,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{38:275,54:$VR,57:$VS,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,153:117,154:$VM,156:$V81},{79:[1,276],80:[1,277]},o([72,73,75,78,79,80,81,82],$Vt1),{38:278,54:$VR,57:$VS,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,153:117,154:$VM,156:$V81},o([1,4,6,7,34,49,50,54,57,66,72,73,74,75,76,78,81,82,88,90,91,104,108,112,132,133,134,135,136,137,138,139,140,141,142,143,147,148,149,150,151,152,154,155,156],[2,84],{83:[1,279],84:[1,280]}),o($VP,[2,74]),{4:[1,283],6:[1,282],74:[1,281]},o($VP,[2,76]),{90:[2,166],119:[1,284]},{9:143,13:285,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:286,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:288,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,71:287,72:$Vj,73:$Vk,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,115:289,116:$Vy,117:83,118:$Va1,126:$Vu1,127:$Vv1,128:$Vw1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:294,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,71:293,72:$Vj,73:$Vk,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,115:295,116:$Vy,117:83,118:$Va1,126:$Vu1,127:$Vv1,128:$Vw1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($Vx1,[2,213]),o($VP,[2,95]),{4:[1,297],66:[1,298],91:[1,296]},o($Vy1,[2,92]),o($Vy1,[2,88],{86:[1,299]}),{86:[1,300]},{9:143,13:301,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($VP,[2,110]),{4:$Vn1,65:303,66:$Vo1,88:[1,302]},o($Vz1,[2,106],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($Vz1,[2,107]),{9:143,13:304,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($VA1,$Vd1,{153:305,93:$Ve1,154:$VM,156:[1,306]}),o($VA1,$Vb1,{153:307,93:$Vc1,154:$VM,156:[1,308]}),o($VA1,$Vf1,{153:309,154:$VM,156:[1,310]}),{54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,153:117,154:$VM,156:$V81},o($VB1,[2,52],{153:117,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($Vp1,[2,53],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VC1,[2,55],{153:117,57:$VS,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VC1,[2,56],{153:117,57:$VS,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VC1,[2,59],{153:117,57:$VS,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),{34:[1,311],54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,153:117,154:$VM,156:$V81},{18:267,35:$V1,91:[1,313],121:266,122:$Vq1,123:$Vr1,124:$Vs1,125:312},o($VP,[2,256]),o($VD1,[2,155]),o($VE1,[2,143],{93:$Vi1,101:$VF1}),o($VG1,$Vb1,{4:$VH1,66:$VH1,112:$VH1,93:$Vc1,101:$VI1}),o($VG1,$Vd1,{4:$VJ1,66:$VJ1,112:$VJ1,93:$Ve1,101:$VK1}),o($VE1,[2,146]),{18:318,30:317,31:85,32:86,35:$V1,102:95,103:$Vv,105:97,106:$Vw},o($VD1,[2,156]),{9:143,13:187,14:37,15:38,16:39,17:40,18:320,19:321,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:319,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,98:[1,323],100:322,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($VL1,[2,67]),o($VL1,[2,68]),o($VM1,[2,201],{153:117,57:$VS,142:$V11,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VM1,[2,202],{153:117,57:$VS,142:$V11,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VN1,[2,203],{153:117,57:$VS,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VB1,[2,204],{153:117,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VO1,[2,205],{153:117,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($Vm1,[2,127]),o($VP1,[2,115],{93:$Vi1,101:$VF1}),o($VG1,$Vb1,{4:$VQ1,66:$VQ1,104:$VQ1,93:$Vc1,101:$VI1}),o($VG1,$Vd1,{4:$VR1,66:$VR1,104:$VR1,93:$Ve1,101:$VK1}),o($VP1,[2,118]),{18:325,30:324,31:85,32:86,35:$V1,102:95,103:$Vv,105:97,106:$Vw},o($Vm1,[2,128]),{9:143,13:187,14:37,15:38,16:39,17:40,18:327,19:328,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:326,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,98:[1,330],100:329,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($Vm1,[2,141]),o($VS1,[2,129],{86:[1,331],107:[1,332]}),o($Vm1,[2,142]),{18:333,35:$V1},o($VJ,[2,11]),o($VJ,[2,10]),{54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,149:[1,334],150:$V51,151:$V61,152:$V71,153:117,154:$VM,156:$V81},o($Vx1,[2,210]),{4:$Vn1,65:303,66:$Vo1,155:[1,335]},o($VP,[2,218]),{158:336,159:$VT1},{158:338,159:$VT1},{163:339,164:$VN,166:340,167:$VO},{158:341,159:$VT1},{18:342,35:$V1},{4:[1,345],66:[1,344],168:[1,343]},o($VU1,[2,229]),o($VU1,[2,233],{162:[1,346]}),{93:[1,347]},o($VP,[2,102],{93:$Vt1}),{54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,149:[1,348],150:$V51,151:$V61,152:$V71,153:117,154:$VM,156:$V81},o($Vx1,[2,209]),{9:143,13:349,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{18:350,35:$V1},o($VP,[2,221]),o($VV1,[2,190],{153:117,57:$VS,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VW1,[2,192],{153:117,57:$VS,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VW1,[2,193],{153:117,57:$VS,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VW1,[2,194],{153:117,57:$VS,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VM1,[2,195],{153:117,57:$VS,142:$V11,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VM1,[2,196],{153:117,57:$VS,142:$V11,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VM1,[2,197],{153:117,57:$VS,142:$V11,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VM1,[2,198],{153:117,57:$VS,142:$V11,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VC1,[2,199],{153:117,57:$VS,143:$V21,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VO1,[2,200],{153:117,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VN1,[2,188],{153:117,57:$VS,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VN1,[2,189],{153:117,57:$VS,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),{4:[1,353],66:[1,352],177:[1,351]},o($VX1,[2,246]),o($VX1,[2,244],{162:[1,354]}),o($VJ,[2,253],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VJ,[2,254]),o($VJ,[2,255]),{9:143,12:355,13:21,14:37,15:38,16:39,17:40,18:31,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,36:13,37:14,38:15,39:16,40:17,41:18,42:19,43:20,44:$V2,45:$V3,46:$V4,47:$V5,48:$V6,51:$V7,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo,87:$Vp,90:$Vq,92:$Vr,94:$Vs,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Vz,120:32,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($Vp1,[2,216],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),{4:$VY1,91:[1,356]},o($VP,[2,180]),o($VZ1,[2,175]),{17:359,86:[1,358],109:88,110:$Vx,111:68},{18:360,35:$V1},{18:361,35:$V1},{18:362,35:$V1,122:[1,363],123:[1,364]},{9:143,13:365,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:366,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($Vp1,[2,214],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VV1,[2,191],{153:117,57:$VS,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o([1,4,6,7,34,49,50,54,57,66,72,73,74,75,78,81,82,83,84,88,90,91,104,108,112,132,133,134,135,136,137,138,139,140,141,142,143,147,148,149,150,151,152,154,155,156],[2,77],{76:[1,367]}),{9:143,13:368,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:369,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($VP,[2,83]),{18:161,30:152,31:85,32:86,35:$V1,77:370,102:95,103:$Vv,105:97,106:$Vw},{38:371,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo},o($VP,[2,75]),{8:224,9:5,10:6,11:7,12:8,13:21,14:37,15:38,16:39,17:40,18:31,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,36:13,37:14,38:15,39:16,40:17,41:18,42:19,43:20,44:$V2,45:$V3,46:$V4,47:$V5,48:$V6,51:$V7,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo,87:$Vp,90:$Vq,92:$Vr,94:$Vs,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Vz,120:32,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,169:$VG,171:11,172:12,175:$VH,179:$VI},{8:223,9:5,10:6,11:7,12:8,13:21,14:37,15:38,16:39,17:40,18:31,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,36:13,37:14,38:15,39:16,40:17,41:18,42:19,43:20,44:$V2,45:$V3,46:$V4,47:$V5,48:$V6,51:$V7,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo,87:$Vp,90:$Vq,92:$Vr,94:$Vs,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Vz,120:32,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,169:$VG,171:11,172:12,175:$VH,179:$VI},{9:143,13:372,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{54:$VR,57:$VS,90:[2,165],132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,153:117,154:$VM,156:$V81},o($Vp1,[2,215],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VP,[2,157]),o($Vp1,[2,158],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),{71:373,72:$Vj,73:$Vk},o($V_1,[2,182]),o($V_1,[2,183]),o($V_1,[2,184]),o($VP,[2,159]),o($Vp1,[2,160],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),{71:374,72:$Vj,73:$Vk},o($VP,[2,96]),{16:177,18:176,35:$V1,59:$Vd,60:$Ve,61:$Vf,62:$Vg,85:375,87:$Vk1},{16:177,18:176,35:$V1,59:$Vd,60:$Ve,61:$Vf,62:$Vg,85:376,87:$Vk1},{9:143,13:377,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:378,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{54:$VR,57:$VS,88:[1,379],132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,153:117,154:$VM,156:$V81},o($VP,[2,111]),{9:143,13:380,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,97:381,98:$Vl1,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($Vz1,[2,105],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VP,[2,222]),{153:382,154:$VM},o($VP,[2,224]),{153:383,154:$VM},o($VP,[2,226]),{153:384,154:$VM},o($VP,[2,30]),{4:$VY1,91:[1,385]},o($VP,[2,178]),{9:143,13:386,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:387,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:388,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($VE1,[2,147]),o($VE1,[2,148]),o($VE1,[2,149],{93:$Vi1,101:$VF1}),o($VG1,$Vb1,{4:$V$1,66:$V$1,112:$V$1,93:$Vc1,101:$VI1}),o($VG1,$Vd1,{4:$V02,66:$V02,112:$V02,93:$Ve1,101:$VK1}),o($VE1,[2,152]),{18:390,30:389,31:85,32:86,35:$V1,102:95,103:$Vv,105:97,106:$Vw},o($VP1,[2,119]),o($VP1,[2,120]),o($VP1,[2,121],{93:$Vi1,101:$VF1}),o($VG1,$Vb1,{4:$V12,66:$V12,104:$V12,93:$Vc1,101:$VI1}),o($VG1,$Vd1,{4:$V22,66:$V22,104:$V22,93:$Ve1,101:$VK1}),o($VP1,[2,124]),{18:392,30:391,31:85,32:86,35:$V1,102:95,103:$Vv,105:97,106:$Vw},{9:143,13:187,14:37,15:38,16:39,17:40,18:394,19:396,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:393,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,100:395,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:397,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($VS1,[2,135],{86:[1,398],107:[1,399]}),o($Vx1,[2,208]),o($VP,[2,217]),o($VJ,[2,237]),o($VJ,[2,228]),o($VJ,[2,238]),{170:[1,400]},{170:[1,401]},o($VJ,[2,239]),{170:[2,234]},{170:[2,236]},{18:236,35:$V1,161:402},{18:236,35:$V1,161:403},{18:404,35:$V1},{9:143,13:405,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($Vx1,[2,207]),{54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,149:[1,406],150:$V51,151:$V61,152:$V71,153:117,154:$VM,156:$V81},o($Vx1,[2,212]),o($VJ,[2,252]),{18:258,35:$V1,173:407},{18:258,35:$V1,173:408},{18:409,35:$V1},o($VP,[2,49]),o($VP,[2,179]),{18:267,35:$V1,121:410,122:$Vq1,123:$Vr1,124:$Vs1},{9:143,13:411,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($VZ1,[2,169]),{17:412,109:88,110:$Vx,111:68},{17:413,109:88,110:$Vx,111:68},{17:414,109:88,110:$Vx,111:68},{18:415,35:$V1},{18:416,35:$V1},o($Vp1,[2,97],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($Vp1,[2,99],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),{38:417,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo},{38:418,54:$VR,57:$VS,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,153:117,154:$VM,156:$V81},{38:419,54:$VR,57:$VS,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,153:117,154:$VM,156:$V81},{38:420,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo},o($VP,[2,86]),{54:$VR,57:$VS,90:[2,167],132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,153:117,154:$VM,156:$V81},o($VP,[2,161]),o($VP,[2,162]),o($Vy1,[2,93]),o($Vy1,[2,94]),o($Vy1,[2,89],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($Vy1,[2,90],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),{86:[1,421]},o($Vz1,[2,108],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($Vz1,[2,109]),o($VP,[2,223]),o($VP,[2,225]),o($VP,[2,227]),o($VP,[2,177]),o($V32,[2,112],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($V32,[2,113],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($V32,[2,114],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VE1,[2,153]),o($VE1,[2,154]),o($VP1,[2,125]),o($VP1,[2,126]),o($VS1,[2,130],{93:$Vi1,101:$VF1}),o($VG1,$Vb1,{4:$V42,66:$V42,108:$V42,93:$Vc1,101:$VI1}),o($VS1,[2,133]),o($VG1,$Vd1,{4:$V52,66:$V52,108:$V52,93:$Ve1,101:$VK1}),o($VS1,[2,132],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),{9:143,13:187,14:37,15:38,16:39,17:40,18:423,19:425,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:422,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,100:424,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{9:143,13:426,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},{158:427,159:$VT1},{158:428,159:$VT1},o($VU1,[2,230]),o($VU1,[2,231]),o($VU1,[2,232]),o($Vp1,[2,101],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($Vx1,[2,211]),o($VX1,[2,247]),o($VX1,[2,248]),o($VX1,[2,245]),o($VZ1,[2,176]),o($VZ1,[2,168],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VZ1,[2,170]),o($VZ1,[2,171]),o($VZ1,[2,172]),{17:429,109:88,110:$Vx,111:68},{17:430,109:88,110:$Vx,111:68},o($VP,[2,78]),o($VP,[2,81]),o($VP,[2,82]),o([1,4,6,7,34,49,50,54,57,66,72,73,74,75,76,78,81,82,83,88,90,91,104,108,112,132,133,134,135,136,137,138,139,140,141,142,143,147,148,149,150,151,152,154,155,156],[2,85],{84:[1,431]}),{9:143,13:432,14:37,15:38,16:39,17:40,18:142,19:41,20:42,21:43,22:44,23:45,24:46,25:47,26:48,27:49,28:50,29:51,30:60,31:85,32:86,33:$V0,35:$V1,45:$V3,52:$V8,53:$V9,55:$Va,56:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,87:$Vp,90:$Vq,95:$Vt,96:$Vu,102:95,103:$Vv,105:97,106:$Vw,109:88,110:$Vx,111:68,116:$Vy,117:83,118:$Va1,129:74,130:75,131:76,136:$VA,137:$VB,144:$VC,145:$VD,146:$VE,157:$VF,179:$VI},o($VS1,[2,136],{93:$Vi1,101:$VF1}),o($VG1,$Vb1,{4:$V62,66:$V62,108:$V62,93:$Vc1,101:$VI1}),o($VS1,[2,139]),o($VG1,$Vd1,{4:$V72,66:$V72,108:$V72,93:$Ve1,101:$VK1}),o($VS1,[2,138],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VJ,[2,240]),o($VJ,[2,241]),o($VZ1,[2,173]),o($VZ1,[2,174]),{38:433,67:26,68:27,69:28,70:29,71:30,72:$Vj,73:$Vk,75:$Vl,78:$Vm,81:$Vn,82:$Vo},o($Vy1,[2,91],{153:117,54:$VR,57:$VS,132:$VT,133:$VU,134:$VV,135:$VW,136:$VX,137:$VY,138:$VZ,139:$V_,140:$V$,141:$V01,142:$V11,143:$V21,147:$V31,148:$V41,150:$V51,151:$V61,152:$V71,154:$VM,156:$V81}),o($VP,[2,87])],
defaultActions: {100:[2,4],342:[2,234],343:[2,236]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

function Parser() { this.yy = {} };
Parser.prototype = parser;
parser.Parser = Parser;

function Queue() {
	var
	mouth = null,
	ass = null,
	length = 0;

	function node(value) {
		return {
			value: value,
			prev: null,
			next: null,
		};
	}

	// consume a value into the queue
	this.eat = function(value) {
		var nd = node(value);

		if (length > 0) {
			mouth.prev = nd;
			nd.next = mouth;
			mouth = nd;
		} else {
			mouth = ass = nd;
		}

		length++;
	}

	// regurgitate a value out of the queue
	this.vomit = function() {
		if (length === 0) {
			throw new Error("Cannot crap values out of empty queue");
		} else {
			let value = mouth.value;
			if (length === 1) {
				mouth = ass = null;
			} else {
				mouth = mouth.next;
				mouth.prev = null;
			}

			length--;

			return value;
		}
	}

	// defecate a value from the queue
	this.crap = function() {
		if (length === 0) {
			throw new Error("Cannot crap values out of empty queue");
		} else {
			let value = ass.value;
			if (length === 1) {
				mouth = ass = null;
			} else {
				ass = ass.prev;
				ass.next = null;
			}

			length--;

			return value;
		}
	}

	this.uncrap = function(value) {
		var nd = node(value);

		if (length > 0) {
			ass.next = nd;
			nd.prev = ass;
			ass = nd;
		} else {
			mouth = ass = nd;
		}

		length++;
	}

	this.get = function(i) {
		var n = 0;
		for (var nd of this) {
			if (n === i) {
				return nd;
			}
			n++;
		}

		throw new Error(`Index ${i} out of range!`);
	}

	this[Symbol.iterator] = function*() {
		var nd = ass;
		while (nd !== null) {
			yield nd.value;
			nd = nd.prev;
		}
	}

	Object.defineProperty(this, 'length', {
		get: function() {
			return length;
		},
		set: function(value) {
			throw new Error("Cannot set queue length!");
		}
	});
}

function PeekableGenerator(gen) {
	let done = false, buff = [];

	this.next = function() {
		if (buff.length > 0) {
			return buff.shift();
		} else {
			if (done) {
				throw new Error('No more values in Iterator!');
			} else {
				return gen.next();
			}
		}
	}

	this.peek = function(n) {
		if (gen instanceof PeekableGenerator) {
			return gen.peek(n);
		}

		n = n || 0;
		while (n >= buff.length) {
			if (done) {
				buff.push(null)
			} else {
				let item = gen.next();
				done = item.done;
				buff.push(item);
			}
		}

		return buff[n];
	}

	this.peekValue = function(n) {
		try {
			let ctrl = this.peek(n);
			return ctrl.value;
		} catch (e) {
			return null;
		}
	}

	this[Symbol.iterator] = function() {
		return this;
	}
}

// javascript keywords
const JS_KW = new Set([
	"break",
	"case",
	"class",
	"catch",
	"const",
	"continue",
	"debugger",
	"default",
	"delete",
	"do",
	"else",
	"export",
	"extends",
	"finally",
	"for",
	"function",
	"if",
	"import",
	"in",
	"instanceof",
	"let",
	"new",
	"return",
	"static",
	"super",
	"switch",
	"this",
	"throw",
	"try",
	"typeof",
	"var",
	"void",
	"while",
	"with",
	"yield"
]);

// bizubee keywords
const JSL_KW = new Set([
	"on",
	"await",
	"is",
	"isnt",
	"not",
	"from",
	"as",
	"and",
	"or",
	"then",
	"get",
	"set",
	"$"
]);

// patterns to match for a beginning or complete token
// for every string put in the first match is returned
const total = [
	{
		pattern: /./,
		tag: 'PATH',
		final: true,
		test: function(value, trail){
			if (trail.length < 2) 	return false;
			if (value === '\n') 	return false;
			let end = trail.length;
			let i = 1, pattern = ['FROM', 'WHITESPACE'];
			while (true) {
				let poffset = pattern.length - i, toffset = trail.length - i;
				if (poffset < 0) {

					// if 'from' is preceeded by '.' ignore it
					if (end >= 4) {
						if (trail[end - 3] === 'WHITESPACE' || trail[end - 3] === 'ENDLN') {
							return trail[end - 4] !== 'ACCESS';
						} else {
							return trail[end - 3] !== 'ACCESS';
						}
					}

					// ignore 'from' if succeeded by ':'
					// sorry paths can't start with ':' I guess
					if (value[0] === ':') {
						return false;
					}

					return true;
				}

				if (pattern[poffset] !== trail[toffset]) {
					return false;
				}

				i++;
			}
		},
		fetch: function(cursor) {
			var rec = cursor.recorder();
			while (!cursor.end()) {
				let c = cursor.next();
				if (c === '\n') {
					cursor.back();
					this.value += rec.done();
					return;
				}
			}

			this.value += rec.done();
		}
	},
	{
		pattern: "'",
		tag: 'RAW_STRING',
		fetch: function(cursor) {
			let escape = false;
			this.value = "'";
			while (!cursor.end()) {
				let c = cursor.next();

				this.value += c;

				if (c === "'" && !escape)
					return;

				if (escape)
					escape = false;
				if (c === '\\')
					escape = true;

			}

			throw new Error('Unexpected EOF!');
		}
	},
	{
		pattern: '"',
		tag: 'RICH_STRING',
		fetch: function(cursor) {
			var
			escape 	= false,
			seend 	= false,
			part 	= "",
			parts 	= [],
			istress = 0,
			rec 	= cursor.recorder();

			while (!cursor.end()) {
				let c = cursor.next();
				if (escape) {
					escape = false;
				} else {
					if (c === '"') {
						parts.push(part);
						this.value += rec.done();
						this.subtokens = parts;
						return;
					}

					if (c === '$') {
						seend = true;
						continue;
					}

					if (seend) {
						seend = false;
						if (c === '{') {
							let tokens = getInterpolationTokens(cursor);
							parts.push(part);
							parts.push(tokens);
							part = "";
							continue;
						} else {
							part += '$';
						}
					}

					if (c === '\\') {
						escape = true;
						seend = false;
					}
				}

				part += c;
			}

			throw new Error("Unexpected EOF!");
		}
	},
	{
		pattern: '#',
		tag: 'END_COMMENT',
		fetch: function(cursor) {
			var rec = cursor.recorder();
			while (!cursor.end()) {
				let c = cursor.next();
				if (c === '\n') {
					cursor.back();
					this.value += rec.done();
					return;
				}
			}

			this.value += rec.done();
		}
	},
	{
		pattern: /[\(|\)]/
	},
	{
		pattern: /[\[|\]]/
	},
	{
		pattern: /[\{|\}]/
	},
	{
		pattern: /[\t ]+/,
		tag: 'WHITESPACE'
	},
	{
		pattern: /([\t ]*\n[\t ]*)+/,
		tag: 'ENDLN'
	},
	{
		pattern: /[0-9]+/,
		tag: 'INT'
	},
	{
		pattern: /[0-9]*\.[0-9]+([eE][\-\+]?[0-9]+)?/,
		tag: 'FLOAT'
	},
	{
		pattern: /0o[01234567]+/,
		tag: 'BASE8'
	},
	{
		pattern: /0b[01]+/,
		tag: 'BINARY'
	},
	{
		pattern: /0x[A-Fa-f0-9]+/,
		tag: 'HEX'
	},
	{
		pattern: /[\$A-Za-z_][\$\w]*/,
		tag: 'NAME',
		test: function(string, trail) {
			return !(JS_KW.has(string) || JSL_KW.has(string));
		}
	},
	{
		pattern: /[\$A-Za-z_][\$\w]*/,
		tag: function(value) {
			return value.toUpperCase();
		},
		test: function(string, trail) {
			return (JS_KW.has(string) || JSL_KW.has(string));
		}

	},
	{
		pattern: "->",
		tag: 'UB_FUNC'
	},
	{
		pattern: "=>",
		tag: 'B_FUNC'
	},
	{
		pattern: "~*",
		tag: 'FUNC_TYPE_AGEN'
	},
	{
		pattern: "|.",
		tag: 'CASCADE'
	},
	{
		pattern: ".",
		tag: 'ACCESS'
	},
	{
		pattern: /=|\+=|-=|\*=|\/=|\/\/=|%=|\^=/,
		tag: 'ASSIGN'
	},
	{
		pattern: '...',
		tag: 'SPLAT'
	},
	{
		pattern: /yield\s*\*/,
		tag: 'YIELD_FROM'
	},
	{pattern: '!'},
	{pattern: '?'},
	{pattern: ':'},
	{pattern: ','},
	{pattern: "*"},
	{pattern: "~"},
	{pattern: "&"},
	{pattern: "+"},
	{pattern: "-"},
	{pattern: "%"},
	{pattern: "/"},
	{pattern: "//"},
	{pattern: "^"},
	{pattern: "==", tag: 'COMPARE'},
	{pattern: "!=", tag: 'COMPARE'},
	{pattern: ">=", tag: 'COMPARE'},
	{pattern: "<=", tag: 'COMPARE'},
	{pattern: ">", tag: 'COMPARE'},
	{pattern: "<", tag: 'COMPARE'},
	{pattern: "@"},
	{pattern: '--'},
	{pattern: '++'},
	{pattern: '|<', tag: 'RETURN_LEFT'},
	{pattern: '>|', tag: 'RETURN_RIGHT'},
	{pattern: '<<', tag: 'YIELD_LEFT'},
	{pattern: '>>', tag: 'YIELD_RIGHT'},
	{pattern: /<<\s*\*/, tag: 'YF_LEFT'},
	{pattern: /\*\s*>>/, tag: 'YF_RIGHT'}
];


function Cursor(csrc) {
	var i = 0, apis = new Set();
	var x = 0, lines = [];
	var buffered = false, cbuff = [];
	var that = this;

	function getc(index) {
		let c = csrc.get(index);
		if (c === null) {
			throw new Error('Index out of range!');
		} else return c;
	}

	function add(c) {
		for (var api of apis) {
			api.add(c);
		}
	}

	function remove() {
		for (var api of apis) {
			api.remove();
		}
	}

	this.recorder = function() {
		var chars = [];

		var api = {
			add: function(c) {
				chars.push(c);
			},
			remove: function() {
				chars.pop();
			}
		};

		apis.add(api);

		return {
			done: function() {
				apis.delete(api);
				return chars.join("");
			}
		}
	}

	this.next = function() {
		var c = getc(i);
		this.forward(true);
		return c;
	}

	this.back = function() {
		this.backward(true);
		return getc(i);
	}

	this.forward = function(record) {
		var c = getc(i++);
		if (c === '\n') {
			lines.push(x);
			x = 0;
		} else {
			x++;
		}

		if (record) add(c);
	}

	this.backward = function(record) {
		var c = getc(--i);
		if (c === '\n') {
			x = lines.pop();
		} else {
			x--;
		}
		if (record) remove();
	}

	this.end = function() {
		return csrc.get(i) === null;
	}

	this.position = function() {
		return [x, lines.length];
	}
}

function keywordType(token) {
	if (token.tag === token.value.toUpperCase()) {
		if (JSL_KW.has(token.value))
			return 'bz';
		if (JS_KW.has(token.value))
			return 'js';
	}

	return null;
}

function Token(value, tag, pos) {
	this.position = pos || [null, null];
	this.begin = false;
	this.value = value;
	this.tag = tag || value;
	this.rule = null;
	this.getPosition = function() {
	    var
	    x = this.position[0],
	    y = this.position[1];
	    for(let i = 0; i < value.length; i++) {
	        let c = value[i];
	        if (c === '\n') {
	            x = 0;
	            y++;
	        } else {
	            x++;
	        }
	    }

	    return {
            first_column: this.position[0],
            first_line: this.position[1],
            last_column: x,
            last_line: y
	    }
	}
}

Token.prototype.fetch = function(cursor) {
	return this.rule.fetch.apply(this, [cursor]);
}

function getInterpolationTokens(cursor) {
	var tokens = [], indent = 0;
	for (let token of getTokensFromCursor(cursor)) {
		if (token.tag === 'EOF') {
			throw new Error("Unexpected EOF!!!");
		}

		if (token.tag === '{')  {
			indent++;
		}

		if (token.tag === '}') {
			if (indent === 0) {
				return tokens;
			} else {
				indent--;
			}
		}

		tokens.push(token);
	}
}

function* getTokensFromCursor(cursor) {
	var
	pos         = [0, 0],
	match 		= null,
	prevmatch 	= null,
	threshold 	= 3,
	stress 		= 0,
	trail		= [],
	token 		= "";

	while (!cursor.end()) {
		let
		c = cursor.next(),
		ended = cursor.end();

		token += c;
		match = findMatch(token, trail, prevmatch);

		if (ended) {
			if (match) { // last token to be generated
			    match.position = pos;
				trail.push(match.tag);
				yield match;
				break;
			} else if (prevmatch === null) {
				throw new Error("No tokens found!");
			}
		}

		if (match === null) {
			if (prevmatch !== null) {

				stress++;
				if (stress === threshold || ended){
					while (stress > 0) {
						cursor.back();
						stress--;
					}

					if (prevmatch.begin)
						prevmatch.fetch(cursor);

					prevmatch.position = pos;
                    pos = cursor.position();

					trail.push(prevmatch.tag);
					yield prevmatch;

					prevmatch = null;
					token = "";
				}
			}
		} else {
			stress = 0;
			prevmatch = match;
		}
	}
}

function hardmatch(reggie, string) {
	var match = string.match(reggie);
	return match !== null && string === match[0];
}

function findMatch(text, trail, prev) {
	if (prev !== null && prev.rule.final)
		return null;

	for (var i = 0; i < total.length; i++) {
		let rule = total[i];
		if (rule.pattern instanceof RegExp) {
			if (!hardmatch(rule.pattern, text))
				continue;
		} else {
			if (rule.pattern !== text)
				continue;
		}

		if ('test' in rule) {
			if (!rule.test(text, trail, prev))
				continue;
		}

		let token;
		if ('fetch' in rule) {
			token = new Token(text, rule.tag);
			token.begin = true;
			token.rule = rule;
			return token;
		} else {
			if ('tag' in rule) {
				if (rule.tag instanceof Function) {
					token = new Token(text, rule.tag(text))
				} else {
					token = new Token(text, rule.tag);
				}
			} else {
				token = new Token(text);
			}

			token.rule = rule;
		}

		if ('process' in rule) {
			rule.process(token);
		}

		return token;
	}

	return null;
}

function getTokensFromSource(csrc) {
	var cursor = new Cursor(csrc);
	return getTokensFromCursor(cursor);
}

const filters = [];

function pgen(gen) {
	if (gen instanceof PeekableGenerator) {
		return gen;
	} else {
		return new PeekableGenerator(gen);
	}
}

const symmetric = {
	'{':'}',
	'[':']',
	'(':')'
};

const reverseSymetric = {};
for (let key in symmetric) {
	reverseSymetric[symmetric[key]] = key;
}

function virtualAfter(token, tag) {
	tag = tag || token.tag;
	let pos = token.getPosition();
	return new Token('', tag, [
		pos.last_column,
		pos.last_line
	]);
}

function virtualBefore(token, tag) {
	tag = tag || token.tag;
	return new Token('', tag, token.position);
}

function getIndent(token) {
	let i = token.value.length;
	let tabbing = 0;
	while (i --> 0) {
		if (token.value[i] === '\n') {
			return tabbing;
		} else {
			tabbing++;
		}
	}
}

function* getEnd(gen, begin) {
	gen = pgen(gen);
	var end = symmetric[begin];
	var indent = 0, arrr = [];
	for (var token of gen) {
		arrr.push(`${token.tag}:${token.value}`);
		if (token.tag === end) {
			if (indent === 0) {
				return token;
			}
			else indent--;
		}

		if (token.tag === begin) {
			indent++;
		}

		yield token;
	}

	throw new Error('No end token found');
}


function* getIndentEnd(gen, token) {
	gen = pgen(gen);
	let
	skipyield = false,
	indent = getIndent(token);

	for (let token of gen) {
		let tag = token.tag;
		if (tag in symmetric) {
			yield token;
			let end = yield* getEnd(gen, tag);
			yield end;
			skipyield = true;
		}

		if (!skipyield)
			yield token;
		else
			skipyield = false;

		let lookahead = gen.peek();
		if (!lookahead.value)
			throw new Error('This should not happen!');
		else {
			let future = lookahead.value;
			if (future.tag in reverseSymetric) {
				return future;
			}

			if (future.tag === 'ENDLN' && getIndent(future) < indent) {
				return future;
			}

			if (future.tag === 'BLOCK_RIGHT') {
				return future;
			}

			if (future.tag === 'EOF') {
				return future;
			}
		}
	}

	throw new Error('No end of indentation found');
}

function nextValue(iterator) {
	var ctrl = iterator.next();

	if (ctrl.done) return null;
	else return ctrl.value;
}

function endlnFilterFactory(before, after) {
	function* filterWhitespaceAfter(gen) {
		gen = pgen(gen);
		var filter = false;
		for (let token of gen) {
			if (filter) {
				filter = false;
				if (token.tag === 'ENDLN') continue;
			}

			if (after.has(token.tag)) {
				filter = true;
			}

			yield token;
		}
	}

	// filter whitespace
	return function* (gen) {
		gen = pgen(gen);
		var seenendln = false, endln;

		for (let token of filterWhitespaceAfter(gen)) {
			if (token.tag === 'ENDLN') {
				seenendln = true;
				endln = token;
				continue;
			}

			if (seenendln && !before.has(token.tag)) {
				yield endln;
			}

			seenendln = false;
			yield token;
		}
	}
}


filters.push(endlnFilterFactory(
	new Set(['END_COMMENT']),
	new Set()
	));

filters.push(function* (gen) {
	gen = pgen(gen);
	for (var token of gen) {
		if (token.tag === 'WHITESPACE') continue;
		if (token.tag === 'END_COMMENT') continue;

		yield token;
	}

	yield virtualAfter(token, 'EOF');
});

{
	const after = new Set([
		'ASSIGN',
		'ACCESS',
		'CONST',
		'VAR',
		'STATIC',
		',',
		'[',
		'(',
		'{'
	]);

	const before = new Set([
		'ASSIGN',
		'ACCESS',
		',',
		']',
		')',
		'}'
	]);

	filters.push(endlnFilterFactory(before, after));
}

{
	// demote's all keyword tokens to name tokens if after '.' or before ':'
	filters.push(function*(gen){
		gen = pgen(gen);
		let prev = null;
		for (let token of gen) {
			let kwtype = keywordType(token);
			if (kwtype !== null) {
				if (prev !== null && prev.tag === 'ACCESS') {
					token.tag = 'NAME';
				}

				let next = gen.peek();
				if (!next.done && next.value.tag === ':') {
					token.tag = 'NAME';
				}
			}

			yield token;
			prev = token;
		}
	});
}


{
    const block = {
    	left: 'BLOCK_LEFT',
    	right: 'BLOCK_RIGHT'
    };

	function* fnGen(gen) {
		gen = pgen(gen);
		var end, after = nextValue(gen);
		if (after.tag === '{') {
			after.tag = block.left;
			yield after;
			end = yield* sub(getEnd(gen, '{'));
			end.tag = block.right;
			yield end;
		} else if (after.tag === 'ENDLN') {
			yield virtualBefore(after, block.left);
			yield after;
			end = yield* sub(getIndentEnd(gen, after));
			yield virtualBefore(end, block.right);
		} else {
			switch(after.tag) {
				case '*':
				after.tag = 'FUNC_TYPE_GENERATOR';
				yield after;
				break;

				case '~':
				after.tag = 'FUNC_TYPE_ASYNC';
				yield after;
				break;

				case 'FUNC_TYPE_AGEN':
				yield after;
				break;

				default:
				yield after;
				return;
			}

			after = nextValue(gen);
			if (after.tag === '{') {
				after.tag = block.left;
				yield after;
				end = yield* sub(getEnd(gen, '{'));
				end.tag = block.right;
				yield end;
			} else if (after.tag === 'ENDLN') {
				yield virtualBefore(after, block.left);
				yield after;
				end = yield* sub(getIndentEnd(gen, after));
				yield virtualBefore(end, block.right);
			} else {
				throw new Error(
					'Only ordinary one line functions allowed!'
					);
			}
		}
	}

	function* directAfterGen(gen) {
		gen = pgen(gen);

		var
		end,
		token 	= nextValue(gen);

		if (token.tag in obj) {
			let func = obj[token.tag];

			yield token;
			yield* func(gen);
			return
		}

		if (implicitDef.has(token.tag)) {
			yield token;
			return;
		}

		if (token.tag === '{') {
			token.tag = block.left;
			yield token;
			end = yield* sub(getEnd(gen, '{'));
			end.tag = block.right;
			yield end;
		} else if (token.tag === 'ENDLN') {
			yield virtualBefore(token, block.left);
			yield token;
			end = yield* sub(getIndentEnd(gen, token));
			yield virtualBefore(end, block.right);
		} else
			throw new Error(`Unrecognized token: ${token.tag}(${token.value})!`);
	}

	function* afterExpressionGen(gen) {
		gen = pgen(gen);

		let first = true;
		for (var token of gen) {
			if (token.tag === '{' && !first) {
				token.tag = block.left;
				yield token;
				let end = yield* sub(getEnd(gen, '{'));
				end.tag = block.right;
				yield end;
				return;
			} else if (token.tag === 'ENDLN') {
				yield virtualBefore(token, block.left);
				yield token;
				let end = yield* sub(getIndentEnd(gen, token));
				yield virtualBefore(end, block.right);
				return;
			}

			first = false;

			yield token;

			if (token.tag in symmetric) {
				yield yield* sub(getEnd(gen, token.tag));
				continue;
			}

			if (token.tag in obj) {
				let func = obj[token.tag];
				yield* func(gen);
				return;
			}

			if (implicitDef.has(token.tag))
				return;
		}
	}

	function* sub(gen) {
		gen = pgen(gen);
		while (true) {
			let token, next = gen.next();
			if (next.done) {
				return next.value;
			} else token = next.value;

			yield token;
			if (token.tag in obj) {
				let func = obj[token.tag];
				yield* func(gen);
			}

			if (token.tag in symmetric) {
				yield yield* sub(getEnd(gen, token.tag));
			}
		}
	}

	const implicitDef = new Set([
		'IF',
		'WHILE',
		'FOR',
		'TRY'
	]);


	const afterExpression = new Set([
		'IF',
		'CATCH',
		'WHILE',
		'IN',
		'ON'
	]);

	const directAfter = new Set([
		'ELSE',
		'TRY',
		'FINALLY'
	]);

	const fn = new Set([
		'B_FUNC',
		'UB_FUNC',
		'DO'
	]);

	var obj = {};

	for (let header of afterExpression) {
		obj[header] = afterExpressionGen;
	}

	for (let header of directAfter) {
		obj[header] = directAfterGen;
	}

	for (let header of fn) {
		obj[header] = fnGen;
	}

	// tag block delimiters
	filters.push(function* (gen) {
		gen = pgen(gen);
		for (var token of gen) {
			yield token;
			if (token.tag in obj) {
				let func = obj[token.tag];
				yield* func(gen);
			}
		}
	});
}

{
	filters.push(function* (gen) {
	    for (let token of pgen(gen)) {
	    	if (token.tag === 'EOF')
	    		return;
	    	else
	    		yield token;
	    }
	});
}

{
	filters.push(endlnFilterFactory(
		new Set(['ELSE', 'CATCH', 'FINALLY', 'BLOCK_RIGHT']),
		new Set(['BLOCK_LEFT'])
		));
}

{
	const START = new Set(['UB_FUNC', 'B_FUNC']);
	function tagPair(pair) {
		pair.left.tag = 'PARAM_LEFT';
		pair.right.tag = 'PARAM_RIGHT';
	}

	function parenPair() {
		return {
			left: null,
			right: null,
			index: null
		};
	}

	function last(list) {
		if (list.length === 0) {
			throw new Error('Empty list!');
		}
		return list[list.length - 1];
	}

	function collect(gen, list) {
		var indent = 0;
		var map = new Map();
		var pair = parenPair();

		pair.left = list[0];
		map.set(0, [pair]);

		for (let token of gen) {
			list.push(token);

			if (token.tag === ')') {
				let pair = last(map.get(indent));
				pair.right = token;
				pair.index = list.length - 1;

				if (indent === 0) {
					return map;
				} else indent--;
			}

			if (token.tag === '(') {
				let pp = parenPair();
				pp.left = token;
				indent++;

				if (!map.has(indent)) {
					map.set(indent, []);
				}

				map.get(indent).push(pp);
			}
		}

		throw new Error('Unclosed parenthesis!');
	}


	// identify parameter delimiters
	filters.push(function* (gen) {
		gen = pgen(gen);
		for (var token of gen) {
			if (token.tag === '(') {
				let list = [token];
				let map = collect(gen, list);
				let next = gen.next();

				if (next.done) token = null;
				else token = next.value;
				{
					let i = map.size;
					while (0 <-- i) {
						for (let ppair of map.get(i)) {
							if (START.has(list[ppair.index + 1].tag)) {
								tagPair(ppair);
							}
						}
					}

					if (token !== null && START.has(token.tag)) {
						tagPair(map.get(0)[0]);
					}

					yield* list[Symbol.iterator]();
				}

				if (next.done) return;
			}

			yield token;
		}
	});
}

{
	const precedeOp = new Set([
		'NAME',
		'SUPER',
		'THIS',
		'@',
		'BLOCK_RIGHT',
		'INDEX_RIGHT',
		'CALL_RIGHT',
		'?',
		')',
		'}',
		']'
	]);

	function* defineSymmetric(gen, prev) {
		gen = pgen(gen);
		let token, prevtag = prev || null;
		while(true) {
			let ctrl = gen.next();
			if (ctrl.done) return ctrl.value;
			else token = ctrl.value;

			if (token.tag === '(') {
				let end, has = precedeOp.has(prevtag);

				if (has) token.tag = 'CALL_LEFT';
				yield token;
				token = yield* defineSymmetric(getEnd(gen, '('), '(');
				if (has) token.tag = 'CALL_RIGHT';
			}

			if (token.tag === '[') {
				let end, has = precedeOp.has(prevtag);

				if (has) token.tag = 'INDEX_LEFT';
				yield token;
				token = yield* defineSymmetric(getEnd(gen, '['), '[');
				if (has) token.tag = 'INDEX_RIGHT';
			}

			yield token;
			prevtag = token.tag;
		}
	}


	// identifies calls and indexes
	filters.push(function(gen) {
		return defineSymmetric(gen, null);
	});
}

{
	const pre = new Set([
		'ASSIGN'
	]);

	const post = new Set([
		'FOR',
		'CATCH',
		'AS'
	]);

	const unindent = new Set([
		'BLOCK_RIGHT',
		'INDEX_RIGHT',
		'CALL_RIGHT',
		'PARAM_RIGHT',
		'OP_RIGHT',
		'AP_RIGHT',
		']',
		')',
		'}'
	]);

	const indent = new Set([
		'BLOCK_LEFT',
		'INDEX_LEFT',
		'CALL_LEFT',
		'PARAM_LEFT',
		'OP_LEFT',
		'AP_LEFT',
		'[',
		'(',
		'{'
	]);

	function* resolveAP(iter, tkn) {
		iter = pgen(iter);
		tkn.tag = 'AP_LEFT';
		yield tkn;
		for (let token of iter) {
			let end;

			if (token.tag === '{') {
				yield* resolveOP(iter, token);
			} else if (token.tag === '[') {
				yield* resolveAP(iter, token);
			} else {
				yield token;
			}

			if (token.tag === 'SPLAT') continue;

			end = yield* tagAssignables(nextTag(iter, ',', 'AP_RIGHT'));
			if (end)
				return;
			else
				continue;
		}
	}

	function* resolveOP(iter, tkn) {
		iter = pgen(iter);
		tkn.tag = 'OP_LEFT';
		yield tkn;
		for (let token of iter) {
			let end;
			if (token.tag === '{') {
				yield* resolveOP(iter, token);
			} else if (token.tag === '[') {
				yield* resolveAP(iter, token);
			} else {
				yield token;
			}

			if (token.tag === 'OP_RIGHT') return;

			end = yield* tagAssignables(nextTag(iter, ':', 'OP_RIGHT'));
			if (end)
				return;
			else
				continue;
		}
	}

	function* resolvePA(iter, tkn) {
		iter = pgen(iter);
		tkn.tag = 'PARAM_LEFT';
		yield tkn;
		for (let token of iter) {
			let end;

			if (token.tag === '{') {
				yield* resolveOP(iter, token);
			} else if (token.tag === '[') {
				yield* resolveAP(iter, token);
			} else {
				yield token;
			}

			if (token.tag === 'PARAM_RIGHT') return;

			if (token.tag === 'SPLAT') continue;

			end = yield* tagAssignables(nextTag(iter, ',', 'PARAM_RIGHT'));
			if (end)
				return;
			else
				continue;
		}
	}

	function* nextTag(gen, char, endtag) {
		gen = pgen(gen);
		let depth = 0;
		for (let token of gen) {
			if (depth === 0) {
				if (token.tag === char) {
					yield token;
					return false;
				}

				if (unindent.has(token.tag)) {
					token.tag = endtag;
					yield token;
					return true;
				}

				if (token.tag === 'ASSIGN')
					token.tag = 'DEFVAL';
			}

			yield token;

			if (indent.has(token.tag)) {
				depth++;
				continue;
			}

			if (unindent.has(token.tag)) {
				depth--;
			}
		}
	}

	function* tagAssignables(gen) {
		gen = pgen(gen);
		while (true) {
			let token, ctrl = gen.next();
			if (ctrl.done) return ctrl.value;
			else token = ctrl.value;

			if (token.tag === 'PARAM_LEFT') {
				yield* resolvePA(gen, token, 'PARAM_LEFT');
				continue;
			}

			if (post.has(token.tag)) {
				yield token;
				for (let tkn of gen) {
					if (tkn.tag === '(') {
						yield tkn;
					} else {
						if (tkn.tag === '{') {
							yield* resolveOP(gen, tkn);
						} else if (tkn.tag === '[') {
							yield* resolveAP(gen, tkn);
						} else {
							yield tkn;
							break;
						}
					}
				}

				continue;
			}

			if (token.tag === '{' || token.tag === '[') {
				let pee, array = [], sgen = getEnd(gen, token.tag);

				while (true) {
					let ctrl = sgen.next();
					array.push(ctrl.value)
					if (ctrl.done) break;
				}

				pee = gen.peek();
				if (!pee.done && pre.has(pee.value.tag)) {
					if (token.tag === '{') yield* resolveOP(array[Symbol.iterator](), token);
					if (token.tag === '[') yield* resolveAP(array[Symbol.iterator](), token);
				} else {
					let end = array.pop();
					yield  token;
					yield* tagAssignables(array[Symbol.iterator]());
					yield  end;
				}
				continue;
			}

			yield token;
		}
	}

	// identifies the []{}s for assignables as opposed to normal objects and arrays
	filters.push(function(gen) {
		return tagAssignables(gen);
	});
}

{
	// identifies curly brackets that are module import sets and tags * as all
	filters.push(function*(gen) {
		gen = pgen(gen);
		let importmode = false, buff = [];
		for (let token of gen) {
			if (token.tag === 'IMPORT') {
				importmode = true;
				yield token;
				continue;
			}

			if (token.tag === 'FROM') {
				importmode = false;

				yield token;
				continue;
			}

			if (token.tag === '*') {
				if (importmode) token.tag = 'ALL';
				yield token;
				continue;
			}

			if (token.tag === '{') {
				if (!importmode) {
					yield token;
					continue;
				}
				token.tag = 'MOD_LEFT';
				yield token;
				let end = yield* getEnd(gen, '{');
				end.tag = 'MOD_RIGHT';
				yield end;
				continue;
			}

			yield token;
		}
	});
}

{
	let tagStuff = function*(gen) {
		gen = pgen(gen);
		let val = nextValue(gen);
		if (val.tag === '*') {
			val.tag = 'ALL';
			yield val;
			return;
		}

		if (val.tag === '{') {
			val.tag = 'EXP_LEFT';
			yield val;
			let end = yield* getEnd(gen, '{');
			end.tag = 'EXP_RIGHT';
			yield end;
			return;
		}

		yield val;
		return;
	}

	// identifies curly brackets belonging to export sets, and tags * as 'ALL'
	filters.push(function*(gen) {
		gen = pgen(gen);
		for (let token of gen) {
			yield token;

			if (token.tag === 'EXPORT') {
				yield* tagStuff(gen);
			}
		}
	});
}

{
	const declarative = new Set([
		'VAR',
		'CONST'
	]);

	filters.push(function*(gen) {
		gen = pgen(gen);
		let prev = null;
		for (let token of gen) {
			if (prev === null && token.tag !== 'ENDLN') {
				yield virtualBefore(token, 'ENDLN');
			}

			if (token.tag === ',' && declarative.has(prev)) {
				continue;
			}

			yield token;
			prev = token.tag;
		}
	});
}

{
	// distiguishes between '?'s before call parens or index brackets
	filters.push(function*(gen) {
		gen = pgen(gen);
		for (let token of gen) {
			if (token.tag === '?') {
				const next = gen.peek();
				if (!!next.value) {
					if (next.value.tag === 'ACCESS') {
						token.tag = 'Q_ACCESS';
					}
					if (next.value.tag === 'CALL_LEFT') {
						token.tag = 'Q_CALL';
					}

					if (next.value.tag === 'INDEX_LEFT') {
						token.tag = 'Q_INDEX';
					}
				}
			}

			yield token;
		}
	});
}

{
	// downgrade keyword "$" to name if it precedes following block
	// statement types
	const postval = new Set([
		'IF',
		'FOR',
		'WHILE',
		'TRY',
		'DO'
	]);

	filters.push(function*(gen) {
		gen = pgen(gen);
		var prev = null;

		for (let token of gen) {
			if (token.tag === 'EOF') {
				yield token;
				return;
			}

			if (token.tag === 'ENDLN') {
				if (prev === '$') {
					const next = gen.peek();
					if (postval.has(next.value.tag)) {
						prev = token.tag;
						continue;
					}
				}
			}
			yield token;

			prev = token.tag;
		}
	})

	filters.push(function*(gen) {
		gen = pgen(gen);
		for (let token of gen) {
			if (token.tag === 'EOF') {
				yield token;
				return;
			}

			if (token.tag === '$') {
				const next = gen.peek();
				if (!postval.has(next.value.tag)) {
					token.tag = 'NAME';
				}
			}
			yield token;
		}
	});
}

{
	// demote get, set keywords when not infront of name tokens
	filters.push(function*(gen) {
		gen = pgen(gen);

		for (let token of gen) {
			if (token.tag === 'EOF') {
				yield token;
				return;
			}

			if (token.tag === 'GET' || token.tag === 'SET') {
				const next = gen.peek();
				if (next.value.tag !== 'NAME') {
					token.tag = 'NAME';
				}
			}
			yield token;
		}
	});
}

function tokenizeCharSrc(csrc) {
	return refineTokens(getTokensFromSource(csrc), csrc);
}

function refineTokens(iterable, src) {
	let filtered = iterable;
	for (let filter of filters) {
		filtered = filter(filtered);
	}
	return filtered;
}

function repeat(str, n) {
	let string = "";
	while (n --> 0) {
		string += str;
	}

	return string;
}

function addSpacing(text, n) {
	let an = n - (text + "").length;

	return text + repeat(' ', an);
}

class Line {
	constructor(string, tabbing) {
		let array = [];
		let offset = 0;
		for (let c of string) {
			if (c === '\t') {
				let tab = tabbing - offset % tabbing;
				offset += tab;
				array.push(repeat(' ', tab));
			} else {
				offset += 1;
				array.push(c);
			}
		}

		this._tabbed = string.split();
		this._untabbed = array;
	}

	// maps index to a line
	map(index) {
		let mi = 0;
		for (let i = 0; i < index; i++) {
			mi += this._untabbed[i].length;
		}

		return mi;
	}

	unmap(index) {
		let mi = 0;
		for (let i = 0; i < index; i++) {
			mi += this._untabbed[i].length;
			if (mi > index) {
				return i;
			}
		}

		throw new Error('Index out of range!');
	}

	get tabbed() {
		return this._tabbed.join('');
	}

	get untabbed() {
		return this._untabbed.join('');
	}
}

class Lines {
	constructor(csrc, tabbing) {
		this._csrc = csrc;
		this.tabbing = tabbing;
	}

	* [Symbol.iterator] () {
		let i = 0, line = "";
		for (let c of this._csrc) {
			if (c === '\n') {
				yield new Line(line, this.tabbing);
				line = "";
			} else {
				line += c;
			}
		}

		yield new Line(line, this.tabbing);
	}

	error(text, xy, output, raise) {
		const
			x = xy[0]
		,	y = xy[1]
		;

        let i = 0;
        let filename = this._csrc.filename || null;
        output 	= output || console;
        raise 	= !!raise

        if (raise) {
            if (filename === null)
                throw new Error(`Syntax error at position ${x},${y+1} in VM:\n\t${text}`);
            else
                throw new Error(`Syntax error at position ${x},${y+1} in file '${filename}':\n\t${text}`);
        }

        if (filename === null)
        	output.log(`SyntaxError: ${text}\n\ton line ${y + 1} in VM:`);
        else
        	output.log(`SyntaxError: ${text}\n\ton line ${y + 1} in file '${filename}'`);
        output.log();
        output.log();


        for (let line of this) {
            if (Math.abs(i - y) < 6) {
                output.log(`${addSpacing(i + 1, 6)}|\t\t${line.untabbed}`);

                if (i === y) {
                    let offset = line.map(x);
                    output.log(`${addSpacing('', 6)} \t\t${repeat(' ', offset)}^`);
                }
            }

            i++;
        }

        process.exit();
	}
}

class CharSource {
	[Symbol.iterator] () {
		var i = 0;
		return {
			next() {
				let c = this.get(i++);
				return {
					done: (c === null || c === undefined),
					value: c
				};
			}
		}
	}

	get() {
		throw new Error("'get' method must be implemented on all CharSource inheritors!");
	}
}

class StringSource extends CharSource {
	constructor(string) {
		super();

		this._length = string.length;
		this._string = string;
	}

	get(i) {
		if (i < this._length) {
			return this._string[i];
		} else {
			return null;
		}
	}
}

const logicalOperator$1 = new Set([
	"||",
	"&&"
]);

const assignmentOperator$1 = new Set([
	"=",
	"+=",
	"-=",
	"*=",
	"/=",
	"%=",
	"<<=",
	">>=",
	">>>=",
	"|=",
	"^=",
	"&="
]);

function assertLogicalOperator$1(operator) {
	if (logicalOperator$1.has(operator)) {
		return operator;
	} else {
		throw new Error(`Operator "${operator}" not logical!`);
	}
}

function assertAssignmentOperator$1(operator) {
	if (assignmentOperator$1.has(operator)) {
		return operator;
	} else {
		throw new Error(`Operator "${operator}" not assignment!`);
	}
}

class Node$1 {
	constructor() {
		// the .split('$')[0] adds rollup compatibility
		this.type = this.constructor.name.split('$')[0];
		this.loc = null;
	}

	[Symbol.iterator] () {
		var value = this, done = false;
		return {
			next() {
				if (!done) {
					done = true;
					return {done: false, value};
				} else {
					return {done}
				}
			}
		};
	}

	toJS(o) {
		return this;
	}

	from(origin) {
		var [left, up, right, down] = origin.position;
		this.loc = {
			source: origin.program.meta.source,
			start: {
				column: left,
				line: up + 1
			},
			end: {
				column: right,
				line: down + 1
			}
		};

		return this;
	}
}

class Program$1 extends Node$1 {
	constructor(statements) {
		super();
		this.body = statements;
	}
}

class Statement$1 extends Node$1 {

}

class EmptyStatement extends Statement$1 {

}

class BlockStatement$1 extends Statement$1 {
	constructor(statements) {
		super();
		this.body = statements;
	}
}

class ExpressionStatement$1 extends Statement$1 {
	constructor(expression) {
		super();
		this.expression = expression;
	}
}

class IfStatement$1 extends Statement$1 {
	constructor(test, consequent, alternate) {
		super();
		this.test = test;
		this.consequent = consequent;
		this.alternate = alternate;
	}
}


class BreakStatement$1 extends Statement$1 {
	constructor(label = null) {
		super();
		this.label = label;
	}
}

class ContinueStatement$1 extends Statement$1 {
	constructor(label = null) {
		super();
		this.label = label;
	}
}

class LabeledStatement extends Statement$1 {
	constructor(label, body) {
		super();
		this.label = label;
		this.body = body;
	}
}

class ReturnStatement$1 extends Statement$1 {
	constructor(argument) {
		super();
		this.argument = argument;
	}
}

class ThrowStatement$1 extends Statement$1 {
	constructor(argument) {
		super();
		this.argument = argument;
	}
}

class TryStatement$1 extends Statement$1 {
	constructor(block, handler = null, finalizer = null) {
		super();
		this.block = block;
		this.handler = handler;
		this.finalizer = finalizer;
	}
}

class WhileStatement$1 extends Statement$1 {
	constructor(test, body) {
		super();
		this.test = test;
		this.body = body;
	}
}

class ForStatement$1 extends Statement$1 {
	constructor(body, init = null, test = null, update = null) {
		super();
		this.body = body;
		this.init = init;
		this.test = test;
		this.update = update;
	}
}

class ForInStatement extends Statement$1 {
	constructor(body, left, right) {
		super();
		this.body = body;
		this.left = left;
		this.right = right;
	}
}

class ForOfStatement extends ForInStatement {
	constructor(body, left, right) {
		super(body, left, right);
	}
}

class Declaration$1 extends Statement$1 {

}

class VariableDeclaration$1 extends Declaration$1 {
	constructor(declarations, kind) {
		super();
		this.declarations = declarations;
		this.kind = kind;
	}
}

class VariableDeclarator$1 extends Node$1 {
	constructor(id, init = null) {
		super();
		this.id = id;
		this.init = init;
	}
}

class Expression$1 extends Node$1 {

}

class ThisExpression$1 extends Expression$1 {

}

class ArrayExpression$1 extends Expression$1 {
	constructor(elements) {
		super();
		this.elements = elements;
	}
}

class ObjectExpression$1 extends Expression$1 {
	constructor(properties) {
		super();
		this.properties = properties;
	}
}

class Property$1 extends Node$1 {
	constructor(key, value, kind = 'init', method = false) {
		super();
		this.key = key;
		this.value = value;
		this.kind = kind;
		this.method = method;
	}
}

class FunctionExpression$1 extends Expression$1 {
	constructor(id, params, body, generator = false) {
		super();
		this.id = id;
		this.params = params;
		this.body = body;
		this.generator = generator;
	}
}

class Super$1 extends Node$1 {

}

class ClassExpression$1 extends Expression$1 {
	constructor(id = null, superClass = null, body = []) {
		super();

		this.id = id;
		this.superClass = superClass;
		this.body = new ClassBody(body);
	}
}

class ClassBody extends Node$1 {
	constructor(body) {
		super();
		this.body = body;
	}
}

class MethodDefinition$1 extends Node$1 {
	constructor(key, value, kind = "method", computed = false, isStatic = false) {
		super();

		this.key = key;
		this.value = value;
		this.kind = kind;
		this.computed = computed;
		this.static = isStatic;
	}
}

class SequenceExpression$1 extends Expression$1 {
	constructor(expressions) {
		super();
		this.expressions = expressions;
	}
}

class UnaryExpression$1 extends Expression$1 {
	constructor(operator, argument, prefix = true) {
		super();
		this.operator = operator;
		this.argument = argument;
		this.prefix = prefix;
	}
}

class BinaryExpression$1 extends Expression$1 {
	constructor(operator, left, right) {
		super();
		this.operator = operator;
		this.left = left;
		this.right = right;
	}
}

class AssignmentExpression$1 extends Expression$1 {
	constructor(operator, left, right) {
		super();
		this.operator = assertAssignmentOperator$1(operator);
		this.left = left;
		this.right = right;
	}
}

class LogicalExpression$1 extends Expression$1 {
	constructor(operator, left, right) {
		super();
		this.operator = assertLogicalOperator$1(operator);
		this.left = left;
		this.right = right;
	}
}

class ConditionalExpression extends Expression$1 {
	constructor(test, consequent, alternate) {
		super();
		this.test = test;
		this.consequent = consequent;
		this.alternate = alternate;
	}
}

class CallExpression$1 extends Expression$1 {
	constructor(callee, args) {
		super();
		this.callee = callee;
		this.arguments = args;
	}
}

class NewExpression$1 extends CallExpression$1 {

}

class MemberExpression$1 extends Expression$1 {
	constructor(object, property, computed = false) {
		super();
		this.object = object;
		this.property = property;
		this.computed = computed;
	}
}

class Pattern$1 extends Node$1 {

}

class SpreadElement$1 extends Node$1 {
	constructor(argument) {
		super();
		this.argument = argument;
	}
}


class CatchClause$1 extends Node$1 {
	constructor(param, body) {
		super();
		this.param = param;
		this.body = body;
	}
}

class Identifier$1 extends Pattern$1 {
	constructor(name) {
		super();
		this.name = name;
	}
}

class Literal$1 extends Expression$1 {
	constructor(value) {
		super();
		this.value = value;
	}
}


// like properties but used in object patterns
class AssignmentProperty extends Property$1 {
	constructor(key, value) {
		super(key, value, 'init', false);
		this.type = "Property";
	}
}


// ES6

class YieldExpression$1 extends Expression$1 {
	constructor(argument, delegate = false) {
		super();
		this.argument = argument;
		this.delegate = delegate;
	}
}

class ObjectPattern$1 extends Pattern$1 {
	constructor(properties) {
		super();
		this.properties = properties;
	}
}

class ArrayPattern$1 extends Pattern$1 {
	constructor(elements) {
		super();
		this.elements = elements;
	}
}

class RestElement extends Pattern$1 {
	constructor(argument) {
		super();
		this.argument = argument;
	}
}

class AssignmentPattern extends Pattern$1 {
	constructor(left, right) {
		super();

		this.left = left;
		this.right = right;
		this.operator = '=';
	}
}



class ModuleDeclaration$1 extends Node$1 {

}

class ModuleSpecifier$1 extends Node$1 {
	constructor(local) {
		super();

		this.local = local;
	}
}

class ImportDeclaration$1 extends ModuleDeclaration$1 {
	constructor(specifiers, source) {
		super();

		this.specifiers = specifiers;
		this.source = source;
	}
}


class ImportSpecifier$1 extends ModuleSpecifier$1 {
	constructor(local, imported = local) {
		super(local);

		this.imported = imported;
	}
}

class ImportDefaultSpecifier$1 extends ModuleSpecifier$1 {

}

class ImportNamespaceSpecifier$1 extends ModuleSpecifier$1 {

}







class ExportNamedDeclaration$1 extends ModuleDeclaration$1 {
	constructor(declaration = null, specifiers = [], source = null) {
		super();

		this.declaration = declaration;
		this.specifiers = specifiers;
		this.source = source;
	}
}

class ExportSpecifier$1 extends ModuleSpecifier$1 {
	constructor(local, exported = local) {
		super(local);

		this.exported = exported;
	}
}

class ExportDefaultDeclaration$1 extends ModuleDeclaration$1 {
	constructor(declaration) {
		super();

		this.declaration = declaration;
	}
}

function vargen(forbidden, name, add = true) {
	var varName = `_${name}`, i = 2;
	while (true) {
		if (!forbidden.has(varName)) {
			if (add) {
				forbidden.add(varName);
			}
			return varName;
		} else {
			varName = `_${name}${i}`;
			i++;
		}
	}
}

function getJSAssign(name, value, type) {
    let id = new Identifier$1(name);
    let assign = new AssignmentExpression$1(
        '=',
        id,
        value);
    if (type !== undefined && type !== null) {
        return new VariableDeclaration$1(
            [new VariableDeclarator$1(id, value)],
            type);
    } else {
        return new AssignmentExpression$1(
            '=',
            new Identifier$1(name),
            value);
    }
}

function getJSDeclare(pattern, jvalue, type) {
    type = type || 'const';
    if (pattern instanceof Node || pattern instanceof Identifier$1) {
        return new VariableDeclaration$1([
                new VariableDeclarator$1(pattern.toJS({}), jvalue)
            ], type);
    }

    if (pattern instanceof String) {
        return new VariableDeclaration$1([
                new VariableDeclarator$1(new Identifier$1(pattern), jvalue)
            ], type);
    }

    pattern.error('Invalid declaration type!');
}

function getJSMethodCall(names, args) {
    return new CallExpression$1(
        exports.getJSMemberExpression(names), args);
}

function getJSMemberExpression(names) {
    if (names.length === 0) {
        throw new Error('Must have at least one man!');
    } else {
        let lead = new Identifier$1(names[0]);
        for (let i = 1; i < names.length; i++) {
            lead = new MemberExpression$1(lead, new Identifier$1(names[i]));
        }

        return lead;
    }
}

const PKEY = Symbol('Program key');
const OKEY = Symbol('Options key');

const IGNORE = Symbol('Ingorable properties');

const EMPTY = new EmptyStatement();
const LIB_PATH = "bizubee lib";

const assignmentOperator = new Set([
    "=",
    "+=",
    "-=",
    "*=",
    "/=",
    "//=",
    "%=",
    "^=",
    "&="
]);

const updateOperator = new Set([
    "++",
    "--"
]);

const unaryOperators = new Set([
    '+',
    '-',
    'delete',
    '!'
]);

const convert = {
    // cuz JS's '==' operator is total sh**
    '==': '===',
    '!=': '!==',

    'OR': '||',
    'AND': '&&',
    'IS': 'instanceof',

    '&': '+'
};

const stringEscapeTable = {
    'n': '\n',
    'r': '\r',
    't': '\t',
    'b': '\b',
    'f': '\f'
};

const PARENT_KEY = Symbol('parent');
const POSITION_KEY = Symbol('position');

const nodeQueue = new Queue();


// string to js Identifier node
function strtoid(name) {
    return new Identifier$1(name);
}

function defined(val) {
    return val !== undefined && val !== null;
}

function assertAssignmentOperator(operator) {
    if (assignmentOperator.has(operator)) {
        return operator;
    } else {
        throw new Error(`Operator "${operator}" not assignment!`);
    }
}

function assertUpdateOperator(operator) {
    if (updateOperator.has(operator)) {
        return operator;
    } else {
        throw new Error(`Operator "${operator}" not update!`);
    }
}


function statement(jsExpr) {
    if (jsExpr instanceof Array) {
        let arr = [];
        for (let i = 0; i < jsExpr.length; i++) {
            arr.push(statement(jsExpr[i]));
        }

        return arr;
    }

    if (jsExpr instanceof Expression$1) {
        return new ExpressionStatement$1(jsExpr);
    } else {
        return jsExpr;
    }
}


function wrap(node) {
    if (node instanceof BlockStatement) {
        return node;
    } else {
        return new BlockStatement([node]).pos(node[POSITION_KEY]);
    }
}


class Node {
    constructor() {
        this[IGNORE] = new Set();
        this.type = this.constructor.name;
        this.loc = null;

        this.meta = {
            compiled: false
        };
    }

    getOpvars(n) {
        return this
        .getParentScope()
        .getOpvars(n);
    }

    freeOpvars(opvars) {
        return this
        .getParentScope()
        .freeOpvars(opvars);
    }

    onBuild() {
        for (var key in this) {
            const nd = this[key];
            if (nd instanceof Node) {
                nd[PARENT_KEY] = this;
                nd.onBuild();
                continue;
            }

            if (nd instanceof Array) {
                for (let node of nd) {
                    if (node instanceof Node) {
                        node[PARENT_KEY] = this;
                        node.onBuild();
                    }
                }
                continue;
            }
        }
    }

    * walk() {
        var ignore = this[IGNORE];
        outer:
        for (let key in this) {
            if (ignore.has(key))
                continue;

            let obj = this[key];
            if (obj instanceof Array) {
                for (let val of obj) {
                    if (!(val instanceof Node))
                        continue outer;

                    let nosearch = yield {key, value: val};
                    if (nosearch)
                        continue;

                    yield* val.walk();
                }
            } else if (obj instanceof Node) {
                let nosearch = yield {key, value: obj};
                if (nosearch)
                    continue;
                yield* obj.walk();
            }
        }
    }

    pos(left, right = null) {
        if (right === null) {
            this[POSITION_KEY] = left;
        } else {
            this[POSITION_KEY] = {
                first_column: left.first_column,
                first_line: left.first_line,
                last_column: right.last_column,
                last_line: right.last_line
            }
        }
        return this;
    }

    toJS(o) {
        if (this.meta.compiled) {
            this.error(`Cannot recompile ${this.constructor.name} node!`);
            throw new Error('Cannot compile node more than once!');
        } else {
            this.meta.compiled = true;
            return this._toJS(o);
        }
    }

    // make sure this method is implemented for all node subclasses
    _toJS(o) {
        this.error('Method "toJS" not implemented!');
    }

    getParentScope() {
        let parent = this.parent;
        while (true) {
            if (parent instanceof Scope) {
                return parent;
            } else {
                parent = parent.parent;
            }
        }
    }

    getParentBlock() {
        let block = this.getParentScope();
        if (block instanceof Program) {
            return null;
        } else {
            return block;
        }
    }

    getParentFunction() {
        let parent = this.parent;
        while (true) {
            if (parent instanceof FunctionExpression) {
                return parent;
            } else if (parent instanceof Program) {
                return null;
            } else {
                parent = parent.parent;
            }
        }
    }

    error(text) {
        let loc = this[POSITION_KEY];
        let x = loc.first_column, y = loc.first_line;
        let lines = new Lines(this.source, 4);
        if (!!this.program.parameters.throwSyntax) {
            throw new Error('Parser error!');
        } else {
            lines.error(text, [x, y]);
        }
    }

    get parent() {
        return this[PARENT_KEY];
    }

    get program() {
        if (this[PKEY] !== undefined) return this[PKEY];

        let current = this;
        while (true) {
            if (current instanceof Program) {
                this[PKEY] = current;
                return current;
            }

            if (current.type === "ExpressionStatement") {
                if (current.parent === null) {
                    console.log(JSON.stringify(current, null, 4));
                }
            }
            current = current.parent;
        }
    }


    set source(value) {
        this.program.parameters.source = value;
    }

    get source() {
        return this.program.parameters.source;
    }

    get position() {
        let position = this[POSITION_KEY];
        return [
            position.first_column,
            position.first_line,
            position.last_column,
            position.last_line,
        ];
    }
}

// includes block scopes and the program/module scope
class Scope extends Node {
    constructor(statements) {
        super();
        this.body = statements;
        this.meta.opVars = [];
        this.meta.forbiddenVars = new Set();
        this.meta.functionDeclarations = new Map();
    }

    getJSStatements(o) {
        const jsStatements = [];

        for (var statement of this.body) {
            jsStatements.push(...statement.toJS(o));
        }

        return [
            ...this.getFunctionDeclarations(),
            ...this.getOpvarsDeclaration(),
            ...jsStatements
        ];
    }

    getOpvars(n) {
        let arr = [], i = 0;

        while (arr.length < n) {
            if (i < this.meta.opVars.length) {
                let opvar = this.meta.opVars[i];
                if (!this.meta.forbiddenVars.has(opvar)) {
                    arr.push(opvar);
                    this.meta.forbiddenVars.add(opvar);
                }
            } else {
                let opvar = this.program.vargen('opvar');
                this.meta.opVars.push(opvar);
                arr.push(opvar);
                this.meta.forbiddenVars.add(opvar);
            }
            i++;
        }

        return arr;
    }

    freeOpvars(opvars) {
        for (var opvar of opvars) {
            this.meta.forbiddenVars.delete(opvar);
        }
    }

    getOpvarsDeclaration() {
        let identifiers =
            this.meta.opVars
                .map(id => new Identifier$1(id));
        if (identifiers.length === 0) {
            return [];
        } else {
            return new VariableDeclaration$1(identifiers, 'let');
        }
    }

    getFunctionDeclarations() {
        const declarators = [];
        for (var [name, func] of this.meta.functionDeclarations) {
            const declarator = new VariableDeclarator$1(
                new Identifier$1(name),
                func
                );
            declarators.push(declarator);
        }
        if (declarators.length === 0) {
            return [];
        } else {
            return new VariableDeclaration$1(declarators, 'const');
        }
    }
}

class Program extends Scope {
    constructor(statements) {
        super(statements);

        this.onBuild();
        this.meta.containsMain = false;
        this.meta.utilities = new Map();
    }

    util(name) {
        if (this.meta.utilities.has(name)) {
            return this.meta.utilities.get(name);
        } else {
            let utilVar = this.vargen('_' + name, false);
            this.meta.utilities.set(name, utilVar);
            return utilVar;
        }
    }

    forbid(name) {
        this.meta.forbiddenVars.add(name);
    }

    vargen(name, forbid = true) {
        return vargen(this.meta.forbiddenVars, name, forbid);
    }

    set parameters(params) {
        this[OKEY] = params;
    }

    get parameters() {
        return this[OKEY];
    }

    _toJS(o) {
        let body = this.getJSStatements({}); // must come first
        let imports = [];
        let path = new Literal$1('' + LIB_PATH);


        for (let [remote, local] of this.meta.utilities) {
            imports.push(
                new ImportSpecifier$1(
                    new Identifier$1(local),
                    new Identifier$1(remote)
                )
            );
        }
        return new Program$1(
            [
                ...(imports.length?
                    new ImportDeclaration$1(imports, path) :
                    []),
                ...body
            ]
        ).from(this);
    }
}

class Statement extends Node {

}

class BlockStatement extends Scope {
    _toJS(o) {
        return new BlockStatement$1(
            this.getJSStatements({})
        ).from(this);
    }
}

class ExpressionStatement extends Statement {
    constructor(expression) {
        super();

        this.expression = expression;
    }

    _toJS(o) {
        return new ExpressionStatement$1(this.expression.toJS(o))
            .from(this);
    }
}

// *
class IfStatement extends Statement {
    constructor(test, consequent, alternate = null) {
        super();

        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
    }

    _toJS(o) {
        let test        = this.test.toJS(o);
        let consequent  = this.consequent.toJS(o);
        let alternate   = null;

        if (this.alternate !== null)
            alternate = this.alternate.toJS(o);

        return new IfStatement$1(test, consequent, alternate)
            .from(this);
    }

    setAlternate(alternate) {
        this.alternate = alternate;
        return this;
    }
}

class ControllStatement extends Statement {
    _label() {
        const target = this._target();
        if (target.label === null) {
            const label = this.program.vargen('label');
            target.label = label;
            return label;
        } else {
            return target.label;
        }
    }

    _target() {
        var current = this.parent, n = this.magnitude;

        while (true) {
            if (
                current instanceof ForStatement ||
                current instanceof WhileStatement
                ) {

                if (n === 0) {
                    return current;
                } else {
                    n--;
                }
            } else if (current instanceof FunctionExpression) {
                this.error('Cannot break/continue outside of function!');
            } else if (current instanceof Program) {
                this.error('Not enough nested loops to break/continue from!');
            }

            current = current.parent;
        }
    }
}

// *
class BreakStatement extends ControllStatement {
    constructor(magnitude = 0) {
        super();
                this.magnitude = +magnitude;
    }

    _toJS(o) {
        if (this.magnitude === 0) {
            return new BreakStatement$1()
                .from(this);
        } else {
            const label = this._label();
            return new BreakStatement$1(
                new Identifier$1(label)
                ).from(this);
        }
    }
}

// *
class ContinueStatement extends ControllStatement {
    constructor(magnitude = 0) {
        super();
                this.magnitude = +magnitude;
    }

    _toJS(o) {
        if (this.magnitude === 0) {
            return new ContinueStatement$1()
                .from(this);
        } else {
            const label = this._label();
            return new ContinueStatement$1(
                new Identifier$1(label)
                ).from(this);
        }
    }
}

// *
class SwitchStatement extends Statement {
    constructor(discriminant, cases) {
        super();

        this.discriminant = discriminant;
        this.cases = cases;
    }
}

// *
class ReturnStatement extends Statement {
    constructor(argument, after) {
        super();

        this.argument = argument;
        this.after = after;
    }

    _toJS(o) {
        if (defined(this.after)) {
            if (this.after instanceof ReturnStatement)
                this.after.error('Cannot return from function multiple times!');

            let variableName    = this.program.vargen('out');
            let variable        = new Identifier$1(variableName);
            let lines           = [
                getJSDeclare(variable, this.argument.toJS(o), 'const')
            ];

            lines.push(...this.after.toJS(o));
            lines.push(new ReturnStatement$1(variable).from(this));
            return statement(lines);
        } else {
            if (defined(this.argument))
                return new ReturnStatement$1(this.argument.toJS(o))
                    .from(this);
            else
                return new ReturnStatement$1()
                    .from(this);
        }
    }
}


class ThrowStatement extends Statement {
    constructor(argument) {
        super();

        this.argument = argument;
    }

    _toJS(o) {
        return new ThrowStatement$1(this.argument.toJS(o))
            .from(this);
    }
}

class TryStatement extends Statement {
    constructor(block, catchClause = null, finalizer = null) {
        super();

        this.block = block;
        this.handler = catchClause;
        this.finalizer = finalizer;
    }

    _toJS(o) {
        let handler = (defined(this.handler)) ? this.handler.toJS(o) : null;
        let finalizer = (defined(this.finalizer)) ? this.finalizer.toJS(o) : null;
        return new TryStatement$1(
            this.block.toJS(o),
            handler,
            finalizer
            ).from(this);
    }
}


class WhileStatement extends Statement {
    constructor(test, body) {
        super();

        this.test = test;
        this.body = body;
        this.label = null;
    }

    _toJS(o) {
        let test = this.test.toJS(o);
        let body = this.body.toJS(o);

        if (this.label === null) {
            return new WhileStatement$1(test, body)
                .from(this);
        } else {
            return new LabeledStatement(
                new Identifier$1(this.label),
                new WhileStatement$1(test, body)
                ).from(this);
        }
    }
}

class ForStatement extends Statement {
    constructor(left, right, body, async = false) {
        super();

        this.left = left;
        this.right = right;
        this.body = body;
        this.async = async;
        this.label = null;
    }

    _toJS(o) {
        if (this.async) return this.asyncToJS(o);
        else return this.syncToJS(o);
    }

    syncToJS(o) {
        let declaration = new VariableDeclaration$1(
            [new VariableDeclarator$1(this.left.toJS(o))],
            'let'
            );

        let loop = new ForOfStatement(
            this.body.toJS(o),
            declaration,
            this.right.toJS(o)
            );

        if (this.label === null) {
            return loop.from(this);
        } else {
            return new LabeledStatement(
                new Identifier$1(this.label),
                loop
                ).from(this);
        }
    }

    asyncToJS(o) {
        let pfunc = this.getParentFunction();
        if (!pfunc.async)
            this.error('Cannot have for-on loop in sync function!');

        let right = this.program.vargen('agen');   // variable placeholder for async generator expression
        let ctrl = this.program.vargen('stat');    // generator's {done(bool), value} variable

        // async gen expression, e.g.: asyncIterable[lib.symbols.observer]()
        let symbolVar = this.program.util('symbols');
        let asyncGen = new CallExpression$1(
            new MemberExpression$1(
                this.right.toJS(),
                getJSMemberExpression([symbolVar, 'observer']),
                true
                ),
            []
            );


        // initialize vars holding async iterator and
        // async iterator controller ({done : true|false, value: ...})
        let init = new VariableDeclaration$1(
            [
                new VariableDeclarator$1(strtoid(ctrl)),
                new VariableDeclarator$1(strtoid(right), asyncGen),
            ],
            'let'
            );

        // update iterator controller
        let update = new AssignmentExpression$1(
            '=',
            strtoid(ctrl),
            new YieldExpression$1(getJSMethodCall([right, 'next'], []))
            );

        // if !<ctrl var>.done keep iterating
        let test = new UnaryExpression$1(
            '!',
            getJSMemberExpression([ctrl, 'done'])
            );


        // this is where the loop variable is assigned
        let declare = new VariableDeclaration$1([
            new VariableDeclarator$1(
                this.left.toJS(o),
                getJSMemberExpression([ctrl, 'value'])
                )
            ],
            'let'
            );

        let body = [declare];
        for (let line of this.body) {
            body.push(line.toJS(o));
        }


        var loop = new ForStatement$1(
            new BlockStatement$1(body),
            init,
            new SequenceExpression$1([
                update,
                test
            ])
            );

        if (this.label === null) {
            return loop.from(this);
        } else {
            return new LabeledStatement(
                new Identifier$1(this.label),
                loop
                ).from(this);
        }
    }
}

class Declaration extends Statement {

}

class VariableDeclaration extends Declaration {
    constructor(declarators, constant = false) {
        super();

        this.declarators = declarators;
        this.constant = constant;
    }

    * varnames() {
        for (var id of this.extractVariables()) {
            yield id.name;
        }
    }

    * extractVariables() {
        for (let decl of this.declarators) {
            let left = decl.id;

            if (left instanceof Identifier) {
                yield left.name;
                continue;
            }

            if (left instanceof Pattern) {
                yield* left.extractVariables();
                continue;
            }

            left.error('Invalid variable or pattern!');
        }
    }

    _toJS(o) {
        let jsvars = [];
        let type = (this.constant) ? 'const' : 'let';

        for (let declarator of this.declarators) {
            jsvars = jsvars.concat(declarator.toJS(o));
        }

        return new VariableDeclaration$1(jsvars, type)
            .from(this);
    }

    add(declarator) {
                this.declarators.push(declarator);
        return this;
    }

    addAndReturn(assignable, assignee) {
        let declarator =
            new VariableDeclarator(assignable, assignee);


        this.declarators.push(declarator);
        return this;
    }
}

class VariableDeclarator extends Node {
    constructor(id, init = null) {
        super();

        this.id = id;
        this.init = init;
    }

    _toJS(o) {
        // always return an array

        let init = (!!this.init) ? this.init.toJS(o) : null;
        return new VariableDeclarator$1(this.id.toJS(o), init)
            .from(this);
    }
}

class Expression extends Node {
    constructor() {
        super();
    }

    toStatement() {
        return new ExpressionStatement(this);
    }
}

class ThisExpression extends Expression {
    _toJS(o) {
        return new ThisExpression$1();
    }
}

class YieldExpression extends Expression {
    constructor(argument = null, delegate = false) {
        super(argument);

        this.argument = argument;
        this.delegate = delegate;
    }

    _toJS(o) {
        let inyield, pfunc = this.getParentFunction();
        if (pfunc === null || !pfunc.generator) {
            this.error('Yield expression only allowed inside a generator function!');
        }

        if (pfunc.async) {
            inyield = getJSMethodCall(
                [pfunc._ctrl, 'send'],
                [this.argument.toJS(o)]
                );
        } else {
            inyield = (!this.argument) ? null : this.argument.toJS(o);
        }


        return new YieldExpression$1(inyield, this.delegate)
            .from(this);
    }
}

class AwaitExpression extends Expression {
    constructor(argument) {
        super(argument);

        this.argument = argument;
    }

    _toJS(o) {
        let pfunc = this.getParentFunction();
        if (pfunc === null || !pfunc.async) {
            this.error("Await expression only allowed in async function!");
        }

        return new YieldExpression$1(this.argument.toJS())
            .from(this);
    }
}

class ArrayExpression extends Expression {
    constructor(elements) {
        super();

        this.elements = elements;
    }

    _toJS(o) {
        let array = [];
        for (let element of this.elements) {
            array.push(element.toJS(o));
        }
        return new ArrayExpression$1(array)
            .from(this);
    }
}

class ObjectExpression extends Expression {
    constructor(properties) {
        super();

        this.properties = properties;
    }

    _toJS(o) {
        let props = [];
        for (let prop of this.properties) {
            props.push(prop.toJS(o));
        }

        return new ObjectExpression$1(props)
            .from(this);
    }
}

class Assignable extends Node {

}



class Property extends Node {
    constructor(key, value, kind = 'init') {
        super();

        this.key = key;
        this.value = value;
        this.kind = kind;
    }

    _toJS(o) {
        return new Property$1(
            this.key.toJS(o),
            this.value.toJS(o),
            this.kind
            ).from(this);
    }
}

class SpreadElement extends Node {
    constructor(value) {
        super();

        this.value = value;
    }

    _toJS(o) {
        return new SpreadElement$1(this.value.toJS(o))
            .from(this);
    }
}




class Pattern extends Node {
    * extractVariables() {
        throw new Error('Not implemented yet');
    }
}

class SpreadPattern extends Pattern {
    constructor(pattern) {
        super();

        this.pattern = pattern;
    }

    _toJS(o) {
        return new RestElement(
            this.pattern.toJS(o)
            ).from(this);
    }

    * extractVariables() {
        if (this.pattern instanceof Identifier) {
            yield this.pattern.name;
        } else if (this.pattern instanceof Pattern) {
            yield* this.pattern.extractVariables();
        } else this.pattern.error('Token not allowed in Property alias!');
    }
}

class PropertyAlias extends Pattern {
    constructor(identifier, pattern) {
        super();

        this.identifier = identifier;
        this.pattern = pattern;
    }

    _toJS(o) {
        return new AssignmentProperty(
            this.identifier.toJS(o),
            this.pattern.toJS(o)
            ).from(this);
    }

    * extractVariables() {
        if (this.pattern instanceof Identifier) {
            yield this.pattern.name;
        } else if (this.pattern instanceof Pattern) {
            yield* this.pattern.extractVariables();
        } else this.pattern.error('Token not allowed in Property alias!');
    }
}

class ArrayPattern extends Pattern {
    constructor(patterns) {
        super();

        this.patterns = patterns;
    }

    _toJS(o) {
        const jsPatterns = [];
        for (var pattern of this.patterns) {
            jsPatterns.push(pattern.toJS(o));
        }

        return new ArrayPattern$1(jsPatterns).from(this);
    }

    hasSplat() {
        let i = 0;
        for (let param of this.patterns) {
            if (param instanceof SpreadPattern) {
                return i;
            }

            i++;
        }

        return -1;
    }

    * extractVariables() {
        for (let pattern of this.patterns) {
            if (pattern instanceof Identifier) {
                yield pattern.name;
            } else if (pattern instanceof Pattern) {
                yield* pattern.extractVariables();
            } else pattern.error(`Token not allowed in ArrayPattern`);
        }
    }
}

class ObjectPattern extends Pattern {
    constructor(properties) {
        super();

        this.properties = properties;
    }

    _toJS(o) {
        const jsProperties = [];
        for (var property of this.properties) {
            if (property instanceof Identifier) {
                const id = property.toJS(o);
                jsProperties.push(
                    new AssignmentProperty(id, id)
                    );
            } else {
                jsProperties.push(property.toJS(o));
            }
        }

        return new ObjectPattern$1(jsProperties).from(this);
    }

    * extractVariables() {
        for (let pattern of this.patterns) {
            if (pattern instanceof Identifier) {
                yield pattern.name;
            } else if (pattern instanceof Pattern) {
                yield* pattern.extractVariables();
            } else pattern.error('Token not allowed in ObjectPattern');
        }
    }
}

class DefaultPattern extends Pattern {
    constructor(pattern, expression) {
        super();

        this.pattern = pattern;
        this.expression = expression;
    }

    _toJS(o) {
        return new AssignmentPattern(
            this.pattern.toJS(o),
            this.expression.toJS(o)
            ).from(this);
    }

    * extractVariables() {
        if (this.pattern instanceof Identifier) {
            yield this.pattern.name;
        } else if (this.pattern instanceof Pattern) {
            yield* this.pattern.extractVariables();
        } else this.pattern.error('Token not allowed in ObjectPattern');
    }
}

class Super extends Statement {
    _toJS(o) {
        return new Super$1().from(this);
    }
}

class ClassExpression extends Expression {
	constructor(identifier = null, superClass = null, body = []) {
		super();


		this.identifier = identifier;
		this.superClass = superClass;
		this.body = body;
	}

	_toJS(o) {
	    let body = [], props = [], statprops = [];

	    for (let line of this.body) {
	        if (line instanceof MethodDefinition) {

	            if (line.value.async) {
	                // async methods are not supported in classes so instead they have
	                // to be added to the list of prototype properties
	                let bin = line.static ? statprops : props;
	                if (line.kind !== "method") {
	                    line.error(
	                        `"${line.kind}" method type not allowed as async in class definitions!`
	                        );
	                }

                    bin.push(
                        new Property$1(
                            line.key,
                            line.value.toJS(o)
                            )
                        );
	            } else
	                body.push(line.toJS(o));
	        } else if (line instanceof ClassProperty) {
	            props.push(line.toJS(o));
	        } else {
	            line.error('Class body item unrecognized!');
	        }
	    }

	    // create class
	    let superClass  = defined(this.superClass) ? this.superClass.toJS(o) : null;
	    let cls         = new ClassExpression$1(null, superClass, body);

	    if (props.length === 0 && statprops.length === 0) {
	        if (defined(this.identifier)) {
	            return getJSAssign(this.identifier.name, cls, 'const')
                    .from(this);
	        } else {
	            return cls.from(this);
	        }
	    } else {
            let classifyVar = this.program.util('classify');
	        let rapper = new CallExpression$1(
                new Identifier$1(classifyVar), [
    	            cls,
    	            new ObjectExpression$1(props)
    	        ]
            );

	        if (statprops.length > 0) {
	            rapper.arguments.push(
	                new ObjectExpression$1(statprops)
	                );
	        }

	        if (defined(this.identifier)) {
	            return getJSAssign(this.identifier.name, rapper, 'const')
                    .from(this);
	        } else {
	            return rapper.from(this);
	        }
	    }
	}

	* extractVariables() {
	    if (defined(this.identifier)) {
	        yield this.identifier.name;
	    } else {
	        this.error('Cannot extract name from anonymous class!');
	    }
	}
}

class MethodDefinition extends Node {
	constructor(key, value, kind = "method", isStatic = false, computed = false) {
		super();


		this.key = key;
		this.value = value;
		this.kind = kind;
		this.static = isStatic;
		this.computed = computed;
	}

	_toJS(o) {
	    return new MethodDefinition$1(
	        this.key.toJS(o),
	        this.value.toJS(o),
	        this.kind,
	        this.computed,
	        this.static
	        ).from(this);
	}
}

class ClassProperty extends Node {
    constructor(key, value, computed = false) {
        super();

        this.key = key;
        this.value = value;
        this.computed = computed;
    }

    _toJS(o) {
        return new Property$1(
            this.key.toJS(o),
            this.value.toJS(o),
            this.computed
            ).from(this);
    }
}


class FunctionDeclaration extends Declaration {
    constructor(identifier, func) {
        super();

        this.identifier = identifier;
        this.func = func;
    }

    _toJS(o) {
        if (this.parent instanceof Property)
            return new Property$1(
                this.identifier,
                this.func.toJS(o)
                ).from(this);
        else {
            let scope = this.getParentScope();
            let expression = this.func.toJS(o);
            let name = this.identifier.name;

            if (scope.meta.functionDeclarations.has(name)) {
                line.error('Cannot declare function more than once!');
                return;
            }
            scope.meta.functionDeclarations.set(
                name,
                expression
            );

            return [];
        }
    }

    * extractVariables() {
        // yields only the function name
        yield this.identifier.name;
        return;
    }
}


class FunctionExpression extends Expression {
    constructor(params, body, bound = false, modifier = '') {
        super();

        this.params = params;
        this.body = body;
        this.bound = bound;
        this.modifier = modifier;
    }

    hasSplat() {
        let i = 0;
        for (let param of this.params) {
            if (param instanceof SpreadPattern) {
                return i;
            }

            i++;
        }

        return -1;
    }

    _toJS(o) {
        let fn;

        if (this.modifier === '*') {
            fn = this.generatorToJs(o);
        } else if (this.modifier === '~') {
            fn = this.asyncToJs(o);
        } else if (this.modifier === '~*') {
            fn = this.asyncGeneratorToJs(o);
        } else {
            fn = this.regularToJs(o);
        }

        // if function is bound return <function expression>.bind(this)
        if (this.bound) {
            return new CallExpression$1(
                new MemberExpression$1(fn, new Identifier$1('bind')),
                [new ThisExpression$1()]
                ).from(this);
        } else {
            return fn.from(this);
        }
    }

    * walkParams() {
        for (let param of this.params) {
            let gen = this.body.walk();
            let skip = undefined;
            while (true) {
                let ctrl = gen.next(skip);
                if (ctrl.done)
                    return;
                const node = ctrl.value;

                if (node instanceof FunctionExpression) {
                    skip = true;
                } else {
                    skip = undefined;
                }

                yield node;
            }
        }
    }

    * walkBody() {
        let gen = this.body.walk();
        let skip = undefined;
        while (true) {
            let ctrl = gen.next(skip);
            if (ctrl.done)
                return;
            const node = ctrl.value;

            if (node instanceof FunctionExpression) {
                skip = true;
            } else {
                skip = undefined;
            }

            yield node;
        }
    }

    * walkFunction() {
        yield* this.walkParams();
        yield* this.walkBody();
    }

    regularToJs(o, noparams = false) {
        let body = this.body.toJS(o);
        if (!(body instanceof BlockStatement$1)) {
            const instructions = [
                new ReturnStatement$1(body)
            ];
            body = new BlockStatement$1(instructions);
        }

        let i = 0;


        return new FunctionExpression$1(
            null,
            noparams ? [] : this.params.map(
                param => param.toJS(o)
                ),
            body,
            null);
    }

    generatorToJs(o, noparams = false) {
        let jsnode = this.regularToJs(o, noparams);
        jsnode.generator = true;
        return jsnode;
    }

    asyncToJs(o, noparams = false) {
        let asyncVar = this.program.util('async');
        return new CallExpression$1(
            new Identifier$1(asyncVar),
            [this.generatorToJs(o, noparams)]
        );
    }

    asyncGeneratorToJs(o, noparams = false) {
        let ctrlVar = this._ctrl = this.program.vargen('ctrl');
        let gocVar = this.program.util('getObservableCtrl');
        let ctrl = getJSAssign(
            ctrlVar,
            new CallExpression$1(new Identifier$1(gocVar), []),
            'const');
        let mem = new AssignmentExpression$1(
            '=',
            getJSMemberExpression([ctrlVar, 'code']),
            new CallExpression$1(
                new MemberExpression$1(
                    this.asyncToJs(o, true),
                    new Identifier$1("bind")
                    ),
                [new ThisExpression$1()]
                )
            );
        let ret = new ReturnStatement$1(getJSMemberExpression([
            ctrlVar,
            'observable'
        ]));

        let block = new BlockStatement$1([ctrl, mem, ret].map(el => {
            if (el instanceof Expression$1) {
                return new ExpressionStatement$1(el);
            } else {
                return el;
            }
        }));


        return new FunctionExpression$1(
            null,
            noparams ? [] : this.params.map(p => p.toJS(o)),
            block);
    }

    get async() {
        return this.modifier.includes('~');
    }

    get generator() {
        return this.modifier.includes('*');
    }
}

class SequenceExpression extends Expression {
    constructor(expressions) {
        super();

        this.expressions = expressions;
    }
}

class UnaryExpression extends Expression {
    constructor(operator, argument, prefix = true) {
        super();

        this.operator = operator;
        this.argument = argument;
        this.prefix = prefix;
    }

    _toJS(o) {
        var operator;
        if (this.operator in convert) {
            operator = convert[this.operator];
        } else {
            operator = this.operator;
        }

        if (!unaryOperators.has(operator)) {
            this.error('Invalid unary operator!');
        }

        return new UnaryExpression$1(
            operator,
            this.argument.toJS(o),
            this.prefix
            ).from(this);
    }
}

const smoothOperators = {
    '//=': function(left, right) {
        return getJSMethodCall(
            ['Math', 'floor'],
            [new BinaryExpression$1('/', left, right)]
            );
    },
    '^=': function(left, right) {
        return getJSMethodCall(
            ['Math', 'pow'],
            [left, right]
            );
    }
};

class BinaryExpression extends Expression {
    constructor(operator, left, right) {
        super();

        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    _toJS(o) {
        let left = this.left.toJS(o);
        let right = this.right.toJS(o);
        let operator;

        if (this.operator in convert) {
            return new BinaryExpression$1(
                convert[this.operator],
                left,
                right
                ).from(this);
        }

        if ((this.operator + '=') in smoothOperators) {
            let fn = smoothOperators[this.operator + '='];
            return fn(left, right).from(this);
        }

        return new BinaryExpression$1(this.operator, left, right)
            .from(this);
    }
}

// this is different from other operaetor expressions cause
// bizubee supports chaining of comparisons as in if 1 < c < 10 do ...
class ComparativeExpression extends Expression {
    constructor(operator, left, right) {
        super();

        this.operators = [operator];
        this.operands = [left, right];
    }

    // used by the parser to chain additional operators/operands to expression
    chain(operator, expression) {

        this.operators.push(operator);
        this.operands.push(expression);
        return this;
    }

    _toJS(o) {
        const [opid]    = this.getOpvars(1);
        const opvar     = new Identifier$1(opid);

        let
        left    = null,
        right   = null,
        prev    = null,
        out     = null
        ;


        for (let i = 0; i < this.operators.length; i++) {
            const lastiter = (i + 1 === this.operators.length);
            let
            jsRight,
            compare,
            originalOp = this.operators[i],
            op = (originalOp in convert) ? convert[originalOp] : originalOp
            ;

            left    = prev || this.operands[i].toJS(o);
            right   = this.operands[i + 1].toJS(o);

            if (right instanceof Identifier$1) {
                jsRight = right.toJS(o);
                prev = jsRight;
            } else {
                // the last expression will only be evaluated once, so no need to save it in opvar
                // otherwise we must save it to prevent reevaluation
                jsRight = (lastiter) ? right : new AssignmentExpression$1(
                    '=',
                    opvar,
                    right
                    );
                prev = opvar;
            }

            // the actual comparison expression
            compare = new BinaryExpression$1(
                op,
                left,
                jsRight
                );

            // at first the lefthand operand in the && expression is the initial comparison
            // after that it is always the previous && expression
            out = (out === null)
            ? compare
            : new LogicalExpression$1(
                '&&',
                out,
                compare
                )
            ;
        }

        return out.from(this);
    }
}

class AssignmentExpression extends Expression {
    constructor(operator, left, right) {
        super();

        this.operator = assertAssignmentOperator(operator);
        this.left = left;
        this.right = right;
    }

    _toJS(o) {
        let rightHandSide;
        if (this.operator in smoothOperators) {
            let trans = smoothOperators[this.operator];
            let left = this.left.toJS(o);
            let right = trans(left, this.right.toJS(o));

            return new AssignmentExpression$1('=', left, right)
                .from(this);
        } else {
            return new AssignmentExpression$1(
                this.operator,
                this.left.toJS(o),
                this.right.toJS(o)
                ).from(this);
        }
    }
}

class UpdateExpression extends Expression {
    constructor(operator, argument, prefix) {
        super();

        this.operator = assertUpdateOperator(operator);
        this.argument = argument;
        this.prefix = prefix;
    }
}

class LogicalExpression extends Expression {
    constructor(operator, left, right) {
        super();

        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    _toJS(o) {
        return new LogicalExpression$1(
            this.operator,
            this.left.toJS(o),
            this.right.toJS(o)
            ).from(this);
    }
}

class QuestionableExpression extends Expression {

    // compile some.weird?.property?.chain
    getChain(stack, heads, o) {
        throw new Error('Must implement getChain method!');
    }

    get subject() {
        throw new Error('Must implement subject getter!');
    }

    // compile some.weird?.property?.chain
    getChain(stack, heads, o) {
        if (this.doubtful) {
            const [op] = this.getOpvars(1);
            const id = new Identifier$1(op);
            const ref = this.getJSRef(id, o);
            const fn = (node) => {
                if (ref instanceof CallExpression$1) {
                    ref.callee = node;
                } else {
                    ref.object = node;
                }
            };

            if (this.subject instanceof QuestionableExpression) {
                stack.push(
                    this.subject.getChain(stack, heads, o)
                    );
            } else {
                stack.push(
                    this.subject.toJS(o)
                    );
            }

            heads.push([
                op,
                fn,
                this instanceof CallExpression
            ]);
            return ref;
        } else {
            const left = (this.subject instanceof QuestionableExpression) ?
                this.subject.getChain(stack, heads, o) :
                this.subject.toJS(o);

            return this.getJSRef(left, o);
        }
    }


    _toJS(o) {
        const stack = [], heads = [];
        const undie = new UnaryExpression$1(
            'void',
            new Literal$1(0)
            );
        stack.push(
            this.getChain(stack, heads, o)
            );

        var pointer = stack[stack.length - 1];
        for (var i = heads.length - 1; i >= 0; i--) {
            const [name, changeNode, isCall] = heads[i];
            const node = stack[i];
            if (isCall) {
                if (node instanceof MemberExpression$1) {
                    const id = new Identifier$1(name), prop = node.property;
                    if (node.computed) {
                        const [propHolder] = this.getOpvars(1);
                        const pid = new Identifier$1(propHolder);
                        changeNode(new MemberExpression$1(id, pid, true));
                        pointer = new ConditionalExpression(
                            new BinaryExpression$1(
                                '!=',
                                new MemberExpression$1(
                                    new AssignmentExpression$1(
                                        '=',
                                        id,
                                        node.object
                                        ),
                                    new AssignmentExpression$1('=', pid, prop),
                                    true
                                    )
                                ,
                                new Literal$1(null)
                                ),
                            pointer,
                            undie
                            );
                    } else {
                        changeNode(new MemberExpression$1(id, prop));
                        pointer = new ConditionalExpression(
                            new BinaryExpression$1(
                                '!=',
                                new MemberExpression$1(
                                    new AssignmentExpression$1(
                                        '=',
                                        id,
                                        node.object
                                        ),
                                    prop
                                    )
                                ,
                                new Literal$1(null)
                                ),
                            pointer,
                            undie
                            );
                    }
                    continue;
                }
            }

            pointer = new ConditionalExpression(
                new BinaryExpression$1(
                    '!=',
                    new AssignmentExpression$1(
                        '=',
                        new Identifier$1(name),
                        node
                        ),
                    new Literal$1(null)
                    ),
                pointer,
                undie
                );
        }

        return pointer.from(this);
    }

    getJSRef() {
        throw new Error("QE extendees must implement getJSRef!");
    }
}

class CallExpression extends QuestionableExpression {
    constructor(callee, args, isNew = false, doubtful = false) {
        super();

        this.callee = callee;
        this.arguments = args;
        this.isNew = isNew;
        this.doubtful = doubtful;
    }

    getJSRef(subject, o) {
        const ctor = this.isNew ? NewExpression$1 : CallExpression$1;
        return new ctor(
            subject,
            this.arguments.map(arg => arg.toJS(o))
            );
    }

    get subject() {
        return this.callee;
    }
}

class NewExpression extends CallExpression {

}

class MemberExpression extends QuestionableExpression {
    // doubtful parameter is true if there there are question marks involved
    constructor(object, property, computed = false, doubtful = false) {
        super();

        this.object = object;
        this.property = property;
        this.computed = computed;
        this.doubtful = doubtful;
    }

    getJSRef(subject, o) {
        return new MemberExpression$1(
            subject,
            this.property.toJS(o),
            this.computed
            );
    }

    get subject() {
        return this.object;
    }
}

class DefinedExpression extends Expression {
    constructor(expression) {
        super();

        this.expression = expression;
    }

    _toJS(o) {
        return new BinaryExpression$1(
            '!=',
            this.expression.toJS(o),
            new Identifier$1('null')
            ).from(this);
    }
}

class SwitchCase extends Node {
    constructor(test, consequent) {
        super();

        this.test = test;
        this.consequent = consequent;
    }
}

// the catch part of try-catch
class CatchClause extends Node {
    constructor(param, body) {
        super();

        this.param = param;
        this.body = body;
    }

    _toJS(o) {
        return new CatchClause$1(
            this.param.toJS(o),
            this.body.toJS(o)
            ).from(this);
    }
}

class Identifier extends Expression {
    constructor(name, process = true) {
        super();

        this.name = name;
    }

    onBuild() {
        this.program.forbid(this.name);
    }

    _toJS(o) {
        return new Identifier$1(this.name)
            .from(this);
    }
}

class Literal extends Expression {
    constructor(value) {
        super();

        this.value = value;
    }
}

class TemplateString extends Expression {

    // removes unnecessary escapes from string literals being translated to JS
    static removeEscapes(string) {
        const buff = []
        var escapeMode = false;
        for (var c of string) {
            if (escapeMode) {
                escapeMode = false;
                if (stringEscapeTable.hasOwnProperty(c)) {
                    buff.push(stringEscapeTable[c]);
                } else {
                    buff.push(c);
                }
            } else {
                if (c === '\\') {
                    escapeMode = true;
                    continue;
                } else {
                    buff.push(c);
                }
            }
        }

        return buff.join('');
    }

    constructor(value, parts) {
        super(value);

        this.parts = [];
        for (var part of parts) {
            // parts alternate between strings and arrays of tokens
            if (part instanceof Array) {
                // if part is Array of tokens, parse then search for Expression in AST
                // and reasign parent to this TemplateString

                var ctrl = parseRawTokens(part, {});
                if (ctrl.tree.body.length === 1) {
                    const node = ctrl.tree.body[0];
                    if (node instanceof ExpressionStatement) {
                        const expr = node.expression;
                        this.parts.push(expr);
                    } else {
                        this.parts.push(null);
                    }
                } else {
                    this.parts.push(null);
                }
            } else {
                this.parts.push(part);
            }
        }
    }

    _toJS(o) {
        const ctor = this.constructor;
        if (this.parts.length === 1) {              // if there is no interpolation
            return new Literal$1(ctor.removeEscapes(this.parts[0]))
                .from(this);
        } else if (this.parts.length > 2) {             // if interpolation exists in string
            let add = new BinaryExpression$1(
                '+',
                new Literal$1(ctor.removeEscapes(this.parts[0])),      // cause the first part is always a string
                this.parts[1].toJS(o)               // second part is an interpolation
                );
            for (var i = 2; i < this.parts.length; i++) {
                const part = this.parts[i];
                if (part === null) {                // if interpolated expression is invalid it is set to null in `parts`
                    this.error('Only single expressions allowed per interpolation!');
                }

                // parts alternate between expression and string
                if (part instanceof Expression) {
                    add = new BinaryExpression$1(
                        '+',
                        add,
                        part.toJS(o)
                        );
                } else if (part.constructor === String) {
                    add = new BinaryExpression$1(
                        '+',
                        add,
                        new Literal$1(
                            this.constructor.removeEscapes(part)
                            )
                        );
                } else {
                    part.error('Interpolated value not expression!');
                }
            }

            return add.from(this);
        } else {
            this.error('Internal compiler error!');
        }
    }
}

// a raw single quoted string
class StringLiteral extends Literal {
    constructor(value) {
        super(value.substring(1, value.length - 1));
    }

    _toJS(o) {
        return new Literal$1(this.value)
            .from(this);
    }
}

class NumberLiteral extends Literal {
    constructor(value) {
        super(value);
    }

    _toJS(o) {
        return new Literal$1(+this.value)
            .from(this);
    }
}

class ModuleSpecifier extends Statement {
    constructor(local) {
        super();
        this.local = local;
    }
}


class ModuleDeclaration extends Statement {

}


class ImportSpecifier extends ModuleSpecifier {
    constructor(imported, local = null) {
        super(local || imported);

        this.imported = imported;
    }

    _toJS(o) {
        return new ImportSpecifier$1(
            this.local.toJS(o),
            this.imported.toJS(o)
            ).from(this);
    }
}

class ImportNamespaceSpecifier extends ModuleSpecifier {
    _toJS(o) {
        return new ImportNamespaceSpecifier$1(this.local)
            .from(this);
    }
}

class ImportDefaultSpecifier extends ModuleSpecifier {
    _toJS(o) {
        return new ImportDefaultSpecifier$1(this.local)
            .from(this);
    }
}

class ImportDeclaration extends ModuleDeclaration {
    constructor(specifiers, source) {
        super();

        this.specifiers = specifiers;
        this.path = source;
    }

    _toJS(o) {
        return new ImportDeclaration$1(
            this.specifiers.map(specifier => specifier.toJS(o)),
            new Literal$1('' + this.path)
            ).from(this);
    }
}

class ExportDeclaration extends ModuleDeclaration {

}

class ExportSpecifier extends ModuleSpecifier {
    constructor(local, exported = null) {
        super(local);

        this.exported = exported || local;
    }

    _toJS(o) {
        return new ExportSpecifier$1(
            this.local.toJS(o),
            this.exported.toJS(o)
            ).from(this);
    }
}

class ExportNamedDeclaration extends ExportDeclaration {
    constructor(declaration, specifiers, source = null) {
        super();

        this.declaration = declaration;
        this.specifiers = specifiers;
        this.path = source;
    }

    _toJS(o) {
        if (this.declaration === null) {
            return new ExportNamedDeclaration$1(
                null,
                this.specifiers.map(spec => spec.toJS(o)),
                new Literal$1('' + this.path)
                )
                .from(this);
        } else {
            if (this.declaration instanceof FunctionDeclaration) {
                const name = this.declaration.identifier.name;

                if (this.program.meta.functionDeclarations.has(name)) {
                    this.declaration
                        .error('Function already exists!');
                }

                this.program.meta.functionDeclarations.set(
                    name,
                    declaration.func.toJS(o)
                    );

                return new ExportNamedDeclaration$1(
                    null,
                    new ExportSpecifier$1(new Identifier$1(name))
                    ).from(this);
            } else {
                return new ExportNamedDeclaration$1(
                    this.declaration.toJS(o)
                    ).from(this);
            }
        }
    }
}


class ExportDefaultDeclaration extends ExportDeclaration {
    constructor(declaration) {
        super();

        this.declaration = declaration;
    }

    _toJS(o) {
        if (this.declaration instanceof FunctionDeclaration) {
            const name = this.declaration.identifier.name;

            if (this.program.meta.functionDeclarations.has(name)) {
                this.declaration
                    .error('Function already exists!');
            }

            this.program.meta.functionDeclarations.set(
                name,
                declaration.func.toJS(o)
                );

            return new ExportDefaultDeclaration$1(
                new Identifier$1(name)
                ).from(this);
        } else {
            return new ExportDefaultDeclaration$1(
                this.declaration.toJS(o)
                ).from(this);
        }
    }
}


class ValueExpression extends Expression {
    constructor(statement) {
        super();
        this.statement = statement;
    }

    _toJS(o) {
        const parentFunc = this.getParentFunction();
        const body = this.statement.toJS(o);
        var block = (body instanceof Array)?
            new BlockStatement$1(body) :
            new BlockStatement$1([body]);

        if (parentFunc === null || parentFunc.modifier === '') {
            return new CallExpression$1(
                new FunctionExpression$1(
                    null,
                    [],
                    block
                    ),
                []
                );
        } else {
            return new YieldExpression$1(
                new CallExpression$1(
                    new FunctionExpression$1(
                        null,
                        [],
                        block,
                        true
                        ),
                    []
                    ),
                true
                );
        }
    }
}


var nodes = Object.freeze({
    wrap: wrap,
    Node: Node,
    Scope: Scope,
    Program: Program,
    Statement: Statement,
    BlockStatement: BlockStatement,
    ExpressionStatement: ExpressionStatement,
    IfStatement: IfStatement,
    ControllStatement: ControllStatement,
    BreakStatement: BreakStatement,
    ContinueStatement: ContinueStatement,
    SwitchStatement: SwitchStatement,
    ReturnStatement: ReturnStatement,
    ThrowStatement: ThrowStatement,
    TryStatement: TryStatement,
    WhileStatement: WhileStatement,
    ForStatement: ForStatement,
    Declaration: Declaration,
    VariableDeclaration: VariableDeclaration,
    VariableDeclarator: VariableDeclarator,
    Expression: Expression,
    ThisExpression: ThisExpression,
    YieldExpression: YieldExpression,
    AwaitExpression: AwaitExpression,
    ArrayExpression: ArrayExpression,
    ObjectExpression: ObjectExpression,
    Assignable: Assignable,
    Property: Property,
    SpreadElement: SpreadElement,
    Pattern: Pattern,
    SpreadPattern: SpreadPattern,
    PropertyAlias: PropertyAlias,
    ArrayPattern: ArrayPattern,
    ObjectPattern: ObjectPattern,
    DefaultPattern: DefaultPattern,
    Super: Super,
    ClassExpression: ClassExpression,
    MethodDefinition: MethodDefinition,
    ClassProperty: ClassProperty,
    FunctionDeclaration: FunctionDeclaration,
    FunctionExpression: FunctionExpression,
    SequenceExpression: SequenceExpression,
    UnaryExpression: UnaryExpression,
    BinaryExpression: BinaryExpression,
    ComparativeExpression: ComparativeExpression,
    AssignmentExpression: AssignmentExpression,
    UpdateExpression: UpdateExpression,
    LogicalExpression: LogicalExpression,
    QuestionableExpression: QuestionableExpression,
    CallExpression: CallExpression,
    NewExpression: NewExpression,
    MemberExpression: MemberExpression,
    DefinedExpression: DefinedExpression,
    SwitchCase: SwitchCase,
    CatchClause: CatchClause,
    Identifier: Identifier,
    Literal: Literal,
    TemplateString: TemplateString,
    StringLiteral: StringLiteral,
    NumberLiteral: NumberLiteral,
    ModuleSpecifier: ModuleSpecifier,
    ModuleDeclaration: ModuleDeclaration,
    ImportSpecifier: ImportSpecifier,
    ImportNamespaceSpecifier: ImportNamespaceSpecifier,
    ImportDefaultSpecifier: ImportDefaultSpecifier,
    ImportDeclaration: ImportDeclaration,
    ExportSpecifier: ExportSpecifier,
    ExportNamedDeclaration: ExportNamedDeclaration,
    ExportDefaultDeclaration: ExportDefaultDeclaration,
    ValueExpression: ValueExpression
});

/*
interface ParserAPI {
    forbidden(string) : bool;
    getJSText(object) : string;
    getJSTree(object) : Object;
}
*/

// returns a ParserAPI as defined in parser-interface.js
function control(tokens, parameters) {
	let psr = getParser(parameters);
	let tree = null;
	let jstree = null;
	return {
		get tree() {
			if (tree === null) {
				tree = psr.parse(tokens, parameters.source, parameters.file);
				tree.parameters = parameters;
			}

			return tree;
		},
		getJSTree(o) {
			return (jstree || (jstree = this.tree.toJS(o || {})));
		},
		getJSText(o) {
			const parsed = this.getJSTree(o);
			return generate(parsed);
		}
	}
}

{
	let gkey = Symbol('generator');
	Parser.prototype.lexer = {
		lex: function() {
			var next = this[gkey].next();
			if (next.done) {
				return null;
			} else {
				let token		= next.value;
				let position 	= token.getPosition();
				this.yytext 	= token;
			    this.yyloc 		= position;
			    this.yylloc 	= position;
			    this.yylineno 	= position.first_line;
				return token.tag;
			}
		},
		setInput: function(tokens, csrc, file) {
			this.source = csrc;
			this.filename = file;
			this[gkey] = tokens;
		},
		upcomingInput: function() {
		    return null;
		}
	};
}



function getParser(params) {
	let psr = new Parser();
	psr.yy = nodes;
	psr.yy.parseError = function(message, ob) {
		if (params.throwSyntax) {
			throw new Error("Parse Error!");
		} else {
			const lines = new Lines(params.source, 4);
			const x		= ob.loc.last_column;
			const y		= ob.loc.last_line;
			lines.error(`Unexpected token "${ob.token}"`, [x, y]);
		}
	}
	return psr;
}

function parse(string, parameters = {}) {
	return parseString(string, parameters);
}

function parseString(string, parameters) {
	let csrc = new StringSource(string);
	return parseCharSrc(csrc, parameters);
}


function parseCharSrc(csrc, parameters) {
	let gen = tokenizeCharSrc(csrc);
	parameters.source = csrc;
	return control(gen, parameters);
}


function parseRawTokens(tokens, parameters) {
	let gen = refineTokens(tokens[Symbol.iterator]());
	return control(gen, parameters);
}

var bzEditor;
var jsEditor;
const actions = {
	compile() {
		const source = bzEditor.getValue();
		console.log(source);
		jsEditor.setValue(parse(source).getJSText());
	},
	theme() {
		const index = floor(themes.length * random());
		editor.setTheme(`ace/theme/${themes[index]}`);
	}
};

window.onload = function(e) {
	bzEditor = CodeMirror(document.getElementById('bz-editor'), {
		value: Cookies.get('code') || '',
		mode: 'bizubee',
		theme: 'dracula',
		lineNumbers: true
	});

	jsEditor = CodeMirror(document.getElementById('js-editor'), {
		mode: 'javascript',
		theme: 'elegant'
	});

	const query = document.querySelectorAll('#actions input[bind-to]');
	for (var i = 0; i < query.length; i++) {
		const action = query[i].getAttribute('bind-to');
		query[i].onclick = actions[action];
	}
}

window.onbeforeunload = function() {
	Cookies.set('code', bzEditor.getValue());
}