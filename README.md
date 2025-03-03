# Frontend Mentor - Tip calculator app solution

[demo]([https://adamzajler.github.io/SPLITTER/](https://adamzajler.github.io/splitter/))

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## The challenge
  The most difficult thing to do in this project was to copy 1: 1 look (as much as I can) of original project. I think this case is done good by me :)
### Screenshot
  ![comparasion of original project and my](https://github.com/AdamZajler/SPLITTER/blob/main/images/comparasion.png)
### Built with
- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- ESBuild
### What I learned
  Most usefull thing that I learned was using webpack (i created my own "starter" package.json). Also I re-called many event listeners. New think for me was also "caret-color" in CSS (btw. super usefull <3).

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
## Acknowledgments
[Frontend Mentor](https://github.com/frontendmentorio) for bringing project and 
[Kevin Powell ](https://www.youtube.com/user/KepowOb) for mentioning up in his videos about Frontend Mentor.
## Author [Adam Zajler](https://www.linkedin.com/in/adam-zajler-255ba8212/)
