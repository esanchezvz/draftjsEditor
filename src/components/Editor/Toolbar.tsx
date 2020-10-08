import { ChangeEvent, useRef, useState } from 'react';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import AddImageIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

import BlockStylesToolbar from './BlockStylesToolbar';
import ToolbarItem from './ToolbarItem';
import { useEditor } from '../../editor.context';
import { uploadImage } from '../../../utils';

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
  const [inputKey, setInputKey] = useState(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

  const classes = useStyles();

  const _handleAddImage = () => {
    const target = inputRef.current;
    if (!target) return;

    target.click();
  };

  const _handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // const reader = new FileReader();
    const file = e.target.files![0]; // always the first file of the array

    if (file) {
      try {
        const response = await uploadImage(file);
        console.log(response.data);
        const blockData = {
          url: response.data.data.secure_url,
          id: response.data.data.public_id,
        };
        setInputKey(Date.now()); // clear input files "the react way" -- needs improvement
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', blockData);

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
          currentContent: contentStateWithEntity,
        });

        setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
      } catch (error) {
        console.log(error);
      }
      // reader.onloadend = async () => {
      //   if (file.type.startsWith('image/')) {
      //     const response = await uploadImage(reader.result as string);
      //     setInputKey(Date.now()); // clear input files "the react way" -- needs improvement
      //     const contentState = editorState.getCurrentContent();
      //     const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', response);

      //     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      //     const newEditorState = EditorState.set(editorState, {
      //       currentContent: contentStateWithEntity,
      //     });

      //     setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
      //   }
      // };
      // reader.readAsDataURL(file);
    }
  };

  // Simulate api call to upload a file (e.g. upload to Cloudinary)
  // const uploadImage = async (path: string): Promise<{ url: string; id: string }> => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => resolve({ url: path, id: Date.now().toString() }), 3000);
  //   });
  // };

  return (
    <Paper elevation={0} className={classes.paper}>
      <BlockStylesToolbar />
      <Divider flexItem orientation='vertical' className={classes.divider} />
      <ToolbarItem icon={<AddImageIcon />} active={false} handleClick={_handleAddImage} />
      {/* TODO: Create HiddenInput component */}
      <input
        onChange={_handleInputChange}
        key={inputKey}
        ref={inputRef}
        type='file'
        accept='jpg,jpeg,png'
        style={{ display: 'none' }}
      />
    </Paper>
  );
};

export default Toolbar;
