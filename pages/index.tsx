import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Editor from '../src/components/Editor';

const IndexPage = () => {
  return (
    <Container maxWidth='md'>
      <Typography align='center' variant='h1'>
        DraftJS
      </Typography>
      <Editor />
    </Container>
  );
};

export default IndexPage;
