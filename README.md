# signal-ext

Extends [Angular Signals] with `ext` namespace, which contains:

* `created`: `Date` (readonly) - when the signal was created, to help with tracking signals lifespan
* `name`: `string` (read/write) - optional signal name, to help with signal tracking and logging
* `log()`: `void` - extended output, into the console, of the signal name + value + parameters

#### Example of naming your signals

```ts
import {signal} from './signal-ext'; // new import for signals

const s = signal(123, {name: 'my-signal'});
// or you can set name later: s.ext.name = 'my-signal'

console.log(s.toString()); //=> signal["my-signal"] = 123 
```

#### Usage

Just copy [./signal-ext.ts](./signal-ext.ts) to your Angular v16+ project, and you're good to go.
You would simply import `signal` from your local `signal-ext` instead of `@angular/core`,
and the rest stays the same.

This is a small extension on the existing protocol, and 100% compatible with the original.

#### Better console output

Call `toString()` on the extended signal to get a meaningful formatted output:

```ts
const s = signal(123, {name: 'my-signal'});

console.log(s.toString()); //=> signal["my-signal"] = 123
```

Function `toString()` for extended signals returns `signal[name] = value`.

It however also serializes the signal value, which you may not want in cases when the signal
is a large object. In this case you can use `ext.log()` instead, so the object is rendered
by the browser, for easy navigation:

```ts
const s = signal({first: 123}, {name: 'my-signal'});

s.ext.log(); //=> signal["my-signal"] = {first: 123}
```

Function `log()` also accepts optional random arguments, to be appended to the output:

```ts
const s = signal({first: 123}, {name: 'my-signal'});

s.ext.log(s.ext.created.toISOString()); //=> signal["my-signal"] = {first: 123} 2023-06-04T16:10:33.319Z
```

[Angular Signals]:https://angular.io/guide/signals
