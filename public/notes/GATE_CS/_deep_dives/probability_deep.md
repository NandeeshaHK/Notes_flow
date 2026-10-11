# Probability — Deep Dive

> In-depth reference for [Probability](../01_Engineering_Math/probability.md). Continuous distributions, joint distributions, and extended PYQs.

---

## 1. Probability Axioms & Rules

### Axioms
- $0 \le P(A) \le 1$
- $P(S) = 1$ (sample space)
- Countable additivity for disjoint events.

### Conditional Probability
- $P(A|B) = \frac{P(A \cap B)}{P(B)}$, $P(B) > 0$
- Law of total probability: $P(A) = \sum_i P(A|B_i)P(B_i)$

### Bayes' Theorem
$$P(A|B) = \frac{P(B|A)P(A)}{\sum_i P(B|A_i)P(A_i)}$$

---

## 2. Random Variables

### Discrete
- PMF: $P(X = x)$
- CDF: $F(x) = P(X \le x)$

### Continuous
- PDF: $f(x)$, with $\int_{-\infty}^{\infty} f(x)dx = 1$
- CDF: $F(x) = \int_{-\infty}^x f(t)dt$
- $P(a \le X \le b) = \int_a^b f(x)dx$

---

## 3. Distributions — Detailed

### Binomial
- $n$ independent trials, success prob $p$.
- $P(X=k) = \binom{n}{k}p^k(1-p)^{n-k}$

### Poisson
- Rare events, rate $\lambda$.
- $P(X=k) = \frac{e^{-\lambda}\lambda^k}{k!}$

### Normal
- Bell curve, symmetric about $\mu$.
- Standard normal: $Z = \frac{X - \mu}{\sigma}$.

### Exponential
- Memoryless: $P(X > s+t | X > s) = P(X > t)$.
- Models inter-arrival times.

#### 3.1 Distribution Comparison Table

| Distribution | Type | Parameters | Mean | Variance | Use case |
|--------------|------|-----------|------|----------|----------|
| Binomial | Discrete | $n, p$ | $np$ | $np(1-p)$ | # successes in $n$ trials |
| Poisson | Discrete | $\lambda$ | $\lambda$ | $\lambda$ | Rare events over time |
| Uniform | Continuous | $a, b$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ | Equally likely values |
| Exponential | Continuous | $\lambda$ | $\frac{1}{\lambda}$ | $\frac{1}{\lambda^2}$ | Inter-arrival times |
| Normal | Continuous | $\mu, \sigma^2$ | $\mu$ | $\sigma^2$ | Sum of many variables |

#### 3.2 Worked Example — Binomial Probability (Table)

**Given:** A fair coin tossed 4 times. Find $P(\text{exactly 2 heads})$.

| Outcome | # heads | Probability |
|---------|---------|-------------|
| HHHH | 4 | $\binom{4}{4}(1/2)^4 = 1/16$ |
| HHHT | 3 | $\binom{4}{3}(1/2)^4 = 4/16$ |
| HHTT | 2 | $\binom{4}{2}(1/2)^4 = 6/16$ |
| HTTT | 1 | $\binom{4}{1}(1/2)^4 = 4/16$ |
| TTTT | 0 | $\binom{4}{0}(1/2)^4 = 1/16$ |

$$P(\text{exactly 2 heads}) = \binom{4}{2}(1/2)^2(1/2)^2 = \frac{6}{16} = \frac{3}{8}$$

---

## 4. Joint Distributions

- Joint PMF/PDF: $P(X=x, Y=y)$.
- Marginal: sum/integrate out the other variable.
- Independence: $f(x,y) = f_X(x)f_Y(y)$.
- Covariance: $\text{Cov}(X,Y) = E[XY] - E[X]E[Y]$.
- Correlation: $\rho = \frac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y}$.

---

## 5. Extended PYQs

**Q6 (GATE 2016, 2 marks):** If $X$ is uniform on $[0, 4]$, then $P(1 \le X \le 3)$ is:
- **Answer:** $\frac{3-1}{4-0} = \frac{1}{2}$.

**Q7 (GATE 2015, 2 marks):** The expected value of a Poisson random variable with $\lambda = 5$ is:
- **Answer:** 5.

**Q8 (GATE 2014, 1 mark):** If $X$ and $Y$ are independent, then $\text{Cov}(X,Y)$ is:
- **Answer:** 0.

---

## 6. References

- Sheldon Ross — *A First Course in Probability*
- NPTEL: Probability (IIT)
- Previous GATE papers