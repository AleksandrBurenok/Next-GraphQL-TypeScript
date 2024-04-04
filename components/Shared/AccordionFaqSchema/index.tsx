import { useState, useRef, ReactNode } from 'react';
import clsx from 'clsx';

import ArrowDown from 'icons/ArrowDown';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  question: string;
  isFaq?: boolean;
}

const AccordionFaqSchema = ({ children, question, isFaq = false }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const content = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={clsx(styles.root, isFaq && styles.faqWrapper)}>
      <div
        itemScope
        itemProp="mainEntity"
        itemType="https://schema.org/Question"
        className={styles.accordionSection}
      >
        <button
          type="button"
          className={styles.accordion}
          onClick={toggleAccordion}
        >
          {!isFaq ? (
            <h3
              itemProp="name"
              className={styles.accordionQuestion}
              dangerouslySetInnerHTML={{ __html: question }}
            />
          ) : (
            <h2
              itemProp="name"
              className={styles.accordionQuestion}
              dangerouslySetInnerHTML={{ __html: question }}
            />
          )}
          <ArrowDown
            className={clsx(styles.accordionIcon, isActive && styles.rotate)}
          />
        </button>
        <div
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
          ref={content}
          style={{
            maxHeight: !isActive
              ? '0px'
              : `${content.current && content.current.scrollHeight}px`,
          }}
          className={styles.accordionContent}
        >
          <div itemProp="text" className={styles.accordionText}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionFaqSchema;
