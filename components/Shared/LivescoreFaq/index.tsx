import { useIntl } from 'react-intl';

import AccordionFaqSchema from 'components/Shared/AccordionFaqSchema';

import { Faq as FaqI } from 'interfaces/pageTemplates/table';

import styles from './styles.module.scss';

interface Props {
  faq: FaqI;
}

const LivescoreFaq = ({ faq }: Props) => {
  const { messages } = useIntl();

  return (
    faq.faq && (
      <div
        className={styles.root}
        id="faq"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <h2 className="red-left-flag">{messages.faq}:</h2>
        {!!faq.faq.length &&
          faq.faq.map(({ question, answer }) => (
            <AccordionFaqSchema
              key={`${answer.slice(1, 10)}-${question.slice(1, 10)}`}
              question={question}
            >
              <div dangerouslySetInnerHTML={{ __html: answer }} />
            </AccordionFaqSchema>
          ))}
      </div>
    )
  );
};

export default LivescoreFaq;
