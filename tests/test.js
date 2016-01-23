'use strict';

var chai = require('chai');
var expect = chai.expect;
var es6props = require('../src/es6props');

describe('props function', function() {
	var props = es6props.props,
		clazz = es6props.clazz;

	it('should allow basic data holding classes and methods', function() {
		const NAME = 'Gerald';

		class Test extends props({
			name: NAME,
			getName() { return this.name; }
		}){ 
			//
			// This part is the actual ES6 class definition, which can be empty for basic functionality
			//
		}

		var t = new Test();		
		expect(t.getName()).to.eqls(NAME);
	});

	it('should allow defining a constructor in the props object', function() {
		const NAME = 'Gerald';

		class Test extends props({
			name: 'Figgles',
			constructor(name) {
				if (name !== undefined) {
					this.name = name;
				}
			},
			getName() { return this.name; }
		}){ }			
		
		var t = new Test(NAME);
		expect(t.getName()).to.eqls(NAME);		
	});

	it('should allow super() from the es6 constructor', function() {
		class Test extends props({
			sawSuper: false,
			sawEs6: false,
			constructor() {
				this.sawSuper = true;
			},
			isValid() { return this.sawSuper && this.sawEs6; }
		}){
			constructor() {
				super();
				this.sawEs6 = true;
			}
		}

		var t = new Test();
		expect(t.isValid()).to.equal(true);
	});

	it('should allow super from es6 methods', function() {
		class Test extends props({
			sawSuper: false,
			sawEs6: false,
			isValid() { return this.sawSuper && this.sawEs6; },
			method() { this.sawSuper = true; }
		}){
			method() {
				super.method();
				this.sawEs6 = true;
			}
		}

		var t = new Test();
		t.method();
		expect(t.isValid()).to.equal(true);
	});

	it('should support getters', function() {
		class Test extends props({
			_thingy: 23,
			get thingy() { return this._thingy + 1; }			
		}){}

		var t = new Test();
		expect(t.thingy).to.equal(24);
	});

	it('should support dynamic properties (unlike es6 class)', function() {
		const MAGIC = 'BERMUDA';

		class Test extends props({
			['PROP_' + MAGIC]: 'disappearance'
		}){}

		var t = new Test();
		expect(t).to.have.property('PROP_BERMUDA').which.equals('disappearance');
	});

	it('should allow easy declaration of lambda methods', function() {
		// es6 lambdas are clunky (try googling for people having difficulties)
		// 
		// NB: this is a very contrived example, and really only demonstrates how
		// _not_ to use this, but the point is it's easier to do :)

		// outer scope name
		this.name = 'fred';

		class Test extends props({
			// inner scope name
			name: 'bob',
			// this method accesses the _outer_ scope's values
			isNamedBlock: name => { return name === this.name; },
			isNamedShort: name => name === this.name,
		}){}

		var t = new Test();				
		expect(t.isNamedBlock('fred')).to.equal(true);
		expect(t.isNamedShort('fred')).to.equal(true);
	});

	it('should have properties as _instance_ properties', function() {
		class Test extends props({
			name: '',
			constructor(name) {
				this.name = name;
			}
		}){}

		var t1 = new Test('first'),
			t2 = new Test('second');

		expect(t1.name).not.to.equal(t2.name);
	});

	it('should allow foolish usage of eval for convenience', function() {

		/**
		 * A little less weird, but requires eval so it can bugger right off
		 * That said, perhaps the elimination of the dangling {} is nicer for some
		 * maybe someone can think of a more clever way of doing this?
		 */
		var Test = clazz('Test', {
			name: '',
			constructor(name) { this.name = name; }
		});

		var t = new Test('hello');
		expect(t).to.have.property('name').which.equals('hello');

	});


	// it('should allow multiple object arguments as mixins (for some reason)', function() {
	// 	// pretty sure nobody's ever going to use this, but small addition to the `props()` function anyway
		
	// 	const MAGIC = 'BERMUDA';
	// 	var someFoundation = {
	// 		['_' + MAGIC]: 'ding!'
	// 	};

	// 	['one', 'two', 'three'].forEach(k => {
	// 		someFoundation[k] = k + '_' + MAGIC;
	// 	});

	// 	class Test extends props({
	// 		serialise() { return JSON.stringify(this); }
	// 	}, someFoundation){}

	// 	var t = new Test();
	// 	expect(t.serialise()).to.equal('blah');
	// });
});