# Probability

> **Syllabus:** Counting, conditional probability, Bayes' theorem, random variables, distribution functions (Binomial, Poisson, Normal), expectation, variance, conditional expectation.
> Revision sheet — focus on formulas and GATE traps.

> **Note:** Foundational probability (axioms, conditional probability, Bayes, random variables, distributions, expectation/variance) is covered in depth in the [GATE_CS Probability](../../GATE_CS/01_Engineering_Math/probability.md) notes. This sheet cross-references that content and adds the **DA-specific** topic of **conditional expectation**.

---

## TL;DR / Key Concepts

- **Counting**: Permutations, combinations, pigeonhole principle.
- **Conditional probability & Bayes' theorem**.
- **Random variables**: Discrete & continuous, PMF/PDF, CDF.
- **Distributions**: Binomial, Poisson, Normal (also Uniform, Exponential).
- **Expectation & variance**, independence.
- **Conditional expectation** $E[X \mid Y]$ — the DA-specific addition.

```mermaid
flowchart TD
    A[Sample Space & Events] --> B[Probability Rules]
    B --> C[Conditional Probability]
    C --> D[Bayes' Theorem]
    B --> E[Random Variables]
    E --> F[Discrete<br/>PMF]
    E --> G[Continuous<br/>PDF]
    F --> H[Binomial / Poisson]
    G --> I[Normal / Uniform / Exponential]
    F --> J[Expectation E[X]]
    G --> J
    J --> K[Variance Var(X)]
    C --> L[Conditional Expectation E[X|Y]]
    J --> L
```

### Random Variable Types
| Type | PMF/PDF | CDF | Example |
|------|---------|-----|---------|
| **Discrete** | $P(X=x)$ | $F(x)=\sum_{t\le x}P(t)$ | # heads in 3 tosses |
| **Continuous** | $f(x)$, $\int f=1$ | $F(x)=\int_{-\infty}^x f(t)dt$ | height, time |

---

## 🎭 Story / Intuition

**The doctor's dilemma (Bayes' theorem).** Imagine you go to a doctor who tells you a rare disease test came back **positive**. The test is 99% accurate. You panic — "99% accurate means I'm 99% likely to have the disease, right?" **Wrong!** Here's the catch: the disease is rare (only 1 in 100 people have it). So out of 100 people, only 1 actually has the disease. The test correctly catches that 1 person (99% of 1 ≈ 1). But it also falsely flags ~1 of the 99 healthy people (1% of 99 ≈ 1). So among the ~2 people who test positive, only **1 actually has the disease** → your real chance is about **50%**, not 99%! This is exactly what Bayes' theorem computes — it updates your belief based on how rare the event is.

**The coin-toss intuition (random variables & expectation).** Think of a random variable as a **question you ask about a random experiment**. "How many heads in 3 tosses?" is a random variable $X$ that can be 0, 1, 2, or 3. The **expectation** $E[X]$ is just the **long-run average** — if you toss 3 coins a million times, the average number of heads settles at $1.5$. It's like asking "what's the average score of the class?" — it doesn't mean anyone actually scored 1.5, it's just the center of the distribution.

**Why variance matters.** Two classes can both average 70 on a test, but one class has everyone scoring 68-72 (low variance = consistent) while the other has scores from 20 to 100 (high variance = unpredictable). Variance measures **spread**, not just the center. In ML, high variance in your data means your model has to work harder.

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

### Conditional Expectation (DA-specific)
- $E[X \mid Y = y] = \sum_x x \cdot P(X = x \mid Y = y)$ (discrete)
- **Law of total expectation (tower property):** $E[X] = E\big[E[X \mid Y]\big]$
- $E[X \mid Y]$ is a **random variable** (function of $Y$).
- If $X, Y$ independent: $E[X \mid Y] = E[X]$.

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

**Example 4 (Conditional Expectation):** Let $Y$ be the number of heads in 2 tosses, and $X$ the number of heads in 3 tosses. Then $E[X \mid Y=1]$:
- Given $Y=1$, the remaining 1 toss is fair → $E[X \mid Y=1] = 1 + 0.5 = 1.5$.

---

## 🎯 GATE PYQs

**Q1 (GATE DA 2024, 2 marks):** Two fair dice are rolled. The probability that the sum is 7 is:
- **Answer:** $\frac{6}{36} = \frac{1}{6}$.

**Q2 (GATE DA 2024, 2 marks):** If $X \sim \text{Binomial}(n, p)$, then $E[X]$ is:
- **Answer:** $np$.

**Q3 (GATE DA 2025, 2 marks):** A fair coin is tossed 3 times. The probability of at least one head is:
- **Answer:** $1 - (1/2)^3 = \frac{7}{8}$.

**Q4 (GATE DA 2025, 2 marks):** If $X$ and $Y$ are independent with $\text{Var}(X)=4$, $\text{Var}(Y)=9$, then $\text{Var}(X+Y)$ is:
- **Answer:** $4 + 9 = 13$ (independent → variances add).

**Q5 (GATE DA 2026, 2 marks):** The mean of a Poisson distribution with parameter $\lambda$ is:
- **Answer:** $\lambda$.

---

## 📚 Deep Dive

- [GATE_CS Probability — Deep Dive](../../GATE_CS/_deep_dives/probability_deep.md) — continuous distributions, joint distributions, more PYQs.
- [Statistics](statistics.md) — sampling, CLT, hypothesis testing (builds on this).

---

## 🔗 Prerequisites / Cross-References

- Requires [GATE_CS Discrete Math — Combinatorics](../../GATE_CS/01_Engineering_Math/discrete_math.md) and [GATE_CS Calculus](../../GATE_CS/01_Engineering_Math/calculus.md).
- Used in [Statistics](statistics.md), [Supervised Learning](../06_Machine_Learning/supervised_learning.md) (Naive Bayes), and [Model Evaluation](../06_Machine_Learning/model_evaluation.md).