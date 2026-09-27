---
title: Preface
order: 1
---

# Preface

Programming is cool...

Fundamentally, the craft -- as I've learned it -- has involved training sequential thought processes to solve problems algorithmically.

However, some of the most interesting problems presented to me have involved the idea of code that _may not run when we expect it to_, or may not be deterministically guaranteed to finish executing because its progress depends on something external to the program.

The most obvious example is `waiting`.

> `waiting` can be thought of as delaying further action until some event has occurred.

A network request has to return. A timer has to expire. A user has to click something. A file has to finish being read.

Problems like these introduce us to asynchronous programming: work whose completion does not necessarily occur as part of the program's immediate, sequential flow of execution.

Asynchronicity gives us a way to continue making progress while some operation is waiting to complete. In many cases, the surrounding runtime or operating system can handle that work while JavaScript continues doing something else.

This brings us to `concurrency`.

> `concurrency` is the ability to manage multiple tasks whose lifetimes overlap, even if those tasks are not literally executing at the exact same instant.

My own introduction to these ideas has primarily come through learning JavaScript's concurrency model.

## Per the title...

This series follows my personal journey through learning modern asynchronous JavaScript, along with the mental models I've found useful for understanding `concurrency`.

[...] For me, this has felt like a new frontier.

Memorizing syntax or algorithms alone doesn't really explain what is happening. The interesting part is learning to reason about execution that is no longer purely sequential: work being started, delegated, suspended, resumed, queued, and eventually continued.

That shift in thinking is one of the things I find most beautiful about asynchronous programming.
