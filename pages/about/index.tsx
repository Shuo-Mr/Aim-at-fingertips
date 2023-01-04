import Layout from "@/components/Layout";
import style from "./index.module.scss";

export default function about() {
  return (
    <Layout>
      <section>
        <h1>About</h1>
      </section>
      <section className={style.contact}>
        <p className={style.info}>
          Hi, I&apos;m Liang Shuo, a Chinese My hobbies are travel and funny.
          Here is my blog. I hope it can help you.
        </p>
      </section>
    </Layout>
  );
}
