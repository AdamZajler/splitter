# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

## The challenge
  The most difficult thing to do in this project was to copy 1: 1 look (as much as I can) of original project. I think this case is done good by me :)
### Screenshot
  ![comparasion of original project and my](https://github.com/AdamZajler/SPLITTER/blob/main/images/comparasion.png)
### Built with
  webpack
### What I learned
  Most usefull thing that I learned was using webpack (i created my own "starter" package.json). Also I re-called many event listeners. New think for me was also "caret-color" in CSS (btw. super usefull <3).
  - [Continued development] YES! Give me more projects <3
  - [Useful resources] I can't bring up any resources. If I was having trouble I was just using Google asap.
## Author [Adam Zajler](https://www.linkedin.com/in/adam-zajler-255ba8212/)
## Acknowledgments
[Frontend Mentor](https://github.com/frontendmentorio) for bringing project.
[Kevin Powell ](https://www.youtube.com/user/KepowOb) for mentioning up in his videos about Frontend Mentor.

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Links

- Solution URL: [WORKING DEMO](https://your-solution-url.com)
## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Webpack
### New thing that i learned

```css
input {
  caret-color: transparent;

  &::placeholder {
    color: green;
  }
  
  &:focus::placeholder {
    color: transparent;
  }
}
```

Just by writing code above now your input have "|" transparent and it's placeholder has a different color and so more when user clicks, placeholder disappears.