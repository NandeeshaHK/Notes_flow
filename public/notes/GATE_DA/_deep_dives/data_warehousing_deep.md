# Data Warehousing — Deep Dive

> In-depth reference for [Data Warehousing](../05_Databases_Warehousing/data_warehousing.md). ETL, OLAP operations, schema design, and extended PYQs.

---

## 1. Data Warehouse Architecture

- **ETL**: Extract, Transform, Load — moves data from sources into the warehouse.
- **OLTP** (transactional): normalized, row-oriented, high concurrency.
- **OLAP** (analytical): denormalized, column-oriented, complex queries.

---

## 2. Star Schema

- Central **fact table** with measures + foreign keys.
- Surrounding **dimension tables** (denormalized).
- **Advantages**: simple, fast queries (few joins), easy to understand.
- **Disadvantages**: redundancy, larger storage.

### Example
```
Fact_Sales (sale_id, time_key, product_key, customer_key, amount, qty)
Dim_Time (time_key, year, month, day)
Dim_Product (product_key, name, category, price)
Dim_Customer (customer_key, name, city, region)
```

---

## 3. Snowflake Schema

- Dimensions are **normalized** into sub-dimensions.
- **Advantages**: less redundancy, smaller storage.
- **Disadvantages**: more joins → slower queries, more complex.

### Example
```
Dim_Product (product_key, name, category_key)
Dim_Category (category_key, category_name, dept_key)
Dim_Dept (dept_key, dept_name)
```

---

## 4. OLAP Operations

- **Roll-up**: aggregate (e.g., daily → monthly).
- **Drill-down**: disaggregate (e.g., monthly → daily).
- **Slice**: filter on one dimension.
- **Dice**: filter on multiple dimensions.
- **Pivot**: rotate the data view.

---

## 5. Extended PYQs

**Q6 (GATE DA 2024, 2 marks):** The process of moving data from source systems into a warehouse is called:
- **Answer:** ETL (Extract, Transform, Load).

**Q7 (GATE DA 2025, 2 marks):** Rolling up from daily sales to monthly sales is an example of:
- **Answer:** roll-up (aggregation).

**Q8 (GATE DA 2026, 2 marks):** A snowflake schema is preferred over a star schema when:
- **Answer:** storage space and normalization are priorities over query speed.

---

## 6. References

- Kimball — *The Data Warehouse Toolkit*
- NPTEL: Data Warehousing & Data Mining
- Previous GATE DA papers