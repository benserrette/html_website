---
title: Using Github for Project Management
---

## Using Github for Project Management

### The problem

Many agile and project management frameworks and systems assume a single, well staffed team working on a single project.  Because we're a small team at a soft-money funded research center, we dont have this luxury, so I have to figure out a process to works well in this environment.

- Every developer has at least 2 separate projects.
- Each project has a different "subteam" of 1 to 4 developers.
- All active projects must be worked on concurrently.
- Each developer has a different role on every project based on skill and requirements match.
- Grant supported projects get first priority.
- Developers are allotted time to work on each project based on grant funding.
- Non active projects still need to be maintained.

Given this environment, a lot of the project management falls on the developers themselves.  It's my job to provide oversight and processes that reduce friction and allow the rest of the team to do what they do best - develop software.  I try to accomplish this by stripping agile down to its bones and building on the strengths and tools that the team already possesses.  There's a lot of experiementation and, true to the agile form, a lot of iteration.

Step one was to streamline and consolidate our tools.  We already used Github to manage our code, so we decided to use it to manage our projects. Github has a pretty great search function, which makes it easy to find old tasks and documentation.  It's got built in support for linking the tasks to the code (and other tasks and documentation and wikis).  Projects V2 also provides a pretty nice built-in task board.

To be fair, it lacks a lot of built-in automations.  And even though it's called "Insights", the built-in graphs and charts aren't super flexible.  But between Github Actions and the GraphQL API, I can compensate.  Even though I have to go outside, the devs stay inside Github, which is what's important.

### The setup

Projects V2 is at the Organization level, so it lets you add tasks from all the repositories across an org (and, actually across other orgs if you want to). So this is great for our case where we want a single agile process for our team that has many separate projects.  It lets us keep the issues together with the related repos, but gives us a central place to look at and review our work.

Our main task board/Project V2 is called **New Tasks** (we used to have a Project Classic called "Tasks").  We typically have at least one repository for each software project but sometimes have 2 or 3 depending on the size of the project.  We also have a separate *PM* repository where we put tasks that don't have a specific repo (either because they're not directly related to a project or because that project doesn't yet have an actual repo).  The PM Repo also contains all the automation scripts for managing the board.  Before our enterprise Github started to support Projects V2, we had our Classic Tasks project attached to this PM repo and kept ALL of our tasks there.  Classic Projects had a lot of built in automation, but V2 is a lot more flexible.

### Custom Fields

I've got several custom fields set up for tasks in our V2 project:

- **Project** - Multiple choice option for the project (e.g. grant or system) that a task is part of.  We might have a larger project with several repos, so it's helpful to sort by project.
- **Difficulty** - Multiple choice.  Difficult, Easy, or PIA (Pain In Ass).  Helps with task prioritization and selection.  Difficult tasks should be broken down into Easy tasks, if possible.  PIA tasks are usually easy but are annoying and/or will take a long time.
- **Urgency** - Multiple choice.  Urgent or Not Urgent.  Helps with prioritization and selection.  Is it, for example, a showstopping bug or on a deadline?
- **Impact** - Multiple choice. High or Low.  Helps with prioritization and selection.  Will it affect a lot of users, dramatically increase productivity, or save us a lot of money?  Or will it help a single undergrad student with a paper or a add a feature nobody asked for?
- **Age** - Number in days that a task has been open and on the task board.  This is automated with the GraphQL API and a Cron job.
- **Initial Estimate** - Number of hours that the dev thinks the task will take to complete.
- **Actual Time** - Number of hours that the dev actually spent working on the task.  One of our summer objectives is to improve the accuracy of our time estimates, so *Initial Estimate* and *Actual Time* helps us do that.

### Columns

Projects V2 has a bunch of different views that let you have all your issues ordered and filtered in different ways.  Our main view, which we refer to as our **Task Board**, is a Board view with the columns corresponding to another custom field called *Status*.  *Status* indicates the status of the task.

- **To Do** - This is our main backlog, where new tasks more-or-less default to.  Technically, there is no Status assigned by default, which creates a new column for *No Status*.
- **To Do (High Priority)** - Some tasks are very important and need to be marked as a higher priority.  In practice, this ends up working like a Sprint Backlog, even though we don't really work in sprints.
- **In Progress** - The task is actively being worked on.  In theory, it should have an initial estimate assigned at this point.
- **Blocked** - Tasks that have been started, but are currently in limbo because we're waiting on something out of our hands.  A lot of times, we're waiting on a response from a stakeholder or tech support.  Sometimes, it's an un-reproducable bug.  Occasionally it's something that was assigned to me two years ago that I haven't gotten a chance to take care of.
- **Recurring** - Some tasks have no *Done* state or need to be recreated monthly, weekly, etc.  We keep them around as reminders and to maintain notes in the comment section.
- **Done** - All of the checkboxes in the *Closed When* section of the task are checked.  The task is complete and will be reviewed in our next Task Board Review.

There are a couple of other Status values that have special meaning:

- **Idea** - When someone has a great (or even not great) idea, we make sure to write it down and put it in a place where we can review them from time to time.  That place is here.
- **Knowledge Base** - We use Github Issues to maintain institutional knowledge.  Originally, the main selling point over Wikis was that Github's search didn't cover Wiki pages.  While that's no longer the case, issues still have a lot of other features, like automatic backlinking and labels.  This helps us stay organized while spending minimal effort on maintaining a wiki knowledge base.

### Automations

I currently only have a few automations set up.  I was having trouble getting Github Actions to work with our enterprise installation, so I have a couple of Python scripts running via cron jobs on one of our servers.  Every 5 minutes, a script runs that will 1) Move all newly closed issues into the *Done* column and 2) Add newly created issues from any of our tracked repositories to the *New Tasks* project.  Once a day, I have another script that updates the Age field of issues so that we can see how long the task has been on the board.  Both scripts utilize the GraphQL API.  Full Disclosure:  GraphQL can be very complex, so ChatGPT has been helping me a lot with this.

### Agile Rituals

As with most of the recomendations from various Agile Frameworks, most of the typical Agile rituals don't quite fit our team well.  The more projects, the more rituals would be required, and we don't have time to be spending 20 hours on Sprint Retrospectives.

1. **"Daily" Standups** - We have a 15 minute stand up meeting on Mondays, Wednesdays, and Fridays.  These are the team's remote days, so they're on Zoom rather than in a random hallway.  I pick a random team member to go first, they provide their update and pick the next team member, and so on.  It's relatively informal and we don't usually bring up the task board to keep it short.
2. **Weekly Staff Meetings** - Thursday afternoons, at the same time as the standups on MWF, we have a 1 hour staff meeting.  Because we have more than one project, it doesn't make sense to use feature-focused Sprints, so we just work in a 2 week cadence, alternating between a task board review and a deep-dive discussion.
    1. **Task Board Review** - Week 1's staff meeting is a combination of a Sprint Planning session and a Sprint Retrospective.  We go over the task board, starting with the *Done* column to discuss what was accomplished over the week in a little more detail.  We then review the *In Process* column to sort out any blockers.  Then on to *To Do (High Priority)* and *To Do*.
    2. **Deep-Dive** - On week 2, we pick one or two *In Progress* tasks or major roadblocks to discuss and work through.  I always encourage the team to meet ad-hoc about issues, but this gives us a designated time and place where we're all in the same room and can all weigh in, regardless of whether or not we're on that given project.
3. **Semesterly Backlog Grooming** - Since we work at a university, we run our schedule on the semester.  At the beginning of each semester, we'll extend one of our weekly staff meetings to 2 hours and use the time to review the entire To Do column of the task board.  We close anything that was forgotten about, or promote it *High Priority* if necessary.

### Task Structure

We use the .github special repository to have a few issue templates and forms that are consistent across repositories, which makes it great for managing an org-level project.  When we're talking about *Tasks* for our *Task Board*, we have a couple of important issue templates: Tasks and Bugs.  We have a few others for things like Project Briefs and Knowledge Base Articles, but they are used far less often.

**Tasks** are for feature additions, updates, maintenance tasks, and general To Do items.  There's 4 sections:

1. Task Description - Description of what needs to be done and general context surrounding the task.
2. Closed When - A checklist of all the conditions that must be met before we can close the task.
3. Related Issues and Links - a list of relevant web pages and other Github issues that could be helpful.  Things like parent issues or documentation.
4. Additional Information - General information that can enhance understanding of the issue, like the date of the meeting that it was discussed or screen shots of a mock-up.

**Bugs** are for things that broke and need to be fixed.  Or sometimes just typos.  Most of the fields are pretty self explanatory and only the Description and Closed When are required.

1. Bug Description
2. Closed When
3. Possible Solution
4. Steps to Reproduce
5. Expected Behavior
6. Actual Behavior

### Future Work

Thus far, we've had the luxury of a very free-form process in general.  As our projects continue to grow in complexity and number, there seems to be a need for more structure.  More structure would reduce the amount of ambiguity and confusion, thus increasing team confidence, output quality, and speed.  However, any additional components in this process need to provide value to the developers and not create unnecessary burden.  By following the Agile Principles, rather than a strict framework, I can add and remove components as necessary and see what works with a fairly short turn around time.

Our current process has been a huge improvement over the Pseudo-Scrum process that was used previously.  The top priority for me was to maintain institutional knowledge and I think we've succeeded in that via the thousands of issues and comments.  And while the answers are all there, a new dev would be hard pressed to find what they're seeking due to differences in how the current devs document this knowledge.  My hope is that this can be solved by standardizing the documentation process and improving the developers' writing ability.

I want to add a section to the issue description for a "summary and retrospective" that should be written before closing the issue.  Much of the knowledge we're trying to capture is either scattered throughout the comments or simply left out when the task is closed.  The idea is to write a simple summary of important points made in the comments and provide any followup thoughts or rational for decisions made.  Filling out this section of the issue description would be the final, required checkbox in the Closed When section.  Having this summary written by the developer who closed the task would make it easier to discuss the task resolution during our taskboard reviews and would hopefully put the task's conclusion in an accessible spot for future reference.

There are many implementation options that range from strict to free form, so finding the right balance will take additional thought and experiementation.
