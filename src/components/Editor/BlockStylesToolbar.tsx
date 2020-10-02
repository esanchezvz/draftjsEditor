import { EditorState } from 'draft-js';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import ToolbarItem from './ToolbarItem';
import { HeaderOneIcon, HeaderTwoIcon, HeaderThreeIcon } from './Icons';

const BlockStylesToolbar = ({ editorState, handleBlockToggle }: Props) => {
  const blockStyles = [
    { icon: <FormatListBulletedIcon />, style: 'unordered-list-item' },
    { icon: <FormatListNumberedIcon />, style: 'ordered-list-item' },
    { icon: <HeaderOneIcon />, style: 'header-one' },
    { icon: <HeaderTwoIcon />, style: 'header-two' },
    { icon: <HeaderThreeIcon />, style: 'header-three' },
    { icon: <FormatQuoteIcon />, style: 'blockquote' },
  ];

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {blockStyles.map((item, i) => {
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
