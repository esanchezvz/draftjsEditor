import { Component, createRef } from 'react';
import {
  EditorState,
  Editor as DraftJsEditor,
  RichUtils,
  getDefaultKeyBinding,
  DraftEditorCommand,
  ContentBlock,
} from 'draft-js';

import Toolbar from './Toolbar';

class Editor extends Component<Props, State> {
  private editorRef = createRef<DraftJsEditor>();

  constructor(props: Props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty(), mounted: false };
  }

  componentDidMount() {
    this.setState({ mounted: true });
    setTimeout(() => this.focusEditor(), 10);
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

  render() {
    const { editorState, mounted } = this.state;

    const contentState = editorState.getCurrentContent();
    let className = 'editor';
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' hide-placeholder';
      }
    }

    return mounted ? (
      <section className='editor--root'>
        <div className={className}>
          <Toolbar
            editorState={editorState}
            toggleInlineStyle={(v: string) => this.toggleInlineStyle(v)}
            toggleBlock={(v: string) => this.toggleBlockType(v)}
          />
          <DraftJsEditor
            editorState={this.state.editorState}
            onChange={this.onChange}
            blockStyleFn={this.getBlockStyle}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            placeholder='No te hagas wey...'
            ref={this.editorRef}
            spellCheck
          />
        </div>
      </section>
    ) : null;
  }
}

interface Props {}
interface State {
  editorState: EditorState;
  mounted: boolean;
}

export default Editor;
