Sprint 2: May 2nd to May 12th

-   Task 1: Show countdown on browser tab (Feature, Frontend)

-   Assignee: Anthony 3

-   Priority: Must

-   User story description

-   Users can see the time remaining in the current session on the browser tab without switching web pages.

-   Requirements:

-   Display countdown in real time on browser tab as text of the format ("min:sec").

-   Text should also inform user whether it is a working session or a break. E.g. Work | 24:35 or Rest | 03:33.

-   Problems encountered:

-   Cannot set html 

-   Task 2: Add analytics/error alert

-   Assignee: Tim 5

-   Priority: Must

-   Description:

-   We need to add client-side analytics logging & error alerts so that they can help us gauge the performance of our app "in the field" and identify potential failures sooner.

-   Deliverables:

-   Documentation: brief ADR report comparing pros & cons of using the three analytics providers, and our final choice. Some factors to consider: features (monitoring, error alerts), any slowdown to our web app (script package load speed), ease of integration, user privacy.

-   Documentation: account info providing access to the analytics platforms

-   Code that adds the script tag with caching set up.

-   Task 3: Add optimization & azure deployment to CI/CD pipeline

-   Assignee: Jun 5

-   Priority: Must

-   Description:

-   Optimization: we need a new job in our pipeline that optimizes both static resources and source files in order to reduce load time. 

-   Deployment: we need the pipeline to handle automatic deployment to azure app service after all checks have passed. 

-   Deliverables:

-   Documentation: brief ADR report on comparison of different optimization in terms of functionality, impact on pipeline running time, effectiveness on reducing load time. 

-   Code: push the modified yml file to github repo.

-   Task 4: Improve weekly statistics graph (Bugfix)

-   Assignee: Karina 3

-   Priority: Must

-   Description:

-   Current graphing algorithm display is inconsistent for days with larger number of tasks. 

-   Requirements:

-   Reimplement it using zingchart library, which has a small js package size and looks prettier. 

-   Graph should have the same size on the screen and a similar style as it does now. 

-   Task 5: Fix iPhone accessibility issue (Bugfix)

-   Assignee: Geewhan

-   Priority: Must

-   Description: 

-   In iPhone safari, if the address bar is set to the bottom, it blocks access to a button at the very bottom of the settings page and some content in the statistics page. 

-   Requirements:

-   Make both settings and statistics page scrollable.

-   Add a div placeholder at the bottom of settings and statistics page so that address bar does not block them. 

-   Task 6: Research/improve user data storage for weekly statistics feature

-   Assignee: Austin 3

-   Priority: Must

-   Description: 

-   Currently user data is always stored on local storage, which may bring privacy and security (XSS attack) concerns. We need to investigate and implement alternative methods (sessionStorage, HttpOnly cookies) to address these concerns. 

-   Requirements:

-   User need to make the decision on whether they want to let their usage information persist across browser & OS reboot. 

-   Deliverables:

-   Documentation: propose a new solution and draft a brief ADR report comparing the current approach vs alternatives in terms of privacy, security, and speed. 

-   Code: implement the new storage solution

-   Task 7: Refactor overuse of div tags

-   Assignee: Jason 2

-   Priority: Must

-   Description:

-   The current html overuses div tags for the majority of frontend components, we need to replace some of them with more meaningful tags if necessary

-   Task 8: Setup custom domain

-   Assignee: Michael 2

-   Priority: Want

-   Description:

-   We want to use our custom domain to serve our web app because the current azure-websites domain conveys a sense of unfinished product to our users.