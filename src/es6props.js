'use strict';

function props(obj) {
	// if (arguments.length > 1) {
	// 	let args = Array.prototype.slice(arguments);
	// 	args.unshift({});
	// 	obj = Object.assign.apply(null, args);
	// 	console.log(obj, arguments);
	// }
	function props_constructor() {
		if (obj.hasOwnProperty('constructor')) {
			return obj.constructor.apply(this, arguments);
		}
	}
	props_constructor.prototype = Object.assign({}, props_constructor.prototype, obj);
	return props_constructor;
}

// don't use this - it's bad form
function clazz(name, obj) {
	var template = `class ${name} extends props(obj) {}`;
	var fn = eval(template);
	return fn;
}

module.exports = {
	props,
	clazz
};

