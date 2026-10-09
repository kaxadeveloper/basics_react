import { useEffect, useRef, useState } from "react";
import { Alert, Button, Carousel, Empty, Spin } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

ImageSlider.propTypes = {
  url: PropTypes.string.isRequired,
  limit: PropTypes.number,
  page: PropTypes.number,
};

const containerStyle = {
  position: "relative",
  width: 600,
  height: 450,
  borderRadius: 8,
  overflow: "hidden",
  boxShadow: "0 0 7px #700",
};

const imageStyle = {
  width: "100%",
  height: 450,
  objectFit: "cover",
  display: "block",
};

const arrowStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 2,
  boxShadow: "0 0 5px #555",
};

export default function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    async function fetchImages() {
      try {
        setLoading(true);
        setErrorMsg(null);

        const response = await fetch(`${url}?page=${page}&limit=${limit}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setImages(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e.name !== "AbortError") setErrorMsg(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
    return () => controller.abort();
  }, [url, page, limit]);

  if (loading) {
    return (
      <div style={{ ...containerStyle, display: "grid", placeItems: "center", boxShadow: "none" }}>
        <Spin size="large" tip="Loading data! Please wait">
          <div style={{ padding: 50 }} />
        </Spin>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <Alert
        type="error"
        showIcon
        message="Error occurred!"
        description={errorMsg}
        style={{ width: 600 }}
      />
    );
  }

  if (!images.length) {
    return <Empty description="No images found" style={{ width: 600 }} />;
  }

  return (
    <div style={containerStyle}>
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={() => carouselRef.current?.prev()}
        style={{ ...arrowStyle, left: 16 }}
        aria-label="Previous image"
      />

      <Carousel ref={carouselRef} dots={{ className: "slider-dots" }} infinite>
        {images.map((imageItem) => (
          <div key={imageItem.id}>
            <img
              src={imageItem.download_url}
              alt={imageItem.author || imageItem.download_url}
              style={imageStyle}
            />
          </div>
        ))}
      </Carousel>

      <Button
        shape="circle"
        icon={<RightOutlined />}
        onClick={() => carouselRef.current?.next()}
        style={{ ...arrowStyle, right: 16 }}
        aria-label="Next image"
      />
    </div>
  );
}
