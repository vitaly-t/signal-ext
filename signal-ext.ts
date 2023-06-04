import {signal as _signal, CreateSignalOptions, WritableSignal} from '@angular/core';

/**
 * Additional options when creating a signal.
 */
export interface ICreateSignalOptionsExt<T> extends CreateSignalOptions<T> {
    name?: string;
}

/**
 * Extension properties that are set internally.
 */
export interface ICreateSignalExt<T> extends ICreateSignalOptionsExt<T> {
    readonly created: Date;
}

/**
 * Extended signal signature, with `ext` namespace.
 */
export interface IWritableSignalExt<T> extends WritableSignal<T> {
    readonly ext: ICreateSignalExt<T>;
}

/**
 * Signal creation override, to support `ext` namespace + additional initialization options.
 */
export function signal<T>(initialValue: T, options?: ICreateSignalOptionsExt<T>): IWritableSignalExt<T> {
    const s = _signal(initialValue, options);
    const value: ICreateSignalExt<T> = {
        created: new Date(),
        name: options?.name
    }
    Object.defineProperty(s, 'ext', {value, writable: false});
    return s as IWritableSignalExt<T>;
}
