'use client';
import ROUTE from "@/constants/route";
import { Card, Button, Tooltip, Spinner } from "@material-tailwind/react";
import Link from "next/link";
import zxcvbn from 'zxcvbn';
import { RegisterOptions, useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Error from "@/components/Error";
import { useRouter } from "next/navigation";
import signup from "@/utils/fetch/auth/signup";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import random from "@/utils/string/random";
import sendEmailVerifyEmail from "@/utils/fetch/email/send/verify_email";
import verifyEmailToken from "@/utils/fetch/email/verify/email";

const OPTIONS: { [key: string]: RegisterOptions } = {
    'email': {
        required: {
            value: true,
            message: 'is required.'
        },
        minLength: {
            value: 5,
            message: 'must be at lease 5 characters.'
        },
        maxLength: {
            value: 40,
            message: 'must not be more then 40 characters.'
        },
        pattern: {
            value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
            message: 'is in wrong format.'
        }
    },
    'code': {
        required: {
            value: true,
            message: 'is required.'
        },
        minLength: {
            value: 6,
            message: 'has 6 characters.'
        },
        maxLength: {
            value: 6,
            message: 'has 6 characters.'
        }
    },
    'password': {
        required: {
            value: true,
            message: 'is required.'
        },
        minLength: {
            value: 8,
            message: 'must be at lease 8 characters.'
        },
        maxLength: {
            value: 40,
            message: 'must not be more then 40 characters.'
        },
        validate: (value: string) => {
            if (zxcvbn(value).score > 2) {
                return true
            }

            return 'is not strong enough.'
        }
    }
}

const Class = {
    Input: "w-full block p-2.5 transition text-sm bg-transparent border border-light-200 rounded-lg focus:border-blue-500"
}

type Fields = {
    email: string,
    code: string,
    password: string,
}
   
const Index = () => {
    const { 
        register,
        handleSubmit,
        formState: { errors },
        setError,
        trigger,
        watch,
        clearErrors
    } = useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const requestCode = async () => {
        clearErrors('email');

        if (await trigger('email')) {
            const email = watch('email');
            const result = await sendEmailVerifyEmail({
                body: {
                    email
                },
                signal: null
            });

            if (result === true) {
                toast.success(
                    `Code has been send to ${email}.`,
                    {
                        position: 'bottom-center'
                    }
                );
            } else if (result === false) {
                setError(
                    'email',
                    {
                        message: 'cannot receive message.'
                    }
                );
            } else {
                setError(
                    'email',
                    {
                        message: 'is already used with another account.'
                    }
                );
            }
        }
    }

    const onSubmit = async (data: any) => {
        clearErrors(['email', 'code', 'password']);
        setLoading(true);

        const dataField = data as Fields;
        const email = dataField.email;
        const code = dataField.code;
        const password = dataField.password;

        const verified = await verifyEmailToken({
            body: {
                email,
                token: code,
            },
            signal: null
        });

        if (verified) {
            const result = await signup({
                body: {
                    email,
                    email_token: verified,
                    password,
                },
                signal: null,
            });

            if (result === true) {
                router.push(ROUTE.SIGN_IN);
            } else if (result === false) {
                toast.error(
                    'There is a problem with signing up.',
                    {
                        position: 'bottom-center'
                    }
                );
            } else {
                setError(
                    'email',
                    {
                        message: 'is already used with another account.'
                    }
                );
            }
        } else {
            setError(
                'code',
                {
                    message: 'is incorrect.'
                }
            );
        }

        setLoading(false);        
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="border border-light-200 shadow-lg h-fit py-5 px-10 rounded-lg">
                <Card color="transparent" shadow={false}>
                    
                    <div className="flex justify-center items-center space-x-3 mb-3 md:mb-5">
                        <Link href={ROUTE.HOME}>
                            <div className='relative border border-light-300 rounded-full h-12 w-12 md:w-14 md:h-14 cursor-pointer opacity-80 transition hover:opacity-100'>
                                <Image
                                    priority
                                    src={'/flash-wb.png'}
                                    alt='header'
                                    fill={true}
                                    sizes="100%"
                                    className='object-contain'
                                />
                            </div>
                        </Link>
                        <p className="text-xl md:text-2xl font-extrabold">Flash</p>
                    </div>
                    
                    <div>
                        <p className="text-2xl md:text-3xl font-bold">
                            Sign Up
                        </p>
                        <p className="text-sm md:text-base mt-1 font-normal opacity-85">
                            Enter your information to sign up.
                        </p>
                    </div>

                    <form
                        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                        onSubmit={handleSubmit(onSubmit)}>

                        <div className="mb-4 flex flex-col gap-6">
                            <div>
                                <div className="mb-2 text-sm font-medium flex items-start ">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium">
                                        Email&nbsp;
                                    </label>
                                    {
                                        errors['email'] &&
                                        <Error message={String(errors['email']['message'])} />
                                    }
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        id="email"
                                        className={Class.Input}
                                        { ...register('email', OPTIONS['email']) }
                                    />
                                    <Tooltip
                                        className='bg-white border border-blue-gray-50 shadow-xl shadow-black/10 px-4 py-3'
                                        content={
                                            <div className="text-gray-800">
                                                Request Verification Code
                                            </div>
                                        }>
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                                            onClick={requestCode}>
                                            <FontAwesomeIcon
                                                icon={faPaperPlane}
                                                size="1x"
                                                className="text-sky-600 shadow-sky-500/20 hover:shadow-sky-500/40 opacity-90"
                                            />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 text-sm font-medium flex items-start ">
                                    <label
                                        htmlFor="code"
                                        className="block mb-2 text-sm font-medium">
                                        Code&nbsp;
                                    </label>
                                    {
                                        errors['code'] &&
                                        <Error message={String(errors['code']['message'])} />
                                    }
                                </div>

                                <input
                                    type="text"
                                    id="code"
                                    className={Class.Input}
                                    { ...register('code', OPTIONS['code']) }
                                />
                            </div>

                            <div>
                                <div className="mb-2 text-sm font-medium flex items-start ">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium">
                                        Password&nbsp;
                                    </label>
                                    {
                                        errors['password'] &&
                                        <Error message={String(errors['password']['message'])} />
                                    }
                                </div>

                                <input
                                    type="password"
                                    id="password"
                                    className={Class.Input}
                                    { ...register('password', OPTIONS['password']) }
                                />
                            </div>

                        </div>

                        <Button
                            type="submit"
                            className="flex items-center justify-center space-x-2 mt-10"
                            fullWidth
                            disabled={loading}>
                            {
                                loading ?
                                <>
                                    <Spinner className="w-4"/>
                                    <p>Signing up...</p>
                                </> :
                                <p>Sign up</p>
                            }
                        </Button>

                        <div className="flex justify-center mt-4 text-sm text-center">
                            <p className="opacity-75 pr-2">Already have an account?</p>
                            <Link
                                href={ROUTE.SIGN_IN}
                                className="font-medium transition-colors text-blue-500 hover:text-blue-600">
                                Sign In
                            </Link>
                        </div>

                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Index;