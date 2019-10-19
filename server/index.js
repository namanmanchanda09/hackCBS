const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test7', {useNewUrlParser: true});

const User = mongoose.model('User',{
    name: String,
    email: String
})

const Doctor = mongoose.model('Doctor',{
  docname: String,
  docemail: String
})
const Relation = mongoose.model('Relation',{
  docemail: String,
  email: String
})

const Link = mongoose.model('Link',{
  email: String,
  hash: String
})

const typeDefs = `
  type Query {
    hello(name: String): String!
    users: [User]
    links: [Link]
    relations: [Relation]
    doctors: [Doctor]
    
  }
  type Relation{
    id:ID!
    docemail: String!
    email: String!
  }
  type Doctor{
    id:ID!
    docname: String!
    docemail: String!
  }

  type User{
      id:ID!
      name: String!
      email: String!
  }
  type Link{
    id:ID!
    email: String!
    hash: String!
  }
  type Mutation{
      createUser(name: String!,email: String!): User
      createLink(email: String!, hash: String!) : Link
      createRelation(docemail: String!, email: String!) : Relation
      createDoctor(docname: String!, docemail: String!) : Doctor
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    users: () => User.find(),
    links: () => Link.find(),
    relations: () => Relation.find(),
    doctors: () => Doctor.find()
  },
  Mutation:{

      createUser: async (_, {name, email}) => {
          const user = new User({name, email});
          await user.save();
          return user;
      },
      createLink: async(_,{email, hash})=>{
        const link = new Link({email, hash})
        await link.save();
        return link;
      },
      createDoctor: async(_,{docname,docemail})=>{
        const doctor = new Doctor({docname,docemail})
        await doctor.save();
        return doctor;
      },
      createRelation: async(_,{docemail, email}) =>{
        const relation = new Relation({docemail,email});
        await relation.save();
        return relation;
      }
      
  }
}


const server = new GraphQLServer({ typeDefs, resolvers })
mongoose.connection.once("open",function(){
    server.start(() => console.log('Server is running on localhost:4000'));
});


