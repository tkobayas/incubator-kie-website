---
id: optaplanner
title: OptaPlanner
sidebar_label: Overview
sidebar_position: 0
---

OptaPlanner is a fast, easy-to-use, open source AI constraint solver for
software developers.

See the [OptaPlanner documentation](pathname:///docs/10.2.x/optaplanner/) for the
reference manual, published with every Apache KIE release.

## Modern mathematical optimization

OptaPlanner is a lightweight, embeddable planning engine that lets everyday
Java™ programmers solve optimization problems efficiently. It is also
compatible with other JVM languages, such as Kotlin and Scala. Constraints
apply on plain domain objects and can call existing code — there is no need to
express them as mathematical equations.

Under the hood, OptaPlanner combines sophisticated Artificial Intelligence
optimization algorithms (such as Tabu Search, Simulated Annealing, Late
Acceptance and other metaheuristics) with very efficient score calculation and
other state-of-the-art constraint solving techniques for NP-complete and
NP-hard problems.

OptaPlanner supports:

- **Continuous planning** to weekly publish the schedule, 3 weeks before execution
- **Non-disruptive replanning** for changes to an already published schedule
- **Real-time planning** to react on real-time disruptions in the plan within milliseconds
- **Overconstrained planning** when there are too few resources to cover all the work
- **Pinning** so the user is still in control over the schedule

OptaPlanner is open source software, released under the Apache License. It is
written in 100% pure Java™, runs on any JVM and is available in the Maven
Central repository.
