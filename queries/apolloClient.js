import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: 'https://newbackend.buaksib.com/graphql', fetch }),
  cache: new InMemoryCache(),
});
