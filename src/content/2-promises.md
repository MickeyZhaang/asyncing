---
title: Basics of a Promise
order: 2
---

# Basics of a Promise

> A promise is merely a placeholder value for something that will arrive...

```js
const promise = new Promise(callback);
```

The promise object in JS is a state-machine: `pending` is the main state of promises, essentially a placeholder for some value that will arrive. Then we have 2 states upon completion: `fulfilled` and `rejected`.

- `fulfilled` state where the value has arrived
- `rejected` every state where the value did not arrive

We will continue to use arrival as terminalogy to imply the literal arrival of a value after awaiting some arbitrary amount of time.

The `callback` function structure should look something like...

```js
const callback = (resolve, reject) => {};
```

Where `resolve` and `reject` are callbacks in themselves, specifically in how we handle data being passed through the promise.
For example, we can resolve a string that indicates we are "done" in our callback with `resolve('done!')`.

```js
const promise = new Promise((resolve, reject) => {
  resolve('done!');
});
```
