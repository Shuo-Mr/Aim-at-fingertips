import Link from "next/link";
import Image from "next/image";
import style from "./Header.module.scss";
import classNames from "classnames";
import Github from "../Other/Github";
import { Stack } from "@mui/material";
import ThemeSwitch from "../Theme/Switch";
import { useTranslation } from "next-i18next";

type Props = {
  isFixed?: boolean;
};

export default function Header(props: Props) {
  const { t } = useTranslation(["common"]);

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
                alt={t("name")}
              />
            </Link>

            <div>{t("name")}</div>
          </div>
          <div className={style.navbar__list}>
            <Stack spacing={4} direction="row">
              <Link href="/" prefetch>
                {t("home")}
              </Link>
              <Link href="/about" prefetch>
                {t("about")}
              </Link>
              <Link href="/contact" prefetch>
                {t("contact")}
              </Link>
            </Stack>
          </div>
          <div className={style.navbar__action}>
            <ThemeSwitch />
          </div>
        </div>
      </div>
      <Github />
    </header>
  );
}
