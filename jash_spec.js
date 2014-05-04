(function() {
  var extend = function (destination, source) {
    if (!destination || !source) return destination;
    for (var key in source) {
      if (destination[key] !== source[key])
        destination[key] = source[key];
    }
    return destination;
  };
  
  var find = function (root, objectName) {
    var parts = objectName.split('.'),
        part;
    
    while (part = parts.shift()) {
      root = root[part];
      if (root === undefined)
        throw new Error('Cannot find object named ' + objectName);
    }
    return root;
  };
  
  var formatError = function (error) {
    var lines  = error.input.split(/\n/g),
        lineNo = 0,
        offset = 0;
    
    while (offset < error.offset + 1) {
      offset += lines[lineNo].length + 1;
      lineNo += 1;
    }
    var message = 'Line ' + lineNo + ': expected ' + error.expected + '\n',
        line    = lines[lineNo - 1];
    
    message += line + '\n';
    offset  -= line.length + 1;
    
    while (offset < error.offset) {
      message += ' ';
      offset  += 1;
    }
    return message + '^';
  };
  
  var Grammar = {
    __consume__program: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["program"] = this._nodeCache["program"] || {};
      var cached = this._nodeCache["program"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 0, index1 = this._offset, elements0 = [], text0 = "", address1 = true;
      while (address1) {
        address1 = this.__consume__cell();
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "Program");
        address0 = new klass0(text0, this._offset, elements0);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["program"][index0] = address0;
    },
    __consume__cell: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["cell"] = this._nodeCache["cell"] || {};
      var cached = this._nodeCache["cell"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address2 = true;
      while (address2) {
        var index3 = this._offset;
        address2 = this.__consume__whitespace();
        if (address2) {
        } else {
          this._offset = index3;
          address2 = this.__consume__newline();
          if (address2) {
          } else {
            this._offset = index3;
          }
        }
        if (address2) {
          elements1.push(address2);
          text1 += address2.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index2;
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0(text1, this._offset, elements1);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += text1.length;
      } else {
        address1 = null;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address3 = null;
        address3 = this.__consume__datum();
        if (address3) {
          elements0.push(address3);
          text0 += address3.textValue;
          labelled0.datum = address3;
          var address4 = null;
          var remaining1 = 0, index4 = this._offset, elements2 = [], text2 = "", address5 = true;
          while (address5) {
            var index5 = this._offset;
            address5 = this.__consume__whitespace();
            if (address5) {
            } else {
              this._offset = index5;
              address5 = this.__consume__newline();
              if (address5) {
              } else {
                this._offset = index5;
              }
            }
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              remaining1 -= 1;
            }
          }
          if (remaining1 <= 0) {
            this._offset = index4;
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address4 = new klass1(text2, this._offset, elements2);
            if (typeof type1 === "object") {
              extend(address4, type1);
            }
            this._offset += text2.length;
          } else {
            address4 = null;
          }
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass2 = this.constructor.SyntaxNode;
        var type2 = find(this.constructor, "Cell");
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["cell"][index0] = address0;
    },
    __consume__datum: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["datum"] = this._nodeCache["datum"] || {};
      var cached = this._nodeCache["datum"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__function_def();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__function_call();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["datum"][index0] = address0;
    },
    __consume__function_def: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["function_def"] = this._nodeCache["function_def"] || {};
      var cached = this._nodeCache["function_def"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 0);
      } else {
        slice0 = null;
      }
      if (slice0 === "") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 0;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this.__consume__token();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.name = address2;
          var address3 = null;
          var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address4 = true;
          while (address4) {
            var index3 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
            var address5 = null;
            address5 = this.__consume__whitespace();
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              labelled1.whitespace = address5;
              var address6 = null;
              address6 = this.__consume__token();
              if (address6) {
                elements2.push(address6);
                text2 += address6.textValue;
                labelled1.name = address6;
              } else {
                elements2 = null;
                this._offset = index3;
              }
            } else {
              elements2 = null;
              this._offset = index3;
            }
            if (elements2) {
              this._offset = index3;
              var klass1 = this.constructor.SyntaxNode;
              var type1 = null;
              address4 = new klass1(text2, this._offset, elements2, labelled1);
              if (typeof type1 === "object") {
                extend(address4, type1);
              }
              this._offset += text2.length;
            } else {
              address4 = null;
            }
            if (address4) {
              elements1.push(address4);
              text1 += address4.textValue;
              remaining0 -= 1;
            }
          }
          if (remaining0 <= 0) {
            this._offset = index2;
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address3 = new klass2(text1, this._offset, elements1);
            if (typeof type2 === "object") {
              extend(address3, type2);
            }
            this._offset += text1.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.args = address3;
            var address7 = null;
            var slice2 = null;
            if (this._input.length > this._offset) {
              slice2 = this._input.substring(this._offset, this._offset + 2);
            } else {
              slice2 = null;
            }
            if (slice2 === " {") {
              var klass3 = this.constructor.SyntaxNode;
              var type3 = null;
              address7 = new klass3(" {", this._offset, []);
              if (typeof type3 === "object") {
                extend(address7, type3);
              }
              this._offset += 2;
            } else {
              address7 = null;
              var slice3 = null;
              if (this._input.length > this._offset) {
                slice3 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice3 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\" {\""};
              }
            }
            if (address7) {
              elements0.push(address7);
              text0 += address7.textValue;
              var address8 = null;
              var remaining1 = 0, index4 = this._offset, elements3 = [], text3 = "", address9 = true;
              while (address9) {
                var index5 = this._offset, elements4 = [], labelled2 = {}, text4 = "";
                var address10 = null;
                address10 = this.__consume__newline();
                if (address10) {
                  elements4.push(address10);
                  text4 += address10.textValue;
                  labelled2.newline = address10;
                  var address11 = null;
                  var remaining2 = 0, index6 = this._offset, elements5 = [], text5 = "", address12 = true;
                  while (address12) {
                    address12 = this.__consume__whitespace();
                    if (address12) {
                      elements5.push(address12);
                      text5 += address12.textValue;
                      remaining2 -= 1;
                    }
                  }
                  if (remaining2 <= 0) {
                    this._offset = index6;
                    var klass4 = this.constructor.SyntaxNode;
                    var type4 = null;
                    address11 = new klass4(text5, this._offset, elements5);
                    if (typeof type4 === "object") {
                      extend(address11, type4);
                    }
                    this._offset += text5.length;
                  } else {
                    address11 = null;
                  }
                  if (address11) {
                    elements4.push(address11);
                    text4 += address11.textValue;
                    var address13 = null;
                    address13 = this.__consume__function_call();
                    if (address13) {
                      elements4.push(address13);
                      text4 += address13.textValue;
                      labelled2.fn = address13;
                    } else {
                      elements4 = null;
                      this._offset = index5;
                    }
                  } else {
                    elements4 = null;
                    this._offset = index5;
                  }
                } else {
                  elements4 = null;
                  this._offset = index5;
                }
                if (elements4) {
                  this._offset = index5;
                  var klass5 = this.constructor.SyntaxNode;
                  var type5 = null;
                  address9 = new klass5(text4, this._offset, elements4, labelled2);
                  if (typeof type5 === "object") {
                    extend(address9, type5);
                  }
                  this._offset += text4.length;
                } else {
                  address9 = null;
                }
                if (address9) {
                  elements3.push(address9);
                  text3 += address9.textValue;
                  remaining1 -= 1;
                }
              }
              if (remaining1 <= 0) {
                this._offset = index4;
                var klass6 = this.constructor.SyntaxNode;
                var type6 = null;
                address8 = new klass6(text3, this._offset, elements3);
                if (typeof type6 === "object") {
                  extend(address8, type6);
                }
                this._offset += text3.length;
              } else {
                address8 = null;
              }
              if (address8) {
                elements0.push(address8);
                text0 += address8.textValue;
                labelled0.line = address8;
                var address14 = null;
                var index7 = this._offset;
                address14 = this.__consume__newline();
                if (address14) {
                } else {
                  this._offset = index7;
                  var klass7 = this.constructor.SyntaxNode;
                  var type7 = null;
                  address14 = new klass7("", this._offset, []);
                  if (typeof type7 === "object") {
                    extend(address14, type7);
                  }
                  this._offset += 0;
                }
                if (address14) {
                  elements0.push(address14);
                  text0 += address14.textValue;
                  var address15 = null;
                  var slice4 = null;
                  if (this._input.length > this._offset) {
                    slice4 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice4 = null;
                  }
                  if (slice4 === "}") {
                    var klass8 = this.constructor.SyntaxNode;
                    var type8 = null;
                    address15 = new klass8("}", this._offset, []);
                    if (typeof type8 === "object") {
                      extend(address15, type8);
                    }
                    this._offset += 1;
                  } else {
                    address15 = null;
                    var slice5 = null;
                    if (this._input.length > this._offset) {
                      slice5 = this._input.substring(this._offset, this._offset + 1);
                    } else {
                      slice5 = null;
                    }
                    if (!this.error || this.error.offset <= this._offset) {
                      this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"}\""};
                    }
                  }
                  if (address15) {
                    elements0.push(address15);
                    text0 += address15.textValue;
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass9 = this.constructor.SyntaxNode;
        var type9 = find(this.constructor, "FunctionDef");
        address0 = new klass9(text0, this._offset, elements0, labelled0);
        if (typeof type9 === "object") {
          extend(address0, type9);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["function_def"][index0] = address0;
    },
    __consume__function_call: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["function_call"] = this._nodeCache["function_call"] || {};
      var cached = this._nodeCache["function_call"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 0);
      } else {
        slice0 = null;
      }
      if (slice0 === "") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 0;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this.__consume__token();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.name = address2;
          var address3 = null;
          var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address4 = true;
          while (address4) {
            var index3 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
            var address5 = null;
            address5 = this.__consume__whitespace();
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              labelled1.whitespace = address5;
              var address6 = null;
              address6 = this.__consume__argument();
              if (address6) {
                elements2.push(address6);
                text2 += address6.textValue;
                labelled1.arg = address6;
              } else {
                elements2 = null;
                this._offset = index3;
              }
            } else {
              elements2 = null;
              this._offset = index3;
            }
            if (elements2) {
              this._offset = index3;
              var klass1 = this.constructor.SyntaxNode;
              var type1 = null;
              address4 = new klass1(text2, this._offset, elements2, labelled1);
              if (typeof type1 === "object") {
                extend(address4, type1);
              }
              this._offset += text2.length;
            } else {
              address4 = null;
            }
            if (address4) {
              elements1.push(address4);
              text1 += address4.textValue;
              remaining0 -= 1;
            }
          }
          if (remaining0 <= 0) {
            this._offset = index2;
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address3 = new klass2(text1, this._offset, elements1);
            if (typeof type2 === "object") {
              extend(address3, type2);
            }
            this._offset += text1.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.args = address3;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = find(this.constructor, "FunctionCall");
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["function_call"][index0] = address0;
    },
    __consume__argument: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["argument"] = this._nodeCache["argument"] || {};
      var cached = this._nodeCache["argument"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "(") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("(", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"(\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this.__consume__function_call();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.function_call = address2;
          var address3 = null;
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 === ")") {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(")", this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\")\""};
            }
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
          } else {
            elements0 = null;
            this._offset = index2;
          }
        } else {
          elements0 = null;
          this._offset = index2;
        }
      } else {
        elements0 = null;
        this._offset = index2;
      }
      if (elements0) {
        this._offset = index2;
        var klass2 = this.constructor.SyntaxNode;
        var type2 = null;
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__token();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["argument"][index0] = address0;
    },
    __consume__token: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["token"] = this._nodeCache["token"] || {};
      var cached = this._nodeCache["token"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 1, index1 = this._offset, elements0 = [], text0 = "", address1 = true;
      while (address1) {
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 && /^[^\s{}]/.test(slice0)) {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address1 = new klass0(slice0, this._offset, []);
          if (typeof type0 === "object") {
            extend(address1, type0);
          }
          this._offset += 1;
        } else {
          address1 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^\\s{}]"};
          }
        }
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = find(this.constructor, "Token");
        address0 = new klass1(text0, this._offset, elements0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["token"][index0] = address0;
    },
    __consume__whitespace: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["whitespace"] = this._nodeCache["whitespace"] || {};
      var cached = this._nodeCache["whitespace"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 && /^[\t ]/.test(slice0)) {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0(slice0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[\\t ]"};
        }
      }
      return this._nodeCache["whitespace"][index0] = address0;
    },
    __consume__newline: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["newline"] = this._nodeCache["newline"] || {};
      var cached = this._nodeCache["newline"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 && /^[\n\r]/.test(slice0)) {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0(slice0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[\\n\\r]"};
        }
      }
      return this._nodeCache["newline"][index0] = address0;
    }
  };
  
  var Parser = function(input) {
    this._input = input;
    this._offset = 0;
    this._nodeCache = {};
  };
  
  Parser.prototype.parse = function() {
    var result = this.__consume__program();
    if (result && this._offset === this._input.length) {
      return result;
    }
    if (!(this.error)) {
      this.error = {input: this._input, offset: this._offset, expected: "<EOF>"};
    }
    var message = formatError(this.error);
    var error = new Error(message);
    throw error;
  };
  
  Parser.parse = function(input) {
    var parser = new Parser(input);
    return parser.parse();
  };
  
  extend(Parser.prototype, Grammar);
  
  var SyntaxNode = function(textValue, offset, elements, properties) {
    this.textValue = textValue;
    this.offset    = offset;
    this.elements  = elements || [];
    if (!properties) return;
    for (var key in properties) this[key] = properties[key];
  };
  
  SyntaxNode.prototype.forEach = function(block, context) {
    for (var i = 0, n = this.elements.length; i < n; i++) {
      block.call(context, this.elements[i], i);
    }
  };
  
  Parser.SyntaxNode = SyntaxNode;
  
  if (typeof require === "function" && typeof exports === "object") {
    exports.Grammar = Grammar;
    exports.Parser  = Parser;
    exports.parse   = Parser.parse;
    
  } else {
    var namespace = this;
    Jash = Grammar;
    JashParser = Parser;
    JashParser.formatError = formatError;
  }
})();

