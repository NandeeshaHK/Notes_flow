# Digital Logic — Deep Dive

> In-depth reference for [Digital Logic](../02_Digital_Logic/digital_logic.md). K-map techniques, state machines, counters, and extended PYQs.

---

## 1. Boolean Algebra — Advanced

### Canonical Forms
- **SOP** (Sum of Products): OR of AND terms (minterms).
- **POS** (Product of Sums): AND of OR terms (maxterms).
- Minterm $m_i$: product term where variable is 1.
- Maxterm $M_i$: sum term where variable is 0.

### Universal Gates
- NAND and NOR are functionally complete (can build any circuit).

---

## 2. K-Map Minimization

### 2.1 Construction Table (Truth Table → K-Map)

A K-map is built directly from the **truth table**. The rows of the truth table map to cells of the K-map. The key rule: **adjacent cells differ in exactly one variable** (Gray-code ordering).

#### 2-Variable K-Map Construction

**Step 1 — Truth table** for $F(A,B)$:

| A | B | Minterm | F |
|---|---|---------|---|
| 0 | 0 | $m_0$ | $F_0$ |
| 0 | 1 | $m_1$ | $F_1$ |
| 1 | 0 | $m_2$ | $F_2$ |
| 1 | 1 | $m_3$ | $F_3$ |

**Step 2 — K-Map grid** (2×2). Rows = A, columns = B (Gray order: 00, 01, 11, 10):

| A \ B | 0 | 1 |
|-------|---|---|
| **0** | $m_0$ | $m_1$ |
| **1** | $m_2$ | $m_3$ |

**Step 3 — Plot** the 1s (and Xs) from the truth table into the cells.

---

#### 3-Variable K-Map Construction

**Step 1 — Truth table** for $F(A,B,C)$:

| A | B | C | Minterm | F |
|---|---|----|---------|---|
| 0 | 0 | 0 | $m_0$ | $F_0$ |
| 0 | 0 | 1 | $m_1$ | $F_1$ |
| 0 | 1 | 0 | $m_2$ | $F_2$ |
| 0 | 1 | 1 | $m_3$ | $F_3$ |
| 1 | 0 | 0 | $m_4$ | $F_4$ |
| 1 | 0 | 1 | $m_5$ | $F_5$ |
| 1 | 1 | 0 | $m_6$ | $F_6$ |
| 1 | 1 | 1 | $m_7$ | $F_7$ |

**Step 2 — K-Map grid** (2×4). Rows = A, columns = BC (Gray order: 00, 01, 11, 10):

| A \ BC | 00 | 01 | 11 | 10 |
|--------|----|----|----|----|
| **0**  | $m_0$ | $m_1$ | $m_3$ | $m_2$ |
| **1**  | $m_4$ | $m_5$ | $m_7$ | $m_6$ |

> ⚠️ **Note the column order**: 00, 01, **11, 10** (not 00,01,10,11). This Gray-code ordering is what makes adjacent cells differ in one variable.

**Step 3 — Plot** the 1s from the truth table.

---

#### 4-Variable K-Map Construction

**Step 1 — Truth table** for $F(A,B,C,D)$ (16 rows, $m_0$–$m_{15}$).

**Step 2 — K-Map grid** (4×4). Rows = AB, columns = CD (both Gray order):

| AB \ CD | 00 | 01 | 11 | 10 |
|---------|----|----|----|----|
| **00**  | $m_0$ | $m_1$ | $m_3$ | $m_2$ |
| **01**  | $m_4$ | $m_5$ | $m_7$ | $m_6$ |
| **11**  | $m_{12}$ | $m_{13}$ | $m_{15}$ | $m_{14}$ |
| **10**  | $m_8$ | $m_9$ | $m_{11}$ | $m_{10}$ |

---

### 2.2 Plotting Procedure (Step-by-Step)

1. **Draw the grid** with the correct Gray-code row/column labels.
2. **Fill each cell** with the output value (1, 0, or X) from the truth table.
3. **Group adjacent 1s** in powers of 2 (1, 2, 4, 8, 16 cells).
4. **Wrap around** edges (top↔bottom, left↔right) — the map is toroidal.
5. **Larger groups** → simpler (fewer literals) product term.
6. **Don't-cares (X)** can be included in a group if it enlarges it.

---

### 2.3 Worked Example — 3-Variable K-Map

**Given:** $F(A,B,C) = \sum m(0,1,2,5,6,7)$

**Step 1 — Truth table:**

| A | B | C | Minterm | F |
|---|---|----|---------|---|
| 0 | 0 | 0 | $m_0$ | **1** |
| 0 | 0 | 1 | $m_1$ | **1** |
| 0 | 1 | 0 | $m_2$ | **1** |
| 0 | 1 | 1 | $m_3$ | 0 |
| 1 | 0 | 0 | $m_4$ | 0 |
| 1 | 0 | 1 | $m_5$ | **1** |
| 1 | 1 | 0 | $m_6$ | **1** |
| 1 | 1 | 1 | $m_7$ | **1** |

**Step 2 — Plot into K-Map:**

| A \ BC | 00 | 01 | 11 | 10 |
|--------|----|----|----|----|
| **0**  | 1 ($m_0$) | 1 ($m_1$) | 0 ($m_3$) | 1 ($m_2$) |
| **1**  | 0 ($m_4$) | 1 ($m_5$) | 1 ($m_7$) | 1 ($m_6$) |

**Step 3 — Group the 1s:**

| Group | Cells | Variables constant | Product term |
|-------|-------|--------------------|--------------|
| G1 (2-cell) | $m_0, m_1$ | A=0, B=0 | $\bar{A}\bar{B}$ |
| G2 (2-cell) | $m_2, m_6$ | B=1, C=0 | $B\bar{C}$ |
| G3 (2-cell) | $m_5, m_7$ | A=1, C=1 | $AC$ |

**Step 4 — Write the minimized expression:**
$$F = \underbrace{\bar{A}\bar{B}}_{G1} + \underbrace{B\bar{C}}_{G2} + \underbrace{AC}_{G3}$$

---

### 2.4 Worked Example — 4-Variable K-Map

**Given:** $F(A,B,C,D) = \sum m(0,1,2,4,5,8,9,10)$

**Step 1 — Plot into K-Map:**

| AB \ CD | 00 | 01 | 11 | 10 |
|---------|----|----|----|----|
| **00**  | 1 | 1 | 0 | 1 |
| **01**  | 1 | 1 | 0 | 0 |
| **11**  | 0 | 0 | 0 | 0 |
| **10**  | 1 | 1 | 0 | 1 |

**Step 2 — Group the 1s:**

| Group | Cells | Variables constant | Product term |
|-------|-------|--------------------|--------------|
| G1 (4-cell) | $m_0,m_1,m_4,m_5$ | A=0, C=0 | $\bar{A}\bar{C}$ |
| G2 (4-cell) | $m_0,m_2,m_8,m_{10}$ | B=0, D=0 | $\bar{B}\bar{D}$ |

**Step 3 — Minimized expression:**
$$F = \bar{A}\bar{C} + \bar{B}\bar{D}$$

> 💡 **Tip:** The 4-cell group $m_0,m_1,m_4,m_5$ forms a 2×2 block in the top-left corner. The group $m_0,m_2,m_8,m_{10}$ wraps around the edges (top row + bottom row, columns 00 and 10).

---

### 2.5 Grouping Rules Summary

| Group size | # literals removed | Example (3-var) |
|-----------|--------------------|-----------------|
| 1 cell | 0 removed (3 literals) | $ABC$ |
| 2 cells | 1 removed (2 literals) | $AB$ |
| 4 cells | 2 removed (1 literal) | $A$ |
| 8 cells | 3 removed (0 literals = 1) | $1$ |

- **Overlapping groups** are allowed (a 1 can be in multiple groups).
- **Redundant groups** (all 1s already covered) should be removed.
- **Goal:** cover all 1s with the **fewest, largest** groups.

---

## 3. Combinational Circuits

### Adders
- Half adder: 2 inputs, sum + carry.
- Full adder: 3 inputs, sum + carry-out.
- Ripple carry adder: chain of full adders.

### Multiplexer
- $2^n$ inputs, $n$ select lines, 1 output.
- $Y = \sum m_i \cdot I_i$

### Decoder
- $n$ inputs, $2^n$ outputs; one output active at a time.

### Encoder
- Inverse of decoder.

---

## 4. Sequential Circuits

### Flip-Flops
| FF | Characteristic Equation |
|----|------------------------|
| SR | $Q^+ = S + \bar{R}Q$ |
| JK | $Q^+ = J\bar{Q} + \bar{K}Q$ |
| D | $Q^+ = D$ |
| T | $Q^+ = T \oplus Q$ |

### Registers & Counters
- Shift register: moves bits.
- Ripple counter: asynchronous.
- Synchronous counter: all FFs clocked together.

### State Machines
- Mealy: output depends on state + input.
- Moore: output depends only on state.

---

## 5. Extended PYQs

**Q6 (GATE 2016, 2 marks):** The characteristic equation of a JK flip-flop is:
- **Answer:** $Q^+ = J\bar{Q} + \bar{K}Q$.

**Q7 (GATE 2015, 2 marks):** A 3-to-8 decoder has how many outputs?
- **Answer:** 8.

**Q8 (GATE 2014, 1 mark):** Which gate is functionally complete alone?
- **Answer:** NAND (or NOR).

---

## 6. References

- Morris Mano — *Digital Logic and Computer Design*
- NPTEL: Digital Circuits (IIT)
- Previous GATE papers