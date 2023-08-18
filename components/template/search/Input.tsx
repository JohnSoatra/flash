import React, { useState, useRef, Fragment } from 'react';
import { useFetch } from '@/hooks/useFetch';
import Suggestions from '@/components/Suggestions';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import keyEffect from '@/utils/number/valid_key';
import { useRouter } from 'next/navigation';
import ROUTE from '@/constants/route';
import getManyProductNames from '@/utils/fetch/product/getmany/name';
import { Transition } from '@headlessui/react';
const Class = {
    SEARCH_BUTTON: 'text-sm font-medium rounded-r-lg',
    SEARCH_ICON: 'h-6 w-6 cursor-pointer opacity-60 transition hover:opacity-90',
}

const InputSearch = () => {
    const router = useRouter();
    const [ searchPhrase, setSearchPhrase ] = useState('');
    const [ openSuggestion, setOpenSuggestion ] = useState(false);
    const [ hoverIndex, setHoverIndex ] = useState(-1);
    const [ requestString, setRequestString ] = useState('');
    const refSearch = useRef<HTMLInputElement>(null);
    
    const {result: suggestions} = useFetch({
        func: getManyProductNames,
        args: {
            string: requestString
        }
    });

    const gotoSearch = (string: string) => {
        resetSuggest();
        router.push(ROUTE.SEARCH(string));
    }

    const resetSuggest = () => {
        setOpenSuggestion(false);
        refSearch.current?.blur();
        setHoverIndex(-1);
    }

    return (
        <form className='relative w-full h-full'>
            <div className="relative w-full h-full rounded-full">
                <input
                    autoComplete='off'
                    type="text"
                    id="search-dropdown"
                    className="w-full h-full block px-3 py-2 md:px-5 md:py-3 text-sm transition rounded-full border border-light-300 bg-white/70 hover:bg-white/90 focus:bg-white focus:ring-2 focus:ring-light-300 focus:border-dark-50"
                    placeholder="Search products..."
                    value={searchPhrase}
                    ref={refSearch}
                    onKeyDown={(evt) => {
                        if (evt.key === "Enter") {
                            evt.preventDefault();
                            gotoSearch(searchPhrase);
                        } else if (evt.key == "ArrowUp") {
                            if (suggestions && suggestions.length > 0) {
                                let index = hoverIndex <= 0 ? suggestions.length - 1 : hoverIndex - 1;

                                setSearchPhrase(suggestions[index].title);
                                setHoverIndex(index);
                            }
                        } else if (evt.key === 'ArrowDown') {
                            if (suggestions && suggestions.length > 0) {
                                let index = hoverIndex >= (suggestions.length - 1) ? 0 : hoverIndex + 1;

                                setSearchPhrase(suggestions[index].title);
                                setHoverIndex(index);
                            }
                        }
                    }}
                    onKeyUp={(evt) => {
                        if (keyEffect(evt)) {
                            setRequestString(refSearch.current?.value || '');
                        }
                    }}
                    onChange={(evt) => setSearchPhrase(evt.target.value)}
                    onFocus={() => setOpenSuggestion(true)}
                    onBlur={() => setOpenSuggestion(false)}
                />

                <div className='px-5 h-full w-fit rounded-full absolute top-1/2 right-0 -translate-y-1/2 flex items-center space-x-2'>
                    {
                        searchPhrase !== '' &&
                        <label
                            htmlFor='search-dropdown'
                            className={Class.SEARCH_BUTTON}
                            onClick={(evt) => {
                                refSearch.current?.focus();
                                setSearchPhrase('');
                            }}>
                            <XMarkIcon className={Class.SEARCH_ICON} />
                        </label>
                    }
                    
                    <button
                        type='submit'
                        className={Class.SEARCH_BUTTON}
                        onClick={(evt) => {
                            evt.preventDefault();
                            gotoSearch(searchPhrase)
                        }}>
                        <MagnifyingGlassIcon className={Class.SEARCH_ICON} />
                    </button>
                </div>
            </div>

            <Transition
                appear
                as={Fragment}
                show={openSuggestion}
                enter="ease-out duration-150"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1">
                <div className='absolute w-full top-full left-0'>
                    {
                        suggestions && suggestions.length > 0 &&
                        <Suggestions
                            suggestions={suggestions}
                            hoverIndex={hoverIndex}
                            onClick={(evt, sg) => {
                                evt.preventDefault();
                                setSearchPhrase(sg.title);
                                gotoSearch(sg.title);
                            }}
                            onEnter={(index) => setHoverIndex(index)}
                            onLeave={() => setHoverIndex(-1)}
                        />
                    }
                </div>
            </Transition>
        </form>
    );
}

export default InputSearch;