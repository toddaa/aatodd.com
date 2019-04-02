import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class ImageBlock extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  };


  render() {
    const { alt, src } = this.props;
    return (
      <span className="article_image">
        <img src={src} alt={alt} />
      </span>
    );
  }
}

export default ImageBlock;