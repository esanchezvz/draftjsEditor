import { ChangeEvent, useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import AddImageIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

import BlockStylesToolbar from './BlockStylesToolbar';
import ToolbarItem from './ToolbarItem';
import { useEditor } from '../../editor.context';
import { uploadImage } from '../../../utils';
import { insertAtomicBlock } from '../../utils/editor.utils';

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
  const { editorState, setEditorState } = useEditor();
  const inputRef = useRef<HTMLInputElement>(null);

  const classes = useStyles();

  const _handleAddImage = () => {
    const target = inputRef.current;
    if (!target) return;

    target.click();
  };

  const _handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]; // always the first file of the array

    if (file) {
      try {
        const contentState = editorState.getCurrentContent();

        insertAtomicBlock('loader', {}, editorState, setEditorState, contentState);

        const response = await uploadImage(file);
        const { data: res } = response;
        const blockData = {
          url: res.data.secure_url,
          public_id: res.data.public_id,
        };

        // Clear input files
        if (inputRef.current) inputRef.current.value = '';

        // Pass the same contentState as when adding loader so the loading indicator gets replaced
        insertAtomicBlock('image', blockData, editorState, setEditorState, contentState);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Paper elevation={0} className={classes.paper}>
      <BlockStylesToolbar />
      <Divider flexItem orientation='vertical' className={classes.divider} />
      <ToolbarItem icon={<AddImageIcon />} active={false} handleClick={_handleAddImage} />
      {/* TODO: Create HiddenInput component */}
      <input
        onChange={_handleInputChange}
        ref={inputRef}
        type='file'
        accept='jpg,jpeg,png'
        style={{ display: 'none' }}
      />
    </Paper>
  );
};

export default Toolbar;
