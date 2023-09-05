import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers';
import {
  getPropertyDetails,
  getEquipmentDetails,
  setContact,
} from './property-detail.api';
import { formValidation } from './property-list.validations';
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

let contact = {
  email: '',
  message: '',
  propertyID: params.id,
};

onUpdateField('email', (event) => {
  const value = event.target.value;
  contact = { ...contact, email: value };

  formValidation.validateField('email', contact.email).then((result) => {
    onSetError('email', result);
  });
});

onUpdateField('message', (event) => {
  const value = event.target.value;
  contact = { ...contact, message: value };

  formValidation.validateField('message', contact.message).then((result) => {
    onSetError('message', result);
  });
});

onSubmitForm('contact-button', () => {
  formValidation.validateForm(contact).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
      setContact(contact).then(() => {
        alert('Pregunta enviada correctamente');
        window.location.href = `/pages/property-detail/property-detail.html?id=${params.id}`;
      });
    }
  });
});
