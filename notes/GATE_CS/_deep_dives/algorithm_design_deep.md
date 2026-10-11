# Algorithm Design — Deep Dive

> In-depth reference for [Algorithm Design](../05_Algorithms/algorithm_design.md). DP table construction, MST proofs, shortest path correctness, and extended PYQs.

---

## 1. Divide & Conquer

- Divide problem into subproblems, solve recursively, combine.
- Examples: Merge sort, Quick sort, Binary search, Strassen's matrix multiplication.

---

## 2. Greedy Algorithms

### Characteristics
- Make locally optimal choice at each step.
- Works when local optimum leads to global optimum (optimal substructure + greedy choice property).

### Examples
- **Huffman coding**: optimal prefix codes.
- **Fractional knapsack**: sort by value/weight.
- **Activity selection**: sort by finish time.
- **MST**: Kruskal, Prim.
- **Dijkstra**: shortest path (no negative edges).

---

## 3. Dynamic Programming

### Characteristics
- Optimal substructure + overlapping subproblems.
- Memoization (top-down) or tabulation (bottom-up).

### Classic Problems
- **0/1 Knapsack**: $K(i,w) = \max(K(i-1,w), v_i + K(i-1, w-w_i))$
- **LCS**: longest common subsequence.
- **Matrix chain multiplication**: optimal parenthesization.
- **Longest increasing subsequence**.
- **Edit distance**.

#### 3.1 Worked Example — 0/1 Knapsack DP Table

**Given:** Capacity $W = 5$. Items: (weight, value) = (2,3), (3,4), (4,5), (5,6).

**DP table** $K(i, w)$ = max value using first $i$ items with capacity $w$:

| i \ w | 0 | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 (w2,v3) | 0 | 0 | 3 | 3 | 3 | 3 |
| 2 (w3,v4) | 0 | 0 | 3 | 4 | 4 | 7 |
| 3 (w4,v5) | 0 | 0 | 3 | 4 | 5 | 7 |
| 4 (w5,v6) | 0 | 0 | 3 | 4 | 5 | 7 |

**Answer:** Max value $= K(4,5) = 7$ (take items 1 and 2: weight 2+3=5, value 3+4=7).

> 💡 **DP rule:** Fill row by row. $K(i,w) = \max(\text{skip item } i, \text{take item } i)$. The bottom-right cell is the answer.

---

## 4. Graph Algorithms

### BFS
- Queue-based, O(V+E).
- Shortest path in unweighted graphs.

### DFS
- Stack/recursion, O(V+E).
- Cycle detection, topological sort, connected components.

### MST
- **Kruskal**: sort edges, union-find. O(E log E).
- **Prim**: grow tree, priority queue. O(E log V).

### Shortest Paths
- **Dijkstra**: greedy, no negative edges. O((V+E) log V).
- **Bellman-Ford**: O(VE), handles negative edges, detects negative cycles.
- **Floyd-Warshall**: all pairs, O(V³).

#### 4.1 Worked Example — Dijkstra Step Table

**Given graph** (source = A):

```
A --4-- B
|       |
2       1
|       |
C --8-- D
```

**Dijkstra table** (distances to each vertex, ∞ = unreached):

| Step | Visited | A | B | C | D |
|------|---------|---|---|---|---|
| Init | — | 0 | ∞ | ∞ | ∞ |
| 1 | A | 0 | 4 | 2 | ∞ |
| 2 | A, C | 0 | 3 | 2 | 10 |
| 3 | A, C, B | 0 | 3 | 2 | 4 |
| 4 | A, C, B, D | 0 | 3 | 2 | 4 |

**Shortest paths from A:** B=3 (via C), C=2, D=4 (via B).

> 💡 **Dijkstra rule:** At each step, pick the unvisited vertex with the smallest distance, mark it visited, and relax its edges. Works only with non-negative weights.

---

## 5. Extended PYQs

**Q6 (GATE 2016, 2 marks):** The 0/1 knapsack problem is solved using:
- **Answer:** Dynamic programming.

**Q7 (GATE 2015, 2 marks):** Bellman-Ford detects negative cycles in:
- **Answer:** O(VE) time.

**Q8 (GATE 2014, 1 mark):** Prim's algorithm uses which data structure for efficiency?
- **Answer:** Priority queue (min-heap).

---

## 6. References

- Cormen et al. — *Introduction to Algorithms* (CLRS)
- NPTEL: Design & Analysis of Algorithms (IIT)
- Previous GATE papers