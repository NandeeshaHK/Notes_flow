# Linear Algebra — Deep Dive

> In-depth reference for [Linear Algebra](../01_Engineering_Math/linear_algebra.md). Vector spaces, linear transformations, diagonalization, and extended PYQs.

---

## 1. Matrices — Advanced Properties

### Determinant Properties
- Swapping two rows changes sign.
- Multiplying a row by $k$ multiplies determinant by $k$.
- Adding a multiple of one row to another doesn't change determinant.
- $\det(A^n) = \det(A)^n$

### Special Matrices
- Symmetric: $A = A^T$
- Skew-symmetric: $A = -A^T$
- Orthogonal: $A^T A = I$, $\det = \pm 1$
- Idempotent: $A^2 = A$
- Nilpotent: $A^k = 0$ for some $k$

#### 1.1 Special Matrices Comparison Table

| Type | Definition | Eigenvalues | Determinant |
|------|-----------|-------------|-------------|
| Symmetric | $A = A^T$ | Real | — |
| Skew-symmetric | $A = -A^T$ | Purely imaginary / 0 | 0 (odd order) |
| Orthogonal | $A^T A = I$ | $|\lambda| = 1$ | $\pm 1$ |
| Idempotent | $A^2 = A$ | 0 or 1 | 0 or 1 |
| Nilpotent | $A^k = 0$ | All 0 | 0 |
| Diagonal | $a_{ij}=0$ for $i \ne j$ | Diagonal entries | Product of diagonal |

---

## 2. Vector Spaces

### Definitions
- Vector space: closed under addition and scalar multiplication.
- Linear combination: $c_1 v_1 + c_2 v_2 + \cdots + c_n v_n$
- Linear independence: no vector is a combination of others.
- Basis: linearly independent spanning set.
- Dimension: number of vectors in a basis.

### Subspaces
- Null space (kernel), column space (range), row space.
- Rank-Nullity theorem: $\text{rank}(A) + \text{nullity}(A) = n$ (columns).

---

## 3. Eigenvalues & Eigenvectors

### Finding Eigenvalues
- Solve $\det(A - \lambda I) = 0$.

### Properties
- $\text{trace}(A) = \sum \lambda_i$
- $\det(A) = \prod \lambda_i$
- Eigenvalues of $A^k$ are $\lambda_i^k$.
- Eigenvalues of $A^{-1}$ are $\frac{1}{\lambda_i}$.
- Eigenvalues of $A^T$ equal those of $A$.

### Diagonalization
- $A = PDP^{-1}$ where $D$ is diagonal of eigenvalues, $P$ columns are eigenvectors.
- $A$ diagonalizable iff it has $n$ linearly independent eigenvectors.

#### 3.1 Worked Example — Finding Eigenvalues (Table)

**Given:** $A = \begin{pmatrix}2 & 1 \\ 1 & 2\end{pmatrix}$

**Step 1 — Characteristic equation:** $\det(A - \lambda I) = 0$:

$$\begin{vmatrix}2-\lambda & 1 \\ 1 & 2-\lambda\end{vmatrix} = (2-\lambda)^2 - 1 = 0$$

**Step 2 — Solve:** $(2-\lambda)^2 = 1 \Rightarrow 2-\lambda = \pm 1 \Rightarrow \lambda = 1, 3$.

**Step 3 — Verify with trace & determinant:**

| Property | Value | Check |
|----------|-------|-------|
| trace(A) | $2 + 2 = 4$ | $\sum \lambda = 1 + 3 = 4$ ✓ |
| det(A) | $4 - 1 = 3$ | $\prod \lambda = 1 \times 3 = 3$ ✓ |

**Eigenvalues:** $\lambda = 1, 3$.

---

## 4. Linear Transformations

- $T: V \to W$ linear if $T(u+v) = T(u) + T(v)$ and $T(cu) = cT(u)$.
- Matrix representation: $T(x) = Ax$.
- Kernel = null space, Image = column space.

---

## 5. Extended PYQs

**Q6 (GATE 2016, 2 marks):** The rank of $\begin{pmatrix}1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1\end{pmatrix}$ is:
- **Answer:** 1.

**Q7 (GATE 2015, 2 marks):** If $A$ is a $3 \times 3$ matrix with $\det(A) = 2$, then $\det(2A)$ is:
- **Answer:** $2^3 \times 2 = 16$.

**Q8 (GATE 2014, 1 mark):** The nullity of a $3 \times 3$ matrix of rank 2 is:
- **Answer:** $3 - 2 = 1$.

---

## 6. References

- Gilbert Strang — *Introduction to Linear Algebra*
- NPTEL: Linear Algebra (IIT)
- Previous GATE papers