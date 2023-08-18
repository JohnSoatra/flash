import encrypt from "../../encrypt";

function encryptAddress(
    rawAddress: string,
    rawEmail: string,
    hashPassword: string
) {
    if (process.env.USER_ADDRESS) {
        return encrypt(
            rawAddress,
            [
                rawEmail,
                hashPassword,
                process.env.USER_ADDRESS
            ]
        );
    }

    throw new Error('Env file has no secret key for user address');
}

export default encryptAddress;