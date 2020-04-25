import React, { Component } from 'react';
import Post from './components/Post';
import axios from 'axios';

class App extends Component {
  componentWillMount() { //! ПОЧИТАТЬ
    axios
      .get('https://5ea4b7ee2d86f00016b453f1.mockapi.io/posts')
      .then(({ data }) => {
        console.info('SERVER DATA', data);
      });
  };
  render() {
    return (
      <div>
        {/* {posts.map((post, key) => (
              <Post
                key={key}
                title={post.title}
                description={post.description}
                image={post.image}
              />
            )
          )} */}
      </div>
    );
  }
}

export default App;
