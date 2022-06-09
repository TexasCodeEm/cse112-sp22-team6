# Using a library for graph statistics

* Status: accepted
* Deciders: all members of the team

## Context and Problem Statement
The current way the weekly statistics graph is being displayed is through an equation that
was made by the previous group. This causes the graph to look weird if there is one day that has much larger values than the rest of the days. We want the best UI for our users and want the weekly statistics graph to be
easily readable and understandable so our users can see how much progress they have made this week. 

## Considered Options
* Using a graphing library
  - Using ZingChart as our graphing library
  - ZingChart is relatively easy to use
  - Members of our group have experience using it before
  - Graphics and functionality work nicely for what we want to display

* Leaving the graph being calculated by an equation the group before came up with
  - Graph does not look good with certain values
  - Does not have the best looking graphics

## Decision Outcome

Chosen Option: Using a graphing library

We are going to use ZingChart because
* It is easy to use and has good documentation
* We have group members that are familiar with using it
* It will enhance our UI by providing better graphics
  - We no longer have to worry about the graph sometimes looking weird
