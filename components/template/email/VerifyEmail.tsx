import ROUTE from "@/constants/route";

type Prop = {
    fullname: string,
    token: string,
    email: string,
}

const VerifyEmail = ({ fullname, token, email }: Prop) => {
    return ({
        subject: `Verify email address!`,
        body: (
            <div>
                <div>
                    <span>Hello </span>
                    <span style={{ fontWeight: "bold" }}>{fullname},</span>
                    <span>please verify your email address.</span>
                </div>
                <p>To verify your email, just click <a href={process.env.NEXTAUTH_URL + ROUTE.VERIFY + `?email=${email}&token=${token}`}>here</a>.</p>
            </div>
        )
    });
}

export default VerifyEmail;