import axios from "axios";
import React, { Component } from "react";
import "./App.css";

const endpointUrl = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(endpointUrl, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "Updated";
    await axios.put(endpointUrl + "/" + post.id, post);
    //axios.patch(endpointUrl + "/" + post.id, { title: post.title })
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    await axios.delete(endpointUrl + "/" + post.id);
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
  };

  async componentDidMount() {
    // pending > resolved (success) OR rejected (failure)
    // axiose returns a promise which contains a "data" property
    const { data: posts } = await axios.get(endpointUrl);
    this.setState({ posts });
  }

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
