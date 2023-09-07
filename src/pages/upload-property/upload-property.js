import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
  onAddFile,
} from '../../common/helpers';
import {
  getSaleTypeList,
  getProvinceList,
  getEquipmentsList,
  setProperty,
} from './upload-property.api';
import { formValidation } from './upload-property.validations';
import { mapPropertyDetailVmToApi } from './upload-property.mappers';
import {
  setOptionList,
  setCheckboxList,
  onAddFeature,
  onRemoveFeature,
  onAddImage,
  formatCheckboxId,
  formatDeleteFeatureButtonId,
} from './upload-property.helpers';

Promise.all([getSaleTypeList(), getProvinceList(), getEquipmentsList()]).then(
  ([saleTypeList, provinceList, equipmentsList]) => {
    setOptionList(provinceList, 'province');
    setCheckboxList(saleTypeList, 'saleTypes');
    setEventsSaleTypes(saleTypeList);
    setCheckboxList(equipmentsList, 'equipments');
    setEventsEquipments(equipmentsList);
  }
);

let propertyDetail = {
  title: '',
  notes: '',
  email: '',
  phone: '',
  price: '',
  saleTypes: '',
  address: '',
  city: '',
  province: '',
  squareMeter: '',
  rooms: '',
  bathrooms: '',
  locationUrl: '',
  mainFeatures: '',
  equipments: '',
  images: [],
};

onUpdateField('title', (event) => {
  const value = event.target.value;
  propertyDetail = { ...propertyDetail, title: value };

  formValidation.validateField('title', propertyDetail.title).then((result) => {
    onSetError('title', result);
  });
});

onUpdateField('notes', (event) => {
  const value = event.target.value;
  propertyDetail = { ...propertyDetail, notes: value };

  formValidation.validateField('notes', propertyDetail.notes).then((result) => {
    onSetError('notes', result);
  });
});

onUpdateField('email', (event) => {
  const value = event.target.value;
  propertyDetail = { ...propertyDetail, email: value };

  formValidation.validateField('email', propertyDetail.email).then((result) => {
    onSetError('email', result);
  });
});

onUpdateField('phone', (event) => {
  const value = event.target.value;
  propertyDetail = { ...propertyDetail, phone: value };

  formValidation.validateField('phone', propertyDetail.phone).then((result) => {
    onSetError('phone', result);
  });
});

onUpdateField('price', (event) => {
  const value = event.target.value;
  propertyDetail = { ...propertyDetail, price: value };

  formValidation.validateField('price', propertyDetail.price).then((result) => {
    onSetError('price', result);
  });
});

const setEventsSaleTypes = (list) => {
  list.forEach((saleType) => {
    const id = formatCheckboxId(saleType);
    onUpdateField(id, (event) => {
      const checked = event.target.checked;
      const value = event.target.value;
      const isArray = Array.isArray(propertyDetail.saleTypes);

      if (checked) {
        propertyDetail.saleTypes = isArray ? propertyDetail.saleTypes : [];
        propertyDetail.saleTypes.push(value);
      } else {
        const index = propertyDetail.saleTypes.indexOf(value);
        propertyDetail.saleTypes.splice(index, 1);
        propertyDetail.saleTypes =
          propertyDetail.saleTypes.length > 0 ? propertyDetail.saleTypes : '';
      }

      formValidation
        .validateField('saleTypes', propertyDetail.saleTypes)
        .then((result) => {
          onSetError('saleTypes', result);
        });
    });
  });
};

onUpdateField('address', (event) => {
  const value = event.target.value;
  propertyDetail = { ...propertyDetail, address: value };

  formValidation
    .validateField('address', propertyDetail.address)
    .then((result) => {
      onSetError('address', result);
    });
});

onUpdateField('city', (event) => {
  const value = event.target.value;
  propertyDetail = { ...propertyDetail, city: value };

  formValidation.validateField('city', propertyDetail.city).then((result) => {
    onSetError('city', result);
  });
});

onUpdateField('province', (event) => {
  const value = event.target.value;
  propertyDetail = { ...propertyDetail, province: value };

  formValidation
    .validateField('province', propertyDetail.province)
    .then((result) => {
      onSetError('province', result);
    });
});

onUpdateField('squareMeter', (event) => {
  const value = event.target.value;
  propertyDetail = { ...propertyDetail, squareMeter: value };

  formValidation
    .validateField('squareMeter', propertyDetail.squareMeter)
    .then((result) => {
      onSetError('squareMeter', result);
    });
});

onUpdateField('rooms', (event) => {
  const value = event.target.value;
  propertyDetail = { ...propertyDetail, rooms: value };

  formValidation.validateField('rooms', propertyDetail.rooms).then((result) => {
    onSetError('rooms', result);
  });
});

onUpdateField('bathrooms', (event) => {
  const value = event.target.value;
  propertyDetail = { ...propertyDetail, bathrooms: value };

  formValidation
    .validateField('bathrooms', propertyDetail.bathrooms)
    .then((result) => {
      onSetError('bathrooms', result);
    });
});

onUpdateField('locationUrl', (event) => {
  const value = event.target.value;
  propertyDetail = { ...propertyDetail, locationUrl: value };

  formValidation
    .validateField('locationUrl', propertyDetail.locationUrl)
    .then((result) => {
      onSetError('locationUrl', result);
    });
});

const setEventsEquipments = (list) => {
  list.forEach((equipment) => {
    const id = formatCheckboxId(equipment);
    onUpdateField(id, (event) => {
      const checked = event.target.checked;
      const value = event.target.value;
      const isArray = Array.isArray(propertyDetail.equipments);

      if (checked) {
        propertyDetail.equipments = isArray ? propertyDetail.equipments : [];
        propertyDetail.equipments.push(value);
      } else {
        const index = propertyDetail.equipments.indexOf(value);
        propertyDetail.equipments.splice(index, 1);
        propertyDetail.equipments =
          propertyDetail.equipments.length > 0 ? propertyDetail.equipments : '';
      }
    });
  });
};

onAddFile('add-image', (image) => {
  onAddImage(image);
  propertyDetail.images.push(image);
});

onSubmitForm('insert-feature-button', (event) => {
  const newFeature = document.getElementById('newFeature');
  const value = newFeature.value;
  if (value !== '') {
    const index = Array.isArray(propertyDetail.mainFeatures)
      ? propertyDetail.mainFeatures.indexOf(value)
      : -1;
    if (index === -1) {
      onAddFeature(value);
      propertyDetail.mainFeatures = Array.isArray(propertyDetail.mainFeatures)
        ? propertyDetail.mainFeatures
        : [];
      propertyDetail.mainFeatures.push(value);
      formValidation
        .validateField('mainFeatures', propertyDetail.mainFeatures)
        .then((result) => {
          onSetError('mainFeatures', result);
        });
      const deleteButtonId = formatDeleteFeatureButtonId(value);
      onSubmitForm(deleteButtonId, (event) => {
        console.log('update boton');
        onRemoveFeature(value);
        removeFromArray(value, propertyDetail.mainFeatures);
        if (propertyDetail.mainFeatures.length === 0) {
          propertyDetail.mainFeatures = '';
        }
        formValidation
          .validateField('mainFeatures', propertyDetail.mainFeatures)
          .then((result) => {
            onSetError('mainFeatures', result);
          });
      });
    }
  }
});

const removeFromArray = (valor, array) => {
  const indice = array.indexOf(valor);
  if (indice !== -1) {
    array.splice(indice, 1);
  }
};

onSubmitForm('save-button', () => {
  formValidation.validateForm(propertyDetail).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
      onSave().then(() => {
        alert('propiedad enviada correctamente');
        window.location.href = '/pages/upload-property/upload-property.html';
      });
    }
  });
});

const onSave = () => {
  const apiPropertyDetail = mapPropertyDetailVmToApi(propertyDetail);
  return setProperty(apiPropertyDetail);
};
