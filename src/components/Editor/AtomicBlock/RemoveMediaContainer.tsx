import { memo } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import CloseIcon from '@material-ui/icons/Close';

import styles from '../../../styles/AtomicBlock.module.css';
import { useTheme } from '@material-ui/core/styles';

const RemoveMediaContainer = ({ handleClick, children }: Props) => {
  const theme = useTheme();

  return (
    <div className={styles['remove-media--container']}>
      <ButtonBase
        onClick={handleClick}
        style={{ backgroundColor: theme.palette.primary.main }}
        className={styles['remove-media--button']}
        color='primary'
      >
        <CloseIcon fontSize='inherit' color='inherit' />
      </ButtonBase>
      {children}
    </div>
  );
};

interface Props {
  handleClick: () => void;
  children?: React.ReactNode;
}

export default memo(RemoveMediaContainer);
