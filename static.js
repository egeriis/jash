function Static(value) {
    console.log(typeof value);
    this.value = value;
}

Static.prototype.invoke = function() {
    throw new Error("This is not a program");
}

module.exports = Static;
