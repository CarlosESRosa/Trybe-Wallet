import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendExpenses, fetchApi } from '../actions';

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
    };
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
    expenses.forEach((element) => {
      this.setState((prevState) => ({
        totalValue: prevState.totalValue
          + element.exchangeRates.USD.ask * element.value,
      }));
    });
  }

  addExpenses = async () => {
    const { value, description, currency, method,
      tag } = this.state;
    const { expensesAction, expenses, getDataApi } = this.props;
    const dataApi = await getDataApi();
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
  }

  render() {
    const { email } = this.props;
    const { value, totalValue } = this.state;
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
            <input
              type="text"
              name="currency"
              data-testid="currency-input"
              placeholder="currency"
              onChange={ this.handleChange }
            />
            <select
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao de credito">Cartão de crédito</option>
              <option value="cartao de debito">Cartão de débito</option>
            </select>
            <select
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
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
  getDataApi: () => dispatch(fetchApi()),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
