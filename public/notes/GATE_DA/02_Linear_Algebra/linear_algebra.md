# Linear Algebra

> **Syllabus:** Vector spaces, subspaces, linear dependence/independence, matrices, systems of linear equations, eigenvalues, eigenvectors, matrix decompositions (SVD, LU).
> Revision sheet — focus on formulas and GATE traps.

> **Note:** Foundational linear algebra (vector spaces, subspaces, linear dependence/independence, matrices, systems of equations, eigenvalues/eigenvectors) is covered in depth in the [GATE_CS Linear Algebra](../../GATE_CS/01_Engineering_Math/linear_algebra.md) notes. This sheet cross-references that content and adds the **DA-specific** topics of **matrix decompositions (SVD, LU)**.

---

## TL;DR / Key Concepts

- **Vector spaces & subspaces**: closure under addition and scalar multiplication.
- **Linear dependence/independence**, basis, dimension, rank.
- **Matrices**: operations, determinant, inverse, rank, trace.
- **Systems of linear equations**: consistency, unique/infinite/no solutions.
- **Eigenvalues & eigenvectors**: $A\mathbf{v} = \lambda \mathbf{v}$.
- **Matrix decompositions (DA-specific)**: LU and SVD.

```mermaid
flowchart TD
    A[Matrix A] --> B[LU Decomposition<br/>A = LU]
    A --> C[SVD<br/>A = U Σ Vᵀ]
    B --> B1[Solve Ax = b<br/>Ly = b, then Ux = y]
    C --> C1[Singular values σᵢ]
    C1 --> C2[Rank = # nonzero σᵢ]
    C --> C3[PCA / Dimensionality Reduction]
    A --> D[Eigen-decomposition<br/>A v = λ v]
    D --> D1[Characteristic eqn<br/>det(A - λI) = 0]
```

### Systems of Linear Equations
| $\det(A)$ | Rank condition | Solution |
|-----------|----------------|----------|
| $\ne 0$ | full rank | **Unique** solution |
| $= 0$ | rank$(A)$ = rank$([A\|b])$ | **Infinitely many** |
| $= 0$ | rank$(A)$ < rank$([A\|b])$ | **No** solution |

### Matrix Decompositions Comparison
| Decomposition | Form | Purpose |
|---------------|------|---------|
| **LU** | $A = LU$ | Solve linear systems efficiently |
| **SVD** | $A = U\Sigma V^T$ | Rank, PCA, low-rank approximation |
| **Eigen** | $A = V\Lambda V^{-1}$ | Diagonalization (square matrices) |

---

## 🎭 Story / Intuition

**The GPS coordinates story (vectors & linear dependence).** Think of a vector as a **set of coordinates** — like a GPS location $(x, y)$. Two vectors are **linearly independent** if they point in genuinely different directions (like "north" and "east" — you can reach any point by combining them). They're **dependent** if one is just a scaled version of the other (like "north" and "2× north" — they only let you move along one line). The **rank** of a matrix is simply "how many genuinely independent directions it spans." A matrix with rank 1 is like a flat ruler — it can only reach points on one line, no matter how many rows it has.

**The image compression story (SVD).** Imagine a photo as a big matrix of pixel values. Storing it takes lots of space. **SVD** breaks it into $A = U\Sigma V^T$ where $\Sigma$ holds the "importance" of each pattern (singular values). The magic: most photos can be well-approximated using just the **top few singular values** — the rest are tiny and can be dropped. This is exactly how **JPEG-style compression** and **PCA** work: keep the important directions, discard the noise. The rank of the matrix = how many singular values are nonzero = how many "essential patterns" the data really has.

**The eigenvalue story (what stays the same).** An **eigenvector** is a direction that a matrix transformation *doesn't rotate* — it only stretches or shrinks it. The **eigenvalue** $\lambda$ tells you by how much. Think of a rubber sheet being stretched: most lines get rotated and moved, but a few special directions just get pulled straight. Those special directions are the eigenvectors, and the stretch factor is the eigenvalue. In PCA, the eigenvectors of the covariance matrix point along the directions of maximum data spread — the "principal components."

---

## 📐 Key Formulas

### Vector Spaces
- Subspace: closed under $+$ and scalar $\cdot$; contains zero vector.
- $\text{rank}(A)$ = number of linearly independent rows = number of independent columns.
- Rank–nullity: $\text{rank}(A) + \text{nullity}(A) = n$ (columns).

### Matrices
- $A^{-1} = \frac{1}{\det(A)}\text{adj}(A)$
- $\det(AB) = \det(A)\det(B)$
- $\text{tr}(A) = \sum \lambda_i$, $\;\det(A) = \prod \lambda_i$

### Eigenvalues & Eigenvectors
- Characteristic equation: $\det(A - \lambda I) = 0$
- $A\mathbf{v} = \lambda \mathbf{v}$, $\mathbf{v} \ne 0$
- Symmetric matrix → real eigenvalues, orthogonal eigenvectors.

### LU Decomposition (DA-specific)
- $A = LU$ where $L$ = lower triangular, $U$ = upper triangular.
- Used to solve $Ax = b$ efficiently: solve $Ly = b$, then $Ux = y$.
- Requires no row swaps (or use $PA = LU$ with permutation $P$).

### SVD (DA-specific)
- Any real $m \times n$ matrix: $A = U\Sigma V^T$
- $U$ ($m\times m$) and $V$ ($n\times n$) orthogonal; $\Sigma$ diagonal with **singular values** $\sigma_1 \ge \sigma_2 \ge \dots \ge 0$.
- Singular values $\sigma_i = \sqrt{\lambda_i}$ where $\lambda_i$ are eigenvalues of $A^TA$.
- **Rank** of $A$ = number of nonzero singular values.
- Used in PCA, dimensionality reduction, low-rank approximation.

---

## ✍️ Worked Examples

**Example 1 (Eigenvalues):** For $A = \begin{bmatrix}2 & 0 \\ 0 & 3\end{bmatrix}$, eigenvalues are:
- $\det(A - \lambda I) = (2-\lambda)(3-\lambda) = 0$ → $\lambda = 2, 3$.

**Example 2 (Rank):** $A = \begin{bmatrix}1 & 2 \\ 2 & 4\end{bmatrix}$ has rank:
- Row 2 = 2 × Row 1 → dependent → $\text{rank} = 1$.

**Example 3 (LU):** Solve $Ax = b$ where $A = \begin{bmatrix}2 & 1 \\ 4 & 3\end{bmatrix}$, $b = \begin{bmatrix}3 \\ 7\end{bmatrix}$.
- $L = \begin{bmatrix}1 & 0 \\ 2 & 1\end{bmatrix}$, $U = \begin{bmatrix}2 & 1 \\ 0 & 1\end{bmatrix}$. Solve $Ly=b$ → $y = \begin{bmatrix}3 \\ 1\end{bmatrix}$; $Ux=y$ → $x = \begin{bmatrix}1 \\ 1\end{bmatrix}$.

**Example 4 (SVD):** For $A = \begin{bmatrix}3 & 0 \\ 0 & 2\end{bmatrix}$, singular values are:
- $A^TA = \begin{bmatrix}9 & 0 \\ 0 & 4\end{bmatrix}$ → $\lambda = 9, 4$ → $\sigma = 3, 2$.

---

## 🎯 GATE PYQs

**Q1 (GATE DA 2024, 2 marks):** The eigenvalues of $A = \begin{bmatrix}1 & 2 \\ 2 & 1\end{bmatrix}$ are:
- **Answer:** $\det(A-\lambda I) = (1-\lambda)^2 - 4 = 0$ → $\lambda = 3, -1$.

**Q2 (GATE DA 2024, 2 marks):** The rank of the matrix $\begin{bmatrix}1 & 2 & 3 \\ 2 & 4 & 6 \\ 3 & 6 & 9\end{bmatrix}$ is:
- **Answer:** 1 (all rows are multiples of the first).

**Q3 (GATE DA 2025, 2 marks):** For a symmetric matrix, the eigenvectors corresponding to distinct eigenvalues are:
- **Answer:** orthogonal.

**Q4 (GATE DA 2025, 2 marks):** The number of nonzero singular values of a matrix equals its:
- **Answer:** rank.

**Q5 (GATE DA 2026, 2 marks):** If $\det(A) = 0$, then the system $Ax = b$:
- (A) always has a unique solution (B) has no solution or infinitely many (C) always consistent (D) none
- **Answer: (B)** — singular matrix → either no solution or infinitely many.

---

## 📚 Deep Dive

- [GATE_CS Linear Algebra — Deep Dive](../../GATE_CS/_deep_dives/linear_algebra_deep.md) — vector spaces, diagonalization, more PYQs.
- [Statistics](../01_Probability_Statistics/statistics.md) — covariance matrix (used in PCA).

---

## 🔗 Prerequisites / Cross-References

- Requires [GATE_CS Discrete Math](../../GATE_CS/01_Engineering_Math/discrete_math.md) (sets, relations).
- Used in [Unsupervised Learning — PCA](../06_Machine_Learning/unsupervised_learning.md), [Supervised Learning — SVM](../06_Machine_Learning/supervised_learning.md), and [Optimization](../03_Calculus_Optimization/optimization.md).