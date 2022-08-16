import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendExpenses } from '../actions';
import Table from '../components/Table';
import fetchAPI from '../helpers/fetchApi';
import './Wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      moedas: [],
    };
  }

  componentDidMount() {
    this.getApiValue();
  }

  getApiValue = async () => {
    const apiValue = await fetchAPI();
    this.setState({
      moedas: Object.keys(apiValue).filter((element) => element !== 'USDT'),
    });
    return apiValue;
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  totalExpenses = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, element) => {
      const { currency, exchangeRates, value } = element;
      return acc + (exchangeRates[currency].ask * value);
    }, 0);
  }

  addExpenses = async () => {
    const { value, description, currency, method,
      tag } = this.state;
    const { expensesAction, expenses } = this.props;
    const apiValue = await this.getApiValue();
    const expensesObj = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: apiValue,
    };
    expensesAction(expensesObj);
    this.setState({ value: 0 });
    this.totalExpenses();
  }

  render() {
    const { email } = this.props;
    const { value, moedas } = this.state;
    const totalValue = this.totalExpenses();
    return (
      <div>
        <header>
          <h1 id="main-title">TrybeWallet</h1>
          <div>
            <h4 data-testid="email-field">{`Email: ${email}`}</h4>
            <h4 data-testid="total-field">
              {`Despesas totais: ${parseFloat(totalValue.toFixed(2))}`}
            </h4>
          </div>
        </header>

        <h3 data-testid="header-currency-field">Cambio: BRL</h3>
        <form>
          <input
            type="text"
            name="value"
            data-testid="value-input"
            value={ value }
            placeholder="valor da despesa"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="description"
            data-testid="description-input"
            placeholder="descrição da despesa"
            onChange={ this.handleChange }
          />
          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            aria-label="moeda"
          >
            {moedas.map((element) => (
              <option value={ element } key={ element } data-testid={ element }>
                {element}
                {' '}
              </option>
            ))}
          </select>
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro" defaultValue>Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação" defaultValue>Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button type="button" onClick={ this.addExpenses }>Adicionar despesa</button>
        </form>
        <main>
          <Table />
        </main>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  expensesAction: (payload) => dispatch(sendExpenses(payload)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
