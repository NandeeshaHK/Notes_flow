# C Programming

> **Syllabus:** Programming in C; Functions, Recursion, Parameter passing.
> Revision sheet — focus on GATE traps (pointers, storage classes, recursion).

---

## TL;DR / Key Concepts

- **Data types & operators**: precedence, type conversion, bitwise operators.
- **Control flow**: loops, conditionals, switch.
- **Functions**: declaration, definition, call, recursion.
- **Parameter passing**: pass-by-value (C default), pass-by-reference (via pointers).
- **Pointers & arrays**: pointer arithmetic, arrays as function args.
- **Storage classes**: auto, static, extern, register.

---

## 📐 Key Formulas / Rules

### Operator Precedence (high → low)
1. `() [] -> .`
2. `! ~ ++ -- + - (unary) * & (deref)`
3. `* / %`
4. `+ -`
5. `<< >>`
6. `< <= > >=`
7. `== !=`
8. `& ^ |`
9. `&& ||`
10. `?: =`

### Parameter Passing
- **Pass by value**: copy passed; original unchanged.
- **Pass by reference** (via pointer): original can be modified.
- Arrays always passed by reference (decay to pointer).

### Storage Classes
| Class | Scope | Lifetime | Default value |
|-------|-------|----------|---------------|
| auto | block | block | garbage |
| static | block | program | 0 |
| extern | program | program | 0 |
| register | block | block | garbage |

---

## ✍️ Worked Examples

**Example 1 (Recursion):**
```c
int f(int n) { return n <= 1 ? 1 : n * f(n-1); }
```
- `f(4) = 4 * f(3) = 4 * 3 * f(2) = 4*3*2*f(1) = 24`.

**Example 2 (Pass by value):**
```c
void inc(int x) { x++; }
int a = 5; inc(a); // a still 5
```

**Example 3 (Pointer):**
```c
void inc(int *x) { (*x)++; }
int a = 5; inc(&a); // a becomes 6
```

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 1 mark):** What is the output of `printf("%d", 5 & 3);`?
- **Answer:** $5 = 101$, $3 = 011$, $5 \& 3 = 001 = 1$.

**Q2 (GATE 2020, 2 marks):** 
```c
int f(int n) { if (n <= 1) return 1; return f(n-1) + f(n-2); }
```
The number of calls to `f` for `f(4)` is:
- **Answer:** 9 (Fibonacci recursion tree).

**Q3 (GATE 2019, 1 mark):** In C, arrays are passed to functions by:
- **Answer:** reference (pointer to first element).

**Q4 (GATE 2018, 2 marks):** 
```c
int a = 10; int *p = &a; *p = 20; printf("%d", a);
```
Output:
- **Answer:** 20.

**Q5 (GATE 2017, 1 mark):** The default value of a `static` variable in C is:
- **Answer:** 0.

---

## 📚 Deep Dive

- [C Programming — Deep Dive](../_deep_dives/c_programming_deep.md) — pointer arithmetic, dynamic memory, function pointers, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Foundation for [Data Structures](../04_Programming_Data_Structures/data_structures.md) and [Algorithms](../05_Algorithms/algorithms.md).
- Recursion relates to [Theory of Computation — recursive functions](../06_Theory_of_Computation/toc.md).