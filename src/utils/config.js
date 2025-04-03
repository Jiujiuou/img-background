/**
 * 配置存储的本地存储键名
 * 用于保存和读取用户配置信息的localStorage键
 */
const CONFIG_KEY = "IMG_SHADOW_CONFIG";

/**
 * 保存用户配置到本地存储
 *
 * 将用户当前的配置信息序列化为JSON字符串并保存到localStorage中
 *
 * @param {object} config - 要保存的配置对象，通常包含图片比例、滤镜设置、背景类型等信息
 * @returns {boolean} 返回保存操作是否成功
 *   - true: 配置保存成功
 *   - false: 配置保存失败（可能由于localStorage不可用或存储空间已满）
 */
export const saveConfig = (config) => {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error("保存配置失败:", error);
    return false;
  }
};

/**
 * 从本地存储加载用户配置
 *
 * 从localStorage读取先前保存的用户配置信息，并将其反序列化为JavaScript对象
 *
 * @returns {object|null} 返回解析后的配置对象，如果没有找到配置或解析失败则返回null
 *   - 配置对象: 包含用户之前保存的所有设置
 *   - null: 未找到配置或解析过程中出现错误
 */
export const loadConfig = () => {
  try {
    const configStr = localStorage.getItem(CONFIG_KEY);
    return configStr ? JSON.parse(configStr) : null;
  } catch (error) {
    console.error("读取配置失败:", error);
    return null;
  }
};
