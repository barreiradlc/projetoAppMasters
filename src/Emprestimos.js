import React, { Component } from 'react';
import Form from './form';
import Moment from 'moment';
import Emprestimo from './Emprestimo';

class Emprestimos extends Component {
  state = {
    ListaEmprestimos: [],
    emprestimos:[
      {
          complete: false,
          credor: "Júlio",
          dataInicio: "2019-03-06T15:00:00.000Z",
          id: "xJQj0HN0p",
          item: "cabo USB"
      }        
    ]
  }

  componentWillMount(){
    localStorage.setItem('Lista', JSON.stringify([this.state.emprestimos]));
    this.setState({
        ListaEmprestimos: JSON.parse(localStorage.getItem('Lista'))
    })
  }

  componentWillUpdate(){

  }

  addemprestimo = (emprestimo) => {
    // if (!localStorage.getItem('Lista')){

    // } else {

    // }

    // this.setState({
    //   ListaEmprestimos: JSON.parse(localStorage.getItem('Lista'))
    // })


    this.setState({
      emprestimos: [emprestimo,...this.state.emprestimos],
      ListaEmprestimos: [emprestimo,...this.state.ListaEmprestimos]
    })
    console.log('emprestimos', this.state.emprestimos)
    localStorage.setItem('Lista', JSON.stringify([emprestimo,...this.state.emprestimos]));
  }

  devolvido = id => {
    this.setState({
      emprestimos: this.state.emprestimos.map(emprestimo => {
        if (emprestimo.id === id) {
          return {
            ...emprestimo,
            complete: !emprestimo.complete
          };
          
        } else {
          
          return emprestimo;
          
        }
      })
    })
  }

  render() {
    return (
      <div>

        
        <h2>Empréstimos atuais</h2>
        {/* <h4>Itens emprestados: {this.state.ListaEmprestimos.length}</h4> */}
        <h4>Itens emprestados: {this.state.emprestimos.filter(emprestimo => !emprestimo.complete).length}</h4>
            <div className="gradeCards">
              
              {this.state.emprestimos.map(emprestimo => (
              
              <Emprestimo 
                key={emprestimo.id} 
                item={emprestimo.item} 
                dataInicio={emprestimo.dataInicio} 
                credor={emprestimo.credor}

                emprestimo={emprestimo}
                devolvido={() => this.devolvido(emprestimo.id)}
                
              />
                
              ))}
            </div>

            <Form onSubmit={this.addemprestimo} />
      </div>
    );
  }
}

export default Emprestimos;
