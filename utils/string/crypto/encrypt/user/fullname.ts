import encrypt from "../../encrypt";

function encryptFullname(
    rawFullname: string,
    rawEmail: string,
    hashPassword: string
) {
    if (process.env.USER_FULLNAME) {
        return encrypt(
            rawFullname,
            [
                rawEmail,
                hashPassword,
                process.env.USER_FULLNAME
            ]
        );
    }

    throw new Error('Env file has no secret key for user fullname');
}

export default encryptFullname;