# Algorithms — Deep Dive

> In-depth reference for [Algorithms](../05_Algorithms/algorithms.md). Sorting proofs, hashing analysis, complexity master theorem, and extended PYQs.

---

## 1. Asymptotic Analysis

### Master Theorem
For $T(n) = aT(n/b) + f(n)$:
- If $f(n) = O(n^{\log_b a - \epsilon})$: $T(n) = \Theta(n^{\log_b a})$
- If $f(n) = \Theta(n^{\log_b a})$: $T(n) = \Theta(n^{\log_b a} \log n)$
- If $f(n) = \Omega(n^{\log_b a + \epsilon})$ and $af(n/b) \le cf(n)$: $T(n) = \Theta(f(n))$

### Examples
- Merge sort: $T(n) = 2T(n/2) + n$ → $\Theta(n \log n)$
- Binary search: $T(n) = T(n/2) + 1$ → $\Theta(\log n)$

---

## 2. Sorting — Detailed

### Comparison Sorts (lower bound $\Omega(n \log n)$)
- **Merge sort**: divide & conquer, stable, O(n) space.
- **Quick sort**: partition-based, in-place, worst O(n²).
- **Heap sort**: heap-based, in-place, O(n log n).
- **Insertion sort**: good for small/nearly sorted.

### Non-comparison Sorts
- **Counting sort**: O(n+k), requires small range.
- **Radix sort**: O(d(n+k)), digit by digit.
- **Bucket sort**: O(n) average.

#### 2.1 Worked Example — Insertion Sort Trace Table

**Given:** Array `[5, 2, 4, 6, 1, 3]`.

| Pass | Array state | Action |
|------|-------------|--------|
| Start | [**5**, 2, 4, 6, 1, 3] | — |
| 1 | [**2, 5**, 4, 6, 1, 3] | Insert 2 before 5 |
| 2 | [**2, 4, 5**, 6, 1, 3] | Insert 4 before 5 |
| 3 | [**2, 4, 5, 6**, 1, 3] | 6 already in place |
| 4 | [**1, 2, 4, 5, 6**, 3] | Insert 1 at front |
| 5 | [**1, 2, 3, 4, 5, 6**] | Insert 3 before 4 |

**Sorted:** `[1, 2, 3, 4, 5, 6]`

> 💡 **Insertion sort** builds the sorted array one element at a time, inserting each new element into its correct position among the already-sorted prefix.

#### 2.2 Worked Example — Quick Sort Partition Trace

**Given:** Array `[10, 7, 8, 9, 1, 5]`, pivot = last element (5).

**Partition step** (elements < pivot left, > pivot right):

| Step | Array state | Note |
|------|-------------|------|
| Start | [10, 7, 8, 9, 1, **5**] | pivot = 5 |
| After partition | [**1**, 7, 8, 9, **10**, **5**] | 1 < 5 moved left |
| Pivot placed | [1, **5**, 8, 9, 10, 7] | 5 in final position |

**Recurse** on left `[1]` and right `[8, 9, 10, 7]` → eventually sorted.

> 💡 **Quick sort** places the pivot in its final position each partition, then recurses on the two halves.

---

## 3. Hashing

### Hash Functions
- Division: $h(k) = k \bmod m$.
- Multiplication: $h(k) = \lfloor m(kA \bmod 1) \rfloor$.

### Collision Resolution
- **Chaining**: linked list per slot.
- **Open addressing**: linear probing, quadratic probing, double hashing.

### Analysis
- Load factor $\alpha = n/m$.
- Chaining search: $O(1 + \alpha)$.
- Open addressing: $\frac{1}{1-\alpha}$ probes (approx).

#### 3.1 Worked Example — Hashing with Chaining (Table)

**Given:** Keys `{12, 44, 13, 88, 23, 94, 11, 39, 20, 16}`, hash function $h(k) = k \bmod 10$.

**Hash table (chaining):**

| Slot | Chain |
|------|-------|
| 0 | 20 |
| 1 | 11 |
| 2 | 12 |
| 3 | 13, 23 |
| 4 | 44, 94 |
| 5 | — |
| 6 | 16 |
| 7 | — |
| 8 | 88 |
| 9 | 39 |

> 💡 **Chaining:** Colliding keys (same slot) are stored in a linked list. Here 13 and 23 both hash to slot 3; 44 and 94 both hash to slot 4. Load factor $\alpha = 10/10 = 1$.

---

## 4. Extended PYQs

**Q6 (GATE 2016, 2 marks):** The recurrence $T(n) = 2T(n/2) + n$ solves to:
- **Answer:** $\Theta(n \log n)$.

**Q7 (GATE 2015, 2 marks):** Which sort is not comparison-based?
- **Answer:** Counting sort (or Radix).

**Q8 (GATE 2014, 1 mark):** The lower bound for comparison-based sorting is:
- **Answer:** $\Omega(n \log n)$.

---

## 5. References

- Cormen et al. — *Introduction to Algorithms* (CLRS)
- NPTEL: Design & Analysis of Algorithms (IIT)
- Previous GATE papers