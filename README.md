# Reddit With React
[Reddit](http://www.reddit.com) is one of the most popular<sup>[[1]](https://www.digitaltrends.com/computing/reddit-more-popular-than-facebook-in-2018/)</sup> sites in the US, so it's more than likely that you have at least heard of it. Throughout this tutorial, we will walk through creating the most basic functions of the site to help you learn the important parts of React. Other than popularity, why was it picked for this tutorial? Its post creation and voting systems utilize two important aspects of React (which we will cover later on). 

## What is React?
React was created by engineers at [Facebook](https://www.facebook.com) and it is what runs their own site, [Instagram](https://www.instagram.com), [Khan Academy](https://www.khanacademy.org/), and many others<sup>[[2]](https://github.com/facebook/react/wiki/Sites-Using-React)</sup> so it should be clear that React is extremely relevant in the web development community. Taken from the official website, "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components.'"<sup>[[3]](https://www/reactjs.org)</sup> The important takeaway from that statement is the fact that the library uses components. These components are designed to be highly modulizable, meaning each important element of your site would be it's own component and each component renders it's content itself. This allows for better organization, better data management, and more than anything, makes it easier on you since you aren't dealing with a big jumbled mess. If you would like to know how React actually works, check out the last section of [this](https://www.fullstackreact.com/30-days-of-react/day-1/) page.

#### JSX
Since each component has its own ```render``` method, that means we will place all of our HTML in there. The only issue is that JavaScript doesn't support HTML. To solve that, we use something called JSX, or JavaScript eXtension, so we can write JavaScript that looks very close to HTML.

Here's a preview of a React component using JSX:
```
class Example extends React.Component {
  render() {
    return (
      <div className='wrapper'>
        <h1>Normal HTML header</h1>
        <p>This is content under the header.</p>
      </div>
    );
  }
}
```
There are a few things to note here. The first of which is that anything within the ```return``` statement must be contained within a single ```div```. The other thing is that you are probably used to seeing ```class``` (which is a keyword in JavaScript) rather than ```className``` in your HTML elements.

## Getting Things Set Up
In order to actually run the site, there are a few things we need to do. The first is to download the recommended version of [Node.js](https://nodejs.org/). Once that is installed, open up your respective command line/terminal (or if you are on Windows, you can use the Node.js Command Prompt) and run the following command:
```
npm install -g create-react-app
```

This allows us to be able to easily create a React app with minimal set up. In order to actually create the app, run this command in the directory you would like the files to be created:
```
create-react-app [name-of-app]
```

And now if we ```cd``` into the directory that was just created, we can run the app with:
```
npm start
```
---
Disclaimer: This tutorial was created for SIG-Web at the Missouri University of Science and Technology.