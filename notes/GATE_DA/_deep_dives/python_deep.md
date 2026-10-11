# Python — Deep Dive

> In-depth reference for [Python](../04_Programming_Data_Structures/python.md). Advanced features, numpy/pandas, and extended PYQs.

---

## 1. Advanced Python

### Generators
```python
def gen():
    for i in range(3):
        yield i          # lazy evaluation
```
- Memory efficient; `next(gen())` yields one at a time.

### Decorators
```python
def timer(fn):
    def wrapper(*args, **kwargs):
        # ... timing logic ...
        return fn(*args, **kwargs)
    return wrapper

@timer
def work(): ...
```

### `*args` / `**kwargs`
- `*args`: variable positional arguments (tuple).
- `**kwargs`: variable keyword arguments (dict).

---

## 2. numpy (Numerical Computing)

- `np.array([1,2,3])` — N-dimensional array.
- Vectorized ops: `a + b`, `a * b` (element-wise).
- `np.dot(a, b)` / `a @ b` — matrix multiplication.
- `np.mean`, `np.std`, `np.var`, `np.cov`.
- `np.linalg.eig`, `np.linalg.svd`, `np.linalg.inv`.

### Example
```python
import numpy as np
A = np.array([[1, 2], [3, 4]])
print(np.linalg.det(A))   # -2.0
```

---

## 3. pandas (Data Analysis)

- `pd.DataFrame(data)` — tabular data.
- `df.head()`, `df.describe()`, `df.groupby('col').mean()`.
- `df.isnull().sum()` — missing values.
- `df.dropna()`, `df.fillna(value)`.

---

## 4. Time & Space Complexity in Python

- List indexing: $O(1)$; `x in list`: $O(n)$.
- `x in set` / `x in dict`: $O(1)$ average.
- `list.append`: amortized $O(1)$.
- `list.insert(0, x)`: $O(n)$.

---

## 5. Extended PYQs

**Q6 (GATE DA 2024, 2 marks):** The output of `print(2 ** 3 ** 2)` is:
- **Answer:** $2^{(3^2)} = 2^9 = 512$ (right-associative exponentiation).

**Q7 (GATE DA 2025, 2 marks):** `np.array([1,2,3]) * 2` produces:
- **Answer:** `array([2, 4, 6])` (element-wise).

**Q8 (GATE DA 2026, 2 marks):** A Python generator is used to:
- **Answer:** produce values lazily, one at a time, saving memory.

---

## 6. References

- Python Official Documentation
- NPTEL: Programming, Data Structures and Algorithms using Python (IIT)
- Previous GATE DA papers