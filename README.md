View a live demo of the app [here](https://friendly-meninsky-bca341.netlify.com/).

# Reddit With React
[Reddit](http://www.reddit.com) is one of the most popular<sup>[[1]](https://www.digitaltrends.com/computing/reddit-more-popular-than-facebook-in-2018/)</sup> sites in the US, so it's more than likely that you have at least heard of it. Throughout this tutorial, we will walk through creating the most basic functions of the site to help you learn the important parts of React. Other than popularity, why was it picked for this tutorial? Its post creation and voting systems utilize two important aspects of React (which we will cover later on).

## What is React?
React was created by engineers at [Facebook](https://www.facebook.com) and it is what runs part of their own site, [Instagram](https://www.instagram.com), [Khan Academy](https://www.khanacademy.org/), and many others<sup>[[2]](https://github.com/facebook/react/wiki/Sites-Using-React)</sup> so it should be clear that React is extremely relevant in the web development community. Taken from the official website, "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components.'"<sup>[[3]](https://www/reactjs.org)</sup> The important takeaway from that statement is the fact that the library uses components. These components are designed to be highly modulizable, meaning each important element of your site would be it's own component and each component renders it's content itself. This allows for better organization, better data management, and more than anything, makes it easier on you since you aren't dealing with a big jumbled mess. If you would like to know how React actually works more in depth, check out the last section of [this](https://www.fullstackreact.com/30-days-of-react/day-1/) page.

#### JSX
Since each component renders its own content through a `render` method, that means we will place all of our HTML in there. The only issue is that JavaScript doesn't support HTML. To solve that, we use something called JSX, or JavaScript eXtension, so we can write JavaScript that looks very close to HTML.

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
There are a few things to note here. The first of which is that anything within the `return` statement must be contained within a single `div`. Another is that you are probably used to seeing `class` (which is a keyword in JavaScript) rather than `className` in your HTML elements. In order to use JavaScript in JSX code, you use `{}`. Being able to do this in React apps is very important.

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
Your browswer should automatically open it up for you but if it doesn't, go to `localhost:3000`.

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
A good first step when starting a project in React is to figure out how you want to break up the app into different components. It's also good to make a rough sketch of what you want your app to look like and draw boxes for each component that you want ([example](https://reactjs.org/static/thinking-in-react-components-eb8bda25806a89ebdc838813bdfa3601-82965.png) from the official site). For this app, there's two main things that we want to accomplish: the ability to view posts and the ability to create posts. Below is a breakdown of the components we will use (minus a few):

![](https://raw.githubusercontent.com/dmgardiner25/Reddit-With-React/master/src/reddit_components.jpg "Reddit Components")
*This picture isn't quite accurate since it's missing the a few of the components, but you should still get the idea.*

1. `FrontPage`: This is the component that will contain all of our other ones and control the opening/closing of the post form.
2. `Posts`: As the name implies, this will contain all of the posts, handle up/downvoting, and the creation of new posts.
3. `Post`: The component that renders each individual post.
4. `PostForm`: The form for entering all of the post information.
5. `SidePanel`: This will contain the `CreatePost` component as well as the `SignInForm` and `SignUpForm` components.
6. `CreatePost`: A simple component that opens the post form when you click the "Create Post" button.
7. `SignInForm`: A form to allow users to sign in.
8. `SignUpForm`: A form to allow users to sign up for an account.

## The Exciting Part
Now that we have an idea for the layout, we can go ahead and start implementing this in code.

There are two different ways that we can go about developing in React:
1. Top-Down, where you start with the outermost component (`FrontPage` in our case) and work your way down to the inner ones.
2. Bottom-Up, where you start with the innermost components like `Post` and work your way up.

In this tutorial, we will use Top-Down to help visualize things as we develop, but feel free to use whichever feels more comfortable to you in other projects you create.

Before we start coding, we need to do some cleanup of the files that were created for us. Go ahead and delete `App.css`, `App.js`, and `App.test.js` from the `src/` directory because we will be creating our own components. In the same diretory, open up `index.js` and replace the code with:
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FrontPage from './FrontPage';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<FrontPage />, document.getElementById('root'));
serviceWorker.unregister();
```
Notice that the only thing that is different is we have replaced all instances of `App` with `FrontPage`. The important takeaway from this code is the last line, where we are saying to render the `FrontPage` component inside of an element with an ID of `root`. Notice that components are used like an HTML element, but make sure that you include the `/` as well because React requires all components and self closing elements like `<br />` and `<img />` to have it.

Now, you should download [this](https://raw.githubusercontent.com/dmgardiner25/Reddit-With-React/master/src/FrontPage.css) CSS file if you don't want to bother styling the page yourself by right-clicking on the page and clicking on "Save As" or something similar and place it into the `src/` directory.

Finally, head over to the `public/` directory and open up `index.html`. In the `<body>` of the file, you can see the `<div>` with an ID of `root` that was referenced in the previous paragraph. The only change in this file is to add the following to the line above the `<title>` element for styling purposes:
```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
```
If you try to run the app now, you should get an error stating that the `FrontPage` component couldn't be found, but our next step will solve that issue.

### Creating a Static Version of the App
When beginning the development of your app, it's wise to create a static version (static meaning there isn't really any "Reactiveness"). What that really means is that you are creating the framework all of the components.

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
        
      </div>
    );
  }
}

export default FrontPage;
```
After adding this code, you should no longer be receiving the error and should see an blank page instead. Since this component holds what we want to see on the screen, we will go ahead and add the `Posts` component since that is what we will be making next by adding `<Posts />` inside of the `<div>`. The other thing that is be new here is the last line. All that does is allow you to import the component in another file (like `index.js`). Since all this component is doing is holding other ones and controls the opening of the post form (which we won't worry about right now), we can move on.

#### Posts
With the `Posts` component, we will introduce `props`. `props` are used to send data from a parent component to a child so we will use them to send all of our information down to the `post` component. To use `props`, the left side of the `=` is the name you want to use to access the data (like naming a variable) and the right side is the data itself. Place this code above `export default FrontPage` from the previous step (we will continue to add all new components above that line for the rest of the guide).
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
Don't mind all of the `div`s and other elements, those are just used for styling. The thing to pay attention to is what's between the braces. To access the data in the `props` passed down, you use `this.props.name`, where `name` is what you called the `prop` in the parent component.

Assuming you have followed the steps correctly, you should be able to see a post in the app! Hover over the post to see the description.

#### PostForm
The final component that we need to make for the posting part of the project is the `PostForm` which will be placed above `Posts` and will constist of, if you couldn't guess, a form which will eventually allow us to add a new post.
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
If you add `<PostForm />` above the `<Post />` component in `Posts`, you should be able to see the form.

#### SidePanel
Now that we have our container for the content on the lefthand side finished, let's make the one for the right. Before we do that, we need to add `<SidePanel />` in the `FrontPage` component, just like we did for the `Posts` component (make sure it goes below `<Posts />`!)

```
class SidePanel extends React.Component {
  render() {
    return (
      <div className='side-panel'>
        <CreatePost/>
        <SignInForm/>
        <SignUpForm/>
      </div>
    );
  }
}
```
We can go ahead and place the three components that are contained in the SidePanel now because we will be working on them next.

#### CreatePost
This component is simple and will consist of a button that will be used to open the form in the future.
```
class CreatePost extends React.Component {
  render() {
    return (
      <div className='create-post'>
        <button type="button" className="btn btn-primary create">CREATE POST</button>
      </div>
    );
  }
}
```

#### SignInForm
Next up is the component that will allow the user to sign in to their account if they have already created one. 

```
class SignInForm extends React.Component {
  render() {
    return (
      <div className='login-form'>
        <form>
          <input type='text' placeholder='Username' />
          <input type='password' placeholder='Password' />
          <a><p>Create Account</p></a>
          <button type='submit' className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
```

#### SignUpForm
Finally, let's make the component that allows a user to create an account.

```
class SignUpForm extends React.Component {
  render() {
    return (
      <div className='login-form'>
        <form>
          <input type='text' placeholder='Username' />
          <input type='password' placeholder='Password' />
          <button type='submit' className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}
```
*Note that we will not add the functionality for logging in/creating an account during this guide, but there will be a link at the end that goes to the backend guide that does.*

For the time being, you will see both the `SignInForm` and the `SignUpForm` but hang tight. That is the last component we need to add, so we can move on to making the app reactive!

### Adding Interactivity
In order to make your app reactive, you have to use something called a `state`. This allows us to manipulate data in real time, something `props` don't allow us to, and we will usually need a function that handles the updating of a state that gets passed down to a child component. A good thing to do at this point is take a look at all of your components and decided what should become stateful, or rather, what needs to be modifiable.

1. `FrontPage`: Since this is what links `Posts` and `CreatePost`, the opening and closing of the post form will be done here so we need one state called `formEnable`.
2. `Posts`: The only data actually being changed here will be a list that contains all of the posts, meaning we will have a single state called `posts` to hold them as well as a function that takes the data from the `CreatePost` form and adds a new post to the list. 
3. `Post`: Even though the upvoting and downvoting is done in this component, nothing is actually being changed here. No `state` needed.
4. `PostForm`: In this component, we are creating (changing) the data for a title, description, community, and username which means we need a `state` for each of them.
5. `SidePanel`: Like the `FrontPage` component, this one links the `SignInForm` and `SignUpForm`, so we will want a state called `create` which keeps track of which form we want to have open.
6. `CreatePost`: Similarly, this component is a sort of middleman that doesn't change anything meaning we don't need a `state`.
7. `SignInForm`: Just like `PostForm`, we will have a state for both the `username` and `password` of the user.
8. `SignUpForm`: This will have the same states as `SignInForm`.

To add states to a component, add the following right underneath the component definition (the `class ...` line of the component):
```
constructor() {
  super();
  this.state = {
    ...
  }
}
```
`...` will be replaced by any `state` you need and make sure to set a default value that makes sense for the situation.

***Any code past this point should go above the** `render` **method***.

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
      <SidePanel openForm={this.handleOpenForm}/>
    </div>
  );
}
```
`Posts` gets passed `formEnable` and the `handleCloseForm` method as `props` because it needs to pass both down to `PostForm` and `SidePanel` gets `handleOpenForm` because we want to open the form when the `CreatePost` button is pressed. Notice that you access a `state` in JSX by using `this.state.name`.

#### Posts
There is a lot that goes on in this component, but let's start by creating our `state` which initialized with an empty list:
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
I know at first glance that looks very complicated but it's not too bad once you get a little bit of JavaScript experience under your belt. TL:DR, it looks through all the posts and finds one matching the ID of the one being upvoted/downvoted and updates that post in the list. Don't worry if you don't quite get it, you can try to decipher it when you're more comfortable.

This component will also handle the creation of a new post.
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
The `timer` parameter is an object containing the information about the post from `PostForm` and we are using the `closeForm` method passed down as a prop from `FrontPage`. For updating `posts`, we take the current list and add (concatenate) a new object to the end of it. Notice that we have added an additional ID variable which is used for the voting process above.

Since we are now dealing with a list of posts, we are going to have to change up our render method a bit. Before the `return` statement, we need to add:
```
const postComponents = this.state.posts.map((post) => (
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
      formSubmit={this.handleFormSubmit}
    />
    {postComponents}
  </div>
);
```
Rather than having a single `Post` component, we put the list of all of them in its place. We are also passing the `formEnable` from `props` and the `handleFormSubmit` method in order to pass data from new posts back up.

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
You can't directly call a function passed as a `prop`, so we have to make functions that do it for us.

#### PostForm
Start off by adding the states for the form data:
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

#### SidePanel
Let's first add our constructor with the `create` state:
```
constructor() {
  super();
  this.state = {
    create: false
  }
}
```
Next up is our handle functions:
```
handleFormOpen = () => {
  this.setState({ create: true })
}

handleFormClose = () => {
  this.setState({ create: false })
}
```
And finally, the `render` method. This one is going to change up quite a bit because we have to add the ability to switch between the `SignInForm` and `SignUpForm` components:
```
render() {
  if(!this.state.create) {
    return (
      <div className='side-panel'>
        <CreatePost openForm={this.props.openForm}/>
        <SignInForm openForm={this.handleFormOpen}/>
      </div>
    );
  } else {
    return (
      <div className='side-panel'>
        <CreatePost openForm={this.props.openForm}/>
        <SignUpForm closeForm={this.handleFormClose}/>
      </div>
    );
  }
}
```
Using our `create` state, we can have two different return statements like `PostForm`. The one that we will default to (when `this.state.create` is false since we set it to be false in the constructor) is the `SignInForm` with the else being `SignUpForm`.

#### CreateForm
Since there aren't any `states` in this one, we need to call the `openForm` method passed down through `props` when the button is pressed. Update the `<button>` element within the `render` menthod:
```
<button onClick={this.props.openForm} type="button" className="btn btn-primary create">CREATE POST</button>
```

#### SignInForm
This one isn't much different than the others and we need to add the following: 
```
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
```
The form submit function for this component is going to be a little different, and we're going to set it up for the backend guide but it won't do anything currently. Before we add anything to the component, we need to add an extra library to our project. First, close the app in your command terminal by pressing `Ctrl+C` and then `Y` and then `Enter`. Next type the following:
```
npm i axios
```
Axios is a library that will allow us to `POST`, or send data, to a server.

Now we need to include it in our project, so at the top of the `FrontPage.js` file underneath the first `import`, add:
```
import axios from 'axios';
```
We can now create our function to handle the form submit:
```
handleFormSubmit = () => {
  axios.post('http://localhost:5000/login/', {
    username: this.state.username,
    password: this.state.password
  }).then(function(response) {
    alert(response);
  }).catch(function(error) {
    alert(error);
  })
}
```
To sum it up, this function sends the username and password the user enters in the form and then will create an alert whether or not the login was successful.

The last step is updating the `render` method like the other components:
```
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
```
*Take note of how the functions are used in the JSX.*

#### SignUpForm
This component is exactly the same as `SignInForm` with the only difference being the `render` method so we can just replace the entire inside of the component with:
```
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
    alert(response);
  }).catch(function(error) {
    alert(error);
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
```
With that, the app is complete! I know there was a lot thrown at you in this so good job making it through. There are plenty of other things we could add to make the app better such as persistent states to store data, but I didn't want to complicate things too much as this is probably your first look at React. Feel free to contact me if you have any questions or suggestions.

---
Disclaimer: This tutorial was created for SIG-Web at the Missouri University of Science and Technology.