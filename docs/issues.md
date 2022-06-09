# Issues
1. Due to FOUC, we had to add a script to the top of the html page that changes the background via Javascript. This makes it
render blocking, which hinders performance.

2. We did not have time to fully implement some of the language features inside of the tutorial page due to the lack of time.

3. We decided to use Zingcharts for our graph. This worked out really well, but it was a fat library. This ended up hurting our performance.

4. We ended up not using a minifer for certain parts of the codebase.
    - Main.css: Due to css changes, having the css file run through autoprefixer broke the code. As a result, we only used cssnano for this part.
    - tutorial_page.html: Minifying this file broke the code, so we did not minify it.

5. Parts of the CSS codebase got polluted. For example, we had to use html {} for parts of the mobile view.

6. The 'I' icon was originally next to the 'r'. However, due to the fact that the timer div took up the entire vertical part of the screen, the i button was not usable even with z-index: 999. As a result, we moved it next to the P. The professor recommended that we move it to the bottom left last minute. This is what we did, but it is not shown on the public video. 

7. We tried adding Jest tests for the tutorial page, but could not figure out how to do it.

8. Although we downloaded the font, we could not figure out a way to not fetch the font from google for the svg of the clock.

9. For the tutorial page, once a user returns from it. Any data regarding the current pomo session gets reset, so they will lose progress. However, the user should still keep their progress if they are on the tutorial page for the duration of the break. This is a complicated issue, so we just disable the tutorial forever once the first session starts.