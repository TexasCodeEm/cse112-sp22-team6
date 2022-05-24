Things to improve based on prof recommendation: 

-   Task 1: Rework app layout (Anthony) 5

-   User story: Pomo should minimize distraction and users expect to read things from left to right.

-   Requirements:

-   Make central feature (timer and begin button) larger, settings & stats button smaller

-   Pay attention to mobile layout

-   Dim/Hide UI components during break session

-   Put all buttons to the right side of the page?

-   Make UI less cluttered

-   Task 2: Better enforce pomo principle (Karina) 3

-   User story: we should make sure users follow the pomo principle

-   Requirements: 

-   Start break automatically when each work session is finished

-   When break starts, show notification message "Relax!" or "Standup"

-   Notification should be consistent with the style of the rest of the UI

-   Updates:

-   Issue: Unsure about break end/next session start behavior

-   Solution: discussed with professor, will implement button to let user decide if they want to auto start another work session following break or not.

-   Bug: 

-   Task 3: Adapt app to other platforms (Desktop/iOS/Pwa) Geewhan

-   Description:

-   Research and compare difficulties/benefits of making our app native on Desktop/iOS/Pwa.

-   Updates: 

-   Task 4: Tutorial Page Carousel (Tim) 3

-   Description:

-   We want a tutorial page that plays like a slideshow to let user know how to use our app

-   We want to move the help information from settings page where it does not belong

-   Updates:

-   Found templates 

-   Task 5: Add multilingual support (Austin) 3

-   Constant-en.js, constant-kr.js

-   (May require us to set up CDN at the same time.) 

-   Task 6: Personalization (Michael) 3 

-   Multiple backgrounds for users to choose from

-   UI Element for selecting background img

-   Task 7: Add SSL binding to custom domain (Jinhao) 1

-   Task 8: Fix validate-css errors (Jason) 2

-   Task 9: Optimize load time (Jun) 5

-   Description:

-   Minimize number of request

-   Eliminate unnecessary render blocking resources by using prefetch & preload attributes in html Tutorial: <https://www.digitalocean.com/community/tutorials/html-preload-prefetch>

-   Settings.css does not need to be loaded at first page

![](https://lh3.googleusercontent.com/_hbyYFERZkozgtX9Zc06NhVoZwz41WGRrXlAx2AQbSa2UGUsv8S4RI54ELnVz5BVpPikcznP-Vo7D8oMWj27SOTtCxeow3xP81Nk8HRp-m8TW6Ey8f3L40eOXSTuTKHokC-gBIPnPZAyAtge2Q)

For future sprint

-   Task 4: Fix aspect ratio in colorblind mode (Completed?) 

-   ![](https://lh5.googleusercontent.com/Z8TQMHF5bKWRA4BSPVaa3tm2yZzBaWGqxiWUoFWwKNIs1haRLY-Yy-StDztKYrRT8Q3KszXsXVRMPE5yGrXrIYAYFT9GygWrI2FdlwZXF5pwYXQFBoIxDXG6G9PQB_cPcdYcs1GBMwRNyGCutQ)

-   Task 5: Fix scaling issues with uncommon zooms / weird window sizes

-   Task 6: Modify CSS to have better "justify" for elements (more equal empty spaces, text more "centered" along available space for visual appeal

-   Task 4: Use CSS template for graph

-   <https://codepen.io/tag/barchart>

Staging server