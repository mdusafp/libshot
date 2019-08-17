import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';

// TODO: add it to lifecycle
async function createClient() {
  const cache = new InMemoryCache();

  await persistCache({
    cache,
    storage: window.localStorage,
  });

  const client = new ApolloClient({
    cache,
  });

  return client;
}

export default {
  createClient,
};
