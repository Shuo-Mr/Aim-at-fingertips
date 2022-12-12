import styles from "./Github.module.css";
import Link from "next/link";
import GithubSvg from "./github.svg";

type Props = {
  size?: number;
};
export default function Github({ size }: Props) {
  return (
    <Link
      href="https://github.com/Shuo-Mr"
      className={styles.github__corner}
      aria-label="View source on GitHub"
    >
      <span className={styles.link} style={{ width: size, height: size }}>
        <GithubSvg />
      </span>
    </Link>
  );
}
