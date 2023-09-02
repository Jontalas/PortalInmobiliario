import { getPropertyList } from './property-list.api';
import { mapPropertyListApiToVm } from './property-list.mappers';
import { addPropertyRows } from './property-list.helpers';

getPropertyList().then((propertyList) => {
  const vmPropertyList = mapPropertyListApiToVm(propertyList);
  addPropertyRows(vmPropertyList);
});
