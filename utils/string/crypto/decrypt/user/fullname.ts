import decrypt from "../../decrypt";

function decryptFullname(
    rawFullname: string,
    rawEmail: string,
    hashPassword: string
) {
    if (process.env.USER_FULLNAME) {
        return decrypt(
            rawFullname,
            [
                process.env.USER_FULLNAME,
                hashPassword,
                rawEmail,
            ]
        );
    }

    throw new Error('Env file has no secret key for user fullname');
}

export default decryptFullname;