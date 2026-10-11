# Operating Systems

> **Syllabus:** System calls, processes, threads, CPU scheduling, memory management, virtual memory, file systems, deadlocks, synchronization.
> Revision sheet — focus on scheduling formulas and GATE traps.

---

## TL;DR / Key Concepts

- **Processes & threads**: PCB, context switch, process states.
- **CPU scheduling**: FCFS, SJF, Round Robin, Priority.
- **Synchronization**: semaphores, mutex, monitors, classical problems.
- **Deadlocks**: conditions, prevention, avoidance (Banker's), detection.
- **Memory management**: paging, segmentation, virtual memory, page replacement.
- **File systems**: allocation, directories, free space management.

---

## 📐 Key Formulas

### Scheduling
- Turnaround time $= \text{completion} - \text{arrival}$
- Waiting time $= \text{turnaround} - \text{burst}$
- Response time $= \text{first response} - \text{arrival}$

### Page Replacement
- FIFO, LRU, Optimal (Belady's anomaly: FIFO can have more faults with more frames).

### Virtual Memory
- Effective access time: $EAT = (1-p) \cdot T_m + p \cdot T_{page\_fault}$
- Page table size $= \text{entries} \times \text{entry size}$

### Deadlock
- 4 conditions: Mutual exclusion, Hold & wait, No preemption, Circular wait.

---

## ✍️ Worked Examples

**Example 1 (SJF):** Processes P1(6), P2(8), P3(7), P4(3) — all arrive at 0.

**Gantt chart:**

| P4 | P1 | P3 | P2 |
|----|----|----|----|
| 0–3 | 3–9 | 9–16 | 16–24 |

| Process | Burst | Completion | Turnaround | Waiting |
|---------|-------|-----------|------------|---------|
| P4 | 3 | 3 | 3 | 0 |
| P1 | 6 | 9 | 9 | 3 |
| P3 | 7 | 16 | 16 | 9 |
| P2 | 8 | 24 | 24 | 16 |

Avg waiting $= (0+3+9+16)/4 = 7$.

**Example 2 (Round Robin, q=2):** P1(5), P2(3), P3(2):

**Gantt chart:**

| P1 | P2 | P3 | P1 | P2 | P1 |
|----|----|----|----|----|----|
| 0–2 | 2–4 | 4–6 | 6–8 | 8–9 | 9–10 |

**Example 3 (Page replacement):** Reference string `1,2,3,4,1,2,5,1,2,3,4,5`, 3 frames, FIFO:

| Ref | 1 | 2 | 3 | 4 | 1 | 2 | 5 | 1 | 2 | 3 | 4 | 5 |
|-----|---|---|---|---|---|---|---|---|---|---|---|---|
| F1 | 1 | 1 | 1 | 4 | 4 | 4 | 4 | 4 | 4 | 3 | 3 | 3 |
| F2 |   | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 4 | 4 |
| F3 |   |   | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 2 | 5 |
| Result | F | F | F | F | F | F | F | H | H | F | F | F |

**Total page faults = 10** (F = fault, H = hit).

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 2 marks):** Round Robin with time quantum $q$ and $n$ processes, each with burst $t$. The average waiting time is:
- **Answer:** $\frac{(n-1)t}{2}$ (approx, when $t$ is multiple of $q$).

**Q2 (GATE 2020, 1 mark):** Which scheduling algorithm minimizes average waiting time?
- **Answer:** SJF (Shortest Job First).

**Q3 (GATE 2019, 2 marks):** The Banker's algorithm is used for:
- **Answer:** deadlock avoidance.

**Q4 (GATE 2018, 2 marks):** Belady's anomaly is associated with:
- **Answer:** FIFO page replacement.

**Q5 (GATE 2017, 1 mark):** A semaphore initialized to 1 is used for:
- **Answer:** mutual exclusion (binary semaphore).

---

## 📚 Deep Dive

- [Operating Systems — Deep Dive](../_deep_dives/os_deep.md) — scheduling proofs, Banker's algorithm, page replacement analysis, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Requires [Computer Organization](../03_Computer_Organization/computer_org.md) and [Data Structures](../04_Programming_Data_Structures/data_structures.md).
- Scheduling relates to [Algorithm Design — greedy](../05_Algorithms/algorithm_design.md).
- Foundation for [Computer Networks](../10_Computer_Networks/networks.md).