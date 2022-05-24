Sprint 1

April 25 - May 2

-   Task 1: Review/Refine tests

-   Assignee

-   Austin - accessibility.js, constants.js, settings.js (user inputs based)

-   Anthony - CSS files in /styles (check UI suggestions below)

-   Tim - timer.js, time Worker.js (logic/functionality of the timer)

-   Geewhan - tasks.js, stats.js (side functionalities)

-   Karina - graph.js, storage.js (graphing and helper functions)

-   Priority: Must

-   Status: Done

-   Description

-   Setup Cypress locally

-   Review assigned file(s), understand what the code does, add comments to enhance readability, and fix any styling mistakes.

-   Review assigned test file(s), check what each test case does.

-   Goal: add 3 test cases per assignee to this task. (Number can vary based on how easy it is to add tests and if the available tests are already more than sufficient)

-   Issues

-   Difficulty setting up cypress

-   Solved by Tim's presentation on his successful setup attempt

-   Task 2: Research/Setup hosting

-   Assignee: Michael

-   Priority: Must

-   Status: Setup done, pending ADR

-   Requirements:

-   Support easy-to-use CI/CD integration, meaning we can deploy by running a script (with authentication) to deploy the app.

-   Support Custom Domain (using our own domain name)

-   Support HTTPS, min 1.2, ideally 2.0

-   Support authentication (we don't want anyone to access our server)

-   Support the addition of CDN (e.g. Azure CDN)

-   Deliverables:

-   Brief ADR report on why we chose the final serving platform, points made should reflect our requirements

-   Task 3:

-   Assignee: Jun

-   Priority: Must

-   Status: Pipeline review done, new deployment task moved to sprint 2

-   Description

-   We need to review and test the original CI/CD pipeline to see if it works and if we need to make any improvements

-   Issues:

-   Original deployment uses github page, which is not ideal given that we are building a 1.0 software, not a hobby project

-   Original pipeline does not contain minification of static resources.