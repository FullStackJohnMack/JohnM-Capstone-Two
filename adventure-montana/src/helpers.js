export function objFilter (obj, condition) {
    let temp = Object.keys(obj)
        .filter( key => condition(obj[key]))
        .reduce( (res, key) => Object.assign(res, { [key]: obj[key] }), {} );
    return temp;
}

export function getCategoryId(category) {
    switch (category) {
        case "Hiking":
            return 1;
        case "Wildlife":
            return 2;
        case "Hunting":
            return 3;
        case "Fishing":
            return 4;
        case "Biking":
            return 5;
        case "Off-Roading":
            return 6;
        case "Winter":
            return 7;
        case "Boating":
            return 8;
        case "Watersports":
            return 9;
        default:
            return 1;
    }
}