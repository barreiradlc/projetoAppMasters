import React, { Component } from 'react';
// component formulário
import Form from './form';
// componente dedicado a cada empréstimo
import Emprestimo from './Emprestimo';
// boostrap
import 'bootstrap/dist/css/bootstrap.css';
import { Button} from 'reactstrap';

let resultadoDevolucao = undefined;
let resultadoRemocao = undefined;
let mensagemDevolucao = "Está prestes à devolver este item, deseja confirmar?";
let mensagemRemocao = "Está prestes à remover este item, deseja confirmar?";


let currentTime = new Date();
let agora = currentTime.toISOString();

class Emprestimos extends Component {

  state = {
    hoje: agora,
    ListaEmprestimosCompleta:[],
    ListaEmprestimos: [],
    listar: "pendentes",
    devolvidos: [],
    emprestimos:[
      {
        complete: false,
        credor: "Júlio",
        dataInicio: "2019-02-06T15:00:00.000Z",
        id: "xJQj0HN0p",
        item: "cabo USB",
        dataFinal: "2019-03-07T15:00:00.000Z",
        expirado:true
      }
    ]
  }

  componentWillMount(){
    this.setState({
      hoje: agora,
    })
    console.log('hoje :',this.state.hoje);
    
    localStorage.setItem('Lista', JSON.stringify([this.state.emprestimos]));
    this.setState({
      ListaEmprestimosCompleta: JSON.parse(localStorage.getItem('Lista'))
    })

    
  }

  addemprestimo = (emprestimo) => {
    this.setState({
      emprestimos: [emprestimo,...this.state.emprestimos],
      ListaEmprestimos: [emprestimo,...this.state.ListaEmprestimos],
    })

    console.log('emprestimos', this.state.emprestimos)
    localStorage.setItem('Lista', JSON.stringify([emprestimo,...this.state.emprestimos]));
  }


  devolvido = id => {
    resultadoDevolucao = window.confirm(mensagemDevolucao);
    
    if ( resultadoDevolucao === true ) {
      this.setState({
        emprestimos: this.state.emprestimos.map(emprestimo => {
        
          if (emprestimo.id === id) {
            this.setState({
              devolvidos: [emprestimo,...this.state.devolvidos],
            })
            localStorage.setItem('ListaDevolvidos', JSON.stringify([emprestimo,...this.state.devolvidos]));
            return {
              ...emprestimo,
              complete: !emprestimo.complete,
            };
          } else {
            return emprestimo;
          }
        })
      })
    } else {
      console.log("cancelado", resultadoDevolucao);
    }
  }

  toggleVisual = (s) => {
    this.setState({
      listar: s
    })
  }

  removido = (id) => {
    resultadoRemocao = window.confirm(mensagemRemocao);

    if ( resultadoRemocao === true ) {
    this.setState({
      emprestimos: this.state.emprestimos.filter(emprestimo => emprestimo.id !== id)
    })
    resultadoRemocao = false
  } else {
    console.log("remoçao cancelada", resultadoRemocao);
  }


  }

  componentDidMount = () => {
    
    
  } 

  render() {
    let ListaEmprestimosCompleta = [];

    if (this.state.listar === "todos") {
      ListaEmprestimosCompleta = this.state.emprestimos;
    } else if (this.state.listar === "pendentes"){
      ListaEmprestimosCompleta = this.state.emprestimos.filter(emprestimo => !emprestimo.complete);
    } else if (this.state.listar === "devolvidos"){
      ListaEmprestimosCompleta = this.state.emprestimos.filter(emprestimo => emprestimo.complete);
    }

    

    return (
      <div>

        <div className="opcoes">
          <Button color="primary" onClick={() => this.toggleVisual("todos")} style={{ marginBottom: '1rem' }}>Todos</Button>
          <Button color="primary" onClick={() => this.toggleVisual("pendentes")} style={{ marginBottom: '1rem' }}>Pendentes</Button>
          <Button color="primary" onClick={() => this.toggleVisual("devolvidos")} style={{ marginBottom: '1rem' }}>Devolvidos</Button>
        </div>        
        <h2>Empréstimos atuais</h2>
        <h4>Itens emprestados: {this.state.emprestimos.filter(emprestimo => !emprestimo.complete).length}</h4>
            <div className="gradeCards">  
              {ListaEmprestimosCompleta.map(emprestimo => (
              
              <Emprestimo 
                hoje={this.state.hoje}
                key={emprestimo.id} 
                item={emprestimo.item} 
                expirado={emprestimo.expirado} 
                dataInicio={emprestimo.dataInicio} 
                dataFinal={emprestimo.dataFinal} 
                credor={emprestimo.credor}
                emprestimo={emprestimo}
                devolvido={() => this.devolvido(emprestimo.id)}
                removido={() => this.removido(emprestimo.id)}
              />
              ))}
            </div>

            <Form onSubmit={this.addemprestimo} hoje={this.state.hoje}/>
      </div>
    );
  }
}



export default Emprestimos;
