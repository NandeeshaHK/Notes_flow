# Algorithms

> **Syllabus:** Search, sort, time/space complexity, basic graph algorithms.
> Revision sheet — focus on complexity and GATE traps.

> **Note:** Algorithms are covered in depth in the [GATE_CS Algorithms](../../GATE_CS/05_Algorithms/algorithms.md) and [GATE_CS Algorithm Design](../../GATE_CS/05_Algorithms/algorithm_design.md) notes. This sheet cross-references that content and keeps the DA-relevant essentials.

---

## TL;DR / Key Concepts

- **Searching**: linear, binary search.
- **Sorting**: comparison-based (bubble, insertion, selection, merge, quick, heap) and non-comparison (counting, radix).
- **Complexity**: Big-O, time & space.
- **Graph algorithms**: BFS, DFS, shortest path (Dijkstra), MST (Prim, Kruskal).

```mermaid
flowchart TD
    A[Sorting Algorithm] --> B{Data size?}
    B -->|Small| C[Insertion / Bubble<br/>O(n²)]
    B -->|Large| D{Stable needed?}
    D -->|Yes| E[Merge Sort<br/>O(n log n)]
    D -->|No| F[Quick Sort<br/>O(n log n) avg]
    B -->|Nearly sorted| G[Insertion Sort<br/>O(n)]
    B -->|Integers in range| H[Counting / Radix<br/>O(n+k)]
```

### Graph Algorithms
| Algorithm | Purpose | Complexity | Data Structure |
|-----------|---------|------------|----------------|
| **BFS** | Shortest path (unweighted) | $O(V+E)$ | Queue |
| **DFS** | Connectivity, cycles | $O(V+E)$ | Stack / recursion |
| **Dijkstra** | Shortest path (non-negative) | $O((V+E)\log V)$ | Priority queue |
| **Prim** | MST | $O(E\log V)$ | Priority queue |
| **Kruskal** | MST | $O(E\log V)$ | Union-Find |

### Searching
| Algorithm | Requirement | Complexity |
|-----------|-------------|------------|
| **Linear search** | None | $O(n)$ |
| **Binary search** | Sorted array | $O(\log n)$ |

---

## 🎭 Story / Intuition

**The phone book story (binary search).** Imagine looking up "Smith" in a **phone book** (sorted alphabetically). You don't start at page 1 and flip through every page — you open to the **middle**, see you're past "S", then search the *first half*, open its middle, and repeat. Each step **halves** the remaining pages. With 1000 pages, you find the name in about **10 steps** ($\log_2 1000 \approx 10$) instead of 1000. That's **binary search** — $O(\log n)$. The catch: the data must be **sorted** first. If the phone book were unsorted, you'd be stuck with linear search ($O(n)$).

**The card-sorting story (sorting algorithms).** Imagine sorting a hand of playing cards:
- **Insertion sort**: pick up cards one by one and insert each into its correct position in your hand — great when the hand is *nearly sorted* ($O(n)$ best case).
- **Merge sort**: split the deck in half, sort each half, then merge — always $O(n\log n)$, like a divide-and-conquer tournament.
- **Quick sort**: pick a "pivot" card, put smaller cards on one side and larger on the other, then recurse — fast on average ($O(n\log n)$) but can degrade to $O(n^2)$ if you pick a bad pivot (like always picking the smallest card).

**The GPS navigation story (graph algorithms).** A **graph** is a map of cities (nodes) and roads (edges). **BFS** finds the fewest *roads* to a destination (like counting stops on a metro line). **Dijkstra** finds the *shortest total distance* when roads have different lengths (like a GPS computing the fastest route). **Prim/Kruskal** find the *minimum spanning tree* — the cheapest set of roads to connect all cities (like a telecom company laying the least cable to connect every town).

---

## 📐 Key Formulas / Complexities

### Sorting Complexities
| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Insertion | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Selection | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Merge | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(n)$ |
| Quick | $O(n\log n)$ | $O(n\log n)$ | $O(n^2)$ | $O(\log n)$ |
| Heap | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(1)$ |

### Searching
- Linear search: $O(n)$.
- Binary search (sorted array): $O(\log n)$.

### Graph Algorithms
- BFS/DFS: $O(V + E)$.
- Dijkstra (with binary heap): $O((V+E)\log V)$.
- Prim/Kruskal (MST): $O(E \log V)$.

---

## ✍️ Worked Examples

**Example 1 (Binary search):** Search for 7 in `[1,3,5,7,9]`:
- Mid = 5 → 7 > 5, search right half `[7,9]`; mid = 7 → found. **3 comparisons**.

**Example 2 (Merge sort):** Merge sort of `[3,1,2]`:
- Split → `[3]`,`[1,2]` → `[1,2]` → merge → `[1,2,3]`. Complexity $O(n\log n)$.

**Example 3 (Dijkstra):** Shortest path from A in a graph with non-negative weights uses:
- **Answer:** greedy + priority queue; fails with negative weights (use Bellman-Ford).

---

## 🎯 GATE PYQs

**Q1 (GATE DA 2024, 2 marks):** The worst-case time complexity of quicksort is:
- **Answer:** $O(n^2)$.

**Q2 (GATE DA 2024, 2 marks):** Binary search on a sorted array of $n$ elements has time complexity:
- **Answer:** $O(\log n)$.

**Q3 (GATE DA 2025, 2 marks):** Which sorting algorithm has the best worst-case time complexity?
- (A) Bubble (B) Insertion (C) Merge (D) Quick
- **Answer: (C)** — Merge sort is $O(n\log n)$ worst case.

**Q4 (GATE DA 2025, 2 marks):** Dijkstra's algorithm fails when the graph has:
- **Answer:** negative edge weights.

**Q5 (GATE DA 2026, 2 marks):** The time complexity of BFS on a graph with $V$ vertices and $E$ edges is:
- **Answer:** $O(V + E)$.

---

## 📚 Deep Dive

- [GATE_CS Algorithms — Deep Dive](../../GATE_CS/_deep_dives/algorithms_deep.md) — advanced sorting, hashing, more PYQs.
- [GATE_CS Algorithm Design — Deep Dive](../../GATE_CS/_deep_dives/algorithm_design_deep.md) — greedy, DP, divide-and-conquer.

---

## 🔗 Prerequisites / Cross-References

- Requires [Data Structures](data_structures.md).
- Used in [AI Search](../07_Artificial_Intelligence/ai_search.md) (graph search) and [Machine Learning](../06_Machine_Learning/supervised_learning.md) (K-NN, decision trees).