import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider, InMemoryCache, ApolloClient } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import { lifecycle } from 'recompose';

async function createApolloClient() {
  const cache = new InMemoryCache();

  try {
    await persistCache({
      cache,
      storage: window.localStorage,
    });
  } catch (err) {
    console.error('Error restoring Apollo cache', err);
  }

  const client = new ApolloClient({
    cache,
  });

  return client;
}

const enhance = lifecycle({
  componentDidMount: async () => {
    const client = await createApolloClient();

    this.setState({
      client,
      loading: false,
    });
  },
});

const App = ({ client }) => (
  <ApolloProvider client={client}>
    <div>Hello world</div>
  </ApolloProvider>
);

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  client: PropTypes.object.isRequired,
};

export default enhance(App);
