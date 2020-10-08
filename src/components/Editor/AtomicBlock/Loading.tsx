import SyncLoader from 'react-spinners/SyncLoader';
import { useTheme } from '@material-ui/core';

const Loading = ({ loading }: { loading: boolean }) => {
  const theme = useTheme();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SyncLoader color={theme.palette.primary.light} loading={loading} />
    </div>
  );
};

export default Loading;
