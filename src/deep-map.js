import { assign, mapKeys, isUndefined } from 'lodash';
import flatten from 'flat';

const createDeepMapBase = (store, prefix) => ({
  get: (key, defaultValue = undefined) => {
    const value = store[`${prefix}${key}`];
    return !isUndefined(value) ? value : defaultValue;
  },
  update: (deepObject) => {
    const object = flatten(deepObject);
    assign(store, mapKeys(object, (val, key) => `${prefix}${key}`));
  },
  context: advancePrefix => createDeepMapBase(store, `${prefix}${advancePrefix}.`),
  getStore: () => store,
});

export const createDeepMap = (object = {}) => createDeepMapBase(flatten(object), '');
