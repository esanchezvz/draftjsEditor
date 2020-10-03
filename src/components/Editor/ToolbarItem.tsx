import ButtonBase from '@material-ui/core/ButtonBase';

const ToolbarItem = ({ icon, active, handleClick }: Props) => {
  return (
    <ButtonBase
      className={`editor--toolbar-item ${active ? 'active' : ''}`}
      onMouseDown={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      {icon}
    </ButtonBase>
  );
};

interface Props {
  icon: any;
  active: boolean;
  handleClick: () => void;
}

export default ToolbarItem;
