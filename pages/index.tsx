import Head from "next/head";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";

import Date from "../components/Common/date";
import { getSortedPostsData } from "../lib/posts";
import Layout from "../components/Layout";
import { GetStaticProps, InferGetStaticPropsType } from "next";

type Post = {
  id: string;
  date: string;
  title?: string;
};

export default function Home({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log("allPost", allPostsData);

  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <p style={{ textAlign: "center" }}>[Hello, Welcome to My blog.]</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<{
  allPostsData: Post[];
}> = async () => {
  const allPostsData: Post[] = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
