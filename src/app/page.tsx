import styles from "./page.module.css";
import MetadataViewer from "@/sections/MetadataViewer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MetadataViewer  />
      </main>
    </div>
  );
}
