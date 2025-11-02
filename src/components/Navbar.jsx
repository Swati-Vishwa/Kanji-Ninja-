import PersonIcon from '@mui/icons-material/Person';

export default function Navbar( {Icon, iconProp, onIconClick} ) {
	return (
	  <header className="w-screen h-[90px] p-3">
	      <nav className="w-full h-[60px] flex justify-between items-center shadow-md rounded-md bg-pri px-4 " >
	        <button onClick={onIconClick}>{Icon && <Icon {...iconProp} />}</button>
	        <div className="w-[49px] h-[40px] flex justify-center items-center border-2 border-[#AD9A90] mr-2 rounded-md select-none"><PersonIcon sx={{fontSize: 35, color: '#918578' }}/></div>
          </nav>
        </header>
  );
}
