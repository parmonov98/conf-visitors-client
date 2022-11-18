function useQueryParams() {
    const params = new URLSearchParams(
        window ? window.location.search : {}
    );

    return new Proxy(params, {
        get(target, prop) {
            if (target.get(prop) !== '') {
                return target.get(prop)
            } else {
                return '';
            }
        },
    });
}

export default useQueryParams;