'use client';
import BillingAccount from "@/components/template/account/Billing";
import ContactAccount from "@/components/template/account/Contact";
import GeneralAccount from "@/components/template/account/General";
import SecurityAccount from "@/components/template/account/Security";
import { useFetch } from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { PiSlidersHorizontal } from 'react-icons/pi';
import { MdOutlineAssignment, MdOutlineSecurity, MdPayment } from 'react-icons/md';
import { RegisterOptions, useForm } from "react-hook-form";
import VARS from "@/constants/vars";
import Link from "next/link";
import getOneCreditCard from "@/utils/fetch/creditcard/getone";
import Spinner from "@/components/template/spinner/Spinner";

const Class = {
    Icon: 'w-4 h-4 opacity-75',
    TabWrapper: (selected: boolean) => selected ? 'visible' : 'invisible',
    Container: 'relative min-h-[calc(100vh-3rem)] max-w-4xl md:min-h-[calc(100vh-4rem)] mx-auto flex flex-col md:flex-row md:items-stretch',
    BlockWrapper: '',
}

const buttonIds = [
    'general',
    'contact',
    'security',
    'billing'
]

const icons = [
    <PiSlidersHorizontal className={Class.Icon} />,
    <MdOutlineAssignment className={Class.Icon} />,
    <MdOutlineSecurity className={Class.Icon} />,
    <MdPayment className={Class.Icon} />,
];

const BlockWrapper = ({
    className,
    id,
    children
}: { 
    className?: string,
    id: string,
    children: React.ReactNode
}) => {
    return (
        <div
            id={id}
            className={className}>
            <div className="mb-5 flex items-end justify-between">
                <p className="opacity-75 text-lg md:text-xl font-semibold capitalize">{id}</p>
            </div>
            {children}
        </div>
    );
}


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
        }
    },
    'avatar': {
        validate: (images: FileList) => {
            if (images['length'] > 0) {
                if (images[0].size > (2 * VARS.SIZE.MB)) {
                    return 'must not more then 2MB.';
                }
            }
        }
    }
}

const Index = () => {
    const { data: session } = useSession();
    const {
        register,
        trigger,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { result: creditCard } = useFetch({
        func: getOneCreditCard,
        args: {}
    });

    const onSave = () => {
        switch (selectedIndex) {
            case 0:
                saveGeneral();
                break;
        }
    }

    const saveGeneral = async () => {
        let ok = await trigger('username');
        
        if (ok) {
            const username = watch('username');
            ok = await trigger('avatar');

            if (ok) {
                const images = watch('avatar');
                const data = new FormData();

                // console.log(images[0]);

                // data.append('file', images[0]);

                // fetch(VARS.MEDIA_SERVER, {
                //     method: 'post',
                //     body: data
                // }).then(async res => {
                //     console.log('done');
                // });
            }
        }
    }

    return (
        <div className={Class.Container}>

            <div className="md:min-w-[10rem] max-h-80 flex flex-col justify-center items-center">
                <ul
                    className={`
                        flex flex-nowrap overflow-x-scroll md:w-full
                        md:flex-col md:overflow-y-scroll
                    `}>
                    {
                        buttonIds.map((info, index) => 
                            <Link
                                key={index}
                                href={'#' + buttonIds[index]}
                                className={`
                                    w-full flex space-x-2 py-3 px-4 pb-5 items-center hover:text-blue-500
                                    md:pl-10 md:space-x-3 md:pb-0
                                    ${
                                        (selectedIndex === index) &&
                                        'text-blue-600'
                                    }
                                `}>
                                {
                                    icons[index]
                                }
                                <p className={`text-sm font-medium text-start cursor-default capitalize`}>
                                    {info}
                                </p>
                            </Link>
                        )
                    }

                </ul>
            </div>
            
            <div className="flex flex-1 flex-col p-5 md:p-10 mb-8 mx-5 md:ml-0 md:mr-10 md:mt-5 bg-stone-50 border border-light-400 rounded-lg">

            {
                (!session?.user || creditCard === undefined) ?
                <div className="w-full max-h-64 flex-1 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-14 md:h-14">
                        <Spinner />
                    </div>
                </div> :
                <>
                    <div className="space-y-10">
                    
                        <BlockWrapper id="general">
                            <GeneralAccount
                                user={session.user}
                                register={register}
                                errors={errors}
                                options={OPTIONS}
                                onImageOversize={() => {
                                    setError('avatar', {
                                        message: 'must not more then 2MB.'
                                    });
                                }}
                                onImageRightsize={() => {
                                    clearErrors('avatar');
                                }}
                            />
                        </BlockWrapper>
                        <BlockWrapper
                            id="contact"
                            className={Class.BlockWrapper}>
                            <ContactAccount
                                user={session.user}
                                register={register}
                                errors={errors}
                                options={OPTIONS}
                            />
                        </BlockWrapper>
                        <BlockWrapper
                            id="security"
                            className={Class.BlockWrapper}>
                            <SecurityAccount
                                user={session.user}
                                register={register}
                                errors={errors}
                                options={OPTIONS}
                            />
                        </BlockWrapper>
                        <BlockWrapper
                            id="billing"
                            className={Class.BlockWrapper}>
                            <BillingAccount
                                user={session.user}
                                creditCard={creditCard}
                                register={register}
                                errors={errors}
                                options={OPTIONS}
                            />
                        </BlockWrapper>
                    </div>
                    <div className="my-5 sticky bottom-2.5 right-0 flex justify-end">
                        <button
                            type="button"
                            className="w-fit transition text-white border border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2 text-center"
                            onClick={onSave}>
                            Save
                        </button>
                    </div>
                </>
            }
            </div>

        </div>
    );
}

export default Index;