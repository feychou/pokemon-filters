import React from "react";
import classnames from "classnames";

function Types({types, activeType, onFilterType}) {

  return (
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
}

export default Types;