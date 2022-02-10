import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendExpenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      valorDespesa: 0,
      descricaoDespesa: '',
      moeda: '',
      formaPagamento: 'Dinheiro',
      tipoDespesa: 'Alimentação',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  addExpenses = () => {
    const { valorDespesa, descricaoDespesa, moeda, formaPagamento,
      tipoDespesa } = this.state;
    const { expensesAction, expenses } = this.props;
    const expensesObj = {
      id: expenses.length,
      valorDespesa,
      descricaoDespesa,
      moeda,
      formaPagamento,
      tipoDespesa,
    };
    expensesAction(expensesObj);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        TrybeWallet
        <header>
          <h3 data-testid="email-field">{`Email: ${email}`}</h3>
          <h3 data-testid="total-field">{`Valor: ${0}`}</h3>
          <h3 data-testid="header-currency-field">Cambio: BRL</h3>
          <form>
            <input
              type="text"
              name="valorDespesa"
              data-testid="value-input"
              placeholder="valor da despesa"
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="descricaoDespesa"
              data-testid="description-input"
              placeholder="descrição da despesa"
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="moeda"
              data-testid="currency-input"
              placeholder="moeda"
              onChange={ this.handleChange }
            />
            <select
              name="formaPagamento"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao de credito">Cartão de crédito</option>
              <option value="cartao de debito">Cartão de débito</option>
            </select>
            <select
              name="tipoDespesa"
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
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
