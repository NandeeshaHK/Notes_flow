# Compiler Design — Deep Dive

> In-depth reference for [Compiler Design](../07_Compiler_Design/compiler_design.md). Parsing table construction, SDT, activation records, and extended PYQs.

---

## 1. Compiler Phases

1. **Lexical analysis**: tokens.
2. **Syntax analysis**: parse tree.
3. **Semantic analysis**: type checking.
4. **Intermediate code generation**: three-address code.
5. **Optimization**: improve code.
6. **Code generation**: target machine code.

---

## 2. Lexical Analysis

- Uses regular expressions and DFA.
- Token types: keywords, identifiers, operators, literals.
- Lexical errors: invalid characters.

---

## 3. Parsing

### Top-Down (LL)
- Recursive descent, predictive parsing.
- LL(1): one lookahead, no left recursion, no ambiguity.
- Left recursion removal: $A \to A\alpha \mid \beta$ → $A \to \beta A'$, $A' \to \alpha A' \mid \epsilon$.

### Bottom-Up (LR)
- Shift-reduce parsing.
- LR(0), SLR(1), LALR(1), CLR(1).
- Power: $LL(1) \subset LR(0) \subset SLR(1) \subset LALR(1) \subset CLR(1)$.

### First & Follow
- $\text{First}(\alpha)$: terminals starting strings from $\alpha$.
- $\text{Follow}(A)$: terminals following $A$.

#### 3.1 Worked Example — First & Follow Table

**Given grammar:**
- $S \to aB$
- $B \to b \mid \epsilon$

**First & Follow table:**

| Non-terminal | First | Follow |
|--------------|-------|--------|
| S | $\{a\}$ | $\{\$\}$ |
| B | $\{b, \epsilon\}$ | $\{\$\}$ |

> 💡 **First(B)** includes $\epsilon$ because $B \to \epsilon$. **Follow(B)** = $\{\$\}$ because B is at the end of $S \to aB$ and $S$'s follow is $\{\$\}$.

#### 3.2 LL(1) Parse Table

**Given grammar:**
- $E \to TE'$
- $E' \to +TE' \mid \epsilon$
- $T \to FT'$
- $T' \to *FT' \mid \epsilon$
- $F \to (E) \mid id$

**LL(1) parse table** (rows = non-terminals, columns = terminals):

| | id | + | * | ( | ) | $ |
|---|----|----|----|----|----|----|
| **E** | $E \to TE'$ | | | $E \to TE'$ | | |
| **E'** | | $E' \to +TE'$ | | | $E' \to \epsilon$ | $E' \to \epsilon$ |
| **T** | $T \to FT'$ | | | $T \to FT'$ | | |
| **T'** | | $T' \to \epsilon$ | $T' \to *FT'$ | | $T' \to \epsilon$ | $T' \to \epsilon$ |
| **F** | $F \to id$ | | | $F \to (E)$ | | |

> 💡 **Parse table construction:** For each production $A \to \alpha$, put it in column $a$ for each $a \in \text{First}(\alpha)$. If $\alpha \Rightarrow^* \epsilon$, also put it in columns of $\text{Follow}(A)$. The grammar is **LL(1)** if each cell has at most one production.

---

## 4. Syntax-Directed Translation

- **SDD** (Syntax-Directed Definition): attributes + semantic rules.
- **SDT** (Syntax-Directed Translation): embedded actions.
- **Synthesized attributes**: computed from children.
- **Inherited attributes**: computed from parent/siblings.

---

## 5. Runtime Environments

- **Activation record**: function call info (return address, parameters, locals).
- **Stack allocation**: for function calls.
- **Heap allocation**: for dynamic data.
- **Static vs dynamic scoping**.

---

## 6. Intermediate Code & Optimization

### Three-Address Code
- $x = y \text{ op } z$
- Quadruples, triples, indirect triples.

### Local Optimization
- Constant folding, algebraic simplification, common subexpression elimination.

### Global Optimization
- Loop optimization, code motion, strength reduction, dead code elimination.

---

## 7. Extended PYQs

**Q6 (GATE 2016, 2 marks):** The grammar $S \to aS \mid \epsilon$ is:
- **Answer:** LL(1) (no left recursion, unambiguous).

**Q7 (GATE 2015, 2 marks):** Which parser is most powerful?
- **Answer:** CLR(1).

**Q8 (GATE 2014, 1 mark):** The activation record is created during:
- **Answer:** function call (runtime).

---

## 8. References

- Aho, Lam, Sethi, Ullman — *Compilers: Principles, Techniques, and Tools* (Dragon Book)
- NPTEL: Compiler Design (IIT)
- Previous GATE papers