import React, { Component } from 'react';
// shortid para ids geradas automaticamente
import shortid from 'shortid';
// popover de data
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
// bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Collapse, Button} from 'reactstrap';
// formatação de data
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

// import MomentLocaleUtils from 'react-day-picker/moment';

// import 'moment/locale/pt-br';
// import 'moment/locale/it';


let mensagemItemVazio = 'Todos os campos devem ser preenchidos';
let mensagemDataInferior = 'Está prestes à atribuir uma data passada à devolução deste item' ;
let resultadoDataInferior;

// const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',];
// const WEEKDAYS_LONG = [ 'Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado',];
// const WEEKDAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}


class Form extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false, status: 'Closed' };

        this.handleIniDayChange = this.handleIniDayChange.bind(this);
        this.handleFinDayChange = this.handleFinDayChange.bind(this);

        this.state = {
            locale: 'it',
            credor:'',
            item: '',
            selectedDay: undefined,
            dataInicio: '',
            dataFinal: ''
        };
        
    }

    toggle() {
       this.setState(state => ({ collapse: !state.collapse }));
    }
    
  
    handleIniDayChange(day) {
        this.setState({ dataInicio: day });
    }

    handleFinDayChange(day) {
        this.setState({ dataFinal: day });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
      // this.setState({
      //   item: '',
      //   dataInicio: '',
      //   credor: '',
      //   dataFinal:'',
      //   expirado: false
      // })
    }

    submeter = (event) => {

    if ( this.state.item === '' || this.state.dataInicio === '' || this.state.dataFinal === '' || this.state.credor === '') {
      alert(mensagemItemVazio);
      event.preventDefault();
    } else {

    let data = this.state.dataFinal .toISOString();
    
    if (data < this.props.hoje) {
        
      
      resultadoDataInferior = window.confirm(mensagemDataInferior);
      event.preventDefault();
      
      

      if ( resultadoDataInferior === true ) { 
        console.log("hoje: ",this.props.hoje);
        console.log("devolução: ",this.state.dataFinal);
        event.preventDefault();
        this.props.onSubmit({
          id: shortid.generate() ,
          item: this.state.item,
          complete: false,
          //emprestimo
          dataInicio: this.state.dataInicio,
          dataFinal: this.state.dataFinal,
          credor: this.state.credor,
          expirado: true,   
        });
        this.setState({
            item: '',
            dataInicio: '',
            credor: '',
            dataFinal:''
        })
       } else {
        this.setState({
          dataFinal:''
        })
       }
    } else {
      console.log("hoje: ",this.props.hoje);
      console.log("devolução: ",this.state.dataFinal);
      event.preventDefault();
      this.props.onSubmit({
        id: shortid.generate() ,
        item: this.state.item,
        complete: false,
        //emprestimo
        dataInicio: this.state.dataInicio,
        dataFinal: this.state.dataFinal,
        credor: this.state.credor,
        expirado: false,   
      });
      this.setState({
          item: '',
          dataInicio: '',
          credor: '',
          dataFinal:''
      })
  }
}
}
  
  render() {
    const FORMAT = 'DD/MM/YYYY';

    return (
      <div>

        <Button className="acederFormulario" color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Novo empréstimo</Button>
  
        <Collapse
            isOpen={this.state.collapse}
            onEntering={this.onEntering}
            onEntered={this.onEntered}
            onExiting={this.onExiting}
            onExited={this.onExited}
            // localeUtils={MomentLocaleUtils} 
            // locale={this.state.locale}
            // months={MONTHS}
            // weekdaysLong={WEEKDAYS_LONG}
            // weekdaysShort={WEEKDAYS_SHORT}
          >
          <form onSubmit={this.submeter}>

          <Button className="botFechar" color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>x</Button>
          
          <h4>Novo empréstimo</h4>

          <label>
            Data de empréstimo:
            <div>                    

                <DayPickerInput 
                    name="dataInicio"
                    value={this.state.dataInicio}
                    onChange={this.handleChange}
                    onDayChange={this.handleIniDayChange}
                    formatDate={formatDate} 
                    format={FORMAT}
                    parseDate={parseDate}
                    // localeUtils={MomentLocaleUtils} locale={this.state.locale}
                    // locale="it"
                    // months={MONTHS}
                    // weekdaysLong={WEEKDAYS_LONG}
                    // weekdaysShort={WEEKDAYS_SHORT}
                    // firstDayOfWeek={1}
                    placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                    />
            </div>    
          </label>  

          <label>
            Data de devolucao:
            <div>                    

                <DayPickerInput 
                    name="dataFinal"
                    value={this.state.dataFinal}
                    onChange={this.handleChange}
                    onDayChange={this.handleFinDayChange}
                    formatDate={formatDate}
                    format={FORMAT}
                    parseDate={parseDate}
                    placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                    />
            </div>    
          </label>  


          <label>
          Item:
            <input 
                name="item"
                value={this.state.item}
                onChange={this.handleChange}
            />
          </label>

          <label>
          Para quem:
            <input 
                value={this.state.credor}
                onChange={this.handleChange}
                type="text" 
                name="credor" />
          </label>

          <input className="botConfirma" type="submit" value="Confirmar" onClick={this.submeter} />
          </form>
        </Collapse>
      </div>
    );
  }
}

export default Form;