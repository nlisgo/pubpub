import React, {PropTypes} from 'react';
import Radium from 'radium';
// import {globalStyles} from '../../utils/styleConstants';
import {PubPreview} from '../../components/ItemPreviews';

let styles = {};

const CollectionMain = React.createClass({
	propTypes: {
		collectionData: PropTypes.object,
	},

	getDefaultProps: function() {
		
	},

	render: function() {
		return (
			<div style={styles.container}>
				

				{()=>{
					const length = this.props.collectionData.pubs ? this.props.collectionData.pubs.length : 0;
					if (!length) {
						return <div style={styles.emptyBlock}>No Pubs Added</div>;
					} 
					const output = [];
					for (let index = length; index--;) {
						output.push(<div key={'pubWrapper-' + index} style={styles.pubWrapper}>
								<PubPreview 
									pubData={this.props.collectionData.pubs[index]} 
									headerFontSize={'22px'}
									textFontSize={'18px'} />
							</div>);
							
					}
					return output;
				}()}

			</div>
		);
	}
});

export default Radium(CollectionMain);

styles = {
	pubWrapper: {
		margin: '30px 50px',
	},
	emptyBlock: {
		backgroundColor: '#f6f6f6',
		width: '75%',
		margin: '0px auto',
		height: '85px',
		lineHeight: '85px',
		textAlign: 'center',
		border: '1px solid rgba(0,0,0,0.05)',
		borderRadius: '2px',
	},
};
