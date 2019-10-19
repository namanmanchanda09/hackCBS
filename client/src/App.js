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

class App extends React.Component{


  render(){
    // const {data: {loading,users}} = this.props;
    console.log(this.props);
    // console.log(this.props.userQuery);
    return(
      <h2 className="App">Hello</h2>
    )
  }
}

export default compose(graphql(UsersQuery,{name:"userQuery"}),
graphql(LinksQuery))(App);


