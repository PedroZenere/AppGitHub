import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, List } from './styles';

class Details extends Component {
  static propTypes = {
    match: PropTypes.shape({
      user: PropTypes.string,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      repositories: [],
      loading: true,
    };
  }

  // Carrega os dados do LocalStorage
  async componentDidMount() {
    const { match } = this.props;

    const { repositories } = this.state;

    const repoUser = decodeURIComponent(match.params.user);

    const [repository] = await Promise.all([
      api.get(`/users/${repoUser}/repos`, {
        params: {
          private: 'false',
          per_page: 10,
        },
      }),
    ]);

    this.setState({
      repositories: [...repositories, ...repository.data],
      loading: false,
    });
  }

  render() {
    const { repositories, loading } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
          <a href="/">Voltar aos usuários</a>
        </h1>

        <List>
          {repositories.map((repository) => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link
                to={`/repositories/${encodeURIComponent(repository.full_name)}`}
              >
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Details;
