import React from 'react';
import { Link } from 'react-router-dom';

const Cards = (props) => {
  return (
    <div>
      <div className="row ">
        <div className="col-sm-6 ">
          <div className="card ">
            <div className="card-body ">
              <h5 className="card-title">{props.card_title}</h5>
              <p className="card-text"></p>
              <Link to={props.to} className="btn btn-success">{props.btn_name}</Link>
            </div>
          </div>
        </div>

      </div>


    </div>
  );
}

export default Cards;
