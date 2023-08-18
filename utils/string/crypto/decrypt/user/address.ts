import decrypt from "../../decrypt";

function decryptAddress(
    rawAddress: string,
    rawEmail: string,
    hashPassword: string
) {
    if (process.env.USER_ADDRESS) {
        return decrypt(
            rawAddress,
            [
                process.env.USER_ADDRESS,
                hashPassword,
                rawEmail,
            ]
        );
    }

    throw new Error('Env file has no secret key for user address');
}

export default decryptAddress;