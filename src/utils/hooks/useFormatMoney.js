const useFormatMoney = (value, seperator = ',') => {
    if (value) {
        return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, seperator);
    } else
        return 0;
}

export default useFormatMoney;