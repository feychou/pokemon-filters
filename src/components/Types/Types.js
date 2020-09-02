import React from "react";
import classnames from "classnames";

import './styles.css';

const Types = ({types, activeType, onFilterType}) => (
  <div className="TypesContainer">
    {types.map(({ name }, index) => (
      <span
        key={name}
        className={classnames("TypeContainer", `TypeContainer--${name}`, activeType === name ? 'active' : '')}
        onClick={() => onFilterType(name)}
      >
        <span className="TypeName">{name}</span>
      </span>
    ))}
  </div>
);

export default Types;