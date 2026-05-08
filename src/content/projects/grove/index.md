---
title: Grove
description: A three-project delivery for my final course project.
date: 2026-04-01
demoURL: https://grove.viniciusnevescosta.com/
repoURL: https://github.com/viniciusnevescosta/grove
---

Maintaining a clean and readable Git history requires discipline. When working across multiple features, bug fixes, and refactors, commit messages and branch names often become disorganized. Grove addresses this issue by enforcing a structured format directly from the command line.

**What is Grove?**
Grove is a semantic Git helper designed to manage commits, branches, pushes, and pulls. It acts as an interface over standard Git commands to ensure that every change recorded in the repository follows a strict, predefined format.

```bash
viniciuscosta@Vinicius ~/p/website (main)> grove -c .

Select the commit type:
1. ✨ feat - A new feature was added
2. 🐛 fix - A bug was fixed
3. 📚 docs - Documentation was added or updated
4. 🧪 test - Tests were added or modified
5. ➕ build - Build system or dependency changes
6. ⚡ perf - Performance improvements
7. 🎨 style - Formatting or style-only changes
8. ♻️ refactor - Code restructuring without behavior changes
9. 🔧 chore - Maintenance and routine tasks
10. 🧱 ci - CI/CD configuration or script changes
11. ⏪ revert - Reverting previous changes
12. 🔒 security - Security-related changes
13. 🚧 wip - Work in progress
14. 🗃️ raw - Raw data or dataset updates
15. 🧹 cleanup - Cleanup or dead code removal
16. 🗑️ remove - Files or code were removed
17. 🌐 locale - Localization updates
18. ♿ access - Accessibility improvements
19. 💄 ux - User interface or experience changes
20. 🧩 Custom - Provide your own Conventional Commit type

Enter the number corresponding to the commit type:
```

```bash
viniciuscosta@Vinicius ~/p/website-2 (main)> grove -b

Select the branch type:
1. ✨ feat - For new features
2. 🐛 fix - For bug fixes
3. 🚑 hotfix - For urgent fixes
4. 🚀 release - For release preparation
5. 🔧 chore - For maintenance tasks
6. 🧩 Custom - Provide your own branch type

Enter the number corresponding to the branch type:
```

**Core Principles**
Grove is heavily inspired by the **Conventional Commits** and **Conventional Branch** specifications. These standards dictate that commit messages and branch names should communicate the exact nature of the change—whether it is a new feature (`feat`), a bug fix (`fix`), or a documentation update (`docs`). 

By standardizing these inputs, Grove provides several concrete benefits:
* **Automated Changelogs:** A history populated with semantic commits can be easily parsed to generate accurate release notes.
* **Readable History:** Developers can scan the Git log and immediately understand the scope and impact of previous changes without reading the full diff.
* **Organized Branching:** Following Conventional Branch guidelines ensures that the purpose of a branch is immediately clear to all collaborators.

Grove reduces the manual effort required to format messages and manage branches, allowing developers to focus on the code itself while maintaining a highly organized version control system.