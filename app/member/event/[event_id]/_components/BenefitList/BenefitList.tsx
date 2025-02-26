import Tag from "@/components/Tag/Tag";
import styles from "./BenefitList.module.scss";
import { BENEFITS, OTHER_BENEFITS } from "./benefits";

interface Props {
  benefitList: string[];
}

export default function BenefitList({ benefitList }: Props) {
  const benefits = benefitList.filter((e) => BENEFITS.includes(e)); // 특전 목록과 매칭되는 특전들 (특전)
  const otherBenefits = benefitList.filter((e) => OTHER_BENEFITS.includes(e)); // 나머지 특전 목록과 매칭되는 특전들 (그 외 특전)

  return (
    <div className={styles.benefitListContainer}>
      <div>
        <h3>특전</h3>
        <div className={styles.benefitList}>
          {benefits.map((e, idx) => (
            <Tag key={idx} text={e} />
          ))}
        </div>
      </div>
      <div>
        <h3>그 외 특전</h3>
        <div className={styles.benefitList}>
          {otherBenefits.map((e, idx) => (
            <Tag key={idx} text={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
