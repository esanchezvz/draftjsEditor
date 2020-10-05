import { useState } from 'react';
import { Tweet } from 'react-twitter-widgets';
import SyncLoader from 'react-spinners/SyncLoader';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const EmbeddedTweet = ({ tweetId }: { tweetId: string }) => {
  // TODO -> Update theme dynamically
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingPlaceHolder loading={loading} />}
      <Tweet
        onLoad={() => setLoading(false)}
        options={{ align: 'center', theme: 'light' }}
        tweetId={tweetId}
        renderError={(_e) => (
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            Error al cargar el tweet. <strong>Revisa que el url sea correcto.</strong>
          </Alert>
        )}
      />
    </>
  );
};

const LoadingPlaceHolder = ({ loading }: { loading: boolean }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SyncLoader color='#F7F7F7' loading={loading} />
    </div>
  );
};

export default EmbeddedTweet;
