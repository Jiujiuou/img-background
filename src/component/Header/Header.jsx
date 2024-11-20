import style from "./index.module.less";

function Header() {
  return (
    <div className={style.header}>
      <div className={style.name}>jiujiu-tool</div>
      <div className={style.save}>保存</div>
    </div>
  );
}

export default Header;
