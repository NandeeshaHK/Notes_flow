# Linear Algebra

> **Syllabus:** Matrices, determinants, systems of linear equations, eigenvalues & eigenvectors, vector spaces.
> Revision sheet — focus on formulas and GATE traps.

---

## TL;DR / Key Concepts

- **Matrices**: Operations, transpose, inverse, rank, trace, determinant properties.
- **Systems of equations**: Consistency, rank method, Gaussian elimination.
- **Eigenvalues & eigenvectors**: Characteristic equation, properties, diagonalization.
- **Vector spaces**: Linear independence, basis, dimension, linear transformations.

---

## 📐 Key Formulas

### Determinant & Inverse
- $\det(AB) = \det(A)\det(B)$
- $\det(A^T) = \det(A)$
- $\det(A^{-1}) = \frac{1}{\det(A)}$
- $A^{-1} = \frac{\text{adj}(A)}{\det(A)}$ (exists iff $\det(A) \ne 0$)

### Rank
- $\text{rank}(A) \le \min(m, n)$ for an $m \times n$ matrix
- $\text{rank}(A) = \text{rank}(A^T)$
- $\text{rank}(AB) \le \min(\text{rank}(A), \text{rank}(B))$

### Eigenvalues
- Characteristic equation: $\det(A - \lambda I) = 0$
- $\text{trace}(A) = \sum \lambda_i$
- $\det(A) = \prod \lambda_i$
- $A$ is invertible iff all $\lambda_i \ne 0$

### Consistency of $Ax = b$
- Consistent iff $\text{rank}(A) = \text{rank}([A|b])$
- Unique solution iff $\text{rank}(A) = \text{rank}([A|b]) = n$ (number of unknowns)
- Infinite solutions iff $\text{rank}(A) = \text{rank}([A|b]) < n$

---

## ✍️ Worked Examples

**Example 1 (Determinant):** $\det\begin{pmatrix}1 & 2 \\ 3 & 4\end{pmatrix} = 1\cdot4 - 2\cdot3 = -2$.

**Example 2 (Eigenvalues):** Eigenvalues of $\begin{pmatrix}2 & 0 \\ 0 & 3\end{pmatrix}$ are $2, 3$.
- Trace $= 5$, determinant $= 6$. ✓

**Example 3 (Consistency):** $x + y = 2$, $2x + 2y = 4$ → infinite solutions (dependent equations).

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 1 mark):** The rank of the matrix $\begin{pmatrix}1 & 2 & 3 \\ 2 & 4 & 6 \\ 3 & 6 & 9\end{pmatrix}$ is:
- **Answer:** 1 (rows are linearly dependent — all multiples of row 1).

**Q2 (GATE 2020, 1 mark):** If $\lambda$ is an eigenvalue of $A$, then an eigenvalue of $A^{-1}$ is:
- **Answer:** $\frac{1}{\lambda}$.

**Q3 (GATE 2019, 2 marks):** The system $x + 2y = 3$, $2x + 4y = 6$ has:
- **Answer:** infinitely many solutions (dependent equations).

**Q4 (GATE 2018, 1 mark):** The determinant of a $3 \times 3$ matrix with two identical rows is:
- **Answer:** 0.

**Q5 (GATE 2017, 2 marks):** If $A$ is a $3 \times 3$ matrix with eigenvalues $1, 2, 3$, then $\det(A)$ is:
- **Answer:** $1 \times 2 \times 3 = 6$.

---

## 📚 Deep Dive

- [Linear Algebra — Deep Dive](../_deep_dives/linear_algebra_deep.md) — vector spaces, linear transformations, diagonalization, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Requires [Calculus](../01_Engineering_Math/calculus.md) basics.
- Used in [Computer Organization — ALU & matrix ops](../03_Computer_Organization/computer_org.md).
- Eigenvalues appear in [Networks — PageRank concepts](../10_Computer_Networks/networks.md).