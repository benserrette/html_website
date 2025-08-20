---
title: Using GitHub for Project Management
tags: writing
layout: layouts/subpage
pub_date: 2025-07-06t00:00:00-04:00
pub_date_formatted: July 7, 2025
breadcrumbs:
    - url: /writings/
      label: Writings
---
## Using GitHub for Project Management

### The Problem

Many agile and project management frameworks assume a single, well-staffed team working on a single project. Because we're a small team at a soft-money-funded research center, we don't have this luxury, so I have to figure out a process that works well in this environment.

- Every developer has at least two separate projects.
- Each project has a different "subteam" of 1 to 4 developers.
- All active projects must be worked on concurrently.
- Each developer has a different role on every project based on skill and requirements match.
- Grant-supported projects get first priority.
- Developers are allotted time to work on each project based on grant funding.
- Non-active projects still need to be maintained.

Given this environment, a lot of the project management falls on the developers themselves. It's my job to provide oversight and processes that reduce friction and allow the rest of the team to do what they do best: develop software. I try to accomplish this by stripping agile down to its bones and building on the strengths and tools that the team already possesses. There's a lot of experimentation and, true to the agile form, a lot of iteration.

Step one was to streamline and consolidate our tools. We already used GitHub to manage our code, so we decided to use it to manage our projects. GitHub has a pretty great search function, which makes it easy to find old tasks and documentation. It's got built-in support for linking tasks to code (and to other tasks, documentation, and wikis). Projects V2 also provides a nice built-in task board.

To be fair, it lacks a lot of built-in automations. And even though it's called "Insights," the built-in graphs and charts aren't very flexible. But between GitHub Actions and the GraphQL API, I can compensate. Even though I have to go outside, the devs stay inside GitHub, which is what's important.

### The Setup

Projects V2 is at the organization level, so it lets you add tasks from all the repositories across an org (and, actually, across other orgs if you want to). This is great for our case, where we want a single agile process for our team that has many separate projects. It lets us keep the issues together with the related repos but gives us a central place to look at and review our work.

Our main task board/Project V2 is called **New Tasks** (we used to have a Project Classic called "Tasks"). We typically have at least one repository for each software project but sometimes have two or three depending on the size of the project. We also have a separate *PM* repository where we put tasks that don't have a specific repo (either because they're not directly related to a project or because that project doesn't yet have a repo). The PM repo also contains all the automation scripts for managing the board. Before our enterprise GitHub started to support Projects V2, we had our Classic Tasks project attached to this PM repo and kept all of our tasks there. Classic Projects had a lot of built-in automation, but V2 is much more flexible.

### Custom Fields

I've got several custom fields set up for tasks in our V2 project:

- **Project** – Multiple choice option for the project (e.g., grant or system) that a task is part of. We might have a larger project with several repos, so it's helpful to sort by project.
- **Difficulty** – Multiple choice. Difficult, Easy, or PIA (Pain In Ass). Helps with task prioritization and selection. Difficult tasks should be broken down into Easy tasks, if possible. PIA tasks are usually easy but are annoying and/or time-consuming.
- **Urgency** – Multiple choice. Urgent or Not Urgent. Helps with prioritization and selection. Is it, for example, a showstopping bug or on a deadline?
- **Impact** – Multiple choice. High or Low. Helps with prioritization and selection. Will it affect a lot of users, dramatically increase productivity, or save us a lot of money? Or will it help a single undergrad student with a paper or add a feature nobody asked for?
- **Age** – Number of days a task has been open and on the task board. This is automated with the GraphQL API and a cron job.
- **Initial Estimate** – Number of hours that the dev thinks the task will take to complete.
- **Actual Time** – Number of hours that the dev actually spent working on the task. One of our summer objectives is to improve the accuracy of our time estimates, so *Initial Estimate* and *Actual Time* help us do that.

### Columns

Projects V2 has several different views that let you organize and filter issues. Our main view, which we refer to as our **Task Board**, is a Board view with the columns corresponding to a custom field called *Status*, which indicates the status of the task.

- **To Do** – This is our main backlog, where new tasks more or less default. Technically, there is no Status assigned by default, which creates a *No Status* column.
- **To Do (High Priority)** – Some tasks are very important and need to be marked as a higher priority. In practice, this ends up working like a Sprint Backlog, even though we don't really work in sprints.
- **In Progress** – The task is actively being worked on. In theory, it should have an initial estimate assigned at this point.
- **Blocked** – Tasks that have been started but are currently in limbo because we're waiting on something out of our hands. Often, we're waiting on a response from a stakeholder or tech support. Sometimes, it's an unreproducible bug. Occasionally, it's something that was assigned to me two years ago that I haven't gotten to yet.
- **Recurring** – Some tasks have no *Done* state or need to be recreated monthly, weekly, etc. We keep them around as reminders and to maintain notes in the comments.
- **Done** – All of the checkboxes in the *Closed When* section of the task are checked. The task is complete and will be reviewed in our next Task Board Review.

There are a couple of other *Status* values with special meaning:

- **Idea** – When someone has a great (or even not great) idea, we write it down and put it here for future review.
- **Knowledge Base** – We use GitHub Issues to maintain institutional knowledge. Originally, the main selling point over wikis was that GitHub's search didn't cover wiki pages. While that's no longer the case, issues still have useful features like automatic backlinking and labels. This helps us stay organized with minimal effort.

### Automations

I currently only have a few automations set up. I was having trouble getting GitHub Actions to work with our enterprise installation, so I have a couple of Python scripts running via cron jobs on one of our servers. Every five minutes, a script runs that: 1) moves all newly closed issues into the *Done* column, and 2) adds newly created issues from any of our tracked repositories to the *New Tasks* project. Once a day, another script updates the *Age* field so we can see how long each task has been on the board. Both scripts use the GraphQL API. Full disclosure: GraphQL can be complex, so ChatGPT has been a huge help.

### Agile Rituals

As with most of the recommendations from various agile frameworks, many typical agile rituals don't quite fit our team. The more projects, the more rituals would be required, and we don't have time to spend 20 hours a week on Sprint Retrospectives.

1. **"Daily" Standups** – We have a 15-minute standup meeting on Mondays, Wednesdays, and Fridays. These are the team's remote days, so we meet on Zoom. I pick a random team member to go first, they give their update and pick the next person, and so on. It's informal, and we don't usually bring up the task board to keep it short.
2. **Weekly Staff Meetings** – Thursday afternoons, at the same time as the MWF standups, we have a one-hour staff meeting. Because we have more than one project, it doesn't make sense to use feature-focused sprints, so we just work in a two-week cadence, alternating between a task board review and a deep-dive discussion.

   1. **Task Board Review** – Week 1's meeting is a mix of Sprint Planning and Retrospective. We review the *Done* column to discuss completed work, then check the *In Progress* column for blockers, followed by *To Do (High Priority)* and *To Do*.
   2. **Deep Dive** – In week 2, we pick one or two *In Progress* tasks or major roadblocks to discuss. I encourage the team to meet ad hoc, but this gives us a regular time where everyone can contribute, regardless of their assigned projects.
3. **Semesterly Backlog Grooming** – Since we follow a university calendar, we hold a two-hour staff meeting at the beginning of each semester to review the entire *To Do* column. We close forgotten tasks or promote them to *High Priority* if needed.

### Task Structure

We use the `.github` special repository to store issue templates and forms that are consistent across repositories, which helps with org-level project management. For the *Task Board*, we have two primary issue templates: **Tasks** and **Bugs**. We have a few others for things like project briefs and knowledge base articles, but they're used less frequently.

**Tasks** are for features, updates, maintenance, and general To Do items. They have four sections:

1. Task Description – What needs to be done and its context.
2. Closed When – A checklist of completion criteria.
3. Related Issues and Links – Relevant GitHub issues or web pages.
4. Additional Information – Things like meeting dates or mock-up screenshots.

**Bugs** are for anything broken or incorrect, from show stoppers to typos. While only Description and Closed When sections are required, there are several others that can help speed up the debugging process:

1. Bug Description
2. Closed When
3. Possible Solution
4. Steps to Reproduce
5. Expected Behavior
6. Actual Behavior

### Future Work

So far, we've had the luxury of a very free-form process. As projects grow in complexity and number, we need more structure to reduce ambiguity and improve confidence, quality, and speed. However, any added structure must benefit developers without adding unnecessary burden. By following agile principles rather than a strict framework, I can experiment and adapt quickly.

Our current process is a big improvement over the pseudo-scrum process we used previously. My top priority was to preserve institutional knowledge, and I think we've succeeded through the thousands of issues and comments. Still, new developers may struggle to find what they need due to inconsistent documentation styles. I hope to solve this by standardizing the documentation process and improving writing quality.

I plan to add a "summary and retrospective" section to the issue template, to be written before closing the issue. Much of our knowledge is scattered in comments or omitted at closure. This summary would recap key comments and decisions. Filling out this section would be the final required checkbox in *Closed When*. It would help with task board reviews and provide future reference.

There are many ways to implement this, from strict to flexible. Finding the right balance will take more thought and experimentation.
