export const mapPropertyApiToVm = (property, EquipmentDetails) => ({
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
  equipments: EquipmentDetails.filter((equipment) =>
    property.equipmentIds.includes(equipment.id)
  ).map((equipment) => equipment.name),
  mainImage: property.images[0],
  images: property.images,
});

const getRoomWord = (rooms) => (rooms > 1 ? 'habitaciones' : 'habitación');
const getBathroomWord = (bathrooms) => (bathrooms > 1 ? 'baños' : 'baño');
