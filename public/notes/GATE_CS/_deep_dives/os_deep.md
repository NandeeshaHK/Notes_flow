# Operating Systems — Deep Dive

> In-depth reference for [Operating Systems](../08_Operating_Systems/os.md). Scheduling proofs, Banker's algorithm, page replacement analysis, and extended PYQs.

---

## 1. Processes & Threads

### Process States
- New → Ready → Running → Waiting → Terminated.
- Context switch: save/restore PCB.

### Threads
- Lightweight, share address space.
- User-level vs kernel-level threads.

---

## 2. CPU Scheduling

### Algorithms
- **FCFS**: non-preemptive, convoy effect.
- **SJF**: minimizes average waiting time (optimal for non-preemptive).
- **SRTF**: preemptive SJF.
- **Round Robin**: time quantum, preemptive, good response time.
- **Priority**: can starve.

### Formulas
- Turnaround $= \text{completion} - \text{arrival}$
- Waiting $= \text{turnaround} - \text{burst}$
- Response $= \text{first response} - \text{arrival}$

### 2.1 Worked Example — SJF (Gantt Chart)

**Given:** Processes P1(6), P2(8), P3(7), P4(3) — all arrive at time 0.

**Execution order** (shortest burst first): P4 → P1 → P3 → P2

**Gantt chart:**

| P4 | P1 | P3 | P2 |
|----|----|----|----|
| 0–3 | 3–9 | 9–16 | 16–24 |

**Completion / Turnaround / Waiting table:**

| Process | Burst | Completion | Turnaround | Waiting |
|---------|-------|-----------|------------|---------|
| P4 | 3 | 3 | 3 | 0 |
| P1 | 6 | 9 | 9 | 3 |
| P3 | 7 | 16 | 16 | 9 |
| P2 | 8 | 24 | 24 | 16 |

- Avg turnaround $= \frac{3+9+16+24}{4} = 13$
- Avg waiting $= \frac{0+3+9+16}{4} = 7$

### 2.2 Worked Example — Round Robin (q = 2)

**Given:** P1(5), P2(3), P3(2) — all arrive at 0.

**Gantt chart** (each process runs up to 2 units, then cycles):

| P1 | P2 | P3 | P1 | P2 | P1 |
|----|----|----|----|----|----|
| 0–2 | 2–4 | 4–6 | 6–8 | 8–9 | 9–10 |

**Completion / Turnaround / Waiting table:**

| Process | Burst | Completion | Turnaround | Waiting |
|---------|-------|-----------|------------|---------|
| P1 | 5 | 10 | 10 | 5 |
| P2 | 3 | 9 | 9 | 6 |
| P3 | 2 | 6 | 6 | 4 |

- Avg waiting $= \frac{5+6+4}{3} = 5$

> 💡 **Tip:** For Round Robin, draw the Gantt chart first, then read completion times directly from it.

---

## 3. Synchronization

### Semaphores
- Counting and binary (mutex).
- Wait (P) and Signal (V) operations.

### Classical Problems
- Producer-Consumer.
- Readers-Writers.
- Dining Philosophers.

### Monitors
- High-level synchronization with condition variables.

---

## 4. Deadlocks

### 4 Conditions
1. Mutual exclusion
2. Hold and wait
3. No preemption
4. Circular wait

### Handling
- **Prevention**: break one condition.
- **Avoidance**: Banker's algorithm (safe state).
- **Detection**: wait-for graph, cycle detection.
- **Recovery**: kill process, rollback.

---

## 5. Memory Management

### Paging
- Fixed-size pages/frames.
- Page table maps virtual → physical.
- TLB speeds up translation.

### Segmentation
- Variable-size segments.
- Segment table.

### Virtual Memory
- Demand paging, page faults.
- Page replacement: FIFO, LRU, Optimal.

### Page Replacement
- **FIFO**: Belady's anomaly possible.
- **LRU**: good locality, hardware cost.
- **Optimal**: best but not implementable.

### 5.1 Worked Example — FIFO Page Replacement (Frame Table)

**Given:** Reference string `1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5`, 3 frames.

**Simulation table** (F = page fault, H = hit):

| Ref | 1 | 2 | 3 | 4 | 1 | 2 | 5 | 1 | 2 | 3 | 4 | 5 |
|-----|---|---|---|---|---|---|---|---|---|---|---|---|
| F1 | 1 | 1 | 1 | 4 | 4 | 4 | 4 | 4 | 4 | 3 | 3 | 3 |
| F2 |   | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 4 | 4 |
| F3 |   |   | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 2 | 5 |
| Result | F | F | F | F | F | F | F | H | H | F | F | F |

**Total page faults = 10.**

> 💡 **FIFO rule:** When a fault occurs, replace the page that has been in memory **longest** (the oldest). Here the oldest page is evicted in order 1→2→3→4→1→2→5...

### 5.2 Worked Example — LRU Page Replacement (Frame Table)

**Given:** Same reference string, 3 frames.

**Simulation table:**

| Ref | 1 | 2 | 3 | 4 | 1 | 2 | 5 | 1 | 2 | 3 | 4 | 5 |
|-----|---|---|---|---|---|---|---|---|---|---|---|---|
| F1 | 1 | 1 | 1 | 4 | 4 | 4 | 5 | 5 | 5 | 3 | 3 | 3 |
| F2 |   | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 4 | 4 |
| F3 |   |   | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 2 | 5 |
| Result | F | F | F | F | F | F | F | H | H | F | F | F |

**Total page faults = 10.**

> 💡 **LRU rule:** When a fault occurs, replace the page that was **least recently used**. Compare with FIFO — the eviction order differs, which can change the fault count.

### 5.3 Worked Example — Optimal Page Replacement (Frame Table)

**Given:** Same reference string, 3 frames.

**Simulation table:**

| Ref | 1 | 2 | 3 | 4 | 1 | 2 | 5 | 1 | 2 | 3 | 4 | 5 |
|-----|---|---|---|---|---|---|---|---|---|---|---|---|
| F1 | 1 | 1 | 1 | 1 | 1 | 1 | 5 | 5 | 5 | 5 | 4 | 4 |
| F2 |   | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 |
| F3 |   |   | 3 | 4 | 4 | 4 | 4 | 4 | 4 | 3 | 3 | 5 |
| Result | F | F | F | F | H | H | F | H | H | F | F | F |

**Total page faults = 9** (minimum possible).

> 💡 **Optimal rule:** When a fault occurs, replace the page that will **not be used for the longest time in the future**. This gives the theoretical minimum faults but requires future knowledge, so it's not implementable in practice.

---

## 6. File Systems

- Allocation: contiguous, linked, indexed.
- Directories: single-level, two-level, tree.
- Free space: bit vector, linked list.

---

## 7. Extended PYQs

**Q6 (GATE 2016, 2 marks):** The Banker's algorithm requires how many resources to be known in advance?
- **Answer:** maximum claim of each process.

**Q7 (GATE 2015, 2 marks):** LRU page replacement with 3 frames, reference string 1,2,3,4,1,2,5,1,2,3,4,5 — number of faults:
- **Answer:** 10 (compute via simulation).

**Q8 (GATE 2014, 1 mark):** A binary semaphore is used for:
- **Answer:** mutual exclusion.

---

## 8. References

- Silberschatz, Galvin, Gagne — *Operating System Concepts*
- NPTEL: Operating Systems (IIT)
- Previous GATE papers