import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      initialValue: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { initialValue } = this.state;
    return (
      <div>
        TrybeWallet
        <header>
          <h3 data-testid="email-field">{`Email: ${email}`}</h3>
          <h3 data-testid="total-field">{`Valor: ${initialValue}`}</h3>
          <h3 data-testid="header-currency-field">Cambio: BRL</h3>
        </header>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
