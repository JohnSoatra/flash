import { UseFetchLazy, PropUseFetch, PropUseFetchNoArgs, UseFetch } from "@/typings";
import { MutableRefObject, useEffect, useRef, useState } from "react";

function useFetch<T=any, K=any>({
    func,
    args
}: PropUseFetch<T, K> | PropUseFetchNoArgs<T>
): UseFetch<T> {
    const [ fetching, setFetching ] = useState(true);
    const [result, setResult] = useState(undefined as T|null|undefined);
    const controllerRef: MutableRefObject<AbortController> = useRef(new AbortController());

    useEffect(() => {
        setFetching(true);

        controllerRef.current.abort();
        controllerRef.current = new AbortController();

        func({
            ...(args || {}),
            signal: controllerRef.current.signal,
        })
            .then(res => {
                controllerRef.current.abort();
                setResult(res);
            })
            .catch(() => {})
            .finally(() => {
                setFetching(false);
            });

    }, [func, ...(args ? Object.values(args) : [])]);

    return {
        result,
        fetching
    };
}

function useFetchLazy<T=any, K=any>({
    func,
    args
}: PropUseFetch<T, K> | PropUseFetchNoArgs<T>): UseFetchLazy<T, K> {
    const [ fetching, setFetching ] = useState(true);
    const [result, setResult] = useState(undefined as T|null|undefined);
    const controllerRef: MutableRefObject<AbortController> = useRef(new AbortController());

    const refetch = (_args?: Partial<K>) => {
        setFetching(true);

        controllerRef.current.abort();
        controllerRef.current = new AbortController();
        
        func({
            ...(args || {}),
            ...(_args || {}),
            signal: controllerRef.current.signal
        })
            .then(res => {
                setResult(res);
            })
            .catch(() => {})
            .finally(() => {
                setFetching(false);
            });

    }

    useEffect(() => {
        refetch(args);
    }, []);

    return ({
        result,
        fetching,
        refetch
    });
}

export {
    useFetch,
    useFetchLazy
}