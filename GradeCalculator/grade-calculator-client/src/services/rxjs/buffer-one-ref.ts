import { MonoTypeOperatorFunction } from "rxjs";
import { shareReplay } from "rxjs/operators";

export function bufferOneRef<T>(): MonoTypeOperatorFunction<T> {
    return shareReplay({bufferSize: 1, refCount: true})
}