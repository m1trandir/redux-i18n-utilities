import { createDeepMap } from './deep-map';

export const createService = () => {
  const languages = {};

  const createLanguage = (languageName, object = {}) => {
    const language = createDeepMap(object);
    languages[languageName] = language;
    return language;
  };

  const get = (languageName, tag, params) => {
    const value = languages[languageName].get(tag);
    if (typeof value === 'function') {
      return value(params);
    }

    return value;
  };

  return { createLanguage, get };
};
