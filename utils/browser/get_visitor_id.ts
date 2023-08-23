async function getVisitorId() {
    const visitorId = (await import('get-browser-fingerprint')).default()

    return visitorId;
}

export default getVisitorId;