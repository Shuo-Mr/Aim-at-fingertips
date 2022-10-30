import Link from "next/link";
import style from "./Footer.module.css";
import classNames from "classnames";
type Props = {
  isFixed?: boolean;
};
export default function Footer(props: Props) {
  return (
    <footer
      className={classNames(style.footer, props.isFixed ? style.fixed : "")}
    >
      <div>Liang Shuo</div>
      <div> * </div>
      <div>©️ </div>
      <Link href="/">liangshuo.wang</Link>
    </footer>
  );
}
