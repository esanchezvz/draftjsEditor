import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import Editor from '../src/components/Editor/Editor';
import Editor from '../src/components/Editor';
import { EditorProvider } from '../src/editor.context';

const IndexPage = () => {
  return (
    <Container maxWidth='md'>
      <Typography align='center' variant='h1'>
        DraftJS
      </Typography>
      <EditorProvider>
        <Editor />
      </EditorProvider>
    </Container>
  );
};

export default IndexPage;
