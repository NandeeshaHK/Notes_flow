# Model Evaluation — Deep Dive

> In-depth reference for [Model Evaluation](../06_Machine_Learning/model_evaluation.md). ROC/AUC, regularization, learning curves, and extended PYQs.

---

## 1. Bias-Variance Tradeoff

$$\text{Expected error} = \text{Bias}^2 + \text{Variance} + \text{Irreducible noise}$$

- **Bias**: error from overly simple assumptions (underfitting).
- **Variance**: error from sensitivity to training data (overfitting).
- **Tradeoff**: increasing model complexity decreases bias but increases variance.

---

## 2. Confusion Matrix & Metrics

| | Predicted Pos | Predicted Neg |
|---|---|---|
| **Actual Pos** | TP | FN |
| **Actual Neg** | FP | TN |

- Accuracy $= \frac{TP+TN}{TP+TN+FP+FN}$
- Precision $= \frac{TP}{TP+FP}$
- Recall $= \frac{TP}{TP+FN}$
- $F_1 = 2\frac{P \cdot R}{P + R}$
- Specificity $= \frac{TN}{TN+FP}$

---

## 3. ROC & AUC

- **ROC curve**: plots TPR (recall) vs FPR ($1 - $ specificity) across thresholds.
- **AUC**: area under ROC; ranges 0.5 (random) to 1.0 (perfect).
- Higher AUC → better ranking ability.

---

## 4. Cross-Validation

- **K-fold**: split into $K$ folds; train on $K-1$, validate on 1; average results.
- **LOOCV**: $K = n$; expensive but uses all data for training.
- **Stratified K-fold**: preserves class proportions in each fold (good for imbalance).

---

## 5. Regularization (reduces overfitting)

- **L1 (Lasso)**: adds $\lambda\|w\|_1$ — sparse.
- **L2 (Ridge)**: adds $\lambda\|w\|_2^2$ — shrinks weights.
- **Dropout** (NN): randomly drop neurons during training.
- **Early stopping**: stop training when validation error rises.

---

## 6. Extended PYQs

**Q6 (GATE DA 2024, 2 marks):** An AUC of 0.5 indicates:
- **Answer:** a model no better than random guessing.

**Q7 (GATE DA 2025, 2 marks):** Stratified K-fold cross-validation is used to:
- **Answer:** preserve class distribution in each fold.

**Q8 (GATE DA 2026, 2 marks):** L2 regularization penalizes:
- **Answer:** the squared magnitude of the weights.

---

## 7. References

- Bishop — *Pattern Recognition and Machine Learning*
- Andrew Ng — *Machine Learning* (Coursera)
- NPTEL: Introduction to Machine Learning (IIT)
- Previous GATE DA papers