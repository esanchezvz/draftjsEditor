import { Component, createRef } from 'react';
import {
  EditorState,
  ContentState,
  Editor as DraftJsEditor,
  RichUtils,
  CompositeDecorator,
  getDefaultKeyBinding,
  DraftEditorCommand,
  ContentBlock,
  convertToRaw,
  getVisibleSelectionRect,
} from 'draft-js';

import Toolbar from './Toolbar';
import { handleTextSelection } from './utils';
import InlineStylesToolbar from './InlineStylesToolbar';

class Editor extends Component<Props, State> {
  private editorRef = createRef<DraftJsEditor>();
  private decorator: CompositeDecorator;

  constructor(props: Props) {
    super(props);
    this.decorator = new CompositeDecorator([
      {
        strategy: this.findLinkEntities,
        component: Link,
      },
    ]);
    this.state = {
      editorState: EditorState.createEmpty(this.decorator),
      mounted: false,
      focused: false,
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
    setTimeout(() => this.focusEditor(), 0);
  }

  onChange = (editorState: EditorState) => this.setState({ editorState });

  focusEditor = () => this.editorRef.current?.focus();

  handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  mapKeyToEditorCommand = (e: any) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, this.state.editorState, 4 /* maxDepth */);
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  };

  toggleBlockType = (blockType: string) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle = (inlineStyle: string) => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  };

  getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case 'blockquote':
        return 'editor--blockquote';
      default:
        return '';
    }
  };

  findLinkEntities = (
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState,
  ) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    }, callback);
  };

  render() {
    const { editorState, mounted, focused } = this.state;

    const contentState = editorState.getCurrentContent();
    let className = 'editor';
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' hide-placeholder';
      }
    }

    return mounted ? (
      <div className={className}>
        <Toolbar editorState={editorState} toggleBlock={(v: string) => this.toggleBlockType(v)} />
        <DraftJsEditor
          editorState={this.state.editorState}
          onChange={this.onChange}
          onBlur={() => this.setState({ focused: false })}
          onFocus={() => this.setState({ focused: true })}
          blockStyleFn={this.getBlockStyle}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.mapKeyToEditorCommand}
          placeholder='No te hagas wey...'
          ref={this.editorRef}
          spellCheck
        />
        {handleTextSelection(editorState) && focused && (
          <InlineStylesToolbar
            editorState={editorState}
            handleInlineToggle={this.toggleInlineStyle}
          />
        )}
      </div>
    ) : null;
  }
}

const Link = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();

  return (
    <a href={url} target='_blank' rel='noopener noreferrer' className='editor--link'>
      {props.children}
    </a>
  );
};

interface Props {}
interface State {
  editorState: EditorState;
  mounted: boolean;
  focused: boolean;
}

export default Editor;
