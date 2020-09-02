import React from "react";

import './styles.css';

const Pagination = ({offset, onClickPrev, onClickNext, onClickReset}) => (
  <div className="Pagination">
    <button disabled={offset === 0} onClick={onClickPrev}>
      Prev
    </button>
    <button onClick={onClickNext} className="next">
      Next
    </button>
    <button onClick={onClickReset} className="next">
      Reset
    </button>
  </div>
);

export default Pagination;