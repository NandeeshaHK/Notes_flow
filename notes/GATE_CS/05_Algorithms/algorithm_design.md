# Algorithm Design Techniques

> **Syllabus:** Greedy, Dynamic Programming, Divide-and-Conquer; Graph traversals, Minimum spanning trees, Shortest paths.
> Revision sheet — focus on technique identification and GATE traps.

---

## TL;DR / Key Concepts

- **Divide-and-Conquer**: divide, conquer, combine (Merge sort, Quick sort, Binary search).
- **Greedy**: local optimal choice (Huffman, Fractional knapsack, MST, Dijkstra).
- **Dynamic Programming**: overlapping subproblems, optimal substructure (0/1 knapsack, LCS, matrix chain).
- **Graph traversals**: BFS, DFS.
- **MST**: Kruskal, Prim.
- **Shortest paths**: Dijkstra, Bellman-Ford, Floyd-Warshall.

---

## 📐 Key Formulas / Complexities

### Graph Traversals
- BFS: $O(V + E)$ — shortest path in unweighted graphs
- DFS: $O(V + E)$ — cycle detection, topological sort

### MST
- Kruskal: $O(E \log E)$ — sort edges, union-find
- Prim: $O(E \log V)$ with binary heap

### Shortest Paths
- Dijkstra: $O((V+E)\log V)$ — no negative edges
- Bellman-Ford: $O(VE)$ — handles negative edges, detects negative cycles
- Floyd-Warshall: $O(V^3)$ — all pairs

### DP Recurrences
- LCS: $L(i,j) = \begin{cases} 0 & \text{if } i=0 \text{ or } j=0 \\ L(i-1,j-1)+1 & \text{if } x_i = y_j \\ \max(L(i-1,j), L(i,j-1)) & \text{otherwise} \end{cases}$
- 0/1 Knapsack: $K(i,w) = \max(K(i-1,w), \; v_i + K(i-1, w - w_i))$

---

## ✍️ Worked Examples

**Example 1 (Greedy vs DP):** Fractional knapsack → greedy (sort by value/weight). 0/1 knapsack → DP.

**Example 2 (Dijkstra):** Shortest path from A in graph with edges A-B(4), A-C(2), B-C(1), B-D(5), C-D(8):
- A→C=2, A→B=3 (via C), A→D=8 (via B). Shortest A→D = 8.

**Example 3 (MST Kruskal):** Sort edges by weight, add if no cycle.

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 2 marks):** Which algorithm uses the greedy approach?
- (A) LCS (B) 0/1 Knapsack (C) Huffman coding (D) Matrix chain
- **Answer: (C)** Huffman coding.

**Q2 (GATE 2020, 2 marks):** Dijkstra's algorithm fails when the graph has:
- **Answer:** negative weight edges.

**Q3 (GATE 2019, 2 marks):** The time complexity of Floyd-Warshall for $V$ vertices is:
- **Answer:** $O(V^3)$.

**Q4 (GATE 2018, 2 marks):** Kruskal's algorithm uses which data structure for cycle detection?
- **Answer:** Union-Find (disjoint set).

**Q5 (GATE 2017, 2 marks):** The number of edges in a minimum spanning tree of a graph with $V$ vertices is:
- **Answer:** $V - 1$.

---

## 📚 Deep Dive

- [Algorithm Design — Deep Dive](../_deep_dives/algorithm_design_deep.md) — DP table construction, MST proofs, shortest path correctness, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Requires [Algorithms](../05_Algorithms/algorithms.md) and [Data Structures](../04_Programming_Data_Structures/data_structures.md).
- Graph theory from [Discrete Math](../01_Engineering_Math/discrete_math.md).
- Used in [Networks — routing protocols](../10_Computer_Networks/networks.md).