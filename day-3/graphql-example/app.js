const express = require('express');
const fs = require('fs');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = fs.readFileSync('./schema.graphql', 'utf8');

const users = [
    { name: "user-1", id: 1 },
    { name: "user-2", id: 2 },
];

const reviews = [
    { rating: 5, text: "mantap", productId: "p1", userId: 1 },
    { rating: 3, text: "mantap", productId: "p1", userId: 2 },
    { rating: 2, text: "mantap", productId: "p4", userId: 2 }
];

const products = [
    { id: "p1" , name: "susu bendera", price: 2500 },
    { id: "p2" , name: "korek api", price: 1000 },
    { id: "p3" , name: "coklat panas", price: 4500 },
    { id: "p4" , name: "sabun mandi", price: 10000 }
];

const resolvers = {
    Query: {
        products: () => products,
        product: (_, { id }) => products.find(p => p.id == id),
        users: () => users,
        reviews: () => reviews,
    },

    Product: {
        reviews: (product) => reviews.filter(r => r.productId == product.id),
        topReview: () => reviews.sort((a, b) => b.rating-a.rating)[0],
        badReview: () => reviews.sort((a, b) => a.rating-b.rating)[0]
    },

    Review: {
        author: (review) => users.find(u => u.id == review.userId),
        product: (review) => products.find(p => p.id == review.productId)
    },

    User: {
        reviews: (user) => reviews.filter(r => r.userId == user.id)
    }
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  graphiql: true,
}));

app.listen(4000, () => console.log('graphql server is running on port 4000'));