import {useRef, useEffect, useState} from "react";

export function getParams(with_page = false) {
    var result = {};
    var tmp = [];

    window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            result[tmp[0]] = decodeURIComponent(tmp[1]);
        });

    if (!with_page)
        if (result['page']) delete result['page'];
    return result;
}

export function getSelectedOption(value, options) {
    let selected = null;
    if (options?.length > 0) {
        selected = options.find(item => item.value === value);
        if (selected) {
            return selected;
        } else {
            return {
                label: 'Tanlang',
                value: ''
            }
        }
    } else {
        return {
            label: 'Tanlang',
            value: ''
        }
    }
}

export function getExpenseTemplateType(type = '') {
    switch (type.toLowerCase()) {
        case 'daily':
            return 'Kunlik'
        case 'monthly':
            return 'Oylik'
        case 'annual':
            return 'Yillik'
        case 'one-time':
            return 'Bir martalik'
        default:
            return 'Tanlang';
    }
}

export function getWarehouseType(type = '') {
    switch (type.toLowerCase()) {
        case 'product':
            return 'Mahsulot'
        case 'material':
            return 'Material'
        case 'part':
            return 'Zapchast'
        default:
            return 'Tanlang';
    }
}


export function useOuterClick(callback) {
    const callbackRef = useRef(); // initialize mutable ref, which stores callback
    const innerRef = useRef(); // returned to client, who marks "border" element

    // update cb on each render, so second useEffect has access to current value
    useEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);

        function handleClick(e) {
            if (innerRef.current && callbackRef.current &&
                !innerRef.current.contains(e.target)
            ) callbackRef.current(e);
        }
    }, []); // no dependencies -> stable click listener

    return innerRef; // convenience for client (doesn't need to init ref himself)
}

export function formatMoney(value, seperator = ',') {
    if (value) {
        value = value.toString().replaceAll('<br>', '');
        return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, seperator);
    } else
        return 0;
}

export function unformatMoney(value, seperator = ',') {
    if (value) {
        value = value.replaceAll(' ', '');
        value = value.replaceAll('<br>', '');
        return Number(value.toString().replaceAll(seperator, ''));
    }
    return 0;
}

//create your forceUpdate hook
export function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}