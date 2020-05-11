import ensureUserForAttribution from 'shared/utils/ensureUserForAttribution';
import { PubAttribution, User } from '../models';
import { attributesPublicUser } from '../utils/attributesPublicUser';

export const createPubAttribution = (inputValues) => {
	return PubAttribution.create({
		userId: inputValues.userId,
		pubId: inputValues.pubId,
		name: inputValues.name,
		order: inputValues.order,
	})
		.then((newAttribution) => {
			return PubAttribution.findOne({
				where: { id: newAttribution.id },
				attributes: { exclude: ['updatedAt'] },
				include: [
					{ model: User, as: 'user', required: false, attributes: attributesPublicUser },
				],
			});
		})
		.then((populatedPubAttribution) => {
			const populatedPubAttributionJson = populatedPubAttribution.toJSON();
			if (populatedPubAttribution.user) {
				return populatedPubAttributionJson;
			}
			return ensureUserForAttribution(populatedPubAttributionJson);
		});
};

export const updatePubAttribution = (inputValues, updatePermissions) => {
	// Filter to only allow certain fields to be updated
	const filteredValues = {};
	Object.keys(inputValues).forEach((key) => {
		if (updatePermissions.includes(key)) {
			filteredValues[key] = inputValues[key];
		}
	});

	return PubAttribution.update(filteredValues, {
		where: { id: inputValues.pubAttributionId },
	}).then(() => {
		return filteredValues;
	});
};

export const destroyPubAttribution = (inputValues) => {
	return PubAttribution.destroy({
		where: { id: inputValues.pubAttributionId },
	});
};
