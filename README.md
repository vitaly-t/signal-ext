# signal-ext

Extends [Angular Signals] with `ext` namespace, which contains:

* `created`: `Date` (readonly) - when the signal was created, to help with tracking signals lifespan
* `name`: `string` (read/write) - optional signal name, to help with signal tracking and logging
* `log()`: `void` - extended output, into the console, of the signal name + value + parameters

#### Example of naming your signals

```ts
import {signal, toSignal} from './signal-ext'; // new import for signals

const s1 = signal(123, {name: 'my-signal'}); // for regular signals
// or you can set name later: s1.ext.name = 'my-signal'
console.log(s1.toString()); //=> signal["my-signal"] = 123

const s2 = toSignal(of(456), {name: 'my-observable-signal'}); // for readonly signals
// or you can set name later: s2.ext.name = 'my-observable-signal'
console.log(s2.toString()); //=> signal["my-observable-signal"] = 456 
```

#### Usage

Just copy [./signal-ext.ts](./signal-ext.ts) into your Angular v16+ project, and you're good to go.
You would simply change import for `signal` and `toSignal` to your local `signal-ext`, and the rest stays the same.

This is a small extension on the existing protocol, and 100% compatible with the original.

#### Better console output

Call `toString()` on the extended signal to get a meaningful formatted output:

```ts
const s = signal(123, {name: 'my-signal'});

console.log(s.toString()); //=> signal["my-signal"] = 123
```

Function `toString()` for extended signals returns `signal[name] = value`.

However, it also serializes the signal value, which you may not want in cases when the signal
is a complex object. In this case you can use `ext.log()` instead, so the object is rendered
by the browser, for easy navigation:

```ts
const s = signal({first: 123}, {name: 'my-signal'});

s.ext.log(); //=> signal["my-signal"] = {first: 123}
```

Function `log()` also accepts optional random arguments, to be appended to the output:

```ts
const s = signal({first: 123}, {name: 'my-signal'});

s.ext.log(s.ext.created.toUTCString()); //=> signal["my-signal"] = {first: 123} Mon, 05 Jun 2023 12:47:44 GMT
```

[Angular Signals]:https://angular.io/guide/signals
