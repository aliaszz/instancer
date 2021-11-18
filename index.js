'use strict';
/*
|--------------------------------------------------------------------------
| instancer 实例化函数
|--------------------------------------------------------------------------
| 
| CODE :
|  var cat = instancer(Cat, ['getName']);
*/

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        global.instancer = factory();
    }
})(this, function (className, eliminate) {
    var ins = new (Function.prototype.bind.apply(className, [null]));
    var methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(ins));

    for (var i in methodNames) {
        var name = methodNames[i];
        if (name === 'constructor') continue;
        if (typeof ins[name] !== 'function') continue;
        if (eliminate && eliminate.indexOf(name) > -1) continue;

        ins[name] = ins[name].bind(ins);
    }

    return ins;
});