# Databases

> **Syllabus:** ER-model; Relational model: relational algebra, tuple calculus, SQL; Integrity constraints, normal forms; File organization, indexing (B and B+ trees); Transactions and concurrency control.
> Revision sheet — focus on normalization and GATE traps.

---

## TL;DR / Key Concepts

- **ER model**: entities, attributes, relationships, keys.
- **Relational model**: relations, relational algebra, tuple calculus, SQL.
- **Integrity constraints**: key, entity, referential, domain.
- **Normalization**: 1NF, 2NF, 3NF, BCNF, functional dependencies.
- **Indexing**: B-tree, B+ tree.
- **Transactions**: ACID, concurrency control, serializability.

---

## 📐 Key Formulas / Facts

### Relational Algebra Operators
- Select $\sigma$, Project $\pi$, Union $\cup$, Set difference $-$, Cartesian product $\times$, Rename $\rho$, Join $\bowtie$.

### Normal Forms
- **1NF**: atomic values.
- **2NF**: 1NF + no partial dependency (non-prime → part of candidate key).
- **3NF**: 2NF + no transitive dependency (non-prime → non-prime).
- **BCNF**: for every FD $X \to Y$, $X$ is a superkey.

### B+ Tree
- Order $p$: internal node has $p-1$ to $2p-1$ keys (or similar), all leaves at same level.
- Height $\approx \log_p(\text{records})$.

### Transactions
- ACID: Atomicity, Consistency, Isolation, Durability.
- Serializability: conflict & view serializable.

---

## ✍️ Worked Examples

**Example 1 (Normalization):** Relation R(A,B,C) with FD $A \to B$, $B \to C$. Candidate key = A.

| Normal Form | Check | Result |
|-------------|-------|--------|
| 1NF | Atomic values | ✅ |
| 2NF | No partial dependency | ✅ |
| 3NF | $B \to C$ transitive (non-prime → non-prime) | ❌ **Fails** |

→ R is in **2NF** but not 3NF.

**Example 2 (Relational algebra):** Find names of employees in dept 'CS':
- $\pi_{\text{name}}(\sigma_{\text{dept}='CS'}(\text{Employee}))$.

**Example 3 (B+ tree):** Order 3 B+ tree with keys 10, 20, 30, 40 — all leaves linked.

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 2 marks):** A relation is in BCNF if for every FD $X \to Y$:
- **Answer:** $X$ is a superkey.

**Q2 (GATE 2020, 1 mark):** Which normal form removes transitive dependencies?
- **Answer:** 3NF.

**Q3 (GATE 2019, 2 marks):** The number of tuples in the natural join of two relations with $m$ and $n$ tuples is:
- **Answer:** between 0 and $m \times n$ (depends on matching).

**Q4 (GATE 2018, 2 marks):** In a B+ tree of order $p$, the maximum number of children of an internal node is:
- **Answer:** $2p$ (or $p$ depending on convention — GATE uses order as max children/2).

**Q5 (GATE 2017, 1 mark):** The isolation property of ACID ensures:
- **Answer:** concurrent transactions don't interfere.

---

## 📚 Deep Dive

- [Databases — Deep Dive](../_deep_dives/databases_deep.md) — FD closure, normalization algorithms, B+ tree operations, concurrency protocols, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Requires [Discrete Math — Sets, Relations](../01_Engineering_Math/discrete_math.md).
- Indexing relates to [Data Structures — trees](../04_Programming_Data_Structures/data_structures.md).
- Transactions relate to [OS — synchronization](../08_Operating_Systems/os.md).