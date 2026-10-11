# Computer Organization — Deep Dive

> In-depth reference for [Computer Organization](../03_Computer_Organization/computer_org.md). Datapath design, hazard handling, cache mapping, and extended PYQs.

---

## 1. Instruction Set Architecture

### Instruction Formats
- Fixed vs variable length.
- RISC: fixed-length, load-store, many registers.
- CISC: variable-length, memory operands.

### Addressing Modes (detailed)
- **Immediate**: operand in instruction.
- **Direct**: address in instruction.
- **Indirect**: memory location holds address.
- **Register**: operand in register.
- **Register indirect**: register holds address.
- **Indexed**: EA = base + index.
- **Relative**: EA = PC + offset.

---

## 2. CPU Design

### Datapath
- Registers, ALU, multiplexers, buses.
- Control signals select operations.

### Control Unit
- **Hardwired**: combinational logic, fast, inflexible.
- **Microprogrammed**: control store, flexible, slower.

### ALU
- Arithmetic (add, sub, mul, div) and logic (AND, OR, XOR, shift) operations.

---

## 3. Pipelining

### Stages (classic 5-stage)
1. IF (Instruction Fetch)
2. ID (Instruction Decode)
3. EX (Execute)
4. MEM (Memory Access)
5. WB (Write Back)

### Hazards
- **Structural**: hardware resource conflict.
- **Data**: RAW, WAR, WAW dependencies.
- **Control**: branch hazards.

### Hazard Handling
- Forwarding (bypassing), stalling, branch prediction.

### Speedup
$$\text{Speedup} = \frac{n \cdot k}{k + (n-1)}$$
- With $k$ stages and $n$ instructions.

#### 3.1 Worked Example — Pipeline Timing Table

**Given:** 4-stage pipeline (IF, ID, EX, WB), 4 instructions I1–I4.

**Pipeline timing (each column = clock cycle):**

| Instr | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|-------|---|---|---|---|---|---|---|
| I1 | IF | ID | EX | WB | | | |
| I2 | | IF | ID | EX | WB | | |
| I3 | | | IF | ID | EX | WB | |
| I4 | | | | IF | ID | EX | WB |

- **Non-pipelined:** 4 instr × 4 stages = 16 cycles.
- **Pipelined:** $4 + (4-1) = 7$ cycles.
- **Speedup** $= 16/7 \approx 2.29$ (approaches 4 as instructions increase).

> 💡 **Pipeline rule:** First instruction takes $k$ cycles, each subsequent instruction takes 1 cycle. Total $= k + (n-1)$ cycles.

---

## 4. Memory Hierarchy

### Cache Mapping
- **Direct mapped**: each block maps to one line.
- **Fully associative**: any block to any line.
- **Set associative**: block maps to a set.

#### 4.1 Cache Mapping Comparison Table

| Feature | Direct Mapped | Set Associative | Fully Associative |
|---------|---------------|-----------------|-------------------|
| Block → line | Fixed (1 option) | Fixed set, any line in set | Any line |
| # sets | # lines | lines / associativity | 1 |
| Tag comparison | 1 | associativity | # lines |
| Hardware cost | Low | Medium | High |
| Hit rate | Lowest | Medium | **Highest** |
| Replacement | None needed | LRU/FIFO within set | LRU/FIFO |

> 💡 **GATE trap:** Fully associative has the highest hit rate but highest hardware cost. Direct mapped is cheapest but has the lowest hit rate (conflict misses).

#### 4.2 Worked Example — Set Associative Cache

**Given:** 64 lines, 4-way set associative.

- Number of sets $= \frac{64}{4} = 16$ sets.
- Each set holds 4 lines.
- A memory block maps to exactly 1 set (via index bits), but can occupy any of the 4 lines in that set.

### Cache Performance
- $T_{eff} = h \cdot T_c + (1-h) \cdot T_m$ (hierarchical)
- Miss rate, miss penalty.

### Virtual Memory
- Page table, TLB (Translation Lookaside Buffer).
- Page fault handling.

---

## 5. I/O Interface

- **Programmed I/O**: CPU polls device.
- **Interrupt-driven**: device interrupts CPU.
- **DMA**: device transfers directly to memory.

---

## 6. Extended PYQs

**Q6 (GATE 2016, 2 marks):** In a 4-stage pipeline, the ideal speedup over non-pipelined is:
- **Answer:** 4 (as $n \to \infty$).

**Q7 (GATE 2015, 2 marks):** A cache with 64 lines, 4-way set associative has how many sets?
- **Answer:** $\frac{64}{4} = 16$ sets.

**Q8 (GATE 2014, 1 mark):** Which cache mapping has the highest hit rate?
- **Answer:** Fully associative.

---

## 7. References

- Patterson & Hennessy — *Computer Organization and Design*
- Morris Mano — *Computer System Architecture*
- NPTEL: Computer Organization (IIT)
- Previous GATE papers