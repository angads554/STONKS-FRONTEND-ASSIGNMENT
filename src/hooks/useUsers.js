import { useQuery } from "react-query";
import axios from "axios";

const fetchUsers = async (page, search) => {
  const response = await axios.get(
    "https://665621609f970b3b36c4625e.mockapi.io/users",
    {
      params: {
        page: page + 1,
        limit: 5,
        search,
      },
    }
  );
  const totalCountResponse = await axios.get(
    "https://665621609f970b3b36c4625e.mockapi.io/users",
    {
      params: {
        search,
      },
    }
  );
  return {
    users: response.data,
    totalCount: totalCountResponse.data.length,
  };
};

export const useUsers = (page, search) => {
  return useQuery(["users", page, search], () => fetchUsers(page, search), {
    keepPreviousData: true,
  });
};
