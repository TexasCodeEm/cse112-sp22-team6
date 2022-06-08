# More Accessibility Features

* Status: accepted
* Deciders: all members of the team

## Context and Problem Statement

We were deciding on further accessibility features.

## Considered Options

* Auto-Start Timer
  - Automatically start the timer
* Tab Timer Visibility
  - Choose whether the title (visible on tab) should have a timer
  - If not just default to the app name
* Save options
  - Choose whether we should have options to toggle between session and local storage

## Decision Outcome

Chosen option: Auto-Start Timer, Tab Timer Visibility, and Save options (modified) because

* Doesn't interfere with normal design
  - options do not affect normal usage nor design
* Allows better customization
  - allows users to customize their experience more
  - reduces potential distraction of the tab timer
* Save option changed to auto-saving your settings options to local storage
  - there did not seem to be meaningful reason to separate storage, both in terms of storage space and user wants (most users do not know the difference)

## Pros and Cons of Other Options

### Save options

* Pro: Allows users to save a little bit of local storage space
* Pro: More user choices
* Con: Most users would not know what it does
* Con: the space saved is very trivial