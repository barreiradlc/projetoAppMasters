import React from "react";
import Moment from 'moment';

export default props => (
    <div className="card" 
        onClick={props.devolvido}
        style={{ textDecoration: props.emprestimo.complete ? "line-through" : "" }}>
            <p><strong>Item:</strong> {props.emprestimo.item}</p>
            <p><strong>Data:</strong> {Moment(props.emprestimo.dataInicio).format('DD/MM/YYYY')}</p>
            <p><strong>Portador:</strong> {props.emprestimo.credor}</p>
            <h5>Item:   
            {props.emprestimo.complete ? (
            <strong> devolvido </strong>
            ) : (
            <strong> pendente</strong>
            )}
            </h5>

            
            
    </div>
);