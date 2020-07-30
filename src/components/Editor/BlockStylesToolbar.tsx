import { EditorState } from 'draft-js';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatTitleIcon from '@material-ui/icons/Title';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import ToolbarItem from './ToolbarItem';

const BlockStylesToolbar = ({ editorState, handleBlockToggle }: Props) => {
  const blockStyles = [
    { icon: <FormatListBulletedIcon />, style: 'unordered-list-item' },
    { icon: <FormatListNumberedIcon />, style: 'ordered-list-item' },
    { icon: <FormatTitleIcon />, style: 'header-three' },
    { icon: <FormatQuoteIcon />, style: 'blockquote' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {blockStyles.map((item, i) => {
        const selection = editorState.getSelection();
        const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();

        return (
          <ToolbarItem
            key={`${item.icon}-${i}`}
            handleClick={() => handleBlockToggle(item.style)}
            icon={item.icon}
            active={item.style === blockType}
          />
        );
      })}
    </div>
  );
};

interface Props {
  editorState: EditorState;
  handleBlockToggle: (x: string) => void;
}

export default BlockStylesToolbar;
