# Data Structures — Deep Dive

> In-depth reference for [Data Structures](../04_Programming_Data_Structures/data_structures.md). Balanced trees, heap operations, graph representations, and extended PYQs.

---

## 1. Linear Structures

### Stack
- LIFO. Operations: push, pop, peek.
- Applications: expression evaluation, function calls, undo.

### Queue
- FIFO. Operations: enqueue, dequeue.
- Circular queue avoids wasted space.

### Linked List
- Singly, doubly, circular.
- Insert/delete at head: O(1).
- Traversal: O(n).

---

## 2. Trees

### Binary Tree
- Full: every node has 0 or 2 children.
- Complete: all levels full except possibly last.
- Perfect: all leaves at same level.

### BST
- Left < root < right.
- Inorder traversal → sorted.
- Search/insert/delete: O(h).

### Balanced Trees
- AVL: height-balanced, rotations.
- Red-Black: color-based balancing.
- B-tree / B+ tree: multi-way (used in DB).

### Heap
- Max-heap: parent ≥ children.
- Min-heap: parent ≤ children.
- Build heap: O(n).
- Heapify: O(log n).

#### 2.1 Worked Example — Tree Traversals (Table)

**Given tree:**

```
        A
       / \
      B   C
     / \   \
    D   E   F
```

**Traversal results:**

| Traversal | Order | Sequence |
|-----------|-------|----------|
| Preorder | root → left → right | A, B, D, E, C, F |
| Inorder | left → root → right | D, B, E, A, C, F |
| Postorder | left → right → root | D, E, B, F, C, A |
| Level order | BFS | A, B, C, D, E, F |

> 💡 **GATE trap:** Given any two traversals (one must be inorder), you can reconstruct the tree. Preorder + inorder is the most common combination.

---

## 3. Graphs

### Representations
- **Adjacency matrix**: O(V²) space, O(1) edge check.
- **Adjacency list**: O(V+E) space, efficient for sparse.

### Traversals
- BFS: queue, level order, shortest path (unweighted).
- DFS: stack/recursion, topological sort, cycle detection.

---

## 4. Extended PYQs

**Q6 (GATE 2016, 2 marks):** The height of a complete binary tree with $n$ nodes is:
- **Answer:** $\lfloor \log_2 n \rfloor$.

**Q7 (GATE 2015, 2 marks):** In an AVL tree, the maximum difference in height of left and right subtrees is:
- **Answer:** 1.

**Q8 (GATE 2014, 1 mark):** The space complexity of an adjacency matrix for a graph with $V$ vertices is:
- **Answer:** $O(V^2)$.

---

## 5. References

- Cormen et al. — *Introduction to Algorithms* (CLRS)
- NPTEL: Data Structures (IIT)
- Previous GATE papers