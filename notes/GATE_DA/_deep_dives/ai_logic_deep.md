# AI Logic — Deep Dive

> In-depth reference for [AI Logic](../07_Artificial_Intelligence/ai_logic.md). Resolution proofs, CNF conversion, unification, and extended PYQs.

---

## 1. Propositional Logic

### Connectives & Truth
- $\neg, \land, \lor, \to, \leftrightarrow$.
- $P \to Q \equiv \neg P \lor Q$.
- De Morgan's laws.
- Contrapositive: $P \to Q \equiv \neg Q \to \neg P$.

### Semantic Concepts
- **Satisfiable**: true under at least one assignment.
- **Valid (tautology)**: true under all assignments.
- **Entailment**: $\alpha \models \beta$ if $\beta$ is true whenever $\alpha$ is true.

---

## 2. Inference Rules

- **Modus Ponens**: $P, P \to Q \vdash Q$.
- **Modus Tollens**: $\neg Q, P \to Q \vdash \neg P$.
- **Resolution**: $(P \lor Q), (\neg P \lor R) \vdash (Q \lor R)$.

### Resolution Refutation
1. Convert knowledge base to CNF.
2. Negate the goal.
3. Apply resolution until contradiction (empty clause) → goal is entailed.

---

## 3. First-Order Logic (FOL)

### Syntax
- Constants, variables, functions, predicates.
- Quantifiers: $\forall$, $\exists$.
- Example: $\forall x\,(\text{Man}(x) \to \text{Mortal}(x))$.

### Unification
- Find substitution $\theta$ such that two expressions become identical.
- E.g., unify $P(x, f(y))$ and $P(a, f(b))$ with $\theta = \{x/a, y/b\}$.

### Resolution in FOL
- Combine resolution with unification.
- Requires converting to **Skolem normal form** (eliminate $\exists$).

---

## 4. Extended PYQs

**Q6 (GATE DA 2024, 2 marks):** The formula $\forall x\, P(x) \land \exists y\, Q(y)$ is:
- **Answer:** satisfiable (not a tautology, not a contradiction).

**Q7 (GATE DA 2025, 2 marks):** Resolution refutation proves a goal by:
- **Answer:** deriving a contradiction (empty clause).

**Q8 (GATE DA 2026, 2 marks):** The substitution $\{x/a, y/b\}$ applied to $P(x, y)$ yields:
- **Answer:** $P(a, b)$.

---

## 5. References

- Russell & Norvig — *Artificial Intelligence: A Modern Approach*
- NPTEL: Introduction to Artificial Intelligence (IIT)
- Previous GATE DA papers