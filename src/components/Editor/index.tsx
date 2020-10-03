import { useEffect, useState, useRef } from 'react';
import {
  EditorState,
  Editor as RichTextEditor,
  RichUtils,
  getDefaultKeyBinding,
  DraftEditorCommand,
  ContentBlock,
  DraftHandleValue,
  // convertToRaw,
} from 'draft-js';

import { handleTextSelection, insertAtomicBlock, twitterRegex, youtubeRegex } from './utils';

import Toolbar from './Toolbar';
import InlineStylesToolbar from './InlineStylesToolbar';
import AtomicBlock from './AtomicBlock';

import { useEditor } from '../../editor.context';

const Editor: React.FC = () => {
  const editorRef = useRef<RichTextEditor>(null);
  const editorRootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { editorState, setEditorState } = useEditor();

  const _focusEditor = () => editorRef.current!.focus();

  const _blockRendererFn = (contentBlock: ContentBlock) => {
    if (contentBlock.getType() !== 'atomic') return null;

    return {
      component: AtomicBlock,
      editable: false,
    };
  };

  const _handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState,
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const _mapKeyToEditorCommand = (e: React.KeyboardEvent) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 2 /* Max Indentation Depth */);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  };

  const _getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case 'blockquote':
        return 'editor--blockquote';
      default:
        return '';
    }
  };

  const _handlePastedText = (text: string, _html: string | undefined) => {
    if (twitterRegex.test(text)) {
      twitterRegex.test(text); // BUG: if I don't test it shows the url instead of tweet sometimes
      const arr = text.split('/');
      const tweetId = arr[arr.length - 1];
      insertAtomicBlock('tweet', { tweetId }, editorState, setEditorState);
      return 'handled';
    }

    if (youtubeRegex.test(text)) {
      youtubeRegex.test(text); // BUG: if I don't test it shows the url instead of video sometimes
      const arr = text.split('?');
      const params = new URLSearchParams(arr[1]);
      const videoId = params.get('v');
      insertAtomicBlock('youtube', { videoId }, editorState, setEditorState);
      return 'handled';
    }

    return 'not-handled';
  };

  useEffect(() => {
    console.log(editorRootRef.current);
  });

  useEffect(() => {
    if (!mounted) setMounted(true);

    if (editorRef.current && mounted) _focusEditor();
  }, [mounted]);

  const contentState = editorState.getCurrentContent();
  let className = 'editor';

  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' hide-placeholder';
    }
  }

  return mounted ? (
    <div className={className} ref={editorRootRef}>
      <Toolbar />
      <RichTextEditor
        editorState={editorState}
        onChange={setEditorState}
        blockStyleFn={_getBlockStyle}
        handleKeyCommand={_handleKeyCommand}
        keyBindingFn={_mapKeyToEditorCommand}
        blockRendererFn={_blockRendererFn}
        handlePastedText={_handlePastedText}
        placeholder='Deja de pendejear y ponte a escribir...'
        ref={editorRef}
        spellCheck
      />
      {handleTextSelection(editorState) && (
        <InlineStylesToolbar editorRoot={editorRootRef.current} />
      )}
    </div>
  ) : null;
};

export default Editor;
