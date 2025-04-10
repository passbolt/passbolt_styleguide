import DeleteResource from "./DeleteResource";
import {
  defaultPropsMultipleResource,
  defaultPropsOneResource,
  defaultPropsOneResourceLongPassword
} from "./DeleteResource.test.data";


export default {
  title: 'Components/Resource/DeleteResource',
  component: DeleteResource
};

export const SinglePassword = {
  args: defaultPropsOneResource()
};

export const MultiplePassword = {
  args: defaultPropsMultipleResource()
};

export const WithLongPassword = {
  args: defaultPropsOneResourceLongPassword()
};
