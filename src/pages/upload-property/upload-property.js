import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers';
import {
  getSaleTypeList,
  getProvinceList,
  getEquipmentsList,
  setProperty,
} from './upload-property.api';
import { formValidation } from './upload-property.validations';
import {
  setOptionList,
  setCheckboxList,
  onAddFeature,
  onRemoveFeature,
} from './upload-property.helpers';

Promise.all([getSaleTypeList(), getProvinceList(), getEquipmentsList()]).then(
  ([saleTypeList, provinceList, equipmentsList]) => {
    setOptionList(provinceList, 'province');
    setCheckboxList(saleTypeList, 'saleTypes');
    setCheckboxList(equipmentsList, 'equipments');
  }
);

let propertyDetail = {
  title: '',
  notes: '',
  email: '',
  phone: '',
  price: '',
  saleTypeIds: '',
  address: '',
  city: '',
  provinceId: '',
  squareMeter: '',
  rooms: '',
  bathrooms: '',
  locationUrl: '',
  mainFeatures: '',
  equipmentIds: '',
  mainImage: '',
  images: '',
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

onUpdateField('saleTypes', (event) => {
  const saleTypeArray = getCheckboxes('saleTypes');
  propertyDetail = { ...propertyDetail, saleTypeIds: saleTypeArray };

  formValidation
    .validateField('saleTypeIds', propertyDetail.saleTypeIds)
    .then((result) => {
      onSetError('saleTypes', result);
    });
});

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
  propertyDetail = { ...propertyDetail, provinceId: value };

  formValidation
    .validateField('provinceId', propertyDetail.provinceId)
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

const getCheckboxes = (id) => {
  const checkboxes = document.querySelectorAll(`#${id} input[type="checkbox"]`);
  let checkboxMarcados = null;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkboxMarcados = checkboxMarcados || [];
      checkboxMarcados.push(checkbox.value);
    }
  });
  return checkboxMarcados || '';
};

const insertFeatureButton = document.getElementById('insert-feature-button');
insertFeatureButton.addEventListener('click', () => {
  const newFeature = document.getElementById('newFeature');
  const value = newFeature.value;
  if (value !== '') {
    onAddFeature(value);
    if (propertyDetail.mainFeatures === '') {
      propertyDetail.mainFeatures = [];
    }
    propertyDetail.mainFeatures.push(value);
    formValidation
      .validateField('mainFeatures', propertyDetail.mainFeatures)
      .then((result) => {
        onSetError('mainFeatures', result);
      });
    const deleteButtonId = `delete-${value}-button`;
    const deleteButton = document.getElementById(deleteButtonId);
    deleteButton.addEventListener('click', () => {
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
});

const removeFromArray = (valor, array) => {
  const indice = array.indexOf(valor);
  if (indice !== -1) {
    array.splice(indice, 1);
  }
};