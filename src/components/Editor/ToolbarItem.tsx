import ButtonBase from '@material-ui/core/ButtonBase';
import { ReactElement } from 'react';

const ToolbarItem = ({ icon, active, handleClick }: Props) => {
  const _handleMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    /* onMouseDown to keep focus on editor */
    e.preventDefault();
    handleClick();
  };

  const _className = `editor--toolbar-item ${active ? 'active' : ''}`;

  return (
    <ButtonBase className={_className} onMouseDown={_handleMouseDown}>
      {icon}
    </ButtonBase>
  );
};

interface Props {
  icon: ReactElement;
  active: boolean;
  handleClick: () => void;
}

export default ToolbarItem;
