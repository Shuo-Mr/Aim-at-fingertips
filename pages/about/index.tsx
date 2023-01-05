/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "@/components/Layout";
import { GetStaticProps } from "next";
import style from "./index.module.scss";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function about() {
  const { t } = useTranslation("about");
  return (
    <Layout>
      <section>
        <h1>{t("about")}</h1>
      </section>
      <section className={style.contact}>
        <p className={style.info}>{t("info")}</p>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = "zh" }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["about"])),
  },
});
