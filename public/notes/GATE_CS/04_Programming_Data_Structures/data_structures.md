# Data Structures

> **Syllabus:** Arrays, Stacks, Queues, Linked Lists, Trees, Binary Search Trees, Binary Heaps, Graphs.
> Revision sheet — focus on operations, complexities, and GATE traps.

---

## TL;DR / Key Concepts

- **Arrays**: contiguous memory, O(1) access, O(n) insert/delete.
- **Stacks**: LIFO, push/pop O(1).
- **Queues**: FIFO, enqueue/dequeue O(1).
- **Linked Lists**: dynamic, O(n) access, O(1) insert/delete at head.
- **Trees**: binary trees, BST, heaps, traversals.
- **Graphs**: adjacency matrix/list, traversals.

---

## 📐 Key Formulas / Complexities

### Traversals
- Inorder: left → root → right
- Preorder: root → left → right
- Postorder: left → right → root
- Level order: BFS

### BST Properties
- Inorder traversal of BST gives **sorted order**.
- Search/insert/delete: $O(h)$, worst $O(n)$, best $O(\log n)$.

### Heap
- Binary heap: complete binary tree.
- Parent of $i$: $\lfloor (i-1)/2 \rfloor$; children: $2i+1$, $2i+2$.
- Insert/delete: $O(\log n)$.

### Complexity Table
| Structure | Access | Search | Insert | Delete |
|-----------|--------|--------|--------|--------|
| Array | O(1) | O(n) | O(n) | O(n) |
| Stack | O(n) | O(n) | O(1) | O(1) |
| Queue | O(n) | O(n) | O(1) | O(1) |
| Linked List | O(n) | O(n) | O(1) | O(1) |
| BST (avg) | O(log n) | O(log n) | O(log n) | O(log n) |
| Heap | O(n) | O(n) | O(log n) | O(log n) |

---

## ✍️ Worked Examples

**Example 1 (Stack):** Evaluate postfix `2 3 + 4 *`:
- Push 2, push 3, pop 3,2 → 2+3=5 push, push 4, pop 4,5 → 5*4=20. Result **20**.

**Example 2 (BST):** Inorder of BST with keys {5,3,7,2,4} is:
- **2, 3, 4, 5, 7** (sorted).

**Example 3 (Heap):** Insert 1 into max-heap {10, 8, 5}:
- Add 1 at end, bubble up if needed → {10, 8, 5, 1}.

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 1 mark):** The worst-case time complexity of searching in a BST with $n$ nodes is:
- **Answer:** $O(n)$ (skewed tree).

**Q2 (GATE 2020, 2 marks):** A stack is used to evaluate postfix `5 6 2 + * 12 4 / -`. The result is:
- **Answer:** $5 \times (6+2) - (12/4) = 40 - 3 = 37$.

**Q3 (GATE 2019, 1 mark):** The number of nodes in a full binary tree of height $h$ (root at height 0) is:
- **Answer:** $2^{h+1} - 1$.

**Q4 (GATE 2018, 2 marks):** In a max-heap with $n$ elements, the minimum element is at:
- **Answer:** one of the leaves (any leaf).

**Q5 (GATE 2017, 1 mark):** The time complexity of inserting into a binary heap is:
- **Answer:** $O(\log n)$.

---

## 📚 Deep Dive

- [Data Structures — Deep Dive](../_deep_dives/data_structures_deep.md) — balanced trees, heap operations, graph representations, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Requires [C Programming](../04_Programming_Data_Structures/c_programming.md).
- Foundation for [Algorithms](../05_Algorithms/algorithms.md) and [Algorithm Design](../05_Algorithms/algorithm_design.md).
- Trees/heaps used in [OS — scheduling](../08_Operating_Systems/os.md) and [Databases — B/B+ trees](../09_Databases/databases.md).