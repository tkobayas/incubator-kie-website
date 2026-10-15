---
slug: drl-editor-vscode-extension-kie-10-3
title: "DRL Editor for VS Code: First-class language support for Drools Rule Language in Apache KIE 10.3"
authors: [tkobayas]
tags: [tools, drools, deep-dive]
---

Apache KIE 10.3.0 ships the first official release of the **DRL Editor** — a Visual Studio Code extension bringing full language-server-backed support for Drools Rule Language (`.drl`) files. It turns VS Code into a productive environment for writing, navigating, and maintaining rules.

<!-- truncate -->

## Why a dedicated DRL extension?

DRL files have always been text files, and for years "support" in an editor meant little more than syntax colouring — if you were lucky. Completion, navigation, and error feedback all required running the build just to know whether a rule compiled. For teams with large rule sets this friction adds up: a rule that refers to a renamed Java class, a missing `end`, a typo in a declared type — all silent until `mvn test`.

The DRL Editor closes that gap. It connects VS Code to a full Language Server that indexes both the DRL workspace and the project's Java types, so the feedback loop tightens considerably.

## What's in the box

### Code editing

The language server provides completion for every part of a rule: grammar keywords (`rule`, `when`, `then`, `end`, `declare`, `accumulate`, …), Java class names resolved from the project's Maven classpath, field names and property accessors for matched types, and `declare`-defined types from within the same rule group. Inlay hints show the inferred type of each bound variable directly in the editor, eliminating the need to mentally track `$p: Person(…)` across a long `when` block.

![Field completion inside a pattern constraint](/img/blogs/drl-editor-completion.png)
*Completion inside `Person( )` — the language server resolves `age` and `name` directly from the Java source, no build required.*

### Navigation

- **Go-to-definition** — jump from a DRL type reference to its `declare` block or its Java source file.
- **Find references** — see every use of a declared type or bound variable across the group.
- **Rename** — safe rename for declared types and bound variables in scope.
- **Document symbols** — the outline view lists every rule, query, function, and declared type in the file.
- **Type hierarchy** — browse the extends hierarchy of declared types.
- **Folding** — rule blocks and block comments fold cleanly.

![Hover tooltip for a Java type](/img/blogs/drl-editor-hover.png)
*Hovering over `Employee` shows getters, field types, and constructors resolved from the project's Java sources.*

### Diagnostics

Three layers of error reporting work together:

1. **Syntax errors** — reported as you type, before a save.
2. **Lint diagnostics** — missing `end`, unbalanced parentheses, missing constraint separators, unknown type references (with a "Did you mean?" quick-fix for likely typos).
3. **Compile diagnostics** — on save, the file's group is compiled using the Drools engine on the project's own classpath and the compiler's messages appear in the Problems panel. This gives you the same errors the build would produce, without leaving the editor.

![Lint diagnostic with a typo quick-fix](/img/blogs/drl-editor-problem.png)
*A typo in a type name (`Employer` instead of `Employee`) is caught immediately with a "Did you mean?" suggestion — no save, no build required.*

Compile diagnostics require `drools-compiler` and `drools-mvel` on the classpath — a project that already compiles rules at runtime has them. A workspace without them gets syntax and lint feedback, just not compile feedback.

Completion, navigation and diagnostics all work across file boundaries. The extension scopes them to the files a rule compiles with — picked up automatically from `META-INF/kmodule.xml` when it exists, or configurable via `drl-lsp-kbases.json` or the `drools.lsp.grouping` setting for projects that don't use one.

### Formatter

`Format Document` and `Format Selection` rewrite a `.drl` file into a canonical shape. The formatter is built on the same ANTLR4 parser the engine uses, so it only formats files it can verify will re-parse correctly — it refuses a file entirely rather than writing partial or ambiguous output. Formatting is idempotent.

Key defaults (all configurable):

| Setting | Default | Effect |
|---|---|---|
| `lineLength` | `110` | Wrap trigger for constraints and headers |
| `parenPadding` | `true` | `Person( age > 18 )` |
| `alignDeclarations` | `true` | `declare` fields as aligned columns |
| `normalizeTerminators` | `true` | Adds `;` to `import`, removes from `global` |

A `// @formatter:off` / `// @formatter:on` pair freezes a region verbatim. The formatter is also available as a standalone CLI for pre-commit hooks and CI.

## Requirements

- Java 17 or later (`JAVA_HOME` set or `java` on `PATH`)
- Maven (for classpath resolution of Java types)
- `drools-compiler` and `drools-mvel` on the project's classpath — only for compile diagnostics; everything else works without them

## Getting started

1. **Install the extension** from the VS Code Marketplace: search for *DRL Editor* by `kie-group`.
2. **Open your project** — the extension activates automatically when a `.drl` file is opened.
3. **Check the status bar** — the active file group is shown at the bottom. If the extension picks up your `kmodule.xml` correctly, no additional configuration is needed.
4. **Try a save** — if Drools is on the classpath, compile diagnostics appear in the Problems panel within a few seconds.

For teams that want to commit group definitions without a `kmodule.xml`, place a `drl-lsp-kbases.json` at the workspace root. The README has the full schema.

## A note on the migration from kiegroup/drools-lsp

The DRL Editor is a direct migration of the standalone [kiegroup/drools-lsp](https://github.com/kiegroup/drools-lsp) project, which was developed separately from the main KIE repositories. Bringing it under the Apache KIE umbrella means it now follows the same release cadence, licensing, and CI infrastructure as the rest of the tooling — and that it will evolve alongside Drools rather than tracking it from outside.

The extension ID and publisher have changed from `drl-editor.vscode-extension-drl-editor` to `kie-group.drl-vscode-extension`. If you were using the standalone drools-lsp extension, uninstall it and install the new one; your settings keys (`drools.lsp.*`) are the same.

## Acknowledgements

A large share of the work that made this extension possible came from Daniel Clark ([@drccrd](https://github.com/drccrd)), whose extensive contributions to the language server — from LSP feature implementation to formatter development — form the core of what ships in 10.3.0. Thank you, Daniel.

## What's next

The 10.3.0 release establishes the foundation. We'll continue improving the extension based on community feedback — if something is missing or behaving unexpectedly, opening an issue at [GitHub Issues](https://github.com/apache/incubator-kie-tools/issues) is the best way to shape what comes next. The formatter defaults in particular are open for discussion in [kie-tools#3709](https://github.com/apache/incubator-kie-tools/issues/3709).

## Join the conversation

Questions about the extension, or found something unexpected? The mailing list is the right place:

**[users@kie.apache.org](https://lists.apache.org/list.html?users@kie.apache.org)**

---

*Apache KIE (Incubating) 10.3.0 is available from the [official download page](/start/download).*

**Disclaimer**: *Apache KIE is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.*
