# Discrete Mathematics — Deep Dive

> In-depth reference for [Discrete Mathematics](../01_Engineering_Math/discrete_math.md). Full derivations, recurrence relations, graph algorithms, and extended PYQs.

---

## 1. Propositional Logic

### Logical Equivalences (full list)
- Identity: $p \land T \equiv p$, $\;p \lor F \equiv p$
- Domination: $p \lor T \equiv T$, $\;p \land F \equiv F$
- Idempotent: $p \lor p \equiv p$, $\;p \land p \equiv p$
- Double negation: $\neg(\neg p) \equiv p$
- Commutative: $p \lor q \equiv q \lor p$, $\;p \land q \equiv q \land p$
- Associative: $(p \lor q) \lor r \equiv p \lor (q \lor r)$
- Distributive: $p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$
- De Morgan: $\neg(p \land q) \equiv \neg p \lor \neg q$

### Rules of Inference
- Modus ponens: $p, p \to q \Rightarrow q$
- Modus tollens: $\neg q, p \to q \Rightarrow \neg p$
- Hypothetical syllogism: $p \to q, q \to r \Rightarrow p \to r$
- Disjunctive syllogism: $p \lor q, \neg p \Rightarrow q$

---

## 2. Sets & Relations

### Set Operations
- Union, intersection, difference, complement, symmetric difference $A \triangle B = (A-B) \cup (B-A)$.

### Relations
- Reflexive, symmetric, antisymmetric, transitive.
- Equivalence relation: reflexive + symmetric + transitive → partitions set into equivalence classes.
- Partial order: reflexive + antisymmetric + transitive.

### Functions
- Injective (one-to-one), surjective (onto), bijective.
- $|A| = |B|$ for bijection.

---

## 3. Combinatorics — Advanced

### Permutations with Repetition
- $n$ items with $r$ types: $\frac{n!}{n_1! n_2! \cdots n_r!}$

### Circular Permutations
- $(n-1)!$ ways to arrange $n$ distinct items in a circle.

### Combinations with Repetition
- $\binom{n+r-1}{r}$ ways to choose $r$ items from $n$ types with repetition.

### Recurrence Relations
- Linear homogeneous: $a_n = c_1 a_{n-1} + c_2 a_{n-2}$
- Characteristic equation: $r^2 - c_1 r - c_2 = 0$
- Fibonacci: $a_n = a_{n-1} + a_{n-2}$, $a_0=0, a_1=1$

#### 3.1 Worked Example — Circular Permutations (The Round Table Story)

**The story:** Arranging people in a **line** vs a **circle** is different. In a line, position matters (first, second, ...). In a circle, there's no "first" — rotating everyone doesn't create a new arrangement.

**Question:** How many ways to seat 5 people around a round table?

**The intuition:** In a line, it's $5! = 120$. But in a circle, each arrangement is counted 5 times (once per rotation). So:

$$(n-1)! = 4! = 24$$

> 💡 **The trick:** Fix one person's seat (to break the symmetry), then arrange the remaining $n-1$ people in a line: $(n-1)!$.

#### 3.2 Worked Example — Recurrence Relations (The Rabbit Story)

**The story (Fibonacci):** Start with 1 pair of rabbits. Each month, every pair produces a new pair. How many pairs after $n$ months?

| Month | Pairs | How |
|-------|-------|-----|
| 0 | 1 | start |
| 1 | 1 | not mature yet |
| 2 | 2 | first pair reproduces |
| 3 | 3 | |
| 4 | 5 | |
| 5 | 8 | |

The pattern: $a_n = a_{n-1} + a_{n-2}$ — each month's total is the sum of the previous two.

**Solving a recurrence:** For $a_n = 5a_{n-1} - 6a_{n-2}$:
- Characteristic equation: $r^2 - 5r + 6 = 0 \Rightarrow (r-2)(r-3) = 0 \Rightarrow r = 2, 3$
- General solution: $a_n = A \cdot 2^n + B \cdot 3^n$
- Use initial conditions to find $A$ and $B$.

---

## 4. Graph Theory — Advanced

### Graph Types
- Complete $K_n$, bipartite $K_{m,n}$, cycle $C_n$, path $P_n$, wheel $W_n$.

### Euler & Hamilton
- Euler circuit: all vertices even degree, connected.
- Euler path: exactly 0 or 2 odd-degree vertices.
- Hamilton cycle: visits every vertex once (no simple characterization).

#### 4.3 The Story — Euler vs Hamilton (The Postman vs The Traveling Salesman)

**Euler circuit — "The Postman's Route":** A postman wants to walk every **street** exactly once and return home. When is this possible?
- **The rule:** Every intersection must have an **even** number of streets (so you can enter and leave). If all degrees are even → Euler circuit exists.
- If exactly 2 intersections have odd degree → you can walk every street once, but you'll *end somewhere different* (Euler path, not circuit).

**Hamilton cycle — "The Traveling Salesman":** A salesman wants to visit every **city** exactly once and return. This is much harder to check — there's **no simple rule** like the even-degree one. That's why Hamilton problems are harder.

> 💡 **GATE trap:** Euler = edges (streets), Hamilton = vertices (cities). Don't mix them up! Euler has a clean rule (even degrees); Hamilton has no simple characterization.

### Planar Graphs
- Euler: $V - E + F = 2$
- $E \le 3V - 6$ for connected planar ($V \ge 3$)
- $K_5$ and $K_{3,3}$ are non-planar.

#### 4.5 The Story — Planar Graphs (The No-Crossing Rule)

**The story:** You're drawing a circuit board and want **no wires crossing**. A graph you can draw without crossings is **planar**.

- **Euler's formula:** $V - E + F = 2$ (vertices − edges + faces = 2). The "faces" are the regions the drawing divides the plane into.
- **The limit:** A planar graph can't have too many edges: $E \le 3V - 6$. This is why $K_5$ (10 edges, but $3 \times 5 - 6 = 9$) is **not planar** — it has too many edges to avoid crossings.

> 💡 **GATE trap:** $K_5$ and $K_{3,3}$ are the two classic non-planar graphs. If a graph contains either as a subgraph, it's not planar.

### Graph Coloring
- Chromatic number $\chi(G)$: min colors.
- $\chi(K_n) = n$, $\chi(\text{bipartite}) = 2$.

#### 4.4 The Story — Map Coloring (The Four-Color Problem)

**The story:** You're coloring a map so that **no two adjacent regions** share a color. How many colors do you need?

- A **bipartite graph** (two groups, edges only between groups) needs just **2 colors** — like a chessboard.
- A **complete graph** $K_n$ needs $n$ colors (every vertex touches every other).
- The famous **four-color theorem**: any planar map needs at most 4 colors.

> 💡 **The intuition:** The chromatic number $\chi(G)$ is the *minimum* colors needed. For a bipartite graph, $\chi = 2$; for $K_n$, $\chi = n$.

### Matching
- Perfect matching: covers all vertices.
- Hall's theorem for bipartite matching.

#### 4.1 Worked Example — Graph Representations (Table)

**Given graph:** Vertices {A, B, C, D}, edges {A-B, A-C, B-C, C-D}.

**Adjacency matrix** (1 = edge, 0 = no edge):

| | A | B | C | D |
|---|---|---|---|---|
| **A** | 0 | 1 | 1 | 0 |
| **B** | 1 | 0 | 1 | 0 |
| **C** | 1 | 1 | 0 | 1 |
| **D** | 0 | 0 | 1 | 0 |

**Adjacency list:**

| Vertex | Neighbors |
|--------|-----------|
| A | B, C |
| B | A, C |
| C | A, B, D |
| D | C |

> 💡 **Matrix vs list:** Adjacency matrix is $O(V^2)$ space with $O(1)$ edge lookup; adjacency list is $O(V+E)$ space, better for sparse graphs.

#### 4.2 Worked Example — Degree Table

| Vertex | Degree | Odd/Even |
|--------|--------|----------|
| A | 2 | Even |
| B | 2 | Even |
| C | 3 | **Odd** |
| D | 1 | **Odd** |

- Sum of degrees $= 2 + 2 + 3 + 1 = 8 = 2|E| = 2 \times 4$ ✓ (handshaking lemma)
- Exactly 2 odd-degree vertices → has an **Euler path** (but no Euler circuit).

---

## 5. Extended PYQs

**Q6 (GATE 2016, 2 marks):** The number of distinct Hamiltonian cycles in $K_n$ is:
- **Answer:** $\frac{(n-1)!}{2}$.

**Q7 (GATE 2015, 2 marks):** The number of ways to arrange 5 boys and 5 girls in a row such that no two girls are adjacent:
- **Answer:** $5! \times 6P5 = 5! \times \frac{6!}{1!}$.

**Q8 (GATE 2014, 1 mark):** The chromatic number of a bipartite graph is:
- **Answer:** 2.

---

## 6. References

- Rosen — *Discrete Mathematics and Its Applications*
- NPTEL: Discrete Mathematics (IIT)
- Previous GATE papers