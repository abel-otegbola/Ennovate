import { useState } from "react";

const returnInitialState = (storageKey: string, initialState: any) => {
    try {
        const items = window.localStorage.getItem(storageKey);
        return items ? JSON.parse(items) : initialState;
    }
    catch (error) {
        return initialState;
    }
}


export const useLocalStorage = (storageKey: string, initialState: any) => {
    const [storedValue, setStoredValue] = useState(
        returnInitialState(storageKey, initialState)
    )

    const setValue = (value: any) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            window.localStorage.setItem(storageKey, typeof value === "number" ? valueToStore : JSON.stringify(valueToStore))

            setStoredValue(valueToStore);
        }
        catch (error) {
            console.log(error)
        }
    };

    return [storedValue, setValue]
}