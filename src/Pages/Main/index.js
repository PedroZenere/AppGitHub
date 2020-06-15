import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      newUser: '',
      users: [],
      loading: false,
    };
  }

  // Carrega os dados do LocalStorage
  componentDidMount() {
    const users = localStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  // Salva os dados no LocalStorage
  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleInputChange = (e) => {
    this.setState({ newUser: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newUser, users } = this.state;

    let response;

    try {
      response = await api.get(`/users/${newUser}`);
    } catch (err) {
      alert('User not found');
    }

    this.setState({
      users: [...users, response.data],
      newUser: '',
      loading: false,
    });
  };

  handleDeleteOption = (user) => {
    const { users } = this.state;

    this.setState({
      users: users.filter((u) => u.name !== user),
    });
  };

  render() {
    const { newUser, users, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Usuários
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Usuário"
            value={newUser}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {users.map((user) => (
            <li key={user.login}>
              <img src={user.avatar_url} alt={user.login} />
              <span>{user.login}</span>
              <Link to={`/details/${encodeURIComponent(user.login)}`}>
                Detalhes
              </Link>
              <button
                type="button"
                onClick={() => this.handleDeleteOption(user.name)}
              >
                <FiTrash2 size={14} color="#a8a8b3" />
              </button>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
