import {signal as _signal, CreateSignalOptions, WritableSignal, Signal} from '@angular/core';
import {toSignal as _toSignal, ToSignalOptions} from '@angular/core/rxjs-interop';
import {Observable} from 'rxjs';

/**
 * Additional options when creating a signal.
 */
export interface ICreateSignalOptionsExt<T> extends CreateSignalOptions<T> {
    /**
     * Signal Name.
     */
    name?: string;
}

/**
 * Extension properties that are set internally.
 */
export interface ICreateSignalExt<T> extends ICreateSignalOptionsExt<T> {

    /**
     * Date/time when the signal was created.
     */
    readonly created: Date;

    /**
     * Outputs `signal[name] = value` into the console, with browser-formatting
     * for values-objects.
     *
     * You can optionally pass some parameters to be appended to the output.
     */
    log(...args: any[]): void;
}

export interface IToSignalOptionsExt<T> extends ToSignalOptions<T> {
    /**
     * Signal Name.
     */
    name?: string;
}

/**
 * Extended signal signature, with `ext` namespace.
 */
export interface IWritableSignalExt<T> extends WritableSignal<T> {
    readonly ext: ICreateSignalExt<T>;
}

/**
 * Extended signal signature, with `ext` namespace.
 */
export type SignalExt<T> = Signal<T> & {
    readonly ext: ICreateSignalExt<T>;
};

/**
 * Signal creation override, to support `ext` namespace + additional initialization options.
 */
export function signal<T>(initialValue: T, options?: ICreateSignalOptionsExt<T>): IWritableSignalExt<T> {
    const s = _signal(initialValue, options);
    return extendSignal(s, options) as IWritableSignalExt<T>;
}

export function toSignal<T>(source: Observable<T>, options?: IToSignalOptionsExt<undefined> & {
    requireSync?: false;
}): SignalExt<T | undefined>;

export function toSignal<T, U extends T | null | undefined>(source: Observable<T>, options: IToSignalOptionsExt<U> & {
    initialValue: U;
    requireSync?: false;
}): SignalExt<T | U>;

export function toSignal<T>(source: Observable<T>, options: IToSignalOptionsExt<undefined> & {
    requireSync: true;
}): SignalExt<T>;

export function toSignal<T>(source: Observable<T>, options?: IToSignalOptionsExt<any>) {
    const s = _toSignal(source, options as any);
    return extendSignal(s, options);
}

/**
 * Extends any signal object, according to the declarative protocol above.
 */
function extendSignal<T>(s: Signal<T>, options?: IToSignalOptionsExt<T>): SignalExt<T> {
    const value: ICreateSignalExt<T> = {
        created: new Date(),
        name: options?.name,
        log(...args: any[]) {
            console.log(`signal[${JSON.stringify(this.name)}] =`, s(), ...args);
        }
    }
    Object.defineProperty(s, 'ext', {value, writable: false});
    Object.defineProperty(s, 'toString', {
        value(this: IWritableSignalExt<T>) {
            return `signal[${JSON.stringify(this.ext.name)}] = ${JSON.stringify(this())}`;
        },
        writable: false,
        enumerable: false
    });
    return s as SignalExt<T>;
}
