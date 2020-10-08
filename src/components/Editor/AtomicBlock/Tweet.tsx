import { useState } from 'react';
import { Tweet } from 'react-twitter-widgets';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import Loading from './Loading';

const EmbeddedTweet = ({ tweetId }: { tweetId: string }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loading loading={loading} />}
      <Tweet
        onLoad={() => setLoading(false)}
        options={{ align: 'center', theme: 'light' }}
        tweetId={tweetId}
        renderError={(_e) => {
          setLoading(false);
          return (
            <Alert severity='error'>
              <AlertTitle>Error</AlertTitle>
              Error al cargar el tweet. <strong>Revisa que el url sea correcto.</strong>
            </Alert>
          );
        }}
      />
    </>
  );
};

export default EmbeddedTweet;
