import React from "react";


export default function useLocalStorage(initialValue, id) {
    const storageValue = JSON.parse(localStorage.getItem(id));
    const [stateValue, setStateValue] = React.useState(storageValue || initialValue);
    // console.log(storageValue)
    React.useEffect(() => {
        localStorage.setItem(id, JSON.stringify(stateValue));
        const date = new Date();
        const hours = date.getHours() * 3600;
        const min = date.getMinutes() * 60;
        const sec = hours + min + date.getSeconds();
        const onBeforeUnload = () => {
            localStorage.setItem("leaveSec", JSON.stringify(sec))
        }

        window.addEventListener('beforeunload', onBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', onBeforeUnload);
        }

    }, [stateValue]);

    return [stateValue, setStateValue];
}

