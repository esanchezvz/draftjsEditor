import { useState } from 'react';
import { Tweet } from 'react-twitter-widgets';
import SyncLoader from 'react-spinners/SyncLoader';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { useTheme } from '@material-ui/core';

const EmbeddedTweet = ({ tweetId }: { tweetId: string }) => {
  // TODO -> Update theme dynamically
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

const Loading = ({ loading }: { loading: boolean }) => {
  const theme = useTheme();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SyncLoader color={theme.palette.primary.light} loading={loading} />
    </div>
  );
};

export default EmbeddedTweet;
