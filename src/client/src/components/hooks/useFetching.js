import { useState } from "react";

export const useFetching = (callback) => {
    const [error, setError] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    async function fetching () {
        try {
            // setIsLoading(true)
            await callback();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoaded(true)
        }
    }

    return [fetching, isLoaded, error];
}