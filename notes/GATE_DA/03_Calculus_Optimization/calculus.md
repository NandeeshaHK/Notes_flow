# Calculus

> **Syllabus:** Functions, limits, continuity, derivatives, maxima/minima, partial derivatives.
> Revision sheet — focus on formulas and GATE traps.

> **Note:** Foundational calculus (functions, limits, continuity, derivatives, maxima/minima) is covered in depth in the [GATE_CS Calculus](../../GATE_CS/01_Engineering_Math/calculus.md) notes. This sheet cross-references that content and adds the **DA-specific** topic of **partial derivatives** (needed for multivariate optimization).

---

## TL;DR / Key Concepts

- **Functions, limits, continuity**.
- **Derivatives**: rules, chain rule, higher-order derivatives.
- **Maxima/minima**: first & second derivative tests.
- **Partial derivatives (DA-specific)**: derivatives w.r.t. one variable holding others fixed; gradient vector.

```mermaid
flowchart TD
    A[Functions] --> B[Limits & Continuity]
    B --> C[Derivatives]
    C --> D[Single Variable<br/>f'(x)]
    C --> E[Multivariate<br/>Partial Derivatives]
    D --> F[Maxima / Minima<br/>f'(x)=0, f''(x) test]
    E --> G[Gradient ∇f]
    E --> H[Hessian Matrix]
    G --> I[Direction of steepest ascent]
    H --> J[Convexity / curvature]
    I --> K[Gradient Descent]
```

### Derivative Rules
| Rule | Formula |
|------|---------|
| **Power** | $\frac{d}{dx}x^n = nx^{n-1}$ |
| **Product** | $(uv)' = u'v + uv'$ |
| **Quotient** | $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$ |
| **Chain** | $\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}$ |
| **Exponential** | $\frac{d}{dx}e^x = e^x$ |
| **Logarithm** | $\frac{d}{dx}\ln x = \frac{1}{x}$ |

### Second Derivative Test
| Condition | Result |
|-----------|--------|
| $f'(x)=0$, $f''(x) > 0$ | Local **minimum** |
| $f'(x)=0$, $f''(x) < 0$ | Local **maximum** |
| $f'(x)=0$, $f''(x) = 0$ | Inconclusive (inflection) |

---

## 🎭 Story / Intuition

**The car speedometer story (what a derivative is).** Your car's **speedometer** shows your speed — that's the *derivative* of your position. If your position is $s(t)$, then $s'(t)$ is your speed at that instant. The derivative answers: **"How fast is this changing right now?"** It's the *instantaneous rate of change*, not an average. When you press the gas, your speed increases — the *second derivative* $s''(t)$ is your **acceleration** (how fast the speed itself is changing). This is why derivatives are everywhere in ML: gradient descent needs to know "how fast is the error changing as I tweak each weight?"

**The hill-climbing story (maxima/minima & gradient).** Imagine you're hiking and want to find the **highest point** of a hill. At the very top, the ground is **flat** — your slope is zero ($f'(x) = 0$). That's the key insight: **maxima and minima happen where the derivative is zero**. But how do you know if a flat spot is a peak or a valley? Look at the *curvature* (second derivative): if the ground curves downward ($f'' < 0$), you're at a **peak** (max); if it curves upward ($f'' > 0$), you're in a **valley** (min). This is the second derivative test.

**The multivariate gradient story (partial derivatives).** Now imagine a **mountain range** in 2D — height depends on both $x$ and $y$. A **partial derivative** $\frac{\partial f}{\partial x}$ asks: "If I walk only in the $x$-direction (keeping $y$ fixed), how steep is the slope?" The **gradient** $\nabla f$ combines all partial derivatives into a single arrow pointing **uphill** — the direction of steepest ascent. If you want to go *downhill* (minimize error in ML), you walk in the *opposite* direction of the gradient. That's literally gradient descent.

---

## 📐 Key Formulas

### Limits & Continuity
- $\lim_{x \to a} f(x) = L$; $f$ continuous at $a$ if $\lim_{x\to a} f(x) = f(a)$.
- Standard limits: $\lim_{x\to 0}\frac{\sin x}{x} = 1$, $\;\lim_{x\to 0}(1+x)^{1/x} = e$.

### Differentiation Rules
- Product: $(uv)' = u'v + uv'$
- Quotient: $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$
- Chain: $\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}$
- $\frac{d}{dx}e^x = e^x$, $\;\frac{d}{dx}\ln x = \frac{1}{x}$, $\;\frac{d}{dx}x^n = nx^{n-1}$

### Maxima & Minima
- Critical point: $f'(x) = 0$.
- Second derivative test: $f''(x) > 0$ → local min; $f''(x) < 0$ → local max.

### Partial Derivatives (DA-specific)
- $f_x = \frac{\partial f}{\partial x}$: differentiate w.r.t. $x$, treat $y$ as constant.
- **Gradient**: $\nabla f = \left(\frac{\partial f}{\partial x_1}, \dots, \frac{\partial f}{\partial x_n}\right)$ — points in direction of steepest ascent.
- Hessian: matrix of second partial derivatives $H_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}$.

---

## ✍️ Worked Examples

**Example 1 (Derivative):** $f(x) = x^2 e^x$. Then $f'(x) = 2xe^x + x^2 e^x = xe^x(x+2)$.

**Example 2 (Max/Min):** $f(x) = x^2 - 4x + 3$. Critical point $f'(x) = 2x - 4 = 0$ → $x=2$. $f''(2) = 2 > 0$ → local min.

**Example 3 (Partial derivative):** $f(x,y) = x^2 y + 3y^2$.
- $f_x = 2xy$, $\;f_y = x^2 + 6y$.

**Example 4 (Gradient):** For $f(x,y) = x^2 + y^2$, $\nabla f = (2x, 2y)$. At $(1,1)$: $(2,2)$.

---

## 🎯 GATE PYQs

**Q1 (GATE DA 2024, 2 marks):** The derivative of $f(x) = \ln(x^2 + 1)$ is:
- **Answer:** $\frac{2x}{x^2 + 1}$.

**Q2 (GATE DA 2024, 2 marks):** The function $f(x) = x^3 - 3x$ has a local maximum at:
- **Answer:** $f'(x) = 3x^2 - 3 = 0$ → $x = \pm 1$. $f''(x) = 6x$; at $x=-1$, $f''<0$ → local max at $x = -1$.

**Q3 (GATE DA 2025, 2 marks):** $\lim_{x \to 0} \frac{\sin 3x}{x}$ equals:
- **Answer:** $3$.

**Q4 (GATE DA 2025, 2 marks):** For $f(x,y) = xy$, the partial derivative $\frac{\partial f}{\partial x}$ at $(2,3)$ is:
- **Answer:** $y = 3$.

**Q5 (GATE DA 2026, 2 marks):** The gradient of $f(x,y) = x^2 + 3xy$ at $(1,1)$ is:
- **Answer:** $\nabla f = (2x + 3y, 3x) = (5, 3)$.

---

## 📚 Deep Dive

- [GATE_CS Calculus — Deep Dive](../../GATE_CS/_deep_dives/calculus_deep.md) — integration, series, more PYQs.
- [Optimization](optimization.md) — gradient descent (uses partial derivatives).

---

## 🔗 Prerequisites / Cross-References

- Requires [GATE_CS Discrete Math](../../GATE_CS/01_Engineering_Math/discrete_math.md) (functions).
- Used in [Optimization](optimization.md), [Supervised Learning](../06_Machine_Learning/supervised_learning.md) (gradient descent for regression/NN), and [Statistics](../01_Probability_Statistics/statistics.md).