import fpPromise from '@fingerprintjs/fingerprintjs';

async function getBrowserId() {
    const { visitorId } = await (await fpPromise.load()).get();

    return visitorId;
}

export default getBrowserId;