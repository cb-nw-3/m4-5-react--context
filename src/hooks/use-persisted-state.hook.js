import React from 'react';

export default function usePersistedState(name, defaultValue) {
    const [value, setValue] = React.useState(() => {
        const localStorageValue = window.localStorage.getItem(name);

        if (localStorageValue !== null) {
            return JSON.parse(localStorageValue);
        } else {
            return defaultValue;
        }
    });

    React.useEffect(() => {
        window.localStorage.setItem(name, JSON.stringify(value));
    }, [name, value]);

    return [value, setValue];
}
