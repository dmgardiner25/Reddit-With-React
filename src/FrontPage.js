import React from 'react';
import './FrontPage.css';

class FrontPage extends React.Component {
  render() {
    return (
      <div className='front-page'>
        <Posts />
        <SubmitPost />
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

  handlePostUpVote = (postId) => {
    const nextPosts = this.state.posts.map((post) => {
      if (post.id === postId) {
        return Object.assign({}, post, {
          votes: post.votes + 1,
        });
      } else {
        return post;
      }
    });
    this.setState({
      posts: nextPosts,
    });
  }

  handlePostDownVote = (postId) => {
    const nextPosts = this.state.posts.map((post) => {
      if (post.id === postId) {
        return Object.assign({}, post, {
          votes: post.votes - 1,
        });
      } else {
        return post;
      }
    });
    this.setState({
      posts: nextPosts,
    });
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
        upVote={this.handlePostUpVote}
        downVote={this.handlePostDownVote}
      />
    ));
    return (
      <div className='posts'>
        <PostForm />
        {postComponents}
      </div>
    );
  }
}

class Post extends React.Component {
  handleUpVote = () => (
    this.props.upVote(this.props.id)
  );

  handleDownVote = () => (
    this.props.downVote(this.props.id)
  );

  render() {
    return (
      <div className='post'>
        <div className='voting-wrapper'>
          <div className='voting'>
            <a onClick={this.handleUpVote}>
              <i className='glyphicon glyphicon-menu-up'/>
            </a>
            {this.props.votes}
            <a onClick={this.handleDownVote}>
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

class SubmitPost extends React.Component {
  render() {
    return (
      <div className='submit-post'>
        <button type="button" className="btn btn-primary create">CREATE POST</button>
      </div>
    );
  }
}

class PostForm extends React.Component {
  render() {
    return (
      <div className='post-form'>
        <div className='header'>
          <i className='glyphicon glyphicon-comment'/>
          Post
        </div>
        <div className='body'>
          <input type='text' className='title' placeholder='Title' />
          <textarea type='text' className='body-description' placeholder='Text (Optional)' />
          <input type='text' className='community' placeholder='Community' />
          <input type='text' className='username' placeholder='Username' />
          <button type='submit' class="btn btn-primary">Post</button>
        </div>
      </div>
    );
  }
}

export default FrontPage;
