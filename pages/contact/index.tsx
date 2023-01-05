import Layout from "@/components/Layout";
import { GetStaticProps } from "next";

import style from "./index.module.scss";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Contact({}) {
  const { t } = useTranslation("contact");
  return (
    <Layout>
      <section>
        <h1>{t("contact")}</h1>
      </section>
      <section className={style.contact}>
        <p className={style.info}>{t("info")}</p>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<{}> = async ({ locale = "zh" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["contact"])),
    },
  };
};
