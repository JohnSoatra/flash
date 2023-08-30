function getStoreUrl() {
    if (process.env.NEXT_PUBLIC_STORE_URL) {
        return process.env.NEXT_PUBLIC_STORE_URL;
    }

    throw Error('Env file has no NEXT_PUBLIC_STORE_URL.');
}

export default getStoreUrl;