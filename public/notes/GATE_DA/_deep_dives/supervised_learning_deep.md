# Supervised Learning — Deep Dive

> In-depth reference for [Supervised Learning](../06_Machine_Learning/supervised_learning.md). Derivations, kernels, backpropagation, and extended PYQs.

---

## 1. Linear Regression

### Normal Equation
$$w = (X^TX)^{-1}X^Ty$$
- Requires $X^TX$ invertible (no multicollinearity).
- Alternative: gradient descent (works for large data).

### Regularization
- **Ridge** (L2): $J = \text{MSE} + \lambda\|w\|^2$ — shrinks weights.
- **Lasso** (L1): $J = \text{MSE} + \lambda\|w\|_1$ — sparse (feature selection).

---

## 2. Logistic Regression

- $P(y=1|x) = \sigma(w^T x + b)$, $\sigma(z) = \frac{1}{1+e^{-z}}$.
- Decision boundary: $w^T x + b = 0$.
- Loss: cross-entropy (log loss).
- Trained via gradient descent; no closed form.

---

## 3. SVM

- Hard margin: $\min \frac{1}{2}\|w\|^2$ s.t. $y_i(w^T x_i + b) \ge 1$.
- Soft margin: $\min \frac{1}{2}\|w\|^2 + C\sum \xi_i$ s.t. $y_i(w^T x_i + b) \ge 1 - \xi_i$.
- **Support vectors**: points on the margin.
- **Kernels**: linear, polynomial $(\gamma x^T x' + r)^d$, RBF $e^{-\gamma\|x-x'\|^2}$.
- Kernel trick: compute dot products in higher dimension without explicit mapping.

---

## 4. Decision Trees

- **Gini**: $1 - \sum_k p_k^2$ (0 = pure).
- **Entropy**: $-\sum_k p_k \log_2 p_k$ (0 = pure).
- **Information gain**: reduction in entropy after a split.
- Prone to overfitting → use pruning, max depth, min samples.

---

## 5. Naive Bayes

- $P(y|x) \propto P(y)\prod_j P(x_j|y)$.
- Assumes conditional independence of features.
- Variants: Gaussian NB (continuous), Multinomial NB (counts), Bernoulli NB (binary).
- Fast, works well with high-dimensional data.

---

## 6. Random Forest

- **Bagging**: train many trees on bootstrap samples.
- **Feature randomness**: each split considers a random subset of features.
- Reduces variance vs a single decision tree.

---

## 7. K-NN

- Lazy learner; stores all training data.
- Prediction: majority vote of $K$ nearest neighbors.
- Sensitive to feature scaling → normalize.
- Curse of dimensionality: distance becomes less meaningful in high dimensions.

---

## 8. Neural Networks

### Perceptron
- $\hat{y} = \sigma(w^T x + b)$; single layer.

### Multi-Layer Perceptron (MLP)
- Forward pass: $z^{(l)} = W^{(l)}a^{(l-1)} + b^{(l)}$, $a^{(l)} = \sigma(z^{(l)})$.
- **Backpropagation**: compute gradients via chain rule, update weights with gradient descent.
- **Activation functions**: sigmoid, tanh, ReLU ($\max(0,z)$), softmax (multi-class).
- **Universal approximation**: an MLP with one hidden layer can approximate any continuous function.

---

## 9. Extended PYQs

**Q6 (GATE DA 2024, 2 marks):** Ridge regression adds which penalty to the loss?
- **Answer:** L2 (squared magnitude of weights).

**Q7 (GATE DA 2025, 2 marks):** The RBF kernel in SVM maps data to:
- **Answer:** an infinite-dimensional feature space.

**Q8 (GATE DA 2026, 2 marks):** Backpropagation computes gradients using:
- **Answer:** the chain rule of calculus.

---

## 10. References

- Bishop — *Pattern Recognition and Machine Learning*
- Andrew Ng — *Machine Learning* (Coursera)
- NPTEL: Introduction to Machine Learning (IIT)
- Previous GATE DA papers