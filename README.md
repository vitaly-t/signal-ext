# signal-ext

Extends [Angular Signals] with `ext` namespace, which contains:

* `created`: `Date` (readonly) - when the signal was created, to help with tracking signals lifespan
* `name`: `string` (read/write) - optional signal name, to help with signal tracking and logging

#### Example of naming your signals

```ts
import {signal} from './signal-ext'; // new import for signals

const s = signal(123, {name: 'my-signal'});
// or you can set name later: s.ext.name = 'my-signal'

console.log('value:', s(), 'created:', s.ext.created, 'name:', s.ext.name);
```

Just add [./signal-ext.ts](./signal-ext.ts) to your Angular v16+ project, and you're good to go.

#### Improved console output

Call `toString()` on the extended signal to get a meaningful formatted output:

```ts
const s = signal(123, {name: 'my-signal'});

console.log(s.toString()); //=> signal["my-signal"] = 123
```

Function `toString()` for extended signals will output `signal[name] = value`, as opposed to the
meaningless function signature (default for signal functions).

[Angular Signals]:https://angular.io/guide/signals
