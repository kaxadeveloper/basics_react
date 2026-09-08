import { useEffect, useState } from "react";
import { Button, Typography, Space, Card } from "antd";
import { BgColorsOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }

  function handleCreateRandomHexColor() {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }
    setColor(hexColor);
  }

  function handleCreateRandomRgbColor() {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);
    setColor(`rgb(${r}, ${g}, ${b})`);
  }

  useEffect(() => {
    if (typeOfColor === "rgb") handleCreateRandomRgbColor();
    else handleCreateRandomHexColor();
  }, [typeOfColor]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: color,
        transition: "all 0.5s ease"
      }}
    >
      <Space direction="vertical" align="center" size={24}>
        {/* Simple Button Group for Mode Selection */}
        <Space>
          <Button 
            type={typeOfColor === "hex" ? "primary" : "default"}
            onClick={() => setTypeOfColor("hex")}
          >
            HEX Mode
          </Button>
          <Button 
            type={typeOfColor === "rgb" ? "primary" : "default"}
            onClick={() => setTypeOfColor("rgb")}
          >
            RGB Mode
          </Button>
          <Button 
            icon={<BgColorsOutlined />} 
            onClick={typeOfColor === "hex" ? handleCreateRandomHexColor : handleCreateRandomRgbColor}
          >
            Generate New Color
          </Button>
        </Space>

        {/* Display Card */}
        <Card 
          style={{ 
            textAlign: "center", 
            width: 350, 
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)" 
          }}
        >
          <Text type="secondary" strong style={{ fontSize: "16px" }}>
            {typeOfColor.toUpperCase()}
          </Text>
          <Title level={1} style={{ margin: "10px 0 0 0", fontFamily: "monospace" }}>
            {color}
          </Title>
        </Card>
      </Space>
    </div>
  );
}