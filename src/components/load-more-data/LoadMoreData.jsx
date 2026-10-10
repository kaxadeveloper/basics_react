import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Empty, Row, Spin, Typography } from "antd";

const PAGE_SIZE = 20;
const MAX_PRODUCTS = 100;

export default function LoadMoreData() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setErrorMsg(null);

        const response = await fetch(
          `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${count * PAGE_SIZE}`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        if (result?.products?.length) {
          setProducts((prevData) => [...prevData, ...result.products]);
        }
      } catch (e) {
        if (e.name !== "AbortError") setErrorMsg(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
    return () => controller.abort();
  }, [count]);

  const reachedLimit = products.length >= MAX_PRODUCTS;
  const isFirstLoad = loading && products.length === 0;

  if (isFirstLoad) {
    return (
      <div style={{ padding: 48, textAlign: "center" }}>
        <Spin size="large" tip="Loading data! Please wait.">
          <div style={{ padding: 50 }} />
        </Spin>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: 20 }}>
      {errorMsg && (
        <Alert type="error" showIcon message="Error occurred!" description={errorMsg} />
      )}

      {products.length ? (
        <Row gutter={[16, 16]}>
          {products.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{ height: 200, objectFit: "contain", padding: 12 }}
                  />
                }
              >
                <Card.Meta title={item.title} description={`$${item.price}`} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        !errorMsg && <Empty description="No products found" />
      )}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Button
          type="primary"
          size="large"
          loading={loading}
          disabled={reachedLimit}
          onClick={() => setCount((prev) => prev + 1)}
        >
          Load More Products
        </Button>
        {reachedLimit && (
          <Typography.Text type="secondary">You have reached 100 products</Typography.Text>
        )}
      </div>
    </div>
  );
}
