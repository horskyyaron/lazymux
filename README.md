# Lazymux

A tmux-sessionizer inspired TUI for managing tmux sessions for your projects.

Inspiration: 

- [Primeagen tmux sessionizer](https://github.com/ThePrimeagen/tmux-sessionizer)
- [OpenTUI](https://github.com/sst/opentui) and [Opencode](https://opencode.ai/docs) two amazing projects that made me start this project, really amazing work.

## TODO

Add a way to compute the README path for a project (e.g. README.md, maybe in root).
Add a function that loads README file content from disk.
Add a box/panel in the TUI layout for “Project README”.
Add scrolling / paging for long README content.
Hook the TUI up to the core so that when you switch project, it loads that project’s README.
Handle missing README (show “No README found”).
Add config / flag to enable/disable showing README (future-proof).
Add tests for path resolution / loader / maybe a small TUI test.
Update docs / README of the app to describe the feature.


# react

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

This project was created using `bun create tui`. [create-tui](https://git.new/create-tui) is the easiest way to get started with OpenTUI.
