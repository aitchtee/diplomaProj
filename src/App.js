import React, { Component } from 'react';
import Post from './Components/Post';
import posts from './posts.json'

class App extends Component {
  render() {
    return (
      <div>
        {
          posts.map((post, key) => {
            return (
              <Post
                key={key}
                title={post.title}
                description={post.description}
                image={post.image}
              />
            )
          })
        }
      </div>
    );
  }
}

export default App;
