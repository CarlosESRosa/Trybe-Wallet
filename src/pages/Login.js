import React from 'react';
import { Redirect } from 'react-router-dom';

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

  validateButton = () => {
    const { inputEmail, inputPassword } = this.state;
    if (inputPassword.length >= passwordMinLength && this.validateEmail(inputEmail)) {
      return false;
    }
    return true;
  }

  // funcao para validar email link: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  render() {
    const { isRedirect } = this.state;
    return (
      <div>
        Login
        <input
          type="email"
          name="inputEmail"
          placeholder="Email:"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="inputPassword"
          placeholder="Senha:"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ this.validateButton() }
          onClick={ () => this.setState({ isRedirect: true }) }
        >
          Entrar

        </button>
        {isRedirect && <Redirect to="/carteira" /> }
      </div>
    );
  }
}

export default Login;
