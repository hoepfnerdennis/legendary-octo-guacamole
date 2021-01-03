const onEnter = <T = Element>(callback: () => void) => (e: React.KeyboardEvent<T>): void => {
    if (e.key === 'Enter') {
        callback();
    }
};

export default onEnter;
