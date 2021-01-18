const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const MoviesUrl = 'http://localhost:4001/'
const SeriesUrl = 'http://localhost:4002/'

const typeDefs = gql`

  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    movies: [Movie]
    series: [Series]
    movie(_id:ID!): Movie
    serie(_id:ID!): Series
  }

  type Mutation {
    updateMovie(_id:ID!, popularity:Float): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => {
      return axios.get(MoviesUrl)
        .then(({ data }) => {
          return data
        })
        .catch(err => {
          throw err
        })
    },
    series: () => {
      return axios.get(SeriesUrl)
        .then(({ data }) => {
          return data
        })
        .catch(err => {
          throw err
        })
    },
    movie: (_, args) => {
      return axios.get(MoviesUrl + args._id)
        .then(({ data }) => {
          return data
        })
        .catch(err => {
          throw err
        })
    }
  },

  Mutation: {
    updateMovie: (_, args) => {
      return axios.patch(MoviesUrl + args._id, {
        popularity: args.popularity
      })
        .then(({ data }) => {
          console.log(data)
          return data
        })
        .catch(err => {
          throw err
        })
    }

  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});