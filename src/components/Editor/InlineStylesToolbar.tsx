import { EditorState } from 'draft-js';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import ToolbarItem from './ToolbarItem';

const InlineStylesToolbar = ({ editorState, handleInlineToggle }: Props) => {
  const inlineStyles = [
    { icon: <FormatBoldIcon />, style: 'BOLD' },
    { icon: <FormatItalicIcon />, style: 'ITALIC' },
    { icon: <FormatUnderlinedIcon />, style: 'UNDERLINE' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {inlineStyles.map((item, i) => {
        const currentStyle = editorState.getCurrentInlineStyle();

        return (
          <ToolbarItem
            key={`${item.icon}-${i}`}
            handleClick={() => handleInlineToggle(item.style)}
            icon={item.icon}
            active={currentStyle.has(item.style)}
          />
        );
      })}
    </div>
  );
};

interface Props {
  editorState: EditorState;
  handleInlineToggle: (x: string) => void;
}

export default InlineStylesToolbar;
