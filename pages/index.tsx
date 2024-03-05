import styles from '@/styles/Home.module.css';
import 'semantic-ui-css/semantic.min.css';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { Loader } from 'semantic-ui-react';

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch('https://api.thecatapi.com/v1/images/search');
  const result = await res.json();
  return result[0];
};

const Home: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>猫画像切替アプリ</h1>
      <div className={styles.content}>
        {isLoading ? (
          <Loader active inline size="huge" />
        ) : (
          <img src={catImageUrl} />
        )}
      </div>
      <button onClick={handleClick} disabled={isLoading}>
        猫の切替
      </button>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};
