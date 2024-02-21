export type TCallbackFn = (value: never) => unknown

export function assert(...assertions: any) {
  for (let assertion of assertions) {
    if (assertion === false) {
      throw new Error("Assertion failed!");
    }
  }
}

export const RANGE_1_9 = [1,2,3,4,5,6,7,8,9];

// all the members of set1 which are not members of set2
export const calcSetDifference = (set1: any[], set2: any[]) => set1.filter(x => !set2.includes(x))

// all objects that are members of both A and B. 
// eg.intersection of [1, 2, 3] and [2, 3, 4] is the set [2, 3].
export const calcSetIntersection = (set1: any[], set2: any[]) => set1.filter(x => set2.includes(x))

// see tests for example
export const sortObjectByProperty = (propertyName: string, direction: 'ASC' | 'DESC' = 'ASC') => {
  if (direction === 'ASC') {
    return (a: any, b: any) => 
      a[propertyName] > b[propertyName] ? 1 : a[propertyName] < b[propertyName] ? -1 : 0;
  } else if (direction === 'DESC') {
    return (a: any, b: any) => 
      a[propertyName] > b[propertyName] ? -1 : a[propertyName] < b[propertyName] ? 1 : 0;
  } else {
    throw new Error("direction parameter invalid");
  }
}

/**
 * eg. 
 * 	classNames(
 * 		'A',
 * 		['B', true],
 * 		['C', false],
 * 		{ D: true, E: false }
 *  ) => "A B D" 
 */
export const classNames = (...args: any[]):string => {
  return args
    .map(arg => {
      if (typeof arg === 'string') {
        return arg;
      }

      if (Array.isArray(arg)) {
        assert(arg.length === 2);
        return (arg[1] ? arg[0] : undefined); 
      }

      if (typeof arg === 'object') {
        return Object.keys(arg)
          .filter(key => !!arg[key])
          .join(' ')
      } 
      
      // else
      throw new Error("unknown type");
  })
  .filter(x => !!x)
  .join(' ');
}

/**
 * Slice an array into multiple arrays of length `n`
 */
export function recursiveSlice(original: any[] | string, elementsPerSlice: number): any[][] | any[] {
  if (original.length === 0) {
    return [];
  } else if (original.length < elementsPerSlice) {
    return [original];
  } else {
    return [
      original.slice(0, elementsPerSlice), 
      ...recursiveSlice(original.slice(elementsPerSlice), elementsPerSlice)] 
  }
}