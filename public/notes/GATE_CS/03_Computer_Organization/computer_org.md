# Computer Organization & Architecture

> **Syllabus:** Machine instructions, addressing modes, ALU, CPU control design, pipelining, memory hierarchy, I/O interface.
> Revision sheet — focus on formulas and GATE traps.

---

## TL;DR / Key Concepts

- **Instruction set**: RISC vs CISC, instruction formats, addressing modes.
- **ALU & CPU**: Datapath, control unit (hardwired vs microprogrammed).
- **Pipelining**: Stages, hazards, speedup.
- **Memory hierarchy**: Cache, main memory, virtual memory, locality.
- **I/O**: Programmed, interrupt-driven, DMA.

---

## 📐 Key Formulas

### Addressing Modes (memorize)
- Immediate: operand in instruction
- Direct: address in instruction
- Indirect: memory holds address
- Register: operand in register
- Register indirect: register holds address
- Indexed: effective address $= \text{base} + \text{index}$

### Pipelining
$$\text{Speedup} = \frac{\text{Time without pipeline}}{\text{Time with pipeline}} = \frac{n \cdot k}{k + (n-1)}$$
- Ideal speedup with $k$ stages $\to k$ (as $n \to \infty$)
- Pipeline cycle time $= \max(\text{stage delays}) + \text{register delay}$

### Cache
- Hit ratio $h$, access time: $T_{avg} = h \cdot T_c + (1-h) \cdot T_m$
- Effective access time with cache: $T_{eff} = h \cdot T_c + (1-h) \cdot (T_c + T_m)$ (simultaneous) or $h \cdot T_c + (1-h) \cdot T_m$ (hierarchical)

### Memory
- Address lines $= \log_2(\text{memory size in words})$
- Cache size $= \text{lines} \times \text{block size} \times \text{word size}$

---

## ✍️ Worked Examples

**Example 1 (Pipelining):** 5-stage pipeline, each stage 2 ns. Speedup for 100 instructions?
- Without: $100 \times 5 \times 2 = 1000$ ns. With: $(5 + 99) \times 2 = 208$ ns. Speedup $\approx 4.8$.

**Example 2 (Cache):** $T_c = 10$ ns, $T_m = 100$ ns, hit ratio 0.9.
- $T_{eff} = 0.9 \times 10 + 0.1 \times 110 = 9 + 11 = 20$ ns.

**Example 3 (Addressing):** 64 KB memory, word size 1 byte → address lines $= \log_2(65536) = 16$.

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 2 marks):** A 5-stage pipeline has stage delays 5, 6, 8, 7, 6 ns. The clock period is:
- **Answer:** $\max = 8$ ns (plus register delay if mentioned).

**Q2 (GATE 2020, 1 mark):** In which addressing mode is the operand itself part of the instruction?
- **Answer:** Immediate addressing.

**Q3 (GATE 2019, 2 marks):** Cache access 10 ns, main memory 100 ns, hit ratio 0.8. Effective access time (hierarchical):
- **Answer:** $0.8 \times 10 + 0.2 \times 110 = 8 + 22 = 30$ ns.

**Q4 (GATE 2018, 1 mark):** The number of address lines for a 1 MB memory (byte-addressable) is:
- **Answer:** $\log_2(2^{20}) = 20$.

**Q5 (GATE 2017, 2 marks):** Which technique allows I/O devices to access memory without CPU intervention?
- **Answer:** DMA (Direct Memory Access).

---

## 📚 Deep Dive

- [Computer Organization — Deep Dive](../_deep_dives/computer_org_deep.md) — datapath design, hazard handling, cache mapping, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Requires [Digital Logic](../02_Digital_Logic/digital_logic.md).
- Foundation for [Operating Systems — memory management, virtual memory](../08_Operating_Systems/os.md).
- Pipelining concepts relate to [Compiler Design — instruction scheduling](../07_Compiler_Design/compiler_design.md).