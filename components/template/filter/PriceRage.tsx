import { PriceRange } from "@/typings";
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import { ChangeEvent, useState } from "react";


function PriceRange({
    title,
    priceRange,
    icon,
    onChangeLowPrice,
    onChangeHighPrice,
}: {
    title: string,
    icon: React.ReactNode,
    priceRange: PriceRange,
    onChangeLowPrice: (evt: ChangeEvent<HTMLInputElement>) => void,
    onChangeHighPrice: (evt: ChangeEvent<HTMLInputElement>) => void,
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
                            <div>{icon}</div>
                            <p className="font-medium text-xl lg:text-2xl">
                                {title}
                            </p>
                        </div>
                    </div>
                </AccordionHeader>
                <AccordionBody>
                    <div className="space-y-5 md:space-y-10 px-5 md:px-10">
                        <div className="flex items-center flex-wrap gap-x-5 gap-y-5 font-normal">
                            
                            <div>
                                <input
                                    type="number"
                                    placeholder="Lowest Price"
                                    id="lowestprice"
                                    className="w-full block p-2.5 transition text-sm bg-transparent border border-light-200 rounded-lg focus:border-blue-500"
                                    value={priceRange.lowest}
                                    onChange={(evt) => onChangeLowPrice(evt)}
                                />
                            </div>

                            <p className="font-normal opacity-75">to</p>

                            <div>
                                <input
                                    type="number"
                                    placeholder="Highest Price"
                                    id="highestprice"
                                    className="w-full block p-2.5 transition text-sm bg-transparent border border-light-200 rounded-lg focus:border-blue-500"
                                    value={priceRange.highest}
                                    onChange={(evt) => onChangeHighPrice(evt)}
                                />
                            </div>

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

export default PriceRange;