# Algorithms

> **Syllabus:** Searching, sorting, hashing; Asymptotic worst-case time and space complexity.
> Revision sheet — focus on complexity analysis and GATE traps.

---

## TL;DR / Key Concepts

- **Asymptotic notation**: Big-O, Big-Ω, Big-Θ.
- **Searching**: Linear, binary search.
- **Sorting**: Comparison-based and non-comparison sorts, stability, in-place.
- **Hashing**: Hash functions, collision resolution, load factor.

---

## 📐 Key Formulas

### Asymptotic Notation
- $f(n) = O(g(n))$: $f$ grows no faster than $g$ (upper bound)
- $f(n) = \Omega(g(n))$: $f$ grows at least as fast as $g$ (lower bound)
- $f(n) = \Theta(g(n))$: both $O$ and $\Omega$

### Sorting Complexities
| Sort | Best | Average | Worst | Stable | In-place |
|------|------|---------|-------|--------|----------|
| Bubble | O(n) | O(n²) | O(n²) | Yes | Yes |
| Selection | O(n²) | O(n²) | O(n²) | No | Yes |
| Insertion | O(n) | O(n²) | O(n²) | Yes | Yes |
| Merge | O(n log n) | O(n log n) | O(n log n) | Yes | No |
| Quick | O(n log n) | O(n log n) | O(n²) | No | Yes |
| Heap | O(n log n) | O(n log n) | O(n log n) | No | Yes |

### Non-comparison Sorts
- Counting sort: $O(n + k)$
- Radix sort: $O(d(n + k))$
- Bucket sort: $O(n)$ average

### Hashing
- Load factor $\alpha = \frac{n}{m}$ (items / slots)
- Collision resolution: chaining, open addressing (linear/quadratic probing, double hashing)

---

## ✍️ Worked Examples

**Example 1 (Binary search):** Search 7 in sorted [1,3,5,7,9]:
- mid=5, 7>5 → right half [7,9], mid=7 → found. 2 comparisons.

**Example 2 (Quick sort worst case):** Already sorted array with last-element pivot → $O(n^2)$.

**Example 3 (Merge sort):** Always $O(n \log n)$ regardless of input order.

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 1 mark):** The worst-case time complexity of quicksort is:
- **Answer:** $O(n^2)$.

**Q2 (GATE 2020, 2 marks):** Which sorting algorithm is stable?
- (A) Quick (B) Heap (C) Merge (D) Selection
- **Answer: (C)** Merge sort.

**Q3 (GATE 2019, 1 mark):** Binary search on a sorted array of $n$ elements requires at most:
- **Answer:** $\lceil \log_2(n+1) \rceil$ comparisons.

**Q4 (GATE 2018, 2 marks):** The number of comparisons in the worst case for merge sort on $n$ elements is:
- **Answer:** $O(n \log n)$.

**Q5 (GATE 2017, 1 mark):** The load factor of a hash table with 100 slots and 50 items is:
- **Answer:** $0.5$.

---

## 📚 Deep Dive

- [Algorithms — Deep Dive](../_deep_dives/algorithms_deep.md) — sorting proofs, hashing analysis, complexity master theorem, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Requires [Data Structures](../04_Programming_Data_Structures/data_structures.md).
- Foundation for [Algorithm Design](../05_Algorithms/algorithm_design.md).
- Sorting/heaps used in [Databases — indexing](../09_Databases/databases.md).