---
title: Queuing
order: 3
---

# Queuing

```js
class job {
  // at least 100 ms
  jobTime = Math.random() * 100;

  run() {
    const callback = (res) => {
      setTimeout(() => {
        res('ran job');
      }, this.jobTime);
    };
    return new Promise(callback);
  }
}
```
