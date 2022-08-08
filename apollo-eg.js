const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core')

const { Query } = require('./query.gql');

const app = express();
const PORT = 3003 || process.env.PORT;

const typeDefs = gql`
    type Book {
        title: String,
        author: String
    }
    Query,
`
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({
            embed: true,
        }),
    ],
})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});