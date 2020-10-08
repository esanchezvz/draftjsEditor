import React, { memo } from 'react';

const Image = (props: any) => {
  // console.log(props);

  // Not using props.url as src beacuase that much text will slow down de rerendering process
  // everytime editorState changes and rerenders the editor. maybe useMemo() or memo() would help?

  return (
    <div>
      <img
        style={{ width: '100%' }}
        src={props.url}
        // src={'https://wallpaperaccess.com/full/170249.jpg'}
        alt='Some Alt Text'
      />
    </div>
  );
};

export default memo(Image);
