import { Component, Children } from 'react';
import PropTypes from 'prop-types';

class LanguageProvider extends Component {
  constructor(props, context) {
    super(props, context);
    this.languageService = props.service;
    this.getCurrentLanguage = props.getCurrentLanguage;
    this.store = context.store;
    this.translate = this.translate.bind(this);
  }
  translate(tag) {
    // TODO: warn only in development environments
    if (typeof tag === 'undefined') {
      // eslint-disable-next-line no-console
      console.warn('LanguageProvider.translate: tag is undefined');
    }

    const state = this.store.getState();
    const languageName = this.getCurrentLanguage(state);
    const text = this.languageService.get(languageName, tag);

    if (typeof text === 'undefined') {
      // eslint-disable-next-line no-console
      console.warn(`LanguageProvider.translate: Trying to translate a tag which does not exist: ${tag}`);
    }

    return text;
  }
  getChildContext() {
    return { languageService: this.service, translate: this.translate };
  }
  render() {
    return Children.only(this.props.children);
  }
}

const languageServiceShape = PropTypes.shape({
  get: PropTypes.func.isRequired,
});

export const storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
});

LanguageProvider.contextTypes = {
  store: storeShape,
};

LanguageProvider.childContextTypes = {
  languageService: languageServiceShape,
  translate: PropTypes.func,
};

LanguageProvider.propTypes = {
  languageService: languageServiceShape,
  getCurrentLanguage: PropTypes.func,
};

LanguageProvider.displayName = 'LanguageProvider';

export default LanguageProvider;
