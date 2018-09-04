View a live demo [here](https://friendly-meninsky-bca341.netlify.com/).

# Reddit With React
[Reddit](http://www.reddit.com) is one of the most popular<sup>[[1]](https://www.digitaltrends.com/computing/reddit-more-popular-than-facebook-in-2018/)</sup> sites in the US, so it's more than likely that you have at least heard of it. Throughout this tutorial, we will walk through creating the most basic functions of the site to help you learn the important parts of React. Other than popularity, why was it picked for this tutorial? Its post creation and voting systems utilize two important aspects of React (which we will cover later on).

## What is React?
React was created by engineers at [Facebook](https://www.facebook.com) and it is what runs their own site, [Instagram](https://www.instagram.com), [Khan Academy](https://www.khanacademy.org/), and many others<sup>[[2]](https://github.com/facebook/react/wiki/Sites-Using-React)</sup> so it should be clear that React is extremely relevant in the web development community. Taken from the official website, "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components.'"<sup>[[3]](https://www/reactjs.org)</sup> The important takeaway from that statement is the fact that the library uses components. These components are designed to be highly modulizable, meaning each important element of your site would be it's own component and each component renders it's content itself. This allows for better organization, better data management, and more than anything, makes it easier on you since you aren't dealing with a big jumbled mess. If you would like to know how React actually works, check out the last section of [this](https://www.fullstackreact.com/30-days-of-react/day-1/) page.

#### JSX
Since each component has its own `render` method, that means we will place all of our HTML in there. The only issue is that JavaScript doesn't support HTML. To solve that, we use something called JSX, or JavaScript eXtension, so we can write JavaScript that looks very close to HTML.

Here's a preview of a React component using JSX:
```
class Example extends React.Component {
  render() {
    return (
      <div className='wrapper'>
        <h1>Normal HTML header</h1>
        <p>{'This is JavaScript inside of JSX'}</p>
      </div>
    );
  }
}
```
There are a few things to note here. The first of which is that anything within the `return` statement must be contained within a single `div`. Another thing is that you are probably used to seeing `class` (which is a keyword in JavaScript) rather than `className` in your HTML elements. In order to use JavaScript in JSX code, you use `{}`. Being able to do this in React apps is very important.

## Getting Things Set Up
In order to actually run the site, there are a few things we need to do. The first is to download the recommended version of [Node.js](https://nodejs.org/). Once that is installed, open up your respective command line/terminal (or if you are on Windows, you can use the Node.js Command Prompt) and run the following command:
```
npm install -g create-react-app
```

This allows us to be able to easily create a React app with minimal set up. In order to actually create the app, run this command in the directory you would like the files to be created (notice the name is lowercase and words are hyphenated):
```
create-react-app [name-of-app]
```

And now if we `cd` into the directory that was just created, we can run the app with:
```
npm start
```

If you are wanting to clone this repo, run the following sequence of code:
```
# Clone the repo
git clone https://github.com/dmgardiner25/Reddit-With-React.git

# cd into the directory
cd Reddit-With-React

# Install missing dependencies
npm i
```

## Components
A good first step when starting a project in React is to figure out how you want to break up the app into different components. It's also good to make a rough sketch of what you want your app to look like and draw boxes around each component ([example](https://reactjs.org/static/thinking-in-react-components-eb8bda25806a89ebdc838813bdfa3601-82965.png) from the official site). For this app, there's two main things that we want to accomplish: the ability to view posts and the ability to create posts. We aren't going to worry about having to sign in or even save data on page refresh because that's a little more advanced. Below is a breakdown of the components we will use (minus the post form):

![](https://raw.githubusercontent.com/dmgardiner25/Reddit-With-React/master/src/reddit_components.jpg "Reddit Components")

1. `FrontPage`: This is the component that will contain all of our other ones and control the opening/closing of the post form.
2. `Posts`: As the name implies, this will contain all of the posts, handle up/downvoting, and the creation of new posts.
3. `Post`: The component that renders each individual post.
4. `CreatePost`: A simple component that opens the post form when you click the "Create Post" button.
5. `PostForm`: The form for entering all of the post information.

## The Exciting Part
Now that we have an idea for the layout, we can go ahead and start implementing this in code.

There are two different ways that we can go about developing in React:
1. Top-Down where you start with the outermost component (`FrontPage` in our case) and work your way down to the inner ones.
2. Bottom-Up where, as you can probably guess, you start with the innermost components like `Post` and work your way up.

In this tutorial, we will use Top-Down to help visualize things as we develop, but feel free to use whichever feels more comfortable to you in other projects you create.

Before we start coding, we need to do some cleanup of the files that were created for us. Go ahead and delete `App.css`, `App.js`, and `App.test.js` from the `src/` directory because we will be creating our own components. In the same diretory, open up `index.js` and replace the code with:
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FrontPage from './FrontPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<FrontPage />, document.getElementById('root'));
registerServiceWorker();
```
Notice that the only thing that is different is we have replaced all instances of `App` with `FrontPage`. The important takeaway from this code is the last line, where we are saying to render the `FrontPage` component inside of an element with an ID of `root`. Notice that components are used like an HTML element, but make sure that you include the `/` to because React requires all self closing elements like `<br />` and `<img />`.

Now, you should download [this](https://raw.githubusercontent.com/dmgardiner25/Reddit-With-React/master/src/FrontPage.css) CSS file if you don't want to bother styling the page yourself and place it into the `src/` directory.

Finally, head over to the `public/` directory and open up `index.html`. In the `<body>` of the file, you can see the `<div>` with an ID of `root` that was referenced in the previous paragraph. The only change in this file is to add the following under the other two `<link>` elements for styling purposes:
```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
```

### Creating a Static Version of the App
When beginning the development of your app, it's wise to create a static version (static meaning there isn't really any "Reactiveness"). What that really means is that you are creating all of the components.

#### FrontPage
To start off, make a new file in `src/` with the name `FrontPage.js` (it's a good idea to make the name of the file the same as the component you will be rendering). This is where we will store all of our components.

At the top of the file, we will include a few things. The first is the `React` library and the second is the `FrontPage.css` file we downloaded. Below that is where we will create our first component.
```
import React from 'react';
import './FrontPage.css';

class FrontPage extends React.Component {
  render() {
    return (
      <div className='front-page'>
        <Posts />
      </div>
    );
  }
}

export default FrontPage;
```
Since this component holds what we want to see on the screen, we will go ahead and add the `Posts` component since that is what we will be making next. The other thing that is be new here is the last line. All that does is allow you to import the component in another file (like `index.js`). Since all this component is doing is holding other ones and controls the opening of the post form (which we won't worry about right now), we can move on.

#### Posts
With the `Posts` component, we will introducde `props`. `props` are used to send data from a parent to a child so we will use them to send all of our information down to the `post` component. To use `props`, the left side of the `=` is the name you want to use to access the data and the right side is the data.
```
class Posts extends React.Component {
  render() {
    return (
      <div className='posts'>
        <Post
          title={'Test Title'}
          description={'Hello, I\'m a description!'}
          votes={1337}
          community={'r/webdev'}
          user={'dgardiner'}
        />
      </div>
    );
  }
}
```
#### Post
Here, we will take the data passed through the `props` from `Posts` and display it.
```
class Post extends React.Component {
  render() {
    return (
      <div className='post'>
        <div className='voting-wrapper'>
          <div className='voting'>
            <a>
              <i className='glyphicon glyphicon-menu-up'/>
            </a>
            {this.props.votes}
            <a>
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
```
Don't mind all of the `div`s, those are just used for styling. The thing to pay attention to is what's between the braces. To access the data in the `props` passed down, you use `this.props.name`.

Assuming you have followed the steps correctly, you should be able to see a post in the app! Hover over the post to see the description.

#### CreatePost
Before starting on this component, let's go ahead and add it to the `FrontPage` component by putting `<CreatePost />` underneath `<Posts />`.

This component is simple and will consist of a button that will be used to open the form in the future.
```
class CreatePost extends React.Component {
  render() {
    return (
      <div className='submit-post'>
        <button type="button" className="btn btn-primary create">CREATE POST</button>
      </div>
    );
  }
}
```
Now, if you go back to the web page, you should see the button.

#### PostForm
The final component that we need to make is the `PostForm` which will be place above `Posts` and will constist of, if you couldn't guess, a form.
```
class PostForm extends React.Component {
  render() {
    return (
      <div className='post-form'>
        <div className='header'>
          <i className='glyphicon glyphicon-comment'/>
          Post
        </div>
        <form className='body'>
          <input type='text' className='title' placeholder='Title' />
          <textarea type='text' className='body-description' placeholder='Text (Optional)' />
          <input type='text' className='community' placeholder='Community' />
          <input type='text' className='username' placeholder='Username' />
          <button type='submit' className="btn btn-primary">Post</button>
        </form>
      </div>
    );
  }
}
```
If we add `<PostForm />` above the `Post` component in `Posts`, we should be able to see the form.

That is the last thing we needed to add, so we can move on to making the app interactive!

### Adding Interactivity
In order to make your app interactive, you have to use something called a `state`. This allows us to manipulate data in real time, something `props` don't allow us to. A good thing to do at this point is take a look at all of your components and decided what should become stateful, or rather, what needs to be modifiable.

1. `FrontPage`: Since this is what links `Posts` and `CreatePost`, the opening and closing of the post form will be done here so we need one state called `formEnable`.
2. `Posts`: The only data actually being changed here will be a list that contains all of the posts, meaning we will have a state called `posts` to hold them.
3. `Post`: Even though the upvoting and downvoting is done in this component, nothing is actually being changed here. No `state` needed.
4. `CreatePost`: Similarly, this component is a sort of middleman that doesn't change anything meaning we don't need a `state`.
5. `PostForm`: In this component, we are creating (changing) the data for a title, description, community, and username which means we need a `state` for each of them.

To add states to a component, add the following right underneath the component definition:
```
constructor() {
  super();
  this.state = {
    ...
  }
}
```
`...` will be replaced by any `state` you need and make sure to set a default value that makes sense for the situation.

**Any code past this point should go above the** `render` **method**

#### FrontPage
Like previously stated, we will add our state to the top of the `FrontPage` component.
```
constructor() {
  super();
  this.state = {
    formEnable: false
  }
}
```
Since we don't want to see the form until we press the "Create Post" button, we set the default value of the `state` to be false.

We also need to add functions below the previous code to change the `state`:
```
handleOpenForm = () => {
  this.setState({ formEnable: true })
}

handleCloseForm = () => {
  this.setState({ formEnable: false })
}
```
As you can see, we use `this.setState` to change the `state`, and these functions will be passed down as `props` for the other components to use.

To wrap things up with this component, change the `render` method to pass the functions as well as the `formEnable` as `props`:
```
render() {
  return (
    <div className='front-page'>
      <Posts formEnable={this.state.formEnable} closeForm={this.handleCloseForm}/>
      <CreatePost openForm={this.handleOpenForm}/>
    </div>
  );
}
```
`Posts` gets `formEnable` and the `handleCloseForm` method because it needs to pass both down to `PostForm` and `CreatePost` gets `handleOpenForm` because we want to open the form when the button is pressed. Notice that you access a `state` the same way you do `props`.

#### Posts
There is a lot that goes on in this component, but let's start by creating our `state`, initialized with an empty list:
```
constructor() {
  super();
  this.state = {
    posts: [],
  };
}
```
Next up is to handle the voting system
```
handleUpVote = (postId) => {
  const posts = this.state.posts.map((post) => {
    if (post.id === postId) {
      return Object.assign({}, post, {
        votes: post.votes + 1,
      });
    } else {
      return post;
    }
  });
  this.setState({
    posts: posts,
  });
}

handleDownVote = (postId) => {
  const posts = this.state.posts.map((post) => {
    if (post.id === postId) {
      return Object.assign({}, post, {
        votes: post.votes - 1,
      });
    } else {
      return post;
    }
  });
  this.setState({
    posts: posts,
  });
}
```
I know, at first glance that looks very complicated but it's not. Basically, it looks through all the posts and finds one matching the ID of the one being upvoted/downvoted and updates that post in the list. Don't worry if you don't quite get it, you can try to decipher it when you're more comfortable.

This component will also handle the creation
```
handleFormSubmit = (timer) => {
  this.props.closeForm();
  this.setState({ posts: this.state.posts.concat({
    title: timer.title,
    description: timer.description,
    community: timer.community,
    user: timer.username,
    votes: 1,
    id: timer.title + Math.floor((Math.random() * 1000))
  })});
}
```
The `timer` parameter is an object containing the information about the post from `PostForm` and we are using the `closeForm` method passed down as a prop from `FrontPage`. For updating `posts`, we take the current list and add (concatenate) a new object to the end of is. Notice that we have added an ID variable which is used for the voting process above.

Since we are now dealing with a list of posts, we are going to have to change up our render method a bit. Before the `return` statement, we need to add:
```
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
```
What this does is creates a `Post` element for each entry in the `posts` list. We are also passing the voting functions as `props` to allow the user to press on the up and down arrows to change the score of the post. `postComponents` is just a list, so we can update `return` with the following:
```
return (
  <div className='posts'>
    <PostForm
      formEnable={this.props.formEnable}
      closeForm={this.props.closeForm}
      formSubmit={this.handleFormSubmit}
    />
    {postComponents}
  </div>
);
```
Rather than having a single `Post` component, we put the list of all of them in its place. We are also passing the `formEnable` and `closeForm` from `props` and the `handleFormSubmit` method in order to pass data from new posts back up.

#### Post
The only changes needing to be made here is to call the voting functions when the arrows are clicked and pass the ID of the post:
```
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
```

#### CreateForm
In a similar fassion, we need to call the `openForm` method passed down through `props` when the button is pressed:
```
<button onClick={this.props.openForm} type="button" className="btn btn-primary create">CREATE POST</button>
```

#### PostForm
Last but not least, we need to update the `PostForm` component. Start off by adding the states for the form data:
```
constructor() {
  super();
  this.state = {
    title: '',
    description: '',
    community: '',
    username: ''
  }
}
```
We need methods to handle changes to the form fields and update each respective `state`:
```
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
```
We also need a way to call the `formSubmit` method passed through `props` and we need to send our new data back as an object:
```
handleFormSubmit = () => {
  this.props.formSubmit({
    title: this.state.title,
    description: this.state.description,
    community: this.state.community,
    username: this.state.username
  });
}
```
Finally, let's update `render`:
```
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
```
The first thing you will probably see is that we have an `if` statement around `return` that checks if `formEnable` is `true`. If it is, the form will be shown, if not we will return an empty `div` which is as good as returning nothing. When the "Post" button is pressed, we called the `handleFormSubmit` method and we call the change methods when the value in each field is changed.

With that, the app is complete! I know there was a lot thrown at you in this so good job making it through. Feel free to contact me if you have any questions or suggestions.

---
Disclaimer: This tutorial was created for SIG-Web at the Missouri University of Science and Technology.