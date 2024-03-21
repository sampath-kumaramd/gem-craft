import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.topHeader}>Select your Metal Color</div>
      <div className={styles.horizontalLine} />
      <div className={styles.top}>
        <div className={styles.rings}>
          <Image
            src="/Graphic_Metal_Ring_G.png"
            alt="Ring 1"
            width={40}
            height={40}
          />
          <Image
            src="/Graphic_Metal_Ring_AG.png"
            alt="Ring 2"
            width={40}
            height={40}
          />
          <Image
            src="/Graphic_Metal_Ring_S.png"
            alt="Ring 3"
            width={40}
            height={40}
          />
          <Image
            src="/Graphic_Metal_Ring_AS.png"
            alt="Ring 4"
            width={40}
            height={40}
          />
          <Image
            src="/Graphic_Metal_Ring_GM.png"
            alt="Ring 5"
            width={40}
            height={40}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
        <div className={styles.rings}>
          <Image
            src="/Graphic_Metal_Ring_G.png"
            alt="Ring 1"
            width={40}
            height={40}
          />
          <Image
            src="/Graphic_Metal_Ring_AG.png"
            alt="Ring 2"
            width={40}
            height={40}
          />
          <Image
            src="/Graphic_Metal_Ring_S.png"
            alt="Ring 3"
            width={40}
            height={40}
          />
          <Image
            src="/Graphic_Metal_Ring_AS.png"
            alt="Ring 4"
            width={40}
            height={40}
          />
          <Image
            src="/Graphic_Metal_Ring_GM.png"
            alt="Ring 5"
            width={40}
            height={40}
          />
        </div>
          <div className={styles.leftContent}></div>
        </div>
        <div className={styles.center}></div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
}
