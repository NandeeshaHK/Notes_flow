# Compiler Design

> **Syllabus:** Lexical analysis, parsing, syntax-directed translation; Runtime environments; Intermediate code generation; Local optimization.
> Revision sheet — focus on parsing tables and GATE traps.

---

## TL;DR / Key Concepts

- **Phases**: Lexical → Syntax → Semantic → Intermediate code → Optimization → Code gen.
- **Lexical analysis**: tokens, regular expressions, DFA.
- **Parsing**: top-down (LL), bottom-up (LR, SLR, LALR, CLR).
- **Syntax-directed translation**: SDD, SDT, attribute grammars.
- **Runtime environments**: activation records, stack/heap allocation.
- **Intermediate code**: three-address code, DAG.
- **Optimization**: local (basic blocks), global, peephole.

---

## 📐 Key Formulas / Facts

### Grammar Classification
- LL(1): top-down, no left recursion, no ambiguity.
- LR(0), SLR(1), LALR(1), CLR(1): bottom-up, increasing power.
- Power: $LL(1) \subset LR(0) \subset SLR(1) \subset LALR(1) \subset CLR(1)$

### First & Follow
- $\text{First}(\alpha)$: set of terminals that can begin strings derived from $\alpha$.
- $\text{Follow}(A)$: set of terminals that can follow $A$.

### Three-Address Code
- $x = y \text{ op } z$ — at most one operator on RHS.

### Optimization
- Local: constant folding, algebraic simplification, common subexpression elimination (within basic block).
- Global: loop optimization, code motion, strength reduction.

---

## ✍️ Worked Examples

**Example 1 (First/Follow):** $S \to aB$, $B \to b \mid \epsilon$:
- $\text{First}(S) = \{a\}$, $\text{First}(B) = \{b, \epsilon\}$, $\text{Follow}(S) = \{\$\}$, $\text{Follow}(B) = \{\$\}$.

**Example 2 (Three-address):** `a = b * c + d` →
```
t1 = b * c
a = t1 + d
```

**Example 3 (Constant folding):** `x = 3 * 4` → `x = 12`.

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 1 mark):** Which phase produces tokens?
- **Answer:** Lexical analysis.

**Q2 (GATE 2020, 2 marks):** The grammar $S \to SS \mid a$ is:
- **Answer:** ambiguous (multiple parse trees for `aaa`).

**Q3 (GATE 2019, 1 mark):** LALR(1) parsers are built from:
- **Answer:** LR(1) items (merging states).

**Q4 (GATE 2018, 2 marks):** Three-address code for `a = b + c * d`:
- **Answer:** `t1 = c * d; a = b + t1`.

**Q5 (GATE 2017, 1 mark):** Which is a local optimization?
- **Answer:** constant folding.

---

## 📚 Deep Dive

- [Compiler Design — Deep Dive](../_deep_dives/compiler_design_deep.md) — parsing table construction, SDT, activation records, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Requires [Theory of Computation](../06_Theory_of_Computation/toc.md) and [Data Structures](../04_Programming_Data_Structures/data_structures.md).
- Runtime environments relate to [OS — memory management](../08_Operating_Systems/os.md).