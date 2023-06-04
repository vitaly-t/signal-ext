import {signal as _signal, CreateSignalOptions, WritableSignal} from '@angular/core';

export interface ICreateSignalOptionsExt<T> extends CreateSignalOptions<T> {
    name?: string;
}

interface ICreateSignalExt<T> extends ICreateSignalOptionsExt<T> {
    readonly created: Date;
}

export interface IWritableSignalExt<T> extends WritableSignal<T> {
    readonly ext: ICreateSignalExt<T>;
}

export function signal<T>(initialValue: T, options?: ICreateSignalOptionsExt<T>): IWritableSignalExt<T> {
    const s = _signal(initialValue, options);
    Object.defineProperty(s, 'ext', {
        value: {
            created: new Date(),
            name: options?.name
        },
        writable: false
    });
    return s as IWritableSignalExt<T>;
}
