import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResoure) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResoure((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};
