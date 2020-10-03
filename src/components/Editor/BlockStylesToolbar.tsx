import { RichUtils } from 'draft-js';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

import ToolbarItem from './ToolbarItem';
import { HeaderOneIcon, HeaderTwoIcon, HeaderThreeIcon } from './Icons';

import { useEditor } from '../../editor.context';

const BlockStylesToolbar = () => {
  const { editorState, setEditorState } = useEditor();
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

  const _toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {blockStyles.map((item, i) => {
        return (
          <ToolbarItem
            key={`${item.icon}-${i}`}
            handleClick={() => _toggleBlockType(item.style)}
            icon={item.icon}
            active={item.style === blockType}
          />
        );
      })}
    </div>
  );
};

export default BlockStylesToolbar;
