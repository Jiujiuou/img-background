import style from "./index.module.less";

function Header({ download }) {
  return (
    <div className={style.header}>
      <div className={style.name}>Jiujiu-Tool</div>
      <div className={style.save} onClick={download}>
        保存
      </div>
    </div>
  );
}

export default Header;
