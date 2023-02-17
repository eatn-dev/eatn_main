# S3 Demand based individual project 

This is a repository containing code and all documentation for individual project for semester 3 course based.

This project's main purpose is to find a practical real-life problem, research it and try to forge a viable solution for it.

## Problem

The problem this project aims to solve  is a very common one and quite simple but can be particularly annoying. It's a familiar situation, going to a restaurant or cafe bar and waiting for a waiter to take your order. I personally have experienced this problem in restaurants during summer, but this can be translated to any type of service based catering facility.

Few possible solutions come to mind, but none are really economic or profitable.

First one is to get more staff. Scaling horizontally isn't the worst way to tackle this, but it is definitely a sub-par approach. More staff there is, more money needs to be spent every year on salaries and taxes.

Another course of action is to just scale down the number of potential customers, e.g. reduce the number of tables. This is obviously inferior approach to previous one because it is self-limiting and therefore profits are limited due to the number of potential clients. But because there are less clients at any given time, staff can be more focused and customer experience can be greatly improved.


## Solution

My proposal for the solution is a modern one, it is to digitize the whole customer experience, from ordering the food to paying the bill. This proposal suggests that customer does not need to wait for staff to come, bring menus and then order when staff comes again. Customer can sit at the table, take a look at the menu, order at their own tempo without being pressured all within the reach of their mobile devices. In the middle of the meal they can call a staff member if they desire so and at the end pay for the meal either digitally or with cash. While all that is happening, waiter can see what are customers ordering at all tables and kitchen staff can inspect incoming orders, fulfill them and mark them as ready to serve.

## Tech stack

This project aims to be as relevant as maintainable as possible so in the future it can be easily improved and extended without changing much of the codebase. Taking that philosophy into consideration, several decisions have been made in terms of chosen technologies. For the backend, NodeJS was chosen because of its abstract simplicity and development speed. Frontend framework is to be decided on due to uncertainty which Javascript based frontend framework would suit best. For the infrastructure I decided to go with Docker because it containerizes applications very well and many tools are built around Docker containers. In combination with docker, Redis in-memory database would most probably come in play because it is needed to store which people are seated at which desk at any given time and something disposable like redis would greatly benefit the project.
