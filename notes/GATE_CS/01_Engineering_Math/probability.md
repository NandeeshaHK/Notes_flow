# Probability

> **Syllabus:** Probability axioms, conditional probability, random variables, distributions, expectation, Bayes' theorem.
> Revision sheet — focus on formulas and GATE traps.

---

## TL;DR / Key Concepts

- **Basic probability**: Sample space, events, axioms.
- **Conditional probability & Bayes' theorem**.
- **Random variables**: Discrete & continuous, PMF/PDF, CDF.
- **Distributions**: Binomial, Poisson, Uniform, Normal, Exponential.
- **Expectation & variance**, independence.

---

## 📐 Key Formulas

### Basic Rules
- $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
- $P(A \cap B) = P(A) \cdot P(B)$ if independent
- Conditional: $P(A|B) = \frac{P(A \cap B)}{P(B)}$

### Bayes' Theorem
$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$

### Expectation & Variance
- $E[X] = \sum x \cdot P(x)$ (discrete), $\;E[X] = \int x f(x)\,dx$ (continuous)
- $E[aX + b] = aE[X] + b$
- $\text{Var}(X) = E[X^2] - (E[X])^2$
- $\text{Var}(aX + b) = a^2 \text{Var}(X)$

### Key Distributions
| Distribution | PMF/PDF | Mean | Variance |
|--------------|---------|------|----------|
| Binomial $(n,p)$ | $\binom{n}{k}p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Poisson $(\lambda)$ | $\frac{e^{-\lambda}\lambda^k}{k!}$ | $\lambda$ | $\lambda$ |
| Uniform $(a,b)$ | $\frac{1}{b-a}$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |
| Exponential $(\lambda)$ | $\lambda e^{-\lambda x}$ | $\frac{1}{\lambda}$ | $\frac{1}{\lambda^2}$ |
| Normal $(\mu,\sigma^2)$ | $\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$ | $\mu$ | $\sigma^2$ |

---

## ✍️ Worked Examples

**Example 1 (Conditional):** Two coins tossed. $P(\text{both heads} | \text{at least one head}) = \frac{1/4}{3/4} = \frac{1}{3}$.

**Example 2 (Binomial):** Probability of exactly 2 heads in 3 tosses $= \binom{3}{2}(1/2)^2(1/2)^1 = \frac{3}{8}$.

**Example 3 (Bayes):** A test is 99% accurate. Disease prevalence 1%. If test positive, $P(\text{disease})$?
- $P(D|+) = \frac{0.99 \times 0.01}{0.99 \times 0.01 + 0.01 \times 0.99} = 0.5$.

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 2 marks):** Two fair dice rolled. Probability the sum is 7:
- **Answer:** $\frac{6}{36} = \frac{1}{6}$.

**Q2 (GATE 2020, 1 mark):** If $X \sim \text{Binomial}(n, p)$, then $E[X]$ is:
- **Answer:** $np$.

**Q3 (GATE 2019, 2 marks):** A fair coin tossed 3 times. Probability of at least one head:
- **Answer:** $1 - (1/2)^3 = \frac{7}{8}$.

**Q4 (GATE 2018, 2 marks):** If $X$ and $Y$ are independent with $\text{Var}(X)=4$, $\text{Var}(Y)=9$, then $\text{Var}(X+Y)$:
- **Answer:** $4 + 9 = 13$ (independent → variances add).

**Q5 (GATE 2017, 1 mark):** The mean of a Poisson distribution with parameter $\lambda$ is:
- **Answer:** $\lambda$.

---

## 📚 Deep Dive

- [Probability — Deep Dive](../_deep_dives/probability_deep.md) — continuous distributions, joint distributions, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Requires [Discrete Math — Combinatorics](../01_Engineering_Math/discrete_math.md) and [Calculus](../01_Engineering_Math/calculus.md).
- Used in [Networks — error detection, congestion](../10_Computer_Networks/networks.md) and [OS — scheduling analysis](../08_Operating_Systems/os.md).