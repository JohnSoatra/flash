'use client';
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import ROUTE from "@/constants/route";
import Image from "next/image";
import Link from "next/link";
import SampleProfileIcon from "./ProfileIcon";
import UserPopover from "./UserPopover";
import useUser from "@/hooks/useUser";
import VARS from "@/constants/vars";
 
const UserProfile = () => {
  const [ open, setOpen ] = useState(false);
  const user = useUser();

  if (user === null) {
    return (
      <Link href={ROUTE.SIGN_IN}>
        <button className="flex items-center justify-center rounded-full py-2 px-3 hover:bg-white/80 font-medium opacity-75 transition hover:opacity-100">
          <p>Sign in</p>
          <ChevronRightIcon className="h-4 w-4 stroke-darkmain stroke-1"/>
        </button>
      </Link>
    );
  }

  return (
    <div className="relative flex items-center justify-center">
        <button
          className="relative w-5 h-5 md:w-6 md:h-6"
          onClick={() => setOpen(true)}>
          {
            user.image_url ?
                <Image
                    src={VARS.MEDIA_SERVER + user.image_url}
                    alt="user"
                    sizes="100%"
                    fill={true}
                    className="cursor-pointer rounded-full"
                /> :
                <SampleProfileIcon user={user} />
          }
        </button>

        <Transition
            appear
            as={Fragment}
            show={open}
            enter="ease-out duration-150"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1">
            <div className='absolute w-fit top-full right-0'>
              {
                <UserPopover
                  user={user}
                  onClickOutside={(evt) => {
                    setOpen(false);
                  }}
                />
              }
            </div>
        </Transition>

    </div>
  );
}

export default UserProfile;