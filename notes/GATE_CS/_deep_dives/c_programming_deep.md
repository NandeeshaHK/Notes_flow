# C Programming — Deep Dive

> In-depth reference for [C Programming](../04_Programming_Data_Structures/c_programming.md). Pointer arithmetic, dynamic memory, function pointers, and extended PYQs.

---

## 1. Data Types & Operators

### Type Conversion
- Implicit: int → float → double (widening).
- Explicit: cast `(type)value`.
- Integer division truncates.

### Bitwise Operators
- `&` AND, `|` OR, `^` XOR, `~` NOT, `<<` left shift, `>>` right shift.
- Left shift by 1 = multiply by 2; right shift = divide by 2.

#### 1.1 Bitwise Operations Table (5 = 101, 3 = 011)

| Operation | Binary | Decimal |
|-----------|--------|---------|
| `5 & 3` | 101 & 011 | 001 = **1** |
| `5 \| 3` | 101 \| 011 | 111 = **7** |
| `5 ^ 3` | 101 ^ 011 | 110 = **6** |
| `~5` | ~101 | ...010 = **-6** |
| `5 << 1` | 1010 | **10** |
| `5 >> 1` | 10 | **2** |

> 💡 **GATE trap:** `~5` = -6 (not 2) because `~` flips all bits including the sign bit in 2's complement.

---

## 2. Pointers & Arrays

### Pointer Arithmetic
- `p + 1` advances by `sizeof(*p)` bytes.
- `int *p; p++` advances 4 bytes (on 32-bit int).

#### 2.1 Pointer Arithmetic Table

**Given:** `int a[5] = {10, 20, 30, 40, 50}; int *p = a;` (assume `a` at address 1000)

| Expression | Value | Address |
|------------|-------|---------|
| `p` | 10 | 1000 |
| `p + 1` | 20 | 1004 |
| `p + 2` | 30 | 1008 |
| `*(p + 3)` | 40 | 1012 |
| `p[4]` | 50 | 1016 |

> 💡 **Key rule:** `p + i` advances by `i × sizeof(int)` = `i × 4` bytes. `*(p+i)` ≡ `p[i]`.

### Arrays & Pointers
- `arr[i]` ≡ `*(arr + i)`.
- Array name decays to pointer to first element.
- `sizeof(arr)` gives total bytes; `sizeof(ptr)` gives pointer size.

### Dynamic Memory
- `malloc`, `calloc`, `realloc`, `free`.
- `malloc` doesn't initialize; `calloc` zero-initializes.

---

## 3. Functions & Recursion

### Parameter Passing
- Pass by value: copy.
- Pass by reference: via pointer.
- Arrays always by reference.

### Recursion
- Base case + recursive case.
- Stack depth limits recursion.
- Tail recursion can be optimized.

---

## 4. Storage Classes & Scope

- `auto`: local, block scope.
- `static`: persists across calls, initialized once to 0.
- `extern`: global, visible across files.
- `register`: hint to store in register.

---

## 5. Extended PYQs

**Q6 (GATE 2016, 2 marks):**
```c
int a[5] = {1,2,3,4,5};
int *p = a;
printf("%d", *(p+3));
```
- **Answer:** 4.

**Q7 (GATE 2015, 2 marks):** What does `sizeof(char*)` return on a 64-bit system?
- **Answer:** 8 bytes.

**Q8 (GATE 2014, 1 mark):** `malloc(0)` returns:
- **Answer:** a valid pointer or NULL (implementation-defined).

---

## 6. References

- Kernighan & Ritchie — *The C Programming Language*
- Previous GATE papers