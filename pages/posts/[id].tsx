import { getAllPostIds, getPostData, PostData } from "../../lib/posts";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Date from "@/components/Common/date";
import Layout from "@/components/Layout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Post({ postData }: { postData: PostData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<
  { postData: PostData },
  any
> = async ({ params = {}, locale = "zh" }) => {
  const postData: PostData = await getPostData(params.id);
  return {
    props: {
      postData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
