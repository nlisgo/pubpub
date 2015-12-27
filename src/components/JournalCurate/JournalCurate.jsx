import React, {PropTypes} from 'react';
import Radium from 'radium';
import {Autocomplete} from '../../containers';
import {PubPreview} from '../../components/ItemPreviews';
// import {LoaderIndeterminate} from '../../components';
import {globalStyles} from '../../utils/styleConstants';
// import { Link } from 'react-router';

let styles = {};

const JournalCurate = React.createClass({
	propTypes: {
		journalData: PropTypes.object,
		journalSaving: PropTypes.bool,
		journalSaveHandler: PropTypes.func,
	},

	getDefaultProps: function() {
		return {
			journalData: {},
		};
	},

	featurePub: function(pubID) {
		return () => {
			const outputFeaturedPubs = this.props.journalData.pubsFeatured.map((pub)=>{ return pub._id; });
			outputFeaturedPubs.push(pubID);

			let outputSubmittedPubs = this.props.journalData.pubsSubmitted.filter((pub)=>{ return pub._id !== pubID; });
			outputSubmittedPubs = outputSubmittedPubs.map((pub)=>{ return pub._id; });
			
			console.log('outputFeaturedPubs', outputFeaturedPubs);
			console.log('outputSubmittedPubs', outputSubmittedPubs);

			this.props.journalSaveHandler({
				pubsFeatured: outputFeaturedPubs,
				pubsSubmitted: outputSubmittedPubs,
			});
		};
	},

	renderPubSearchResults: function(results) {
		let totalCount = 0; // This is in the case that we have no results because the users in the list are already added
		const featuredObject = {};
		for (let index = this.props.journalData.pubsFeatured.length; index--; ) {
			featuredObject[this.props.journalData.pubsFeatured[index]._id] = this.props.journalData.pubsFeatured[index];
		}

		return (
			<div style={styles.results}>
				{

					results.map((pub, index)=>{

						if (pub._id in featuredObject) {
							return null;
						}

						totalCount++;
						return (<div key={'featuredPubSearch-' + index} style={styles.result}>

							<div style={styles.resultDetails}>
								<PubPreview 
									pubData={pub} 
									headerFontSize={'16px'}
									textFontSize={'13px'} 
									hideBottomLine={true}/>

							</div>
							
							<div style={styles.action} key={'featuredPubSearchAdd-' + index} onClick={this.featurePub(pub._id)}>feature</div>
						</div>);	
					})
				}
				{results.length === 0 || totalCount === 0
					? <div style={styles.noResults}>No Results</div>
					: null
				}
				
			</div>
		);
	},

	render: function() {
		return (
			<div style={styles.container}>
				<div style={styles.pubSectionsWrapper}>
					
					{/* Featured Pubs Section */}
					<div style={[styles.pubSectionWrapper, styles.featuredPubWrapper]}>
						<div style={styles.sectionTitle}>Featured Pubs</div>
						<div style={styles.sectionText}>Pubs curated by your journal</div>

						<div style={styles.searchWrapper}>
							<Autocomplete 
								autocompleteKey={'journalPubFeatureAutocomplete'} 
								route={'autocompletePubsAll'} 
								placeholder="Search Pubs to Feature" 
								resultRenderFunction={this.renderPubSearchResults}/>
						</div>
						

						{
							this.props.journalData.pubsFeatured && this.props.journalData.pubsFeatured.length
								? this.props.journalData.pubsFeatured.map((pub, index)=>{
									return (<div key={'featuredPubItem-' + index} style={styles.featuredPubsSection}>
											<PubPreview 
											pubData={pub} 
											headerFontSize={'16px'}
											textFontSize={'13px'} />
										</div>);
								})
								: <div style={styles.emptyBlock}>No Featured Pubs</div>
						}


					</div>

					{/* Submitted Pubs Section */}
					<div style={[styles.pubSectionWrapper]}>
						<div style={styles.sectionTitle}>Submitted Pubs</div>
						<div style={styles.sectionText}>Pubs submitted to your journal for consideration</div>
						{
							this.props.journalData.pubsSubmitted && this.props.journalData.pubsSubmitted.length
								? <div style={styles.submittedPubsSection}>
									{
										this.props.journalData.pubsSubmitted.map((pub, index)=>{
											return (<div key={'submittedPubItem-' + index} style={styles.result}>

												<div style={styles.resultDetails}>
													<PubPreview 
														pubData={pub} 
														headerFontSize={'16px'}
														textFontSize={'13px'} 
														hideBottomLine={true}/>

												</div>
												
												<div style={styles.action} key={'submittedPubItemAdd-' + index} onClick={this.featurePub(pub._id)}>feature</div>
											</div>);	
										})
									}
								</div>
								: <div style={styles.emptyBlock}>No Pending Submitted Pubs</div>
						}
					</div>

				</div>
				
			</div>
		);
	}
});

export default Radium(JournalCurate);

styles = {
	pubSectionsWrapper: {
		margin: '30px 0px',
		display: 'table',
		tableLayout: 'fixed',
		width: '100%',
	},
	pubSectionWrapper: {
		width: '50%',
		display: 'table-cell',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			width: '100%',
			display: 'block',
		}
	},
	featuredPubWrapper: {
		// Because we're using table-cell, the border doesn't mess with the 1px width difference
		borderRight: '1px solid #EAEAEA',
	},
	featuredPubsSection: {
		margin: '0px 10px',
	},
	submittedPubsSection: {
		margin: '0px 10px',
	},

	sectionTitle: {
		textAlign: 'center',
		fontSize: 20,
	},
	sectionText: {
		textAlign: 'center',
		fontSize: 16,
		marginBottom: '15px'
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
	searchWrapper: {
		width: '90%',
		margin: '10px auto',
	},
	results: {
		boxShadow: '0px 0px 2px 2px #D7D7D7',
		width: 'calc(100% - 6px)',
		margin: '0 auto 5px auto',
		backgroundColor: 'white',

	},
	result: {
		padding: '5px 0px',
		// margin: '0px 5px',
		borderBottom: '1px solid #F0F0F0',
		display: 'table',
		tableLayout: 'fixed',
		width: '100%',
	},
	resultDetails: {
		display: 'table-cell',
		width: 'calc(100% - 80px)',
		padding: '5px 5px',
	},
	action: {
		display: 'table-cell',
		fontFamily: 'Courier',
		width: '80px',
		// backgroundColor: 'rgba(200,100,0,0.2)',
		verticalAlign: 'middle',
		userSelect: 'none',
		textAlign: 'center',
		cursor: 'pointer',
		':hover': {
			color: 'black',
		}
	},
	noResults: {
		fontFamily: 'Courier',
		fontSize: '15px',
		height: 30,
		lineHeight: '30px',
		textAlign: 'center',
	},
	searchTitle: {
		fontFamily: globalStyles.headerFont,
		fontSize: 16,
	},
	searchAbstract: {
		fontFamily: 'Lora',
		fontSize: 14,
		paddingLeft: '10px',
	},

};
