---
title: Basics of a Promise
order: 2
---

# Basics of a Promise

> A promise is merely a placeholder value for something that will arrive...

The `Promise` object in JS is a fundamentally state-machine: `pending` is the main state of promises, essentially a placeholder for some value that will arrive. Then we have 2 states upon completion: `fulfilled` and `rejected`.

- `fulfilled` state where the value has arrived
- `rejected` every state where the value did not arrive

```js
// will resolve the value 'done'
Promise.resolve('done');

// will reject and throws an error with reason 'failed'
Promise.reject('failed');
```

We just so happen to use strings here, but we can resolve/reject any object we wanted like maybe a `user` in a auth flow or even a custom error object that attatches timestamps, incident, classification etc..

## Promises and Callbacks

We can also define promises by passing a callback function to run later

```js
const promise = new Promise(callback);
```

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
