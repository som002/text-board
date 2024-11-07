import React from 'react';
import PropTypes from 'prop-types';

export default function Alert(props) {
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show border border-2 border-light top-0 start-50 translate-middle-x position-absolute `}
        role="alert"
      >
        <strong>{props.alert.type.charAt(0).toUpperCase() + props.alert.type.slice(1).toLowerCase()}</strong>:
        {props.alert.msg}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    )
  );
}

Alert.propTypes = {
  alert: PropTypes.object,
};
