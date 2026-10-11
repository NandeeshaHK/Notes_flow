# Calculus

> **Syllabus:** Limits, continuity, differentiation, integration, maxima/minima, series.
> Revision sheet — focus on formulas and GATE traps.

---

## TL;DR / Key Concepts

- **Limits & continuity**: L'Hôpital's rule, standard limits.
- **Differentiation**: Rules, chain rule, partial derivatives, maxima/minima.
- **Integration**: Definite/indefinite, substitution, by parts, area under curve.
- **Series**: Taylor/Maclaurin expansions, convergence.

---

## 📐 Key Formulas

### Standard Limits
- $\lim_{x \to 0} \frac{\sin x}{x} = 1$
- $\lim_{x \to 0} \frac{e^x - 1}{x} = 1$
- $\lim_{x \to 0} (1 + x)^{1/x} = e$
- $\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e$

### Differentiation
- $\frac{d}{dx}(uv) = u'v + uv'$ (product rule)
- $\frac{d}{dx}\left(\frac{u}{v}\right) = \frac{u'v - uv'}{v^2}$ (quotient rule)
- Chain rule: $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$

### Maxima / Minima
- Critical point: $f'(x) = 0$
- $f''(x) > 0$ → local minimum; $f''(x) < 0$ → local maximum

### Integration
- $\int x^n dx = \frac{x^{n+1}}{n+1} + C$
- Integration by parts: $\int u\,dv = uv - \int v\,du$
- $\int_0^a f(x)\,dx = \int_0^a f(a-x)\,dx$

### Taylor Series
$$f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots$$

---

## ✍️ Worked Examples

**Example 1 (Limit):** $\lim_{x \to 0} \frac{\sin 3x}{x} = 3 \cdot \lim_{x\to0}\frac{\sin 3x}{3x} = 3$.

**Example 2 (Max/Min):** $f(x) = x^2 - 4x + 3$. $f'(x) = 2x - 4 = 0 \Rightarrow x = 2$. $f''(2) = 2 > 0$ → local minimum at $x=2$.

**Example 3 (Integration):** $\int_0^1 x^2 dx = \left[\frac{x^3}{3}\right]_0^1 = \frac{1}{3}$.

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 1 mark):** $\lim_{x \to 0} \frac{e^x - 1 - x}{x^2}$ equals:
- **Answer:** $\frac{1}{2}$ (use L'Hôpital twice or series expansion).

**Q2 (GATE 2020, 1 mark):** The maximum value of $f(x) = -x^2 + 4x$ is:
- **Answer:** at $x = 2$, $f(2) = 4$.

**Q3 (GATE 2019, 2 marks):** $\int_0^{\pi/2} \sin x \, dx$ equals:
- **Answer:** $[-\cos x]_0^{\pi/2} = 0 - (-1) = 1$.

**Q4 (GATE 2018, 1 mark):** $\lim_{x \to \infty} \left(1 + \frac{2}{x}\right)^x$ equals:
- **Answer:** $e^2$.

**Q5 (GATE 2017, 2 marks):** The Taylor series of $e^x$ about $x=0$ up to $x^2$ term is:
- **Answer:** $1 + x + \frac{x^2}{2}$.

---

## 📚 Deep Dive

- [Calculus — Deep Dive](../_deep_dives/calculus_deep.md) — partial derivatives, multiple integrals, series convergence, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Foundation for [Linear Algebra](../01_Engineering_Math/linear_algebra.md) and [Probability](../01_Engineering_Math/probability.md).
- Maxima/minima used in [Algorithms — optimization](../05_Algorithms/algorithm_design.md).