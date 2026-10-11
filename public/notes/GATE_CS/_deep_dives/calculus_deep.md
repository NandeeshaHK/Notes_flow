# Calculus — Deep Dive

> In-depth reference for [Calculus](../01_Engineering_Math/calculus.md). Partial derivatives, multiple integrals, series convergence, and extended PYQs.

---

## 1. Limits & Continuity

### L'Hôpital's Rule
- If $\lim \frac{f(x)}{g(x)} = \frac{0}{0}$ or $\frac{\infty}{\infty}$, then $\lim \frac{f(x)}{g(x)} = \lim \frac{f'(x)}{g'(x)}$.

### Continuity
- $f$ continuous at $a$ if $\lim_{x \to a} f(x) = f(a)$.

---

## 2. Differentiation — Advanced

### Differentiation Rules Table

| Function | Derivative |
|----------|------------|
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $a^x$ | $a^x \ln a$ |
| $\ln x$ | $\frac{1}{x}$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |
| $uv$ | $u'v + uv'$ |
| $\frac{u}{v}$ | $\frac{u'v - uv'}{v^2}$ |

### Partial Derivatives
- $\frac{\partial f}{\partial x}$ treats $y$ as constant.
- Chain rule for multivariable: $\frac{df}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}$.

### Maxima/Minima (Multivariable)
- Critical point: $\nabla f = 0$.
- Second derivative test via Hessian determinant.

#### 2.1 Worked Example — Max/Min (Table)

**Given:** $f(x) = x^3 - 3x^2 + 2$

| Step | Calculation | Result |
|------|-------------|--------|
| Find critical points | $f'(x) = 3x^2 - 6x = 3x(x-2) = 0$ | $x = 0, 2$ |
| Second derivative | $f''(x) = 6x - 6$ | — |
| Test $x=0$ | $f''(0) = -6 < 0$ | **Local max** |
| Test $x=2$ | $f''(2) = 6 > 0$ | **Local min** |

---

## 3. Integration — Advanced

### Methods
- Substitution: $\int f(g(x))g'(x)dx = \int f(u)du$.
- By parts: $\int u\,dv = uv - \int v\,du$.
- Partial fractions for rational functions.

### Definite Integral Properties
- $\int_a^b f(x)dx = -\int_b^a f(x)dx$
- $\int_a^b f(x)dx = \int_a^c f(x)dx + \int_c^b f(x)dx$
- $\int_0^a f(x)dx = \int_0^a f(a-x)dx$

### Multiple Integrals
- Double integral: $\iint_R f(x,y)\,dA$ — area under surface.
- Change of variables (Jacobian).

---

## 4. Series

### Convergence Tests
- Ratio test: $\lim \left|\frac{a_{n+1}}{a_n}\right| < 1$ → converges.
- Root test, comparison test, integral test.

### Common Expansions
- $e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$
- $\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots$
- $\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots$
- $\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots$

---

## 5. Extended PYQs

**Q6 (GATE 2016, 2 marks):** $\lim_{x \to 0} \frac{\tan x - x}{x^3}$ equals:
- **Answer:** $\frac{1}{3}$ (series expansion).

**Q7 (GATE 2015, 2 marks):** The maximum value of $f(x,y) = xy$ subject to $x + y = 4$ is:
- **Answer:** 4 (at $x=y=2$).

**Q8 (GATE 2014, 1 mark):** $\int_0^1 \int_0^1 xy \, dx\,dy$ equals:
- **Answer:** $\frac{1}{4}$.

---

## 6. References

- Thomas — *Calculus*
- NPTEL: Calculus (IIT)
- Previous GATE papers