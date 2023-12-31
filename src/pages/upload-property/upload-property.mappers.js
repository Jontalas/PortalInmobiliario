export const mapPropertyDetailVmToApi = (propertyDetail) => ({
  title: propertyDetail.title,
  notes: propertyDetail.notes,
  email: propertyDetail.email,
  phone: propertyDetail.phone,
  price: str2Nmbr(propertyDetail.price),
  saleTypeIds: propertyDetail.saleTypes,
  address: propertyDetail.address,
  city: propertyDetail.city,
  provinceId: propertyDetail.province,
  squareMeter: str2Nmbr(propertyDetail.squareMeter),
  rooms: str2Nmbr(propertyDetail.rooms),
  bathrooms: str2Nmbr(propertyDetail.bathrooms),
  locationUrl: propertyDetail.locationUrl,
  mainFeatures: propertyDetail.mainFeatures,
  equipmentIds: propertyDetail.equipments,
  images: propertyDetail.images,
});

const str2Nmbr = (valor) => {
  valor = valor.replace(/[^\d.]/g, '');
  const partes = valor.split('.');
  let entero = partes[0];
  let decimal = partes[1] || '';
  valor = entero + '.' + decimal;
  const regex = /^0+$/;
  if (regex.test(decimal) || decimal === '') {
    valor = entero;
  }
  if (decimal !== '') {
    valor = valor.replace(/0+$/, '');
  }
  return parseFloat(valor);
};