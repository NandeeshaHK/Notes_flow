# Discrete Mathematics

> **Syllabus:** Logic, Sets, Combinatorics, Graph Theory.
> Revision sheet — you've done this in your degree. Focus on formulas and GATE traps.

---

## 🎬 Start Here: What is Discrete Math? (a story)

Discrete math is the math of **counting, logic, and connections** — the math behind computers. Think of it as four tools in your toolbox:

- **Logic** — "the truth detector." Deciding whether a statement is always true, sometimes true, or never true.
- **Sets** — "the grouping tool." Organizing things into collections and counting overlaps.
- **Combinatorics** — "the counting tool." Figuring out *how many ways* to arrange or choose things.
- **Graph Theory** — "the connection tool." Modeling networks of connected things (roads, friends, circuits).

> 🧠 **Why this matters for GATE:** Almost every CS topic builds on these. Graph theory powers [Algorithms](../05_Algorithms/algorithm_design.md), logic powers [Digital Logic](../02_Digital_Logic/digital_logic.md), sets power [Databases](../09_Databases/databases.md), and combinatorics powers [Probability](../01_Engineering_Math/probability.md).

---

## TL;DR / Key Concepts

- **Logic**: Propositions, truth tables, logical equivalences, predicates & quantifiers, rules of inference.
- **Sets**: Operations, cardinality, power set, Cartesian product, relations & functions.
- **Combinatorics**: Permutations, combinations, pigeonhole principle, inclusion-exclusion, recurrence relations.
- **Graph Theory**: Graph types, Euler/Hamilton paths, trees, planar graphs, coloring, matching.

---

## 1. Logic — "The Truth Detector"

### The Story: A Promise

A proposition is a statement that is either **true or false** — like a promise. "It is raining" is a proposition. "Close the door!" is not (it's a command).

The tricky one is the **implication** $p \to q$ ("if p, then q"). Think of it as a **promise**:
> "If you study, then you pass."

When is this promise **broken**? Only when you study (p true) but fail (q false). In every other case, the promise holds:

| p (study) | q (pass) | $p \to q$ (promise kept?) |
|-----------|----------|---------------------------|
| ✅ studied | ✅ passed | ✅ kept |
| ✅ studied | ❌ failed | ❌ **broken** |
| ❌ didn't study | ✅ passed | ✅ kept (no promise broken) |
| ❌ didn't study | ❌ failed | ✅ kept (no promise broken) |

**The key insight:** The only way an implication is **false** is when the *first part is true* and the *second part is false*. That's why:

$$p \to q \equiv \neg p \lor q$$

> 💡 **GATE trap:** "If p then q" is TRUE when p is false! Many students get this wrong. An implication is only false when *true → false*.

### Logical Equivalences (memorize these)
- De Morgan: $\neg(p \land q) \equiv \neg p \lor \neg q$, $\quad \neg(p \lor q) \equiv \neg p \land \neg q$
  - *"Not (both A and B)" = "not A OR not B"* — like saying "I didn't eat both the cake and the pie" means "I skipped at least one."
- Implication: $p \to q \equiv \neg p \lor q$ *(the promise rule above)*
- Contrapositive: $p \to q \equiv \neg q \to \neg p$ *(if you didn't pass, you didn't study)*
- Biconditional: $p \leftrightarrow q \equiv (p \to q) \land (q \to p)$ *(both directions)*

### Worked Example: Is this a tautology?

**Question:** Is $(p \to q) \land (q \to r) \to (p \to r)$ always true?

**The story:** This is the **hypothetical syllogism** — "if A→B and B→C, then A→C." Like a chain:
> If it rains → the ground is wet. If the ground is wet → it's slippery. Therefore, if it rains → it's slippery.

This chain is **always true** (a tautology). You can verify with a truth table — every row comes out true.

---

## 2. Sets — "The Grouping Tool"

### The Story: Two Friend Groups

Imagine two groups of friends: **A** (people who like pizza) and **B** (people who like burgers). Some people like both.

- **Union** $A \cup B$ = everyone who likes *at least one*.
- **Intersection** $A \cap B$ = people who like *both*.
- **Counting the union:** If you add the pizza-lovers and burger-lovers, you **double-count** the people in both. So subtract the overlap:

$$|A \cup B| = |A| + |B| - |A \cap B|$$

**Example:** 10 like pizza, 8 like burgers, 3 like both. Total who like at least one $= 10 + 8 - 3 = 15$.

> 💡 **The intuition:** The "minus intersection" fixes the double-counting. For three sets, you add all, subtract all pairs, add back the triple — that's **inclusion-exclusion**.

### Power Set — "All Possible Subsets"

The **power set** $P(A)$ is the set of *all subsets* of A. If A has $n$ elements, each element can be **in or out** of a subset (2 choices each):

$$|P(A)| = 2^{|A|}$$

**Example:** A = {a, b}. Subsets: {}, {a}, {b}, {a,b} → 4 = $2^2$. ✅

---

## 3. Combinatorics — "The Counting Tool"

### The Story: Permutations vs Combinations

- **Permutation** = *arranging* (order matters). "How many ways to line up 3 people?" ABC ≠ ACB.
- **Combination** = *choosing* (order doesn't matter). "How many ways to pick 2 people for a team?" {A,B} = {B,A}.

### Formulas

$$P(n,r) = \frac{n!}{(n-r)!}, \qquad C(n,r) = \binom{n}{r} = \frac{n!}{r!(n-r)!}$$

**Example (Permutation):** Arrange the letters of "GATE" (4 distinct letters):
- 4 choices for 1st, 3 for 2nd, 2 for 3rd, 1 for last → $4! = 24$.

**Example (Combination):** Pick 2 toppings from 5:
- $\binom{5}{2} = \frac{5!}{2!3!} = 10$.

> 💡 **The intuition:** A combination is a permutation *divided by* the $r!$ ways to reorder the chosen items (since order doesn't matter).

### The Pigeonhole Principle — "Too Many Pigeons"

**The story:** If you have more pigeons than pigeonholes, at least one hole has **2+ pigeons**. Obvious, but powerful!

**Example:** How many people do you need to guarantee two share a birthday **month**?
- There are 12 months (pigeonholes). With 13 people (pigeons), two must share a month. → **13**.

> 💡 **GATE trap:** The pigeonhole principle guarantees a *minimum* — $\lceil n/m \rceil$ items in some box. It's about *guaranteeing*, not probability.

---

## 4. Graph Theory — "The Connection Tool"

### The Story: A Friendship Network

A graph is a bunch of **vertices** (people) connected by **edges** (friendships). Graphs model roads, circuits, social networks, and more.

### Handshaking Lemma — "Every Handshake Counts Twice"

**The story:** At a party, every handshake involves **two** people. So if you count everyone's handshakes and add them up, you've counted each handshake **twice**:

$$\sum \deg(v) = 2|E|$$

**Example:** A graph with 4 edges has $\sum \deg = 8$. If degrees are 2, 2, 3, 1 → sum = 8. ✅

> 💡 **GATE trap:** The sum of degrees is **always even** (it's $2|E|$). So you can't have an odd number of odd-degree vertices.

### Complete Graph — "Everyone Knows Everyone"

A **complete graph** $K_n$ has an edge between *every pair* of vertices. Each of the $n$ vertices connects to $n-1$ others, but each edge is counted twice:

$$|E| = \frac{n(n-1)}{2}$$

**Example:** $K_5$ has $\frac{5 \times 4}{2} = 10$ edges.

### Trees — "The Minimal Connector"

A **tree** is a connected graph with **no cycles**. It's the *minimum* way to connect everything:

$$|E| = |V| - 1$$

**Example:** A tree with 10 vertices has $10 - 1 = 9$ edges. (You can't connect 10 things with fewer than 9 links.)

### Planar Graphs — "Drawable Without Crossings"

A graph is **planar** if it can be drawn with **no edges crossing**. Euler's formula relates vertices, edges, and faces (regions):

$$V - E + F = 2$$

**Example:** A cube graph has $V=8$, $E=12$, $F=6$ → $8 - 12 + 6 = 2$. ✅

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 1 mark):** The number of edges in a complete graph $K_5$ is:
- **Answer:** $\frac{5 \times 4}{2} = 10$. *(Each of 5 vertices connects to 4 others, but each edge counted twice.)*

**Q2 (GATE 2020, 1 mark):** Which of the following is a tautology?
- (A) $p \land q$ (B) $p \lor \neg p$ (C) $p \to q$ (D) $p \land \neg p$
- **Answer: (B)** — law of excluded middle. *(Either p is true, or not-p is true — always one of them holds.)*

**Q3 (GATE 2019, 2 marks):** The number of ways to distribute 5 distinct balls into 3 distinct boxes (any box can be empty) is:
- **Answer:** $3^5 = 243$. *(Each of the 5 balls independently picks 1 of 3 boxes → $3 \times 3 \times 3 \times 3 \times 3$.)*

**Q4 (GATE 2018, 1 mark):** In a group of 6 people, what is the minimum number of edges in a connected graph?
- **Answer:** $n - 1 = 5$ (a tree). *(You need at least 5 links to connect 6 people without redundancy.)*

**Q5 (GATE 2017, 2 marks):** The number of binary relations on a set of 3 elements is:
- **Answer:** $2^{3 \times 3} = 2^9 = 512$. *(A relation is a set of ordered pairs; there are $3 \times 3 = 9$ possible pairs, each either in or out.)*

---

## 📚 Deep Dive

- [Discrete Mathematics — Deep Dive](../_deep_dives/discrete_math_deep.md) — full derivations, recurrence relations, graph algorithms, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- **Graph Theory** is the foundation for [Algorithms — Graph traversals, MST, shortest paths](../05_Algorithms/algorithm_design.md).
- **Logic** underpins [Digital Logic — Boolean algebra](../02_Digital_Logic/digital_logic.md).
- **Sets & Relations** underpin [Databases — Relational algebra](../09_Databases/databases.md).
- **Combinatorics** is needed for [Probability](../01_Engineering_Math/probability.md).