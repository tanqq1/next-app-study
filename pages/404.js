import styles404 from "../styles/404.module.css";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <h1 className={styles404.container}>Opps, Page Not Found</h1>
      <Link href="/">Back to Home</Link>
    </>
  );
}
