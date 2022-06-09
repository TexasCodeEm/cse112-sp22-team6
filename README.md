# Team 6 - CSE 112
## Original Project by Team Pomobears (Group 34 - CSE 110 Winter 21')

This project is a Pomodoro Timer to help others manage their time and
stay productive. Unlike many other timers, our timer provides features like:
- Daily & Total Statistics
- Weekly Productivity Graph
- Keyboard Shortcuts & Accessibility

To see the live project, visit [https://texascodempomo.xyz/](https://texascodempomo.xyz/).

## Keyboard Shortcuts 
**Keyboard Shortcuts are initially turned on for user accessibility** 
- "Esc" to close either pane 
- Left Arrow to open stats pane if settings pane isn't open, or close settings pane otherwise
- Right Arrow to open settings pane if stats pane isn't open, or close stats pane otherwise 
- "T" to complete task 
- Space Bar to start/reset timer
- "Y"/"N" to answer prompts 

## App Tutorial
Please visit the link above and click on the info button to checkout our tutorial page. 

## Source Documentation (JSDocs)

[https://texascodeem.github.io/cse112-sp22-team6/](https://texascodeem.github.io/cse112-sp22-team6/)

JSDocs for main are automatically generated and hosted to GitHub Pages to
the link above or [here](https://texascodeem.github.io/cse112-sp22-team6/).

## Installing dependencies
Our development dependencies are managed by npm. To install, run:
```
$ npm install
```

## Running in development environment
The application uses *ES modules* which require CORS. Therefore, the server
needs to be hosted to add all script functionality.

To run the app, run the following npm script in the project directory:
```
$ npm run host
```

You can also use any other server hosting utility. If you use [VSCode](https://code.visualstudio.com/),
you can use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
extension to open `source/index.html`.

## Building locally
First, create bundled.js using our supplied script:
```
$ npm run bundle
```
Second, run the gulp build pipeline which copies, minifies, bundles source code and static resources into the build directory
```
$ npm run build
```

## Running production build locally
Use the supplied script command to serve the production build from the build directory:
```
$ npm run host-production
```
**Note**: we must run a local build before running this script. 

## Testing
Currently, there are tests for both unit testing in [Jest](https://jestjs.io/)
and E2E testing in [Cypress](https://www.cypress.io/). They cover different
aspects, so both are used.

- To run unit tests, run Jest in the project directory:
```
$ npm run test
```

- To run E2E tests, host the server using `npm run host`, then run Cypress in the
project directory:
```
$ npm run cypress
```

**Note**: If you do not want to use the host script, the app must be hosted on
`127.0.0.1:5500`.

## Linting & Validation
To check javascript linting using eslint, run:
```
$ npm run lint
```
To perform automatic linting fix, run:
```
$ npm run lint-fix
```
To validate html, run:
```
$ npm run validate-html
```
To validate css, run:
```
$ npm run validate-css
```