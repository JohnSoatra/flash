import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import { Brand, Category, Collection } from "@/gateway-types/index";
import { MouseEvent, useState } from "react";

type TakeType = Collection|Category|Brand;

type PlusType = {
    id: string,
    name: string,
    label?: string
}

function FilterGroup<Type=TakeType>({
    title,
    icon,
    group,
    selected,
    onClick
}: {
    title: string,
    icon: React.ReactNode,
    group: (Type & PlusType)[],
    selected: Type[],
    onClick: (evt: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, selected: boolean, member: Type) => void
}) {
    const [ open, setOpen ] = useState(false);


    return (
        <form className="space-y-4 md:space-y-5">
            <Accordion open={open}>
                <AccordionHeader
                    className="transition opacity-75 hover:opacity-100"
                    onClick={() => setOpen(!open)}>
                    <div className="flex justify-between items-center px-5 space-x-2">
                        <div className="flex space-x-2 items-center">
                            <div>
                                {icon}
                            </div>
                            <p className="font-medium text-xl lg:text-2xl">
                                {title}
                            </p>
                        </div>
                    </div>
                </AccordionHeader>
                <AccordionBody>
                    <div className="space-y-5 md:space-y-10">
                        <div className="md:grid-cols-4 xl:flex xl:justify-start flex-wrap gap-x-5 grid grid-cols-2 gap-y-5">
                        {
                            group.map(member =>
                                <div
                                    key={member.id}
                                    className={`
                                        bg-white hover:text-blue-500 hover:border-blue-500 select-none border py-2 px-4 rounded-full flex justify-center items-center space-x-1
                                        ${
                                            selected.includes(member) ?
                                                'text-blue-600 border-blue-600' :
                                                'text-darkmain border-dark-50'
                                        }
                                    `}
                                    onClick={(evt) => onClick(evt, selected.includes(member), member)}>
                                    <div className="flex space-x-6 justify-center items-center">
                                        <p className="text-sm font-normal">
                                            { member.label || member.name }
                                        </p>
                                    </div>
                                    <div className={`
                                        transition
                                        ${selected.includes(member) ? 'visible' : 'hidden'}
                                    `}>
                                        <CheckCircleIcon className="w-4 h-4 text-blue-600" />
                                    </div>
                                </div>
                            )
                        }
                        </div>
                        <div className="flex-1 w-full flex justify-start">
                            <button
                                type="button"
                                className="font-medium text-rose-500 text-sm rounded-full hover:bg-rose-50 border border-transparent hover:border-rose-200 active:bg-rose-100 px-4 py-2 transition">
                                <p>Reset</p>
                            </button>
                        </div>
                    </div>
                </AccordionBody>
            </Accordion>
        </form>
    );
}

export default FilterGroup;