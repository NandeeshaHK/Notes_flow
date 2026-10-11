# Databases — Deep Dive

> In-depth reference for [Databases](../09_Databases/databases.md). FD closure, normalization algorithms, B+ tree operations, concurrency protocols, and extended PYQs.

---

## 1. Relational Model & Algebra

### Relational Algebra Operators
- Select $\sigma$, Project $\pi$, Union $\cup$, Set difference $-$, Cartesian product $\times$, Rename $\rho$, Join $\bowtie$.
- Derived: intersection, division, natural join.

### Tuple Relational Calculus
- Declarative: $\{t \mid \text{condition}\}$.

### SQL
- DDL: CREATE, ALTER, DROP.
- DML: SELECT, INSERT, UPDATE, DELETE.
- Aggregates: COUNT, SUM, AVG, MIN, MAX.
- GROUP BY, HAVING, ORDER BY.

---

## 2. Functional Dependencies & Normalization

### FD Closure
- Closure of attribute set $X^+$: all attributes derivable from $X$.
- Armstrong's axioms: reflexivity, augmentation, transitivity.

### Candidate Keys
- Minimal superkey.
- Find via attribute closure.

### Normal Forms
- **1NF**: atomic values.
- **2NF**: 1NF + no partial dependency.
- **3NF**: 2NF + no transitive dependency.
- **BCNF**: every FD $X \to Y$ has $X$ as superkey.

#### 2.1 Normalization Decision Table

| Normal Form | Removes | Violation condition | Example violation |
|-------------|---------|--------------------|--------------------|
| 1NF | Non-atomic values | A column holds multiple values | Phone = "123, 456" |
| 2NF | Partial dependency | Non-prime attr depends on part of candidate key | (A,B)→C, B→D |
| 3NF | Transitive dependency | Non-prime attr depends on non-prime attr | A→B, B→C |
| BCNF | All FDs with non-superkey LHS | Every FD $X \to Y$ has $X$ as superkey | A→B where A not superkey |

#### 2.2 Worked Example — Normalization

**Given:** R(A, B, C, D) with FDs $A \to B$, $B \to C$, $C \to D$. Candidate key = **A**.

**Check each normal form:**

| Normal Form | Check | Result |
|-------------|-------|--------|
| 1NF | All attributes atomic | ✅ Passes |
| 2NF | No partial dependency (single-attr key, so none) | ✅ Passes |
| 3NF | $B \to C$ and $C \to D$ are transitive (non-prime → non-prime) | ❌ **Fails** |
| BCNF | $B \to C$: B is not a superkey | ❌ Fails |

**Conclusion:** R is in **2NF** but not 3NF.

### Decomposition
- Lossless join decomposition.
- Dependency preservation.

---

## 3. Indexing

### B-Tree
- Multi-way search tree.
- All leaves at same level.
- Internal nodes hold keys + pointers.

### B+ Tree
- Data only in leaves.
- Leaves linked for range queries.
- Internal nodes hold keys for routing.

### Operations
- Search: O(log n).
- Insert/delete: may split/merge nodes.

#### 3.1 B+ Tree Structure (Order 3)

A B+ tree of order 3 (max 2 keys per node, max 3 children):

```
            [ 20 | 40 ]
           /     |      \
      [10|15]  [25|30]  [50|60]
        |        |        |
      (data)   (data)   (data)
        └────────┴────────┘   ← leaf nodes linked
```

**Key facts:**
- **Internal nodes** hold only keys (routing) — no data.
- **Leaf nodes** hold all data records and are **linked** for range queries.
- All leaves at the **same level** (balanced).
- Search: start at root, follow pointers based on key comparison.

#### 3.2 B-Tree vs B+ Tree Comparison Table

| Feature | B-Tree | B+ Tree |
|---------|--------|---------|
| Data location | Internal + leaf nodes | Leaf nodes only |
| Leaf linking | No | Yes (linked list) |
| Range queries | Slow (multiple traversals) | Fast (follow leaf links) |
| Height | Taller (more data per node) | Shorter (keys only in internal) |
| DB usage | Less common | **Preferred** for indexing |

---

## 4. Transactions & Concurrency

### ACID
- Atomicity, Consistency, Isolation, Durability.

### Serializability
- **Conflict serializable**: no conflicting operations in different order.
- **View serializable**: same view as serial schedule.

### Concurrency Control
- **Locking**: shared/exclusive locks, 2PL.
- **Timestamp ordering**: assign timestamps.
- **Optimistic**: validate at commit.

### Recovery
- Log-based, checkpoints, undo/redo.

---

## 5. Extended PYQs

**Q6 (GATE 2016, 2 marks):** A relation R(A,B,C,D) with FDs $A \to B$, $B \to C$, $C \to D$. Candidate key is:
- **Answer:** A (A determines all).

**Q7 (GATE 2015, 2 marks):** In a B+ tree of order $p$, the minimum number of keys in a non-root internal node is:
- **Answer:** $p - 1$ (or $\lceil p/2 \rceil - 1$ depending on convention).

**Q8 (GATE 2014, 1 mark):** Two-phase locking ensures:
- **Answer:** conflict serializability.

---

## 6. References

- Elmasri & Navathe — *Fundamentals of Database Systems*
- Korth, Silberschatz, Sudarshan — *Database System Concepts*
- NPTEL: Database Management Systems (IIT)
- Previous GATE papers