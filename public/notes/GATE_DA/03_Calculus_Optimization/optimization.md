# Optimization

> **Syllabus:** Unconstrained optimization, gradient descent.
> Revision sheet — focus on formulas and GATE traps.

---

## TL;DR / Key Concepts

- **Unconstrained optimization**: find $\min_x f(x)$ with no constraints.
- **Necessary/sufficient conditions**: gradient zero, Hessian positive definite.
- **Gradient descent**: iterative first-order method using the negative gradient.
- **Learning rate** $\eta$: controls step size; too large → divergence, too small → slow.
- **Convexity**: guarantees gradient descent converges to the global minimum.

```mermaid
flowchart TD
    A[Start at x₀] --> B[Compute gradient ∇f(xₖ)]
    B --> C[Update xₖ₊₁ = xₖ - η ∇f(xₖ)]
    C --> D{Converged?<br/>∇f ≈ 0}
    D -->|No| B
    D -->|Yes| E[Local / Global Minimum]
    C --> F{Learning rate η}
    F -->|Too large| G[Oscillation / Divergence]
    F -->|Too small| H[Slow convergence]
    F -->|Appropriate| I[Converges to minimum]
```

### Gradient Descent Variants
| Variant | Data per step | Noise | Speed | Use case |
|---------|---------------|-------|-------|----------|
| **Batch GD** | Full dataset | Low | Slow | Small data |
| **Stochastic GD** | 1 sample | High | Fast | Large data |
| **Mini-batch GD** | Small batch | Medium | Balanced | Most common |

### Optimality Conditions
| Condition | Type |
|-----------|------|
| $\nabla f(x^*) = 0$ | Necessary (1st order) |
| $H(x^*)$ positive definite | Sufficient for local **min** |
| $H(x^*)$ negative definite | Sufficient for local **max** |
| $H(x^*)$ indefinite | Saddle point |

---

## 🎭 Story / Intuition

**The foggy mountain story (gradient descent).** Imagine you're **blindfolded on a mountain at night** and need to reach the bottom of the valley. You can't see the whole mountain, but you *can* feel the slope beneath your feet. Your strategy: **feel which way is downhill, take a step that way, then repeat.** Each step is $x_{k+1} = x_k - \eta \nabla f(x_k)$ — you move opposite to the gradient (downhill) by a step size $\eta$. This is **gradient descent**, and it's exactly how neural networks learn: they can't "see" the whole error landscape, so they just keep stepping downhill.

**The step-size dilemma (learning rate).** How big should each step be? 
- **Too big** ($\eta$ large): you might **overshoot** the valley and bounce back up the other side — even fly off the mountain (diverge). Like taking a giant leap and landing past the bottom.
- **Too small** ($\eta$ small): you creep forward so slowly it takes forever to reach the bottom. Like taking baby steps down a huge mountain.
- **Just right**: you descend steadily and reach the valley efficiently.

**The convexity guarantee (why it works).** A **convex** function is like a **single smooth bowl** — there's only one valley, so no matter where you start, stepping downhill always leads to the *global* minimum. But a **non-convex** function is like a mountain range with many valleys — you might get stuck in a *local* minimum (a small dip) and never find the true lowest point. This is why convexity matters so much in ML: it guarantees your optimization will actually find the best answer.

---

## 📐 Key Formulas

### Optimality Conditions
- First-order (necessary): $\nabla f(x^*) = 0$
- Second-order (sufficient): Hessian $H(x^*)$ positive definite → local min; negative definite → local max.

### Gradient Descent Update
$$x_{k+1} = x_k - \eta \nabla f(x_k)$$

### Learning Rate & Convergence
- Step size $\eta$; convergence requires $\eta$ small enough (for quadratic $f$, $\eta < \frac{2}{\lambda_{\max}}$).
- **Convex function**: $f(\theta x_1 + (1-\theta)x_2) \le \theta f(x_1) + (1-\theta) f(x_2)$ → global min.

### Variants
- **Batch GD**: uses full dataset per step.
- **Stochastic GD (SGD)**: uses one sample per step (noisy, faster).
- **Mini-batch GD**: uses a small batch per step.

---

## ✍️ Worked Examples

**Example 1 (Unconstrained min):** Minimize $f(x) = x^2 - 4x + 7$.
- $f'(x) = 2x - 4 = 0$ → $x = 2$; $f''(x) = 2 > 0$ → min at $x=2$, $f(2) = 3$.

**Example 2 (Gradient descent):** Minimize $f(x) = x^2$ starting at $x_0 = 3$, $\eta = 0.1$.
- $\nabla f = 2x$. $x_1 = 3 - 0.1(6) = 2.4$; $x_2 = 2.4 - 0.1(4.8) = 1.92$; converges toward 0.

**Example 3 (Multivariate):** Minimize $f(x,y) = x^2 + y^2$.
- $\nabla f = (2x, 2y) = 0$ → $(0,0)$; Hessian $\begin{bmatrix}2&0\\0&2\end{bmatrix}$ positive definite → global min at origin.

---

## 🎯 GATE PYQs

**Q1 (GATE DA 2024, 2 marks):** In gradient descent, if the learning rate is too large, the algorithm:
- (A) converges faster (B) may diverge/oscillate (C) always converges (D) none
- **Answer: (B)** — too large a step can overshoot and diverge.

**Q2 (GATE DA 2024, 2 marks):** The update rule of gradient descent for minimizing $f(x)$ is:
- **Answer:** $x_{k+1} = x_k - \eta \nabla f(x_k)$.

**Q3 (GATE DA 2025, 2 marks):** A function $f$ is convex if for all $x_1, x_2$ and $\theta \in [0,1]$:
- **Answer:** $f(\theta x_1 + (1-\theta)x_2) \le \theta f(x_1) + (1-\theta) f(x_2)$.

**Q4 (GATE DA 2025, 2 marks):** The minimum of $f(x) = x^2 + 2x + 5$ occurs at:
- **Answer:** $f'(x) = 2x + 2 = 0$ → $x = -1$.

**Q5 (GATE DA 2026, 2 marks):** Stochastic gradient descent differs from batch gradient descent in that it:
- **Answer:** updates parameters using a single (or small subset of) training example per step.

---

## 📚 Deep Dive

- [Optimization — Deep Dive](../_deep_dives/optimization_deep.md) — convergence analysis, momentum, convexity proofs, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Requires [Calculus](calculus.md) (partial derivatives, gradient) and [Linear Algebra](../02_Linear_Algebra/linear_algebra.md) (Hessian, eigenvalues).
- Used in [Supervised Learning](../06_Machine_Learning/supervised_learning.md) (training regression, logistic regression, neural networks).