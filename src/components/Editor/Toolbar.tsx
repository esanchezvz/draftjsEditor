import { EditorState } from 'draft-js';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import BlockStylesToolbar from './BlockStylesToolbar';
import InlineStylesToolbar from './InlineStylesToolbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexWrap: 'wrap',
      border: `1px solid ${theme.palette.divider}`,
      marginBottom: theme.spacing(2),
      position: 'sticky',
      top: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(1, 0.5),
    },
  }),
);

const Toolbar = ({ toggleBlock, toggleInlineStyle, editorState }: Props) => {
  const classes = useStyles();

  const handleInlineToggle = (style: string) => {
    toggleInlineStyle(style);
  };

  const handleBlockToggle = (style: string) => toggleBlock(style);

  return (
    <Paper elevation={0} className={classes.paper}>
      <BlockStylesToolbar handleBlockToggle={handleBlockToggle} editorState={editorState} />
      <Divider flexItem orientation='vertical' className={classes.divider} />
      <InlineStylesToolbar handleInlineToggle={handleInlineToggle} editorState={editorState} />
    </Paper>
  );
};

interface Props {
  toggleBlock: (x: string) => void;
  toggleInlineStyle: (x: string) => void;
  editorState: EditorState;
}

export default Toolbar;
