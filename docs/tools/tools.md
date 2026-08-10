---
id: tools
title: Tools
sidebar_label: Overview
sidebar_position: 0
---

Four editors for the Apache KIE asset types — and four places to run them, from
a browser tab to your own web application. The quickest way to try them is
[KIE Sandbox](/tools/kie-sandbox), with nothing to install.

## The editors

- **BPMN Editor** — model BPMN 2.0 business processes on a canvas, with a
  context-aware properties panel and validation as you draw. Rewritten for
  10.2.0 on React and TypeScript, replacing the classic GWT editor.
- **DMN Editor** — build decision requirements diagrams and author boxed
  expressions, decision tables and FEEL. Rewritten for 10.0.0, and current
  with DMN 1.6, the latest OMG specification.
- **DRL Editor** — edit Drools Rule Language files as text, with syntax
  highlighting and completion for rules you would rather write by hand than
  draw.
- **Test Scenario Editor** — write test scenarios for your decisions and rules
  in a spreadsheet-like grid, and keep them in version control next to the
  models they cover. Rewritten for 10.1.0.

The BPMN, DMN and Test Scenario editors were all rewritten for the 10.x line on
React, TypeScript and PatternFly. They read your existing files unchanged — see
[the release post](/blog/new-generation-editors-kie-10-2) for the migration
path.

## Where to run them

- [Web — KIE Sandbox](/tools/kie-sandbox) — the editors in your browser, with nothing to install.
- [VS Code extensions](/tools/vscode) — the editors inside your IDE, working on files in your repository.
- [Standalone editors](/tools/editors) — npm packages for embedding an editor in your own web application.
- [Chrome extensions](/tools/chrome) — read and edit models as diagrams directly on GitHub.

And, apart from the editors:

- [Dev consoles](/tools/consoles) — inspect processes and tasks in a running jBPM service.
