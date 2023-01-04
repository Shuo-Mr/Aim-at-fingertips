import Layout from "@/components/Layout";
import { GetStaticProps } from "next";
import style from "./index.module.scss";
export default function Contact({}) {
  return (
    <Layout>
      <section>
        <h1>Contact</h1>
      </section>
      <section className={style.contact}>
        <p className={style.info}>
          If you want to get in touch, I can be reached at
          liangshouone@aliyun.com. My WeChat is L-shuo0121. Please state your
          intention to add
        </p>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<{}> = async () => {
  return {
    props: {},
  };
};
