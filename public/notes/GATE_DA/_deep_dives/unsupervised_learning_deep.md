# Unsupervised Learning — Deep Dive

> In-depth reference for [Unsupervised Learning](../06_Machine_Learning/unsupervised_learning.md). K-Means++, linkage details, PCA derivation, and extended PYQs.

---

## 1. K-Means

### Algorithm
1. Initialize $K$ centroids.
2. Assign each point to nearest centroid (Euclidean distance).
3. Recompute centroids as the mean of assigned points.
4. Repeat until centroids stop changing.

### Objective
$$\min \sum_{k=1}^K \sum_{x \in C_k} \|x - \mu_k\|^2$$

### Issues
- Sensitive to initialization → use **K-Means++** (spread-out initial centroids).
- Choice of $K$ → **elbow method** (plot WCSS vs $K$).
- Converges to a **local** optimum (not guaranteed global).

---

## 2. Hierarchical Clustering

### Agglomerative (bottom-up)
1. Start with each point as its own cluster.
2. Merge the two closest clusters.
3. Repeat until one cluster remains.

### Linkage Criteria
- **Single**: min distance between clusters (can form chains).
- **Complete**: max distance (compact clusters).
- **Average**: mean distance.
- **Ward's**: minimize increase in within-cluster variance.

### Dendrogram
- Tree showing merge sequence; cut at a height to choose the number of clusters.

---

## 3. PCA (Principal Component Analysis)

### Derivation
1. Center data: $X \leftarrow X - \bar{x}$.
2. Covariance matrix: $\Sigma = \frac{1}{n}X^TX$.
3. Eigen-decomposition: $\Sigma v_i = \lambda_i v_i$.
4. Principal components = eigenvectors; variance along $v_i$ = $\lambda_i$.
5. Project: $Z = XV_k$ (top $k$ components).

### Relation to SVD
- $X = U\Sigma V^T$; principal components are columns of $V$; singular values relate to eigenvalues.

### Properties
- Components are orthogonal.
- First component maximizes variance.
- Variance explained by component $i$: $\frac{\lambda_i}{\sum_j \lambda_j}$.

---

## 4. Extended PYQs

**Q6 (GATE DA 2024, 2 marks):** K-Means++ improves K-Means by:
- **Answer:** choosing better initial centroids.

**Q7 (GATE DA 2025, 2 marks):** In PCA, the first principal component is the direction of:
- **Answer:** maximum variance.

**Q8 (GATE DA 2026, 2 marks):** Ward's linkage in hierarchical clustering minimizes:
- **Answer:** the increase in within-cluster variance.

---

## 5. References

- Bishop — *Pattern Recognition and Machine Learning*
- NPTEL: Introduction to Machine Learning (IIT)
- Previous GATE DA papers