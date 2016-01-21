# Es6ClassProperties (e6p)

## What is it?

I've been fiddling around with some aspects of modern ecmascript after only peripheral hobby usage in the past.

So far one of my biggest bugbears is that the class syntax doesn't allow simple declaration of properties, instead forcing one to create them in the constructor.

## Thinking out loud to pad out this Readme

There are probably really good reasons for the choosing this path, but it seems unnecessarily verbose yet simultaneously harder to read.

It seems sad given how much more power we have in the modernised object-literal syntax to (for some reason) be deprived of these features in the new `class` syntax.

It's quite restrictive, moreso than the pseudo-OO libraries of ES5 days.

## eg.

### How I'd like it to look:
```js
// nb: I've only used semicolons after properties because 
// `class` syntax doesn't use commas.
// Semicolons are consistent with the normal 
// JS [C-like] "it's a block or has a semicolon" style
class Something {
    salutation:'';  // declared at top for readability, 
                    // but obviously initialised later
    name:'Mr. Deltoid';

    constructor(salutation) {
        // only initialisation requiring dynamic data goes here
        this.salutation = salutation;
    }

    sayHello() { 
        console.log(`${this.salutation} Alex, I am ${this.name}`);
    }
}

new Something('Hello').sayHello();
// prints "Hello Alex, I am Mr. Deltoid"
```

### How it used to look (with libraries):
```js
// This is from a fictional library, but is basically how
// the syntax looks for most pre-ES6 OO libraries
var Something = clazz({
    salutation:'',
    name:'Mr. Deltoid',

    // called automatically at instantiation by the fictional
    // `clazz` library
    initialise(salutation) {
        // only initialisation requiring dynamic data goes here
        this.salutation = salutation;
    },

    sayHello() { 
        console.log(`${this.salutation} Alex, I am ${this.name}`);
    }
});

new Something('Hello').sayHello();
// prints "Hello Alex, I am Mr. Deltoid"
```

### How it looks in Es6:
```js
class Something {
    constructor(salutation) {
        // reader has to parse code just to know structure of the object
        // in this case, pretty easy to do - but can quickly get out of hand.
        // also completely unnecessary for purely structural (data) objects
        this.age = 42;
        this.salutation = salutation || '';
        this.name = 'Mr. Deltoid';
    }

     sayHello() { 
        console.log(`${this.salutation} Alex, I am ${this.name}`);
    }   
}

new Something('Hello').sayHello();
// prints "Hello Alex, I am Mr. Deltoid"
```

## Gitignore generator command used for now

```
gi node,osx,windows,linux,mocha,chai > .gitignore
```
