import React from "react";
import Moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import { Collapse, Button} from 'reactstrap';







export default props => (

    
    <div className="card" 

        style={{ textDecoration: props.emprestimo.complete ? "line-through" : "", backgroundColor: props.emprestimo.expirado ? "red" : "" }}>
            {/* <p><strong>Hoje:</strong> {Moment(props.hoje).format('DD/MM/YYYY')}</p> */}
            <p><strong>Item:</strong> {props.emprestimo.item}</p>
            <p><strong>Data:</strong> {Moment(props.emprestimo.dataInicio).format('DD/MM/YYYY')}</p>
            <p><strong>Devolver:</strong> {Moment(props.emprestimo.dataFinal).format('DD/MM/YYYY')}</p>
            <p><strong>Portador:</strong> {props.emprestimo.credor}</p>
            <h5>Item:   
            {props.emprestimo.complete ? (
            <strong> devolvido </strong>
            ) : (
            <strong> pendente</strong>
            )}
            </h5>
            <div className="opcoesBotoes">

            <Button className="opcoesCard devolve" color="warning" onClick={props.devolvido}  style={{ display: props.emprestimo.complete ? "none" : "" }}>Devolver</Button>
            
            <Button className="opcoesCard remove" color="danger" onClick={props.removido} >Remover</Button>
            </div>

            
            
    </div>
);