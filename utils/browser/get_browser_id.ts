async function getBrowserId() {
    const { visitorId: browserId } = await (await (await import('@fingerprintjs/fingerprintjs')).load()).get();

    return browserId;
}

export default getBrowserId;