export function removeOneProp(object, propToBeRemoved) { // propToBeRemoved is gonna be a string
    let copyObj = { ...object };
    delete copyObj[propToBeRemoved]
    return copyObj;
}