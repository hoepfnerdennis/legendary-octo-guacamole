import { useEffect } from 'react';
import makeListener from './makeListener';

interface LocalHistoryEntry {
    label: string;
    undo: () => void;
}
type LocalHistory = LocalHistoryEntry[];

let step = 0;
let localHistory: LocalHistory = [];
const MAX_ENTRIES = 10;

const [subsribe, notify, useHistory] = makeListener(() => localHistory);

const undo = () => {
    if (localHistory.length > 0) {
        step -= 1;
        localHistory[localHistory.length - 1].undo();
        localHistory = localHistory.splice(0, localHistory.length - 1);
        notify([...localHistory]);
    }
};

const pushState = (state: LocalHistoryEntry) => {
    step += 1;
    if (localHistory.length >= MAX_ENTRIES) {
        localHistory = localHistory.splice(1, localHistory.length);
    }
    localHistory.push(state);
    console.table(localHistory);
    window.history.pushState(state.label, state.label, `#${step}`);
    notify([...localHistory]);
};

const useBrowserBack = () => {
    useEffect(() => {
        const handlePopState = () => {
            if (
                window.location.hash.replace('#', '') &&
                parseInt(window.location.hash.replace('#', '')) < step
            ) {
                undo();
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
};

export { pushState, undo, subsribe, useHistory, useBrowserBack };
