import Mailer from "nodemailer-react";
import VerifyEmail from "@/components/template/email/VerifyEmail";
import ResetPass from "@/components/template/email/ResetPass";

const transport = {
    host: process.env.EMAIL_HOST,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
}

const defaults = {
    from: process.env.EMAIL_FROM
}

const mailer = Mailer(
    {
        transport: transport,
        defaults: defaults
    },
    {
        VerifyEmail,
        ResetPass,
    }
);

export default mailer;