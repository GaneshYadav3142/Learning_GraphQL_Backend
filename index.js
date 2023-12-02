import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { db } from './db.js';




const resolvers={
  Query:{
    games(){
        return db.games
    },
    reviews(){
        return db.reviews
    },
    authors(){
        return db.authors
    },
    review(_,args){
        return db.reviews.find((review)=>review.id===args.id)
    },
    game(_,args){
        return db.games.find((game)=>game.id===args.id)
    },
    author(_,args){
        return db.authors.find((author)=>author.id===args.id)
    }
  },
  Game:{
    reviews(parent){
        return db.reviews.filter((el)=>el.game_id===parent.id)
    }
  },
  Author:{
    reviews(parent){
        return db.reviews.filter((el)=>el.author_id===parent.id)
    }
  },
  Review:{
    author(parent){
        return db.authors.find((el)=>el.id===parent.author_id)
    },
    game(parent){
        return db.games.find((el)=>el.id===parent.game_id)
    }
  },
  Mutation:{
    deleteGame(_,args){
        db.games=db.games.filter((el)=>el.id !== args.id)
        return db.games
    },
    addGame(_,args){
        let game={
            ...args.game,
            id: Math.floor(Math.random() * 10000).toString()
        }
        db.games.push(game)
        return game
    },
    editGame(_,args){
        db.games=db.games.map((el)=>{
            if(el.id===args.id){
                return {...el,...args.edits}
            }
            return el
        })
      
        return db.games.find((el)=>el.id===args.id)
    }
  }

}




//Server setup
const server = new ApolloServer({
typeDefs,
resolvers
})

const {url} = await startStandaloneServer(server,{
     listen:{port: 8080}
})

console.log("Server Running at port 8080")


// for the Second "Game" Query which we have created will only review
// in  relationship and query structure at the frontend is as 
// shown below

// query GameQuery($id:ID!) {
//     game(id:$id) {
//       title,
//       reviews {
//         rating,
//         content
//       }
     
//     }
//    }


//Similary for the "Author" Query which we have created

// query AuthorQuery($id:ID!) {
//     author(id: $id) {
//       name,
//       reviews {
//         rating,
//         content
//       }
     
//     }
//    }


//for third review Query 
// query ReviewQuery($id:ID!) {
//     review(id: $id) {
//       rating,
//       game{
//         title,
//         platform,
//         reviews {
//           content,
//           rating
//         }
//       }
     
//     }
//    }


//deelte query we have add "mutation"
// mutation DeleteQuery($id:ID!, ){
//     deleteGame(id: $id) {
//       id,
//       title,
//       platform
//     }
//   }
  

//add query/or ost query we have to add "mutation"
// mutation AddQuery($game:addGameInput!){
//     addGame(game: $game) {
//       id,
//       title,
//       platform
//     }
//   }

//reuest need to pass a json data 

// {
//    "game":{
//     "title":"Resident Evil",
//     "platform": ["switch","PS5"]
//   }
// }
  

//update or edit the data in GraphQL query is
// mutation EditQuery($edits:editGameInput!,$id:ID!){
//     editGame(edits: $edits,id:$id) {
//       title,
//       platform
//     }
//   }

//and json data need to passed as
// {
//     "edits":{
//       "platform":["PS5","Xbox"],
//     },
//     "id": "4"
//   }
  