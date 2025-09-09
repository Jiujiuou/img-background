import useStore from "@/store";
import { saveConfig, loadConfig } from "@/utils/config";
import style from "./index.module.less";
import { Message, Button } from "@arco-design/web-react";

function Header({ download }) {
  const store = useStore();
  const _Ratio = store._Ratio;
  // 保存当前配置
  const handleSaveConfig = () => {
    const config = {
      _Ratio: store._Ratio,
      _ImageRatio: store._ImageRatio,
      _FilterStyle: store._FilterStyle,
      _ImageControlValues: store._ImageControlValues, // 🚀 使用单一状态源
      _BackgroundType: store._BackgroundType,
      _BackgroundColor: store._BackgroundColor,
    };

    if (saveConfig(config)) {
      Message.success("配置保存成功");
    } else {
      Message.warn("配置保存失败");
    }
  };

  // 导入配置
  const handleLoadConfig = () => {
    const config = loadConfig();
    if (config) {
      store.updateConfig(config);
      Message.success("导入保存成功");
    } else {
      Message.warn("导入保存成功");
    }
  };

  return (
    <div className={style.header}>
      <div className={style.name}>Jiujiu-Tool</div>
      <div className={style.actions}>
        <div className={style.button} onClick={handleLoadConfig}>
          导入配置
        </div>
        <div className={style.button} onClick={handleSaveConfig}>
          保存配置
        </div>
        <div className={style.button} onClick={() => download(_Ratio)}>
          下载
        </div>
      </div>
    </div>
  );
}

export default Header;
