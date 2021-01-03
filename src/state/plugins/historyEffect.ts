import { AtomEffect } from 'recoil';
import { pushState } from '../history';

const historyEffect = <T>(name: string): AtomEffect<T> => ({ setSelf, onSet }) => {
    onSet((newValue, oldValue) => {
        pushState({
            label: `${name}: ${JSON.stringify(oldValue)} -> ${JSON.stringify(newValue)}`,
            undo: () => {
                setSelf(oldValue);
            }
        });
    });
};

export default historyEffect;
