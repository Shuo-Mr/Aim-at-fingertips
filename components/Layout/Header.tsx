import Link from "next/link";
import Image from "next/image";
import style from "./Header.module.scss";
import classNames from "classnames";
import Github from "../Other/Github";
import Switch from '@/components/Theme/ASwitch'
type Props = {
  isFixed?: boolean;
};
export default function Footer(props: Props) {
  return (
    <header id="header" className={classNames(style.header)}>
      <div className={style.navbar}>
        <div className={style.header__content}>
          <div className={style.header__webName}>
            <Link href="/">
              <Image
                priority
                src="/finger.svg"
                height={24}
                width={24}
                alt="志在指尖"
              />
            </Link>

            <div>志在指尖</div>
          </div>
          <div className={style.navbar__action}>
                {/* 测试 */}
                <Switch>
                  测试啊
                  </Switch>
          </div>
        </div>
      </div>
      <Github />
    </header>
  );
}
