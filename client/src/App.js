import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import './App.css';

const UsersQuery = gql`
{
  users{
    id
    name
    email
  }
}
`;

const LinksQuery = gql`
{
  links{
    id
    email
    hash
    
  }
}
`;

const DoctorsQuery = gql`
{
  doctors{
    id
    docname
    docemail
  }
}
`;

const RelationsQuery = gql`
{
  relations{
    id
    docemail
    email
  }
}
`;



class App extends React.Component{
  createUser = async (name,email)=>{
    await this.props.createUser({
      variables:{
        name,
        email

      }
    })

  }


  render(){
    if(this.props.doctorQuery.loading){
      return null
    }
    return(
      <div>
        {this.props.userQuery.users.map(user => (
          <p key={user.id}>{user.name}</p>
        ))}
      </div>
    )

  }
}

export default compose(
graphql(RelationsQuery,{name:"relationQuery"}),
graphql(UsersQuery,{name:"userQuery"}),
graphql(DoctorsQuery,{name:"doctorQuery"}),
graphql(LinksQuery, {name:"linkQuery"}))(App);



