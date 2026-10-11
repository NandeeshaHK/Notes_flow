# Digital Logic

> **Syllabus:** Boolean algebra, combinational and sequential circuits, minimization.
> Revision sheet — focus on formulas and GATE traps.

---

## TL;DR / Key Concepts

- **Boolean algebra**: Laws, identities, De Morgan's theorem, canonical forms (SOP/POS).
- **Minimization**: K-maps, Quine-McCluskey, don't-care conditions.
- **Combinational circuits**: Gates, adders, multiplexers, decoders, encoders.
- **Sequential circuits**: Flip-flops, registers, counters, state machines.

---

## 📐 Key Formulas

### Boolean Identities
- $A + \bar{A} = 1$, $\;A \cdot \bar{A} = 0$
- $A + AB = A$ (absorption)
- $A + \bar{A}B = A + B$
- De Morgan: $\overline{A \cdot B} = \bar{A} + \bar{B}$, $\;\overline{A + B} = \bar{A} \cdot \bar{B}$

### Canonical Forms
- SOP (minterms): $F = \sum m(\ldots)$
- POS (maxterms): $F = \prod M(\ldots)$

### Number Systems
- Binary → Decimal: $\sum b_i \cdot 2^i$
- 2's complement of $N$: $\bar{N} + 1$
- Range of $n$-bit 2's complement: $[-2^{n-1}, 2^{n-1}-1]$

### Adders
- Half adder: $S = A \oplus B$, $\;C = AB$
- Full adder: $S = A \oplus B \oplus C_{in}$, $\;C_{out} = AB + C_{in}(A \oplus B)$

---

## ✍️ Worked Examples

**Example 1 (Minimization):** $F = \bar{A}B + A\bar{B} + AB = A + B$ (since $\bar{A}B + AB = B$, $A\bar{B} + AB = A$).

**Example 2 (K-map):** $F(A,B) = \sum m(0,1,3)$

**Plot into 2-var K-Map** (rows = A, columns = B):

| A \ B | 0 | 1 |
|-------|---|---|
| **0** | 1 ($m_0$) | 1 ($m_1$) |
| **1** | 0 ($m_2$) | 1 ($m_3$) |

**Group the 1s:**

| Group | Cells | Product term |
|-------|-------|--------------|
| G1 (2-cell) | $m_0, m_1$ | $\bar{A}$ |
| G2 (2-cell) | $m_1, m_3$ | $B$ |

$$F = \bar{A} + B$$

**Example 3 (Number):** $-5$ in 4-bit 2's complement: $5 = 0101$, invert $= 1010$, $+1 = 1011$.

**Example 4 (Full adder truth table):**

| A | B | $C_{in}$ | Sum | $C_{out}$ |
|---|---|----------|-----|-----------|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

Sum $= A \oplus B \oplus C_{in}$, $\;C_{out} = AB + C_{in}(A \oplus B)$.

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 1 mark):** The Boolean expression $A + \bar{A}B$ simplifies to:
- **Answer:** $A + B$.

**Q2 (GATE 2020, 1 mark):** A 4-bit 2's complement number 1101 represents:
- **Answer:** $-3$ (since $1101 \to$ invert $0010$, $+1 = 0011 = 3$, so $-3$).

**Q3 (GATE 2019, 2 marks):** The number of minterms in a 3-variable function is:
- **Answer:** $2^3 = 8$.

**Q4 (GATE 2018, 1 mark):** A full adder has how many inputs?
- **Answer:** 3 (two operands + carry-in).

**Q5 (GATE 2017, 2 marks):** The output of a 2-to-1 multiplexer with select $S$, inputs $I_0, I_1$ is:
- **Answer:** $Y = \bar{S}I_0 + S I_1$.

---

## 📚 Deep Dive

- [Digital Logic — Deep Dive](../_deep_dives/digital_logic_deep.md) — K-map techniques, state machines, counters, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Requires [Discrete Math — Logic](../01_Engineering_Math/discrete_math.md).
- Foundation for [Computer Organization — ALU, control design](../03_Computer_Organization/computer_org.md).