import { getPropertyDetails, getEquipmentDetails } from './property-detail.api';
import {
  mapPropertyApiToVm,
  mapEquipmentListApiToVm,
} from './property-detail.mappers';
import { setPropertyValues } from './property-detail.helpers';
import { history } from '../../core/router';

let propertyDetail = {
  id: '',
  title: '',
  notes: '',
  price: '',
  city: '',
  squareMeter: '',
  rooms: '',
  bathrooms: '',
  locationUrl: '',
  mainFeatures: '',
  equipments: '',
  mainImage: '',
  images: '',
};

const params = history.getParams();

Promise.all([getPropertyDetails(params.id), getEquipmentDetails()]).then(
  ([apiPropertyDetail, apiEquipmentDetails]) => {
    apiPropertyDetail.equipmentIds = mapEquipmentListApiToVm(
      apiPropertyDetail.equipmentIds,
      apiEquipmentDetails
    );
    propertyDetail = mapPropertyApiToVm(apiPropertyDetail);
    setPropertyValues(propertyDetail);
  }
);
