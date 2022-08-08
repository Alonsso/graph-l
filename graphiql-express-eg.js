const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const PORT = 3003 || process.env.PORT;

let schema = buildSchema(`
    type Query {
        hello: String,
    }
`)

let root = {
    hello: () => {
        return 'Hi!';
    },
};

app.use(express.json());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🔥`);
})