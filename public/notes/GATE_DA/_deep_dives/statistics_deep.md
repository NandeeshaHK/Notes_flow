# Statistics — Deep Dive

> In-depth reference for [Statistics](../01_Probability_Statistics/statistics.md). Sampling distributions, hypothesis testing details, and extended PYQs.

---

## 1. Descriptive Statistics

### Measures of Central Tendency
- **Mean**: $\bar{x} = \frac{1}{n}\sum x_i$ — sensitive to outliers.
- **Median**: middle value — robust to outliers.
- **Mode**: most frequent value.

### Measures of Spread
- Range $= \max - \min$
- Variance (population): $\sigma^2 = \frac{1}{n}\sum (x_i - \mu)^2$
- Variance (sample): $s^2 = \frac{1}{n-1}\sum (x_i - \bar{x})^2$ (Bessel's correction)
- Standard deviation: $\sigma = \sqrt{\sigma^2}$

---

## 2. Covariance & Correlation

- $\text{Cov}(X,Y) = E[XY] - E[X]E[Y]$
- $\text{Cov}(X,X) = \text{Var}(X)$
- $\text{Cov}(aX, bY) = ab\,\text{Cov}(X,Y)$
- Pearson correlation: $\rho = \frac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y}$
- Properties: $-1 \le \rho \le 1$; $\rho = \pm 1$ iff perfect linear relation.

---

## 3. Regression

### Simple Linear Regression
- Model: $y = \beta_0 + \beta_1 x + \varepsilon$
- Least squares: minimize $\sum (y_i - \beta_0 - \beta_1 x_i)^2$
- $\beta_1 = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sum (x_i - \bar{x})^2} = \frac{\text{Cov}(X,Y)}{\text{Var}(X)}$
- $\beta_0 = \bar{y} - \beta_1 \bar{x}$
- $R^2 = 1 - \frac{\text{SSE}}{\text{SST}} = \rho^2$ (simple regression)

---

## 4. Sampling & CLT

- **Sample mean**: $\bar{X}_n = \frac{1}{n}\sum X_i$
- **CLT**: for large $n$, $\bar{X}_n \approx N(\mu, \sigma^2/n)$.
- **Standard error**: $\text{SE} = \frac{\sigma}{\sqrt{n}}$.
- **Law of large numbers**: $\bar{X}_n \to \mu$ as $n \to \infty$.

---

## 5. Hypothesis Testing

### Steps
1. State $H_0$ and $H_1$.
2. Choose significance level $\alpha$ (commonly 0.05).
3. Compute test statistic.
4. Compare with critical value / compute p-value.
5. Reject or fail to reject $H_0$.

### Common Tests
- **z-test** (known $\sigma$): $z = \frac{\bar{x} - \mu_0}{\sigma/\sqrt{n}}$
- **t-test** (unknown $\sigma$): $t = \frac{\bar{x} - \mu_0}{s/\sqrt{n}}$, df $= n-1$
- **Chi-square test**: goodness of fit / independence.

### Errors
- Type I ($\alpha$): reject true $H_0$.
- Type II ($\beta$): fail to reject false $H_0$.
- Power $= 1 - \beta$.

---

## 6. Extended PYQs

**Q6 (GATE DA 2024, 2 marks):** If the correlation coefficient between two variables is $-0.8$, the relationship is:
- **Answer:** strong negative linear.

**Q7 (GATE DA 2025, 2 marks):** The sample variance uses $n-1$ in the denominator to:
- **Answer:** correct for bias (unbiased estimator of population variance).

**Q8 (GATE DA 2026, 2 marks):** Increasing the sample size in a hypothesis test:
- **Answer:** decreases the standard error and increases power.

---

## 7. References

- Sheldon Ross — *A First Course in Probability*
- NPTEL: Probability & Statistics (IIT)
- Previous GATE DA papers