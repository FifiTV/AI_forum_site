import { useTranslation } from 'react-i18next';
import './ApproachPage.css';

interface ApproachPageProps {
  titleKey: string;
  descriptionKey: string;
}

export const ApproachPage = ({ titleKey, descriptionKey }: ApproachPageProps) => {
  const { t } = useTranslation();

  return (
    <div className="approach-page">
      <section className="approach-hero">
        <h1>{t(titleKey)}</h1>
      </section>

      <section className="approach-content">
        <article>
          <h2>Opis</h2>
          <p>{t(descriptionKey)}</p>

          <h2>Główne cechy</h2>
          <ul>
            <li>Cecha 1 - do uzupełnienia</li>
            <li>Cecha 2 - do uzupełnienia</li>
            <li>Cecha 3 - do uzupełnienia</li>
          </ul>

          <h2>Rezultaty</h2>
          <p>Wyniki badań - do uzupełnienia</p>

          <h2>Zastosowania</h2>
          <p>Możliwe zastosowania - do uzupełnienia</p>
        </article>
      </section>
    </div>
  );
};
