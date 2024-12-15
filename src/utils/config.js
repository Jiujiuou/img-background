const CONFIG_KEY = 'IMG_SHADOW_CONFIG';

// 保存配置到localStorage
export const saveConfig = (config) => {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('保存配置失败:', error);
    return false;
  }
};

// 从localStorage加载配置
export const loadConfig = () => {
  try {
    const configStr = localStorage.getItem(CONFIG_KEY);
    return configStr ? JSON.parse(configStr) : null;
  } catch (error) {
    console.error('读取配置失败:', error);
    return null;
  }
};
