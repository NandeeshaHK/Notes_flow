# Computer Networks

> **Syllabus:** Layering (OSI & TCP/IP); packet, circuit, virtual-circuit switching; Data link layer (framing, error detection, MAC, Ethernet); Routing (shortest path, flooding, distance vector, link state); Fragmentation & IP addressing (IPv4, IPv6); Transport (flow control, congestion control, UDP, TCP, sockets); Application (HTTP, FTP, SMTP, DNS, SSH).
> Revision sheet — focus on formulas and GATE traps.

---

## TL;DR / Key Concepts

- **Layering**: OSI (7 layers) vs TCP/IP (4 layers).
- **Switching**: circuit, packet, virtual circuit.
- **Data link**: framing, error detection (parity, CRC), MAC (CSMA/CD), Ethernet.
- **Routing**: Dijkstra, flooding, distance vector, link state.
- **IP**: IPv4/IPv6 addressing, fragmentation, subnetting.
- **Transport**: flow control, congestion control, UDP, TCP.
- **Application**: HTTP, FTP, SMTP, DNS, SSH.

---

## 📐 Key Formulas

### Error Detection
- Parity: even/odd.
- CRC: remainder of polynomial division.

### IP Addressing
- IPv4: 32 bits, dotted decimal.
- Subnet mask, network/host bits.
- IPv6: 128 bits, hexadecimal.

### Fragmentation
- Total length $= \text{header} + \text{payload}$.
- Number of fragments $= \lceil \text{payload} / \text{max payload} \rceil$.

### TCP
- Congestion window, slow start, congestion avoidance.
- Throughput $\approx \frac{\text{window size}}{\text{RTT}}$.

### Efficiency / Utilization
- Stop-and-Wait utilization $= \frac{1}{1 + 2a}$ where $a = \frac{\text{propagation delay}}{\text{transmission time}}$.

---

## ✍️ Worked Examples

**Example 1 (Subnetting):** 192.168.1.0/24 → 256 addresses, 254 usable hosts.

**Example 2 (CRC):** Data 1010, divisor 1011 → append 3 zeros, XOR-divide, remainder = **110**. Codeword = `1010110`.

**Example 3 (Fragmentation):** 4000-byte packet (20-byte header), MTU 1500:

| Fragment | Payload | Total length | Offset | MF |
|----------|---------|--------------|--------|----|
| 1 | 1480 | 1500 | 0 | 1 |
| 2 | 1480 | 1500 | 185 | 1 |
| 3 | 1020 | 1040 | 370 | 0 |

Max payload per fragment $= 1500 - 20 = 1480$ → $\lceil 3980/1480 \rceil = 3$ fragments.

---

## 🎯 GATE PYQs

**Q1 (GATE 2021, 2 marks):** The number of host addresses in a /26 subnet is:
- **Answer:** $2^{32-26} - 2 = 64 - 2 = 62$ usable.

**Q2 (GATE 2020, 1 mark):** Which protocol is connection-oriented?
- **Answer:** TCP.

**Q3 (GATE 2019, 2 marks):** The distance vector routing algorithm is based on:
- **Answer:** Bellman-Ford.

**Q4 (GATE 2018, 2 marks):** IPv6 address size is:
- **Answer:** 128 bits.

**Q5 (GATE 2017, 1 mark):** Which protocol resolves domain names to IP addresses?
- **Answer:** DNS.

---

## 📚 Deep Dive

- [Computer Networks — Deep Dive](../_deep_dives/networks_deep.md) — CRC computation, subnetting practice, TCP congestion control, more PYQs.

---

## 🔗 Prerequisites / Cross-References

- Requires [OS — processes, sockets](../08_Operating_Systems/os.md) and [Algorithm Design — shortest path](../05_Algorithms/algorithm_design.md).
- Error detection relates to [Digital Logic — parity](../02_Digital_Logic/digital_logic.md).
- Probability used in [congestion/throughput analysis](../01_Engineering_Math/probability.md).