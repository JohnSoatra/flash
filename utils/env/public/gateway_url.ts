function getGatewayUrl() {
    if (process.env.NEXT_PUBLIC_GATEWAY_URL) {
        return process.env.NEXT_PUBLIC_GATEWAY_URL
    }

    throw Error('Env file has no NEXT_PUBLIC_GATEWAY_URL.');
}