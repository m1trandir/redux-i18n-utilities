import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Translate extends Component {
  render() {
    const text = this.context.translate(this.props.tag);
    return React.createElement('span', null, text);
  }
}

Translate.propTypes = {
  tag: PropTypes.string.isRequired,
};

Translate.contextTypes = {
  translate: PropTypes.func.isRequired,
};

export default Translate;
