import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import AddImageIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

import BlockStylesToolbar from './BlockStylesToolbar';
import ToolbarItem from './ToolbarItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexWrap: 'wrap',
      border: `1px solid ${theme.palette.divider}`,
      marginBottom: theme.spacing(2),
      position: 'sticky',
      top: theme.spacing(1),
      padding: theme.spacing(0.5),
      zIndex: 1,
    },
    divider: {
      margin: theme.spacing(1, 0.5),
    },
  }),
);

const Toolbar = () => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.paper}>
      <BlockStylesToolbar />
      <Divider flexItem orientation='vertical' className={classes.divider} />
      <ToolbarItem icon={<AddImageIcon />} active={false} handleClick={() => {}} />
    </Paper>
  );
};

export default Toolbar;
