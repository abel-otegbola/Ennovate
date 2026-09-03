'use client'
import { useCallback, useState } from "react";

const returnInitialState = (storageKey: string, initialState: unknown) => {
    try {
        const items = window.localStorage.getItem(storageKey);
        return items ? JSON.parse(items) : initialState;
    }
    catch (error) {
        console.log(error);
        return initialState;
    }
}



export const useLocalStorage = (storageKey: string, initialState: unknown) => {
    const [storedValue, setStoredValue] = useState(
        returnInitialState(storageKey, initialState)
    )

    const setValue = useCallback((value: unknown) => {
        try {
            setStoredValue((currentValue: unknown) => {
                const valueToStore = value instanceof Function ? value(currentValue) : value;
                window.localStorage.setItem(storageKey, typeof value === "number" ? valueToStore : JSON.stringify(valueToStore))
                return valueToStore;
            });
        }
        catch (error) {
            console.log(error)
        }
    }, [storageKey]);

    return [storedValue, setValue]
}