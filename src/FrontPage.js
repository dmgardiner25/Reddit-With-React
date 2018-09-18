import React from 'react';
import axios from 'axios';
import './FrontPage.css';

class FrontPage extends React.Component {
  constructor() {
    super();
    this.state = {
      formEnable: false
    }
  }

  handleOpenForm = () => {
    this.setState({ formEnable: true })
  }

  handleCloseForm = () => {
    this.setState({ formEnable: false })
  }

  render() {
    return (
      <div className='front-page'>
        <Posts formEnable={this.state.formEnable} closeForm={this.handleCloseForm}/>
        <SidePanel openForm={this.handleOpenForm}/>
      </div>
    );
  }
}

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentWillMount() {
    this.generatePosts();
  }

  generatePosts = () => {
    function randomizeVotes() {
      return Math.floor((Math.random() * 50) + 15);
    }

    const posts = [
      {
        id: 1,
        title: 'Any parties tonight?',
        description: 'I\'ve had a tough week and I\'m looking to get wasted and hit up some babes.',
        votes: randomizeVotes(),
        community: 'r/Rolla',
        user: 'kschoon'
      },
      {
        id: 2,
        title: 'Would Lightning McQueen buy car insurance or life insurance?',
        description: 'This question has been on my mind daily since I first fell in love with the Cars movies around 2006.',
        votes: randomizeVotes(),
        community: 'r/AskReddit',
        user: 'claymav'
      },
      {
        id: 3,
        title: 'How to get a job as a web developer?',
        description: 'I find web development incredibly fun but I\'m not sure where to go to get experience. Any ideas?',
        votes: randomizeVotes(),
        community: 'r/cscareerquestions',
        user: 'pdilly'
      },
      {
        id: 4,
        title: 'Just got my first cat over the weekend. Meet Skittles!',
        description: '(=ↀωↀ=)',
        votes: randomizeVotes(),
        community: 'r/aww',
        user: 'ramzo'
      },
    ];

    this.setState({ posts: posts });
  }

  handleUpVote = (postId) => {
    const updatedPosts = this.state.posts.map((post) => {
      if (post.id === postId) {
        return Object.assign({}, post, {
          votes: post.votes + 1,
        });
      } else {
        return post;
      }
    });
    this.setState({
      posts: updatedPosts,
    });
  }

  handleDownVote = (postId) => {
    const updatedPosts = this.state.posts.map((post) => {
      if (post.id === postId) {
        return Object.assign({}, post, {
          votes: post.votes - 1,
        });
      } else {
        return post;
      }
    });
    this.setState({
      posts: updatedPosts,
    });
  }

  handleFormSubmit = (timer) => {
    this.props.closeForm();
    this.setState({ posts: this.state.posts.concat({
      title: timer.title,
      description: timer.description,
      community: timer.community,
      user: timer.username,
      votes: 1,
      id: timer.title + Math.floor((Math.random() * 50))
    })});
  }

  render() {
    const posts = this.state.posts.sort((a, b) => (
      b.votes - a.votes
    ));
    const postComponents = posts.map((post) => (
      <Post
        key={'post-' + post.id}
        id={post.id}
        title={post.title}
        description={post.description}
        votes={post.votes}
        community={post.community}
        user={post.user}
        upVote={this.handleUpVote}
        downVote={this.handleDownVote}
      />
    ));
    return (
      <div className='posts'>
        <PostForm
          formEnable={this.props.formEnable}
          formSubmit={this.handleFormSubmit}
        />
        {postComponents}
      </div>
    );
  }
}

class PostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      community: '',
      username: ''
    }
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  handleCommunityChange = (e) => {
    this.setState({ community: e.target.value });
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handleFormSubmit = () => {
    this.props.formSubmit({
      title: this.state.title,
      description: this.state.description,
      community: this.state.community,
      username: this.state.username
    });
  }

  render() {
    if(this.props.formEnable) {
      return (
        <div className='post-form'>
          <div className='header'>
            <i className='glyphicon glyphicon-comment'/>
            Post
          </div>
          <form onSubmit={this.handleFormSubmit} className='body'>
            <input onChange={this.handleTitleChange} type='text' className='title' placeholder='Title' />
            <textarea onChange={this.handleDescriptionChange} type='text' className='body-description' placeholder='Text (Optional)' />
            <input onChange={this.handleCommunityChange} type='text' className='community' placeholder='Community' />
            <input onChange={this.handleUsernameChange} type='text' className='username' placeholder='Username' />
            <button type='submit' className="btn btn-primary">Post</button>
          </form>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

class Post extends React.Component {
  upVote = () => (
    this.props.upVote(this.props.id)
  );

  downVote = () => (
    this.props.downVote(this.props.id)
  );

  render() {
    return (
      <div className='post'>
        <div className='voting-wrapper'>
          <div className='voting'>
            <a onClick={this.upVote}>
              <i className='glyphicon glyphicon-menu-up'/>
            </a>
            {this.props.votes}
            <a onClick={this.downVote}>
              <i className='glyphicon glyphicon-menu-down'/>
            </a>
          </div>
        </div>
        <i className='glyphicon glyphicon-comment'/>
        <div className='content'>
          <div className='title'>
            {this.props.title}
          </div>
          <div className='community'>
            {this.props.community} - Posted by {this.props.user}
          </div>
        </div>
        <div className='description'>
          <div className='gray-box'></div>
          <div className='desc-text'>
            {this.props.description}
          </div>
        </div>
      </div>
    );
  }
}

class SidePanel extends React.Component {
  constructor() {
    super();
    this.state = {
      create: false
    }
  }

  handleFormOpen = () => {
    this.setState({ create: true })
  }

  handleFormClose = () => {
    this.setState({ create: false })
  }

  render() {
    if(!this.state.create) {
      return (
        <div className='side-panel'>
          <CreatePost openForm={this.props.openForm}/>
          <LoginForm openForm={this.handleFormOpen}/>
        </div>
      );
    } else {
      return (
        <div className='side-panel'>
          <CreatePost openForm={this.props.openForm}/>
          <CreateForm closeForm={this.handleFormClose}/>
        </div>
      );
    }
  }
}

class CreatePost extends React.Component {
  render() {
    return (
      <div className='create-post'>
        <button onClick={this.props.openForm} type="button" className="btn btn-primary create">CREATE POST</button>
      </div>
    );
  }
}

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleFormSubmit = () => {
    axios.post('http://localhost:5000/login/', {
      username: this.state.username,
      password: this.state.password
    }).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    })
  }

  render() {
    return (
      <div className='login-form'>
        <form onSubmit={this.handleFormSubmit}>
          <input onChange={this.handleUsernameChange} type='text' placeholder='Username' />
          <input onChange={this.handlePasswordChange} type='password' placeholder='Password' />
          <a onClick={this.props.openForm}><p>Create Account</p></a>
          <button type='submit' className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

class CreateForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleFormSubmit = () => {
    this.props.closeForm();
    axios.post('http://localhost:5000/signup/', {
      username: this.state.username,
      password: this.state.password
    }).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    })
  }

  render() {
    return (
      <div className='login-form'>
        <form onSubmit={this.handleFormSubmit}>
          <input onChange={this.handleUsernameChange} type='text' placeholder='Username' />
          <input onChange={this.handlePasswordChange} type='password' placeholder='Password' />
          <button type='submit' className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

export default FrontPage;