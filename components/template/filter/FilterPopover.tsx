import React, { Fragment, useState, useEffect } from 'react';
import Filter from '@/components/template/filter/Filter';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { useFetch } from '@/hooks/useFetch';
import getAllCategories from '@/utils/fetch/category/getall';
import getAllBrands from '@/utils/fetch/brand/getall';
import getAllModels from '@/utils/fetch/model/getall';

const FilterPopover = () => {
    const [ open, setOpen ] = useState(false);
    const [ loaded, setLoaded ] = useState(false);
    const {result: categories} = useFetch({ func: getAllCategories});
    const {result: brands} = useFetch({ func: getAllBrands });
    const {result: models} = useFetch({ func: getAllModels });

    useEffect(() => {
        if (categories && brands && models) {
            setLoaded(true);
        }
    }, [categories, brands, models]);

    return (
        <div className='w-full h-full flex items-center'>
            <button
                type='button'
                onClick={() => setOpen(true)}>
                <AdjustmentsHorizontalIcon className='h-5 w-5 md:h-6 md:w-6 cursor-pointer opacity-60 transition hover:opacity-100;'/>
            </button>

            <Transition appear show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-30 w-screen h-screen bg-white"
                    onClose={() => setOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-150"
                        enterFrom="opacity-0 -translate-y-5"
                        enterTo="opacity-100 translate-y-0"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-5">
                        <div className="fixed inset-0">
                        {
                            loaded &&
                                <Filter
                                    categories={categories!}
                                    brands={brands!}
                                    models={models!}
                                    onClose={() => setOpen(false)}
                                />
                        }
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </div>
    );
}

export default FilterPopover;