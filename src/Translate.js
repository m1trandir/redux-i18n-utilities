import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Translate extends Component {
  render() {
    const text = this.context.translate(this.props.tag, this.props.params);
    return React.createElement('span', null, text);
  }
}

Translate.propTypes = {
  tag: PropTypes.string.isRequired,
  params: PropTypes.any,
};

Translate.contextTypes = {
  translate: PropTypes.func.isRequired,
};

export default Translate;
