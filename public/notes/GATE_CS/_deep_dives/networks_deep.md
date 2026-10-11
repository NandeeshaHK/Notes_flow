# Computer Networks — Deep Dive

> In-depth reference for [Computer Networks](../10_Computer_Networks/networks.md). CRC computation, subnetting practice, TCP congestion control, and extended PYQs.

---

## 1. Layering

### OSI Model (7 layers)
1. Physical
2. Data Link
3. Network
4. Transport
5. Session
6. Presentation
7. Application

### TCP/IP Model (4 layers)
1. Network Interface
2. Internet
3. Transport
4. Application

---

## 2. Switching

- **Circuit switching**: dedicated path, reserved bandwidth.
- **Packet switching**: store-and-forward, statistical multiplexing.
- **Virtual circuit**: connection-oriented packet switching.

---

## 3. Data Link Layer

### Framing
- Byte stuffing, bit stuffing.

### Error Detection
- **Parity**: single bit, detects odd errors.
- **CRC**: polynomial division, strong detection.
- **Checksum**: sum complement.

#### 3.1 Worked Example — CRC Computation (Table)

**Given:** Data `1010`, divisor (generator) `1011` (degree 3).

**Step 1 — Append 3 zeros** (degree of divisor) to data: `1010000`.

**Step 2 — Binary division (XOR) table:**

| Step | Dividend | Divisor | XOR result |
|------|----------|---------|------------|
| 1 | 1010 000 | 1011 | 0010 000 |
| 2 | 0010 000 | (shift) | 010 000 |
| 3 | 0100 00 | (shift) | 100 00 |
| 4 | 1000 0 | 1011 | 011 0 |
| 5 | 0110 | (shift) | 110 |
| 6 | 110 | (can't divide) | **110** (remainder) |

**Step 3 — Transmitted codeword:** data + remainder = `1010` + `110` = **`1010110`**.

> 💡 **CRC rule:** Append $n$ zeros (where $n$ = degree of generator polynomial), divide by XOR, and the remainder is the CRC. The receiver divides the received codeword by the same generator — a non-zero remainder indicates an error.

### MAC
- **CSMA/CD**: Ethernet, collision detection.
- **CSMA/CA**: wireless, collision avoidance.

### Ethernet
- 48-bit MAC addresses.
- Frame format: preamble, addresses, type, data, CRC.

---

## 4. Network Layer

### IP Addressing
- IPv4: 32 bits, classes A-E.
- Subnetting: borrow host bits.
- CIDR: variable-length prefix.

### Fragmentation
- Split large packets to fit MTU.
- Total length $= \text{header} + \text{payload}$.

#### 4.1 Worked Example — Fragmentation Table

**Given:** 4000-byte packet (20-byte header, 3980-byte payload), MTU = 1500.

**Step 1 — Max payload per fragment:** $1500 - 20 = 1480$ bytes.

**Step 2 — Number of fragments:** $\lceil 3980 / 1480 \rceil = 3$.

**Step 3 — Fragment table:**

| Fragment | Payload | Header | Total length | Offset | MF flag |
|----------|---------|--------|--------------|--------|---------|
| 1 | 1480 | 20 | 1500 | 0 | 1 |
| 2 | 1480 | 20 | 1500 | 185 | 1 |
| 3 | 1020 | 20 | 1040 | 370 | 0 |

> 💡 **Offset** = bytes already sent / 8 = (fragment index × 1480) / 8. Fragment 2 offset = 1480/8 = 185. Fragment 3 offset = 2960/8 = 370. **MF = 0** on the last fragment.

### Routing
- **Dijkstra**: link state, shortest path.
- **Distance vector**: Bellman-Ford, count-to-infinity.
- **Flooding**: send to all neighbors.

#### 4.2 Worked Example — Subnetting Table

**Given:** Network `192.168.1.0/26`.

**Step 1 — Borrowed bits:** /26 means 26 network bits, so $32 - 26 = 6$ host bits.

**Step 2 — Subnet table:**

| Property | Value |
|----------|-------|
| Subnet mask | 255.255.255.192 |
| # subnets | $2^{26-24} = 4$ (from /24) |
| # addresses per subnet | $2^6 = 64$ |
| # usable hosts per subnet | $64 - 2 = 62$ |
| Block size | 64 |

**Step 3 — Subnet ranges:**

| Subnet | Range | Usable hosts |
|--------|-------|--------------|
| 1 | 192.168.1.0 – .63 | .1 – .62 |
| 2 | 192.168.1.64 – .127 | .65 – .126 |
| 3 | 192.168.1.128 – .191 | .129 – .190 |
| 4 | 192.168.1.192 – .255 | .193 – .254 |

---

## 5. Transport Layer

### UDP
- Connectionless, no reliability, no flow control.

### TCP
- Connection-oriented, reliable, ordered.
- Three-way handshake.
- Flow control: sliding window.
- Congestion control: slow start, congestion avoidance, fast retransmit.

### Sockets
- Endpoint for communication.
- IP + port.

---

## 6. Application Layer

- **HTTP**: web, port 80.
- **FTP**: file transfer, ports 20/21.
- **SMTP**: email sending, port 25.
- **DNS**: domain resolution, port 53.
- **SSH**: secure shell, port 22.

---

## 7. Extended PYQs

**Q6 (GATE 2016, 2 marks):** A 4000-byte packet with 20-byte header, MTU 1500. Number of fragments:
- **Answer:** 3 (payload 3980, max 1480 per fragment).

**Q7 (GATE 2015, 2 marks):** The subnet mask for a /28 network is:
- **Answer:** 255.255.255.240.

**Q8 (GATE 2014, 1 mark):** TCP uses which mechanism for congestion control?
- **Answer:** slow start / congestion avoidance.

---

## 8. References

- Kurose & Ross — *Computer Networking: A Top-Down Approach*
- Forouzan — *Data Communications and Networking*
- NPTEL: Computer Networks (IIT)
- Previous GATE papers