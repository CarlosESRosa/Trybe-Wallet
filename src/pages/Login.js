import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { sendEmail } from '../actions';
import './Login.css';

const passwordMinLength = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputEmail: '',
      inputPassword: '',
      isRedirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  // funcao para validar email link: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  validateButton = () => {
    const { inputEmail, inputPassword } = this.state;
    if (inputPassword.length >= passwordMinLength && this.validateEmail(inputEmail)) {
      return false;
    }
    return true;
  }

  clickButton = () => {
    const { emailAction } = this.props;
    const { inputEmail } = this.state;
    emailAction(inputEmail);
    this.setState({ isRedirect: true });
  }

  render() {
    const { isRedirect } = this.state;
    return (
      <form className="login-form">
        <div>

          <h1>Login</h1>
          <input
            type="email"
            className="login-input"
            name="inputEmail"
            placeholder="Email:"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            className="login-input"
            name="inputPassword"
            placeholder="Senha:"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ this.validateButton() }
            onClick={ this.clickButton }
          >
            Entrar
          </button>
          {isRedirect && <Redirect to="/carteira" /> }
        </div>
      </form>
    );
  }
}
Login.propTypes = {
  emailAction: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  emailAction: (email) => dispatch(sendEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
