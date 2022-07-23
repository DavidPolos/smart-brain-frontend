import React from 'react';

const Scroll = (props) => {
	return (
		<div id="messagesScroll" style={{display:"flex",flexDirection:"column-reverse",overflowY:'scroll',border:'5px solid black', height:'400px'}}>
		{props.children}
		</div>
	)
};


export default Scroll;