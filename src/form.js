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

        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            item: '',
            selectedDay: undefined,            
        };
        
    }

      toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
      }
    
  
    handleDayChange(day) {
        this.setState({ selectedDay: day });
        this.setState({ dataInicio: day });
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submeter = (event) => {

    event.preventDefault();
    this.props.onSubmit({
        id: shortid.generate() ,
        item: this.state.item,
        complete: false,
        //emprestimo
        dataInicio: this.state.dataInicio,
        credor: this.state.credor   
    });
    this.setState({
        item: '',
        dataInicio: '',
        credor: ''
    })
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
                    onDayChange={this.handleDayChange}
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