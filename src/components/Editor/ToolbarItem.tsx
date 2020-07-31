const ToolbarItem = ({ icon, active, handleClick }: Props) => {
  return (
    <span
      className={`editor--toolbar-item ${active ? 'active' : ''}`}
      onMouseDown={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      {icon}
    </span>
  );
};

interface Props {
  icon: any;
  active: boolean;
  handleClick: () => void;
}

export default ToolbarItem;