JS/CSS/HTML/Image/Etc Minifier

Status: Accepted

Deciders: Everybody

Date: 5/9/21

Context and Problem Statement

Need to figure out how to compress files for production, and integrate it with the CI/CD pipeline. There are various libraries that do this. However, certain ones may be easier to work with. Additionally, we need to consider if we just minify files or both minify and concat.

Considered Options

Gulp

-   Security Issues

-   Easy to use (Good DX)

-   Can figure out a way to minify + compress cleanly

Grunt

-   Security Issues

-   Easy to use (Good DX)

Browserify

-   Dx does not look appealing

-   The things it can do is not really a major factor for our project.

Webpack

-   Bloated

-   Looks complicated

-   Requires too many npm installs to do simple things

-   Seems overkill for our project

Vite

-   Still super new

-   Written in ESbuild, which makes it super fast.

-   Would require overhauling certain parts of the project

-   Might not integrate with other tools currently used in project

-   New tool == Not all bugs have been found

Snowpack

-   Allows us to use the current project structure.

-   Also uses Esbuild

-   Shares similar problems from Vite.

Decision Outcome

We are going to use Gulp because its 

-   Simple

-   Good DX

-   Can easily change configuration later down the line.

Pros and Cons of other Options

-   Pros: May be faster, more options

-   Cons: Complicated, Project may get fat due to loads of npm installs, New technologies may not have all bugs discovered, Seems overkill for our project.