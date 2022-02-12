import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Table extends Component {
  finalValue = (value, ask) => {
    const totalValue = value * ask;
    return parseFloat(totalValue).toFixed(2);
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
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>
                  {this.finalValue(element.value,
                    element.exchangeRates[element.currency].ask)}
                </td>
                <td>Real</td>
                <td><button type="button">Excluir</button></td>
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
