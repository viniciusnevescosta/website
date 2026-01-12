---
title: Criptphy — Password Manager
description: A school project built for the Ideias de Futuro challenge.
date: 2022-04-01
repoURL: https://github.com/Criptphy/Criptphy
---

## Overview

Criptphy is a password manager prototype we built in 2022 for a civic-tech challenge promoted by Ideias de Futuro, in partnership with the São Paulo government and Google. The goal was to create a tech solution that could help people in the city—so we focused on a very real, very common problem:

A lot of people reuse the same password across multiple accounts because it’s easy… until it isn’t.

Criptphy was our attempt to turn that pain point into a practical solution: a simple web app concept for securely storing and organizing passwords.

> I explain in more detail how we arrived at this idea in this post: [Rebuilding after the pandemic — Part 1](/blog/rebuilding-after-the-pandemic-part-1)

## My role

This was a two-person team project:

- Me: Front-end (UI, layout, interaction, integration with the API);
- My teammate: Back-end (server-side logic, database, endpoints).

## Tech stack

- Front-end: HTML, CSS, TypeScript;
- Back-end: PHP;
- Database: MySQL.

## Architecture (high level)

Criptphy followed a straightforward split:

- A static front-end (TypeScript compiled for the browser using Vite) responsible for the user experience
- A PHP back-end that handled data persistence and communication with MySQL
- The front-end interacted with the back-end through HTTP requests (API-style integration)

## Hosting (at the time)

During the event, we deployed the prototype like this:

- Front-end: Heroku;
- Back-end: Railway.

## Current status

Criptphy is no longer online and not actively maintained.

That said, the full source code is still available and can be explored on GitHub.

## Outcome

We were selected to present Criptphy in-person at the Ideias de Futuro center, in front of judges, journalists, and representatives from the government.

At the end of the event:

- Criptphy won 2nd place in the Development category;
- We received a Kindle as a prize.

## Media

![[hero.png]]
<p style="text-align: center;">Landing Page: Hero section.</p>

![[about.png]]
<p style="text-align: center;">Landing Page: About section.</p>

---

### References

1. [Front-end](https://github.com/Criptphy/Criptphy)
2. [Back-end](https://github.com/Criptphy/backend)
