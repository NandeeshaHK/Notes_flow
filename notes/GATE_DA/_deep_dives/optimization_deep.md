# Optimization — Deep Dive

> In-depth reference for [Optimization](../03_Calculus_Optimization/optimization.md). Convergence analysis, convexity, and extended PYQs.

---

## 1. Unconstrained Optimization

### Optimality Conditions
- **First-order necessary**: $\nabla f(x^*) = 0$.
- **Second-order sufficient**: Hessian $H(x^*)$ positive definite → strict local min; negative definite → strict local max; indefinite → saddle point.

### Convexity
- $f$ convex if $f(\theta x_1 + (1-\theta)x_2) \le \theta f(x_1) + (1-\theta)f(x_2)$.
- For convex $f$, any local minimum is a **global minimum**.
- $f$ convex iff Hessian is positive semidefinite everywhere.

---

## 2. Gradient Descent

### Update Rule
$$x_{k+1} = x_k - \eta \nabla f(x_k)$$

### Convergence
- For a quadratic $f(x) = \frac{1}{2}x^T A x$ with $A$ symmetric positive definite, convergence requires $\eta < \frac{2}{\lambda_{\max}(A)}$.
- Optimal step for quadratic: $\eta^* = \frac{2}{\lambda_{\min} + \lambda_{\max}}$.
- Convergence rate is **linear** (geometric) for well-conditioned problems.

### Learning Rate Issues
- Too large → oscillation/divergence.
- Too small → slow convergence.
- **Learning rate schedules**: decay over time (e.g., $\eta_k = \eta_0 / (1 + k)$).

---

## 3. Variants

- **Batch GD**: full dataset per step — accurate but slow.
- **Stochastic GD (SGD)**: one sample per step — noisy, fast, escapes local minima.
- **Mini-batch GD**: small batch — balance between the two.
- **Momentum**: $v_{k+1} = \gamma v_k + \eta \nabla f(x_k)$; $x_{k+1} = x_k - v_{k+1}$ — accelerates convergence.
- **Adam**: adaptive learning rates per parameter.

---

## 4. Extended PYQs

**Q6 (GATE DA 2024, 2 marks):** For a convex function, gradient descent with a suitable learning rate converges to:
- **Answer:** the global minimum.

**Q7 (GATE DA 2025, 2 marks):** The Hessian matrix of $f(x,y) = x^2 + y^2$ is:
- **Answer:** $\begin{bmatrix}2 & 0 \\ 0 & 2\end{bmatrix}$ (positive definite → global min at origin).

**Q8 (GATE DA 2026, 2 marks):** Momentum in gradient descent helps to:
- **Answer:** accelerate convergence and reduce oscillation.

---

## 5. References

- Boyd & Vandenberghe — *Convex Optimization*
- NPTEL: Optimization Methods (IIT)
- Previous GATE DA papers