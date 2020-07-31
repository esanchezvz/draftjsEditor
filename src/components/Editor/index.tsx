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
  // convertToRaw,
} from 'draft-js';
import { Tweet } from 'react-twitter-widgets';

import Toolbar from './Toolbar';
import { handleTextSelection, twitterRegex } from './utils';
import InlineStylesToolbar from './InlineStylesToolbar';

class Editor extends Component<Props, State> {
  private editorRef = createRef<DraftJsEditor>();
  private decorator: CompositeDecorator;

  constructor(props: Props) {
    super(props);
    this.decorator = new CompositeDecorator([
      {
        strategy: this.tweetStrategy,
        component: EmbededTweet,
      },
      {
        strategy: this.findLinkEntities,
        component: Link,
      },
    ]);
    this.state = {
      editorState: EditorState.createEmpty(this.decorator),
      mounted: false,
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
    setTimeout(() => this.focusEditor(), 0);
  }

  onChange = (editorState: EditorState) => this.setState({ editorState });

  focusEditor = () => this.editorRef.current!.focus();

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

  removeLink = () => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    this.onChange(RichUtils.toggleLink(editorState, selection, null));
  };

  addLink = (url: string) => {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

    this.onChange(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
  };

  tweetStrategy = (
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    _contentState: ContentState,
  ) => {
    const text = contentBlock.getText();
    let matchArr: any;
    let start: number;
    while ((matchArr = twitterRegex.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
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
      <div className={className}>
        <Toolbar editorState={editorState} toggleBlock={(v: string) => this.toggleBlockType(v)} />
        <DraftJsEditor
          editorState={this.state.editorState}
          onChange={this.onChange}
          blockStyleFn={this.getBlockStyle}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.mapKeyToEditorCommand}
          placeholder='Deja de pendejear y ponte a escribir...'
          ref={this.editorRef}
          spellCheck
        />
        {handleTextSelection(editorState) && (
          <InlineStylesToolbar
            editorState={editorState}
            addLink={this.addLink}
            removeLink={this.removeLink}
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

const EmbededTweet = ({ decoratedText }: { decoratedText: string; rest: any }) => {
  const arr = decoratedText.split('/');
  const id = arr[arr.length - 1];
  return <Tweet options={{ align: 'center' }} tweetId={id} />;
};

interface Props {}
interface State {
  editorState: EditorState;
  mounted: boolean;
}

export default Editor;
