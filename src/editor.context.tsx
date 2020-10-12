import {
  useEffect,
  useState,
  useContext,
  useMemo,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { CompositeDecorator, convertToRaw, EditorState } from 'draft-js';

import Link, { findLinkEntities } from './components/Editor/Link';

export const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

const initialContext: EditorContext = {
  editorState: EditorState.createEmpty(decorator),
  setEditorState: () => {},
};

const EditorContext = createContext(initialContext);

export const EditorProvider: React.FC = ({ children }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator));

  const providerValue = useMemo(() => ({ editorState, setEditorState }), [editorState]);

  useEffect(() => {
    console.log(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);

  return <EditorContext.Provider value={providerValue}>{children}</EditorContext.Provider>;
};

export const useEditor = () => useContext(EditorContext);

interface EditorContext {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}
