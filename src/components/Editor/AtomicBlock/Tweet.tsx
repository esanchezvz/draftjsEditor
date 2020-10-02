import { Tweet } from 'react-twitter-widgets';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const EmbeddedTweet = ({ tweetId }: { tweetId: string }) => {
  // TODO -> Update theme dynamically

  return (
    <Tweet
      // ref={tweetRef}
      options={{ align: 'center', theme: 'light' }}
      tweetId={tweetId}
      renderError={(_e) => (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          Error al cargar el tweet. <strong>Revisa que el url sea correcto.</strong>
        </Alert>
      )}
    />
  );
};

export default EmbeddedTweet;
