export function filterData(data) {
    return {
        type: "FILTERLIST",
        payload: data
    };
}