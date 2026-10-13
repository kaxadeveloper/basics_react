import { ConfigProvider, Empty, Tree, theme } from "antd";
import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";

const BG_COLOR = "rgb(0, 71, 110)";

function toTreeData(list, parentPath = "") {
  return list.map((item) => {
    const path = item.to.startsWith("/")
      ? item.to
      : `${parentPath}/${item.to}`;

    return {
      title: item.label,
      key: path,
      children: item.children?.length
        ? toTreeData(item.children, path)
        : undefined,
    };
  });
}

export default function TreeView({ menus = [] }) {
  const treeData = toTreeData(menus);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Tree: {
            colorBgContainer: BG_COLOR,
            fontSize: 16,
            titleHeight: 36,
          },
        },
      }}
    >
      <div style={{ minHeight: "100vh", width: 350, background: BG_COLOR, padding: 16 }}>
        {treeData.length ? (
          <Tree
            treeData={treeData}
            blockNode
            selectable={false}
            switcherIcon={({ expanded }) =>
              expanded ? (
                <MinusSquareOutlined style={{ fontSize: 18 }} />
              ) : (
                <PlusSquareOutlined style={{ fontSize: 18 }} />
              )
            }
          />
        ) : (
          <Empty description="No menu items" />
        )}
      </div>
    </ConfigProvider>
  );
}
