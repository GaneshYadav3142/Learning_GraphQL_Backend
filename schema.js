//here we are defining our typeDefs 
//in schema we hav 5 datatypes such as
//Int,Boolean,String,ID,Float

 export  const typeDefs=`#graphql
type Game {
    id: ID!
    title: String
    platform: [String!]!
    reviews: [Review!]
},
type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
},
type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
},
# In GraphQl Query is mandatory to declare to 
# specify what is the structure of our data you are request 
# here is for e.g. reviews will get an Array of all the Review
type Query {             
    reviews: [Review]
    review(id:ID!): Review
    games: [Game]
    game(id:ID!): Game
    authors: [Author]
    author(id:ID!): Author

},
type Mutation {
    addGame(game:addGameInput): Game
    deleteGame(id:ID!) :[Game]
    editGame(id:ID!,edits:editGameInput): Game 
},
input addGameInput{
    title: String!,
    platform: [String!]!
}
input editGameInput{
    title: String,
    platform: [String!]
}
`

