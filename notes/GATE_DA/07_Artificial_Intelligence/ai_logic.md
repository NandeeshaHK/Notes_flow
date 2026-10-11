# AI — Logic

> **Syllabus:** Logic (Propositional and First-order logic).
> Revision sheet — focus on syntax, inference, and GATE traps.

---

## TL;DR / Key Concepts

- **Propositional logic**: statements that are true/false; connectives; truth tables; inference.
- **First-order logic (FOL)**: adds quantifiers, predicates, variables, functions.
- **Key ideas**: satisfiability, validity, entailment, resolution, unification.

```mermaid
flowchart TD
    A[Logic] --> B[Propositional Logic<br/>P, Q, connectives]
    A --> C[First-Order Logic<br/>quantifiers, predicates]
    B --> B1[Truth Tables]
    B --> B2[Inference Rules]
    B --> B3[Resolution]
    C --> C1[∀ and ∃ quantifiers]
    C --> C2[Predicates P(x)]
    C --> C3[Unification]
    C --> C4[Resolution + Unification]
```

### Truth Table for Connectives
| $P$ | $Q$ | $\neg P$ | $P \land Q$ | $P \lor Q$ | $P \to Q$ | $P \leftrightarrow Q$ |
|-----|-----|----------|-------------|------------|-----------|------------------------|
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |

### Inference Rules
| Rule | From | Infer |
|------|------|-------|
| **Modus Ponens** | $P$, $P \to Q$ | $Q$ |
| **Modus Tollens** | $\neg Q$, $P \to Q$ | $\neg P$ |
| **Resolution** | $P \lor Q$, $\neg P \lor R$ | $Q \lor R$ |

### Propositional vs First-Order Logic
| Feature | Propositional | First-Order |
|---------|---------------|-------------|
| Expresses | Simple facts | Relations & properties |
| Quantifiers | ❌ | ✅ ($\forall$, $\exists$) |
| Variables | ❌ | ✅ |
| Example | "It is raining" | $\forall x\,(\text{Man}(x)\to\text{Mortal}(x))$ |

---

## 🎭 Story / Intuition

**The robot butler story (why logic matters).** Imagine programming a **robot butler**. You need to encode rules like "If the door is locked, the robot must use the key." In **propositional logic**, you'd write $L \to K$ ("locked implies use key"). The robot can then **reason**: if it observes $L$ (door locked) and knows $L \to K$, it can *infer* $K$ (use the key) — this is **Modus Ponens**. Logic gives the robot a way to *derive new facts* from known ones, not just store facts.

**The "all humans are mortal" story (first-order logic).** Propositional logic can only handle *specific* facts ("Socrates is mortal"). But what about the general rule "**All** humans are mortal"? You can't write that with simple propositions. **First-order logic (FOL)** adds **quantifiers** and **variables**: $\forall x\,(\text{Human}(x) \to \text{Mortal}(x))$ means "for every $x$, if $x$ is human then $x$ is mortal." Now, given the fact $\text{Human}(\text{Socrates})$, the robot can *unify* $x$ with Socrates and conclude $\text{Mortal}(\text{Socrates})$. This is the classic **Socrates syllogism** — FOL lets machines reason about *categories* and *relationships*, not just isolated facts.

**The "contradiction" story (resolution).** **Resolution** is a proof technique: to prove a statement, you assume its *negation* and show it leads to a **contradiction** (an empty clause). It's like a detective who assumes the suspect is innocent, then finds evidence that contradicts every possibility — proving guilt by eliminating all alternatives. In FOL, resolution combines with **unification** (matching variables) to derive contradictions. This is the engine behind automated theorem provers and logic-based AI.

**The truth-table story (validity vs satisfiability).** A formula is **valid (tautology)** if it's true in *every* possible situation — like "it's raining OR it's not raining" ($R \lor \neg R$), which is always true no matter the weather. A formula is **satisfiable** if it's true in *at least one* situation. The difference matters: a valid formula is always safe to rely on, while a satisfiable one might be false in some cases. GATE loves testing whether you can tell these apart.

---

## 📐 Key Formulas / Concepts

### Propositional Logic
- Connectives: $\neg$ (not), $\land$ (and), $\lor$ (or), $\to$ (implies), $\leftrightarrow$ (iff).
- Implication: $P \to Q \equiv \neg P \lor Q$.
- De Morgan: $\neg(P \land Q) \equiv \neg P \lor \neg Q$; $\neg(P \lor Q) \equiv \neg P \land \neg Q$.
- Contrapositive: $P \to Q \equiv \neg Q \to \neg P$.
- **Satisfiable**: true under some assignment. **Valid (tautology)**: true under all assignments.

### Inference Rules
- Modus Ponens: from $P$ and $P \to Q$, infer $Q$.
- Modus Tollens: from $\neg Q$ and $P \to Q$, infer $\neg P$.
- Resolution: from $(P \lor Q)$ and $(\neg P \lor R)$, infer $(Q \lor R)$.

### First-Order Logic (FOL)
- Quantifiers: $\forall$ (for all), $\exists$ (there exists).
- Predicates: $P(x)$; constants, variables, functions.
- Example: $\forall x\,(\text{Man}(x) \to \text{Mortal}(x))$.
- **Unification**: find a substitution making two expressions identical.
- **Resolution in FOL**: combine with unification to derive contradictions.

---

## ✍️ Worked Examples

**Example 1 (Truth table):** $P \to Q$ is false only when $P$ is true and $Q$ is false.

**Example 2 (Equivalence):** $\neg(P \land Q)$ is equivalent to:
- **Answer:** $\neg P \lor \neg Q$ (De Morgan).

**Example 3 (Modus Ponens):** Given "If it rains, the ground is wet" and "it rains", conclude:
- **Answer:** the ground is wet.

**Example 4 (FOL):** "All students are smart" in FOL:
- **Answer:** $\forall x\,(\text{Student}(x) \to \text{Smart}(x))$.

---

## 🎯 GATE PYQs

**Q1 (GATE DA 2024, 2 marks):** The statement $P \to Q$ is logically equivalent to:
- **Answer:** $\neg P \lor Q$.

**Q2 (GATE DA 2024, 2 marks):** Modus Ponens allows inferring $Q$ from:
- **Answer:** $P$ and $P \to Q$.

**Q3 (GATE DA 2025, 2 marks):** The negation of $\forall x\, P(x)$ is:
- **Answer:** $\exists x\, \neg P(x)$.

**Q4 (GATE DA 2025, 2 marks):** A propositional formula that is true for all truth assignments is called:
- **Answer:** valid (a tautology).

**Q5 (GATE DA 2026, 2 marks):** In first-order logic, the process of finding a substitution that makes two expressions identical is called:
- **Answer:** unification.

---

## 📚 Deep Dive

- [AI Logic — Deep Dive](../_deep_dives/ai_logic_deep.md) — resolution proofs, CNF conversion, unification algorithm, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Requires [GATE_CS Discrete Math](../../GATE_CS/01_Engineering_Math/discrete_math.md) (propositional logic, predicates).
- See [AI Search](ai_search.md) for the search counterpart.