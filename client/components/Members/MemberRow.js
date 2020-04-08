import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import { Button, Tag } from '@blueprintjs/core';

import { Avatar } from 'components';
import { MenuButton } from 'components/Menu';
import { usePageContext } from 'utils/hooks';

import MemberPermissionPicker from './MemberPermissionPicker';

require('./memberRow.scss');

const propTypes = {
	memberData: PropTypes.object.isRequired,
	isInvitation: PropTypes.bool,
	isReadOnly: PropTypes.bool,
	onUpdate: PropTypes.func,
	onDelete: PropTypes.func,
};

const defaultProps = {
	isInvitation: false,
	isReadOnly: false,
	onUpdate: null,
	onDelete: null,
};

// const permissionTypes = [
// 	{
// 		key: 'view',
// 		description: {
// 			pub: ['View Pub when unpublished', 'View member-only Discussions and Reviews'],
// 			collection: ['View all unpublished Pubs', 'View member-only Discussions and Reviews'],
// 			community: ['View all unpublished Pubs', 'View member-only Discussions and Reviews'],
// 		},
// 	},
// 	{
// 		key: 'edit',
// 		description: {
// 			pub: ['Edit Pub draft', 'All View permissions'],
// 			collection: ['Edit Pub drafts', 'All View permissions'],
// 			community: ['Edit Pub drafts', 'All View permissions'],
// 		},
// 	},
// 	{
// 		key: 'manage',
// 		description: {
// 			pub: ['Manage Pub settings', 'All Edit permissions'],
// 			collection: [
// 				'Manage Pub settings',
// 				'Manage Collection settings',
// 				'Create new Pubs in this Collection',
// 				'All Edit permissions',
// 			],
// 			community: [
// 				'Manage Pub settings',
// 				'Manage Collection settings',
// 				'Manage Community settings',
// 				'Create new Pubs',
// 				'Create new Collections',
// 				'All Edit permissions',
// 			],
// 		},
// 	},
// 	{
// 		key: 'admin',
// 		description: {
// 			pub: [
// 				'Create Releases',
// 				'See all Discussions and Reviews',
// 				'Delete Pub',
// 				'All Manage permissions',
// 			],
// 			collection: [
// 				'Create Pub Releases',
// 				'See all Discussions and Reviews',
// 				'Delete Pubs',
// 				'Delete Collection',
// 				'All Manage permissions',
// 			],
// 			community: [
// 				'Create Pub Releases',
// 				'See all Discussions and Reviews',
// 				'Assign DOIs',
// 				'Delete Pubs',
// 				'Delete Collections',
// 				'Delete Community',
// 				'All Manage permissions',
// 			],
// 		},
// 	},
// ];

// // Pub
// // - View unpublished Pub
// // - View member-only reviews and Discussions
// // - Edit Pub draft
// // - Manage Pub settings
// // - Create Releases
// // - See all discussions and reviews
// // - delete pub

// // Collection
// // - View unpublished Pubs
// // - View member-only reviews and Discussions
// // - Edit Pub drafts
// // - Manage Pub settings
// // - Manage collection settings
// // - Create new pubs in collection
// // - Create Releases
// // - Delete collections
// // - See all discussions and reviews
// // - delete pubs

const MemberRow = (props) => {
	const { memberData, isInvitation, isReadOnly, onDelete, onUpdate } = props;
	const user = memberData.user || { fullName: memberData.email, initials: '@' };
	const { scopeData } = usePageContext();
	const { activeTargetType } = scopeData.elements;
	const { canAdmin } = scopeData.activePermissions;
	const outOfPermissionRange = !canAdmin && memberData.permissions === 'admin';

	const handleSetPermissions = (permissions) =>
		onUpdate(memberData, { permissions: permissions });

	const renderControls = () => {
		const permissionSelector = onUpdate && (
			<MenuButton
				aria-label="Select member permissions"
				className="member-permission-select bp3-elevation-3"
				placement="bottom-end"
				buttonProps={{
					className: 'permission-button',
					rightIcon: 'caret-down',
					outlined: true,
				}}
				buttonContent={`${memberData.permissions}`}
			>
				<MemberPermissionPicker
					activeTargetType={activeTargetType}
					canAdmin={canAdmin}
					activePermission={memberData.permissions}
					onSelect={handleSetPermissions}
				/>
			</MenuButton>
		);

		const deleteButton = onDelete && (
			<Button
				minimal
				icon="cross"
				onClick={() => onDelete(memberData)}
				disabled={outOfPermissionRange}
			/>
		);

		return (
			<React.Fragment>
				{permissionSelector}
				{deleteButton}
			</React.Fragment>
		);
	};

	return (
		<div className="member-row-component">
			<Avatar
				className={isInvitation ? 'invitation' : ''}
				initials={user.initials}
				avatar={user.avatar}
				width={30}
			/>
			<div className="member-name">{user.fullName}</div>
			{isInvitation && (
				<Tag className="pending-tag" minimal>
					Pending
				</Tag>
			)}
			<div className="added">
				{isInvitation ? 'Invited' : 'Added'}{' '}
				{dateFormat(memberData.createdAt, 'mmm dd, yyyy')}
			</div>
			{!(isReadOnly || outOfPermissionRange) && renderControls()}
			{(isReadOnly || outOfPermissionRange) && (
				<Tag minimal large>
					Can {memberData.permissions}
				</Tag>
			)}
		</div>
	);
};

MemberRow.propTypes = propTypes;
MemberRow.defaultProps = defaultProps;
export default MemberRow;
