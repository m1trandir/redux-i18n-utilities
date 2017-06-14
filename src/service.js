import { createDeepMap } from './deep-map';

export const createService = () => {
  const languages = {};

  const createLanguage = (languageName, object = {}) => {
    const language = createDeepMap(object);
    languages[languageName] = language;
    return language;
  };

  const get = (languageName, tag) => languages[languageName].get(tag);

  return { createLanguage, get };
};
