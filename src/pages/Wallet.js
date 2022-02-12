import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendExpenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      totalValue: 0,
      moedas: [],
    };
  }

  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((dataApi) => {
        this.setState({
          moedas: Object.keys(dataApi).filter((element) => element !== 'USDT'),
        });
      })
      .catch((error) => error);
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
    const total = expenses.reduce((acc, element) => {
      const { currency, exchangeRates, value } = element;
      return acc + (exchangeRates[currency].ask * value);
    }, 0);
    this.setState({ totalValue: total });
  }

  addExpenses = () => {
    const { value, description, currency, method,
      tag } = this.state;
    const { expensesAction, expenses } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((dataApi) => {
        const expensesObj = {
          id: expenses.length,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates: dataApi,
        };
        expensesAction(expensesObj);
        this.setState({ value: 0 });
        this.totalExpenses();
      })
      .catch((error) => error);
  }

  render() {
    const { email } = this.props;
    const { value, totalValue, moedas } = this.state;
    return (
      <div>
        TrybeWallet
        <header>
          <h3 data-testid="email-field">{`Email: ${email}`}</h3>
          <h3 data-testid="total-field">
            {`Total despesas: ${parseFloat(totalValue.toFixed(2))}`}
          </h3>
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
        </header>
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
