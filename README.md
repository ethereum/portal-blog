# Portal Network Blog

This is the source repository for the Portal Network blog hosted at https://blog.ethportal.net


## Adding posts

Option A: Clone the repository and create a feature branch. PR from your branch into `main`
Option B: Fork the repository and PR from your fork to `main`

Prepare your development environment by navigating to your project directory and:

```
npm i next react react-dom nextra nextra-theme-blog
```

If you want to add a post to the blog, you should add a page to `pages/posts`.
The page should be a markdown file, and it should begin with the following frontmatter:

```
---
title: <title that will appear in the feed>
date: <date posted>
description: <short description that will appear in feed>
tag: <theme tage>
author: < your name / handle>
---

```

The tags should describe the theme of the post. Try to re-use tags from previous posts where possible.

No other changes are required, as files in `pages/posts` are automatically detected and added to the feed on the front page.

Add the page by PR to the `main` branch.

Check the changes locally using

```
npm run dev
```