import { useEffect, useState } from 'react';

type Listener<T> = (currentState: Readonly<T>) => void;
type Unsubscribe = () => void;
type Subscribe<T> = (listener: Listener<Readonly<T>>) => Unsubscribe;
type Notify<T> = (currentState: Readonly<T>) => void;
type StateHook<T> = () => Readonly<T>;

/**
 *
 * Create a listener
 *
 * @example <caption>Make a history Listener</caption>
 * const history = []
 * const [subsribe, notify, useHistory] = makeListener(() => history)
 * ...
 * useEffect(() => {
 *     const unsubscribe = subscribe(newState => {
 *         doSomething(newState)
 *     })
 *     return () => {
 *         unsubscribe()
 *     }
 * })
 * ...
 * const pushState = (state) => {
 *     history.push(state)
 *     notify(history)
 * }
 */
const makeListener = <T>(
    getState: () => T
): [Subscribe<Readonly<T>>, Notify<Readonly<T>>, StateHook<Readonly<T>>] => {
    const listeners: Listener<Readonly<T>>[] = [];

    const subsribe: Subscribe<Readonly<T>> = listener => {
        const length = listeners.push(listener);
        return () => {
            listeners.splice(length - 1, 1);
        };
    };

    const notify: Notify<Readonly<T>> = currentState => {
        listeners.forEach(listener => listener(currentState));
    };

    const useCurrentState: StateHook<Readonly<T>> = () => {
        const [state, setState] = useState<T>(getState());
        useEffect(() => {
            const unsubscribe = subsribe(currentState => {
                setState(currentState);
            });
            return () => {
                unsubscribe();
            };
        }, []);
        return state;
    };

    return [subsribe, notify, useCurrentState];
};

export default makeListener;
