# GATE CS — Study Notes

> **Computer Science and Information Technology (CS)** — GATE paper evaluates core computational theories, programming logic, and systems engineering.

This is a **revision-focused** notes system for candidates who have already completed their degree. Each topic is a **short `topic.md`** (key concepts, formulas, worked examples, and real GATE PYQs) with a link to a **deep-dive file** for in-depth study.

---

## 📊 Exam Structure

| Section | Marks |
|---------|-------|
| **General Aptitude** (Verbal, Quantitative, Spatial, Logical) | 15 |
| **Core Subject Syllabus** | 85 |
| **Total** | 100 |

---

## 🗺️ Syllabus Map & Navigation

### 00 — General Aptitude (15 Marks)
- [General Aptitude](00_General_Aptitude/aptitude.md) — Verbal, Quantitative, Spatial, Logical Reasoning

### 01 — Engineering Mathematics
- [Discrete Mathematics](01_Engineering_Math/discrete_math.md) — Logic, Sets, Combinatorics, Graph Theory
- [Linear Algebra](01_Engineering_Math/linear_algebra.md)
- [Calculus](01_Engineering_Math/calculus.md)
- [Probability](01_Engineering_Math/probability.md)

### 02 — Digital Logic
- [Digital Logic](02_Digital_Logic/digital_logic.md) — Boolean algebra, combinational & sequential circuits, minimization

### 03 — Computer Organization & Architecture
- [Computer Organization](03_Computer_Organization/computer_org.md) — Instructions, addressing modes, ALU, CPU control, pipelining, memory hierarchy, I/O

### 04 — Programming & Data Structures
- [C Programming](04_Programming_Data_Structures/c_programming.md) — Functions, recursion, parameter passing
- [Data Structures](04_Programming_Data_Structures/data_structures.md) — Arrays, Stacks, Queues, Linked Lists, Trees, BST, Heaps, Graphs

### 05 — Algorithms
- [Algorithms](05_Algorithms/algorithms.md) — Searching, sorting, hashing, complexity
- [Algorithm Design](05_Algorithms/algorithm_design.md) — Greedy, DP, Divide-and-Conquer, Graph algorithms

### 06 — Theory of Computation
- [Theory of Computation](06_Theory_of_Computation/toc.md) — Automata, grammars, pumping lemma, Turing machines, decidability

### 07 — Compiler Design
- [Compiler Design](07_Compiler_Design/compiler_design.md) — Lexical analysis, parsing, SDT, runtime, codegen, optimization

### 08 — Operating Systems
- [Operating Systems](08_Operating_Systems/os.md) — Processes, threads, scheduling, memory, virtual memory, files, deadlocks, sync

### 09 — Databases
- [Databases](09_Databases/databases.md) — ER, relational algebra, SQL, normalization, indexing, transactions

### 10 — Computer Networks
- [Computer Networks](10_Computer_Networks/networks.md) — Layering, switching, data link, routing, IP, transport, application

---

## 📚 Deep-Dive References

Detailed in-depth files for every topic live in [`_deep_dives/`](_deep_dives/). Each `topic.md` links to its corresponding deep-dive file for full derivations, extended examples, and textbook/NPTEL references.

---

## 🧭 Recommended Study Order

1. **Engineering Mathematics** (foundation for everything)
2. **Digital Logic** → **Computer Organization**
3. **Programming & Data Structures** → **Algorithms**
4. **Theory of Computation** → **Compiler Design**
5. **Operating Systems** (builds on Computer Org)
6. **Databases**
7. **Computer Networks**
8. **General Aptitude** (practice throughout)

---

## 📖 How to Use These Notes

1. **Short notes first** — Read the `topic.md` TL;DR and key concepts to refresh.
2. **Formulas** — Memorize the KaTeX formula blocks.
3. **Worked examples** — Understand the solved problems.
4. **GATE PYQs** — Attempt the 3-5 real previous-year questions per topic, then check answers.
5. **Go deep** — Follow the deep-dive link when you need full derivations or more examples.
6. **Cross-reference** — Follow prerequisite links to related topics when you need to refresh background.

---

## 🔗 Cross-Reference Map (Prerequisites)

| Topic | Depends On |
|-------|-----------|
| Algorithms | Data Structures, Discrete Math (Graph Theory) |
| Algorithm Design | Algorithms, Data Structures |
| Computer Organization | Digital Logic |
| Operating Systems | Computer Organization, Data Structures |
| Compiler Design | Theory of Computation, Data Structures |
| Databases | Discrete Math (Sets/Relations) |
| Computer Networks | Operating Systems, Probability |
| Probability | Calculus, Discrete Math (Combinatorics) |
| Linear Algebra | Calculus |