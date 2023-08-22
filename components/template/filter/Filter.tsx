'use client';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Brand, Category, Model } from "@/prisma-types/index";
import { pushFilterBrand, pushFilterCategory, pushFilterModel, removeFilterBrand, removeFilterCategory, removeFilterModel, selectFilterBrands, selectFilterCategories, selectFilterModels, selectFilterPriceRange, updateFilterBrands, updateFilterModels, updateFilterPriceRage } from "@/redux/filter";
import { useDispatch, useSelector } from "react-redux";
import FilterGroup from "@/components/template/filter/Group";
import PriceRange from "@/components/template/filter/PriceRage";
import { CurrencyDollarIcon, Squares2X2Icon, SwatchIcon, TagIcon } from "@heroicons/react/24/outline";

type Props = {
    categories: Category[],
    brands: Brand[],
    models: Model[],
    onSave?: (evt: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void,
    onReset?: (evt: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void,
    onClose?: (evt: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
}

const Filter = ({
    categories,
    brands,
    models,
    onSave,
    onReset,
    onClose,
}: Props) => {
    const dispatch = useDispatch();
    const selectedCategories = useSelector(selectFilterCategories);
    const selectedBrands = useSelector(selectFilterBrands);
    const selectedModels = useSelector(selectFilterModels);
    const priceRange = useSelector(selectFilterPriceRange);
    const [ showCategories, setShowCategories ] = useState(categories);
    const [ showBrands, setShowBrands ] = useState(brands);
    const [ showModels, setShowModels ] = useState(models);

    const toggleCategory = (
        evt: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
        selected: boolean,
        category: Category
    ) => {
        if (selected) {
            if (selectedCategories.length > 0) {
                let newSelectedModels: Model[];

                const newSelectedBrands = selectedBrands
                    .filter(brand =>
                        selectedCategories
                        .filter(_category => _category.id !== category.id)
                        .map(category => category.id)
                        .includes(brand.category_id)
                    );

                if (newSelectedBrands.length > 0) {
                    newSelectedModels = selectedModels
                        .filter(model =>
                            newSelectedBrands
                            .map(brand => brand.id)
                            .includes(model.brand_id)
                        );
                } else {
                    newSelectedModels = [];
                }

                dispatch(updateFilterBrands(newSelectedBrands));
                dispatch(updateFilterModels(newSelectedModels));
            }

            dispatch(removeFilterCategory({ id: category.id }));

        } else {
            dispatch(pushFilterCategory(category));
        }
    };

    const toggleBrand = (
        evt: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
        selected:boolean,
        brand: Brand
    ) => {
        if (selected) {
            if (selectedBrands.length > 0) {
                const newSelectedModels = selectedModels
                    .filter(model =>
                        selectedBrands
                        .filter(_brand => _brand.id !== brand.id)
                        .map(brand => brand.id)
                        .includes(model.brand_id)
                    );

                dispatch(updateFilterModels(newSelectedModels));
            }

            dispatch(removeFilterBrand({ id: brand.id }));

        } else {
            dispatch(pushFilterBrand(brand));
        }
    };

    const toggleModel = (
        evt: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
        selected:boolean,
        model: Model
    ) => {
        if (selected) {
            dispatch(removeFilterModel({ id: model.id }));
        } else {
            dispatch(pushFilterModel(model));
        }
    }

    const onChangeLowPrice = (evt: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateFilterPriceRage({
            ...priceRange,
            lowest: +evt.target.value
        }));
    }

    const onChangeHighPrice = (evt: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateFilterPriceRage({
            ...priceRange,
            highest: +evt.target.value
        }));
    }

    useEffect(() => {
        const newShowBrands = selectedCategories.length === 0 ?
            brands :
            brands
            .filter(brand =>
                selectedCategories
                .map(category => category.id)
                .includes(brand.category_id)
            );

        const newShowModels = selectedBrands.length === 0 ?
            models
            .filter(model =>
                newShowBrands
                .map(brand => brand.id)
                .includes(model.brand_id)
            ) :
            models
            .filter(model =>
                selectedBrands
                .map(brand => brand.id)
                .includes(model.brand_id)
            );

        setShowBrands(newShowBrands);
        setShowModels(newShowModels);

    }, [selectedCategories, selectedBrands]);


    return (
        <div className="fixed w-full h-full overflow-scroll bg-gray-50">
            <div className="relative w-full h-full flex flex-col py-5 px-4 md:px-10 lg:px-20">
            {/* absolute right-5 top-4 md:right-12 md:top-8 lg:right-16 */}
                <button
                    type="button"
                    className="self-end px-5 opacity-75 transition hover:opacity-100"
                    onClick={onClose}>
                    <XMarkIcon className="w-6 h-6" />
                </button>

                <div className={"w-full space-y-6 md:space-y-10"}>
                    <FilterGroup
                        title='Categories'
                        icon={<Squares2X2Icon className="FilterIcon" />}
                        group={showCategories}
                        selected={selectedCategories}
                        onClick={toggleCategory}
                    />
                    <FilterGroup
                        title='Brands'
                        icon={<SwatchIcon className="FilterIcon" />}
                        group={showBrands}
                        selected={selectedBrands}
                        onClick={toggleBrand}
                    />
                    <FilterGroup
                        title='Models'
                        icon={<TagIcon className="FilterIcon" />}
                        group={showModels}
                        selected={selectedModels}
                        onClick={toggleModel}
                    />
                    <PriceRange
                        title="Price Range"
                        icon={<CurrencyDollarIcon className="FilterIcon" />}
                        priceRange={priceRange}
                        onChangeLowPrice={onChangeLowPrice}
                        onChangeHighPrice={onChangeHighPrice}
                    />
                </div>

                <div className="sticky bottom-0 left-0 w-full mt-10">
                    <div className="flex justify-end py-2 space-x-2">
                        <button
                            type="button"
                            className="transition text-white border border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                            onClick={onReset}>
                            Apply
                        </button>
                        <button
                            type="button"
                            className="transition text-rose-600 bg-white border border-rose-600 hover:bg-rose-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                            onClick={onSave}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
