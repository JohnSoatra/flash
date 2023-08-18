'use client';
import ROUTE from "@/constants/route";
import { Card, Button, Tooltip, Spinner } from "@material-tailwind/react";
import Link from "next/link";
import zxcvbn from 'zxcvbn';
import { RegisterOptions, useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Error from "@/components/Error";
import postOneUser from "@/utils/fetch/user/postone";
import { useRouter } from "next/navigation";
import encrypt from "@/utils/string/crypto/encrypt";
import networkEncrypt from "@/utils/crypto/encrypt/network";

const OPTIONS: { [key: string]: RegisterOptions } = {
    'username': {
        required: {
            value: true,
            message: 'is required.'
        },
        minLength: {
            value: 3,
            message: 'must be at lease 3 characters.'
        },
        maxLength: {
            value: 30,
            message: 'must not be more then 30 characters.'
        },
        pattern: {
            value: /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            message: 'is in wrong format.'
        }
    },
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
    },
    'condition': {
        required: {
            value: true,
            message: 'You must agree with Terms and Conditions.'
        }
    }
}

type Fields = {
    condition: boolean,
    email: string,
    password: string,
    username: string
}
   
const Index = () => {
    const { 
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setLoading(true);

        const dataField = data as Fields;

        const userRes = await postOneUser({
            email: dataField.email,
            password: networkEncrypt(dataField.password),
        });

        if (userRes?.error) {
            if (userRes.error.field === 'username') {
                setError(
                    'username',
                    {
                        message: 'is already token.'
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
        } else if (userRes?.user) {
            router.push(ROUTE.SIGN_IN);
        }

        setLoading(false);        
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="border border-midmain shadow-lg h-fit py-5 px-10 rounded-lg">
                <Card color="transparent" shadow={false}>
                    <div className="flex justify-center items-center space-x-3 mb-3 md:mb-5">
                        <Link href={ROUTE.HOME}>
                            <div className='relative border border-midmain rounded-full h-12 w-12 md:w-14 md:h-14 cursor-pointer opacity-80 transition hover:opacity-100'>
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
                                    <label htmlFor="username">
                                        Username&nbsp;
                                    </label>
                                    {
                                        errors['username'] &&
                                        <Error message={String(errors['username']['message'])} />
                                    }
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    className="w-full block p-2.5 transition text-sm bg-transparent border border-midmain rounded-lg focus:border-blue-500"
                                    { ...register('username', OPTIONS['username']) }
                                />
                            </div>

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
                                <input
                                    type="text"
                                    id="email"
                                    className="w-full block p-2.5 transition text-sm bg-transparent border border-midmain rounded-lg focus:border-blue-500"
                                    { ...register('email', OPTIONS['email']) }
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
                                    className="w-full block p-2.5 transition text-sm bg-transparent border border-midmain rounded-lg focus:border-blue-500"
                                    { ...register('password', OPTIONS['password']) }
                                />
                            </div>

                        </div>

                        <div className="space-y-2">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="term"
                                        type="checkbox"
                                        value=""
                                        className="w-4 h-4 rounded border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                        { ...register('condition', OPTIONS['condition']) }
                                    />
                                </div>
                                <label
                                    htmlFor="term"
                                    className="ml-2 text-sm font-medium flex opacity-75">
                                    <p>I agree with the&nbsp;</p>
                                    <Tooltip
                                        placement="top"
                                        className="bg-white border border-blue-gray-50 shadow-xl shadow-black/10 px-4 py-3"
                                        content={
                                            <div className="w-80 text-gray-800">
                                                We will save your information in our system <br/>
                                                for later uses, such as Authentication, <br />
                                                Product shipping and Product Reviews.
                                            </div>
                                        }>
                                        <p className="underline">Terms and Conditions</p>
                                    </Tooltip>
                                    .
                                </label>
                            </div>
                            {
                                errors['condition'] &&
                                <Error message={String(errors['condition']['message'])} />
                            }
                        </div>
                        <Button
                            type="submit"
                            className="flex items-center justify-center space-x-2 mt-6"
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