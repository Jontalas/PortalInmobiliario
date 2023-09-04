export const mapPropertyApiToVm = (property) => ({
  id: property.id,
  title: property.title,
  notes: property.notes,
  price: `${property.price.toLocaleString()} €`,
  city: property.city,
  squareMeter: `${property.squareMeter}m2`,
  rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
  bathrooms: `${property.bathrooms} ${getBathroomWord(property.bathrooms)}`,
  locationUrl: property.locationUrl,
  mainFeatures: property.mainFeatures,
  equipments: property.equipmentIds,
  mainImage: property.images[0],
  images: property.images,
});

const getRoomWord = (rooms) => (rooms > 1 ? 'habitaciones' : 'habitación');
const getBathroomWord = (bathrooms) => (bathrooms > 1 ? 'baños' : 'baño');

export const mapEquipmentListApiToVm = (equipmentIds, equipmentList) => {
  if (Array.isArray(equipmentIds)) {
    const filtered = equipmentList.filter(equipment => equipmentIds.includes(equipment.id));
    const equipments = filtered.map(equipment => equipment.name);
    return equipments;
  } else {
    return [];
  }
}