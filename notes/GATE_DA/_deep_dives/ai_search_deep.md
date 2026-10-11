# AI Search — Deep Dive

> In-depth reference for [AI Search](../07_Artificial_Intelligence/ai_search.md). Heuristic design, A* proof, game trees, and extended PYQs.

---

## 1. Uninformed Search

### BFS
- Queue-based; explores level by level.
- Complete & optimal (unit cost); time/space $O(b^d)$.

### DFS
- Stack-based; explores one branch fully.
- Not complete (infinite graphs); not optimal; space $O(bm)$.

### Uniform-Cost Search
- Expands node with lowest path cost $g(n)$.
- Complete & optimal for non-negative costs.

### Iterative Deepening DFS
- Repeated DFS with increasing depth limit.
- Complete & optimal; space $O(bd)$.

---

## 2. Informed Search

### Greedy Best-First
- Expands node with smallest $h(n)$.
- Fast but **not optimal** (can get stuck).

### A* Search
- $f(n) = g(n) + h(n)$.
- **Admissible** heuristic: $h(n) \le h^*(n)$ (never overestimates).
- **Consistent** heuristic: $h(n) \le c(n, n') + h(n')$.
- A* is **complete and optimal** if $h$ is admissible (tree search) or consistent (graph search).

---

## 3. Adversarial Search

### Minimax
- MAX and MIN alternate turns.
- $V(s) = \max_{a} V(\text{result}(s,a))$ for MAX; $\min$ for MIN.
- Optimal for deterministic, perfect-information games.

### Alpha-Beta Pruning
- Maintains $\alpha$ (best for MAX) and $\beta$ (best for MIN).
- Prunes branches where $\beta \le \alpha$.
- Best case: $O(b^{d/2})$ vs minimax $O(b^d)$.

---

## 4. Extended PYQs

**Q6 (GATE DA 2024, 2 marks):** Uniform-cost search is a special case of A* with:
- **Answer:** $h(n) = 0$ for all nodes.

**Q7 (GATE DA 2025, 2 marks):** A heuristic that never overestimates the true cost is called:
- **Answer:** admissible.

**Q8 (GATE DA 2026, 2 marks):** In the worst case, alpha-beta pruning has the same complexity as:
- **Answer:** minimax ($O(b^d)$).

---

## 5. References

- Russell & Norvig — *Artificial Intelligence: A Modern Approach*
- NPTEL: Introduction to Artificial Intelligence (IIT)
- Previous GATE DA papers