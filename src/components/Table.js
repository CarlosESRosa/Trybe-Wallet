import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delExpense } from '../actions';

class Table extends Component {
  finalValue = (value, ask) => {
    const totalValue = value * ask;
    return parseFloat(totalValue).toFixed(2);
  }

  delButtonCLick = (event, delId) => {
    const { delExpensesAction, expenses } = this.props;
    const newObj = expenses.filter((element) => element.id !== delId);
    delExpensesAction(newObj);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Ask</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 && expenses.map((element) => (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{parseFloat(element.value).toFixed(2)}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>
                  {parseFloat(element.exchangeRates[element.currency].ask).toFixed(2)}
                </td>
                <td>{element.exchangeRates[element.currency].codein}</td>
                <td>
                  {this.finalValue(element.value,
                    element.exchangeRates[element.currency].ask)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ (event) => this.delButtonCLick(event, element.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.objectOf(PropTypes.string),
  currency: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpensesAction: (payload) => dispatch(delExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
