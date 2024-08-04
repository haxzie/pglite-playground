import { message } from "./client";

export const generateQueryName = async (
  query: string
): Promise<string | null> => {
  const { data, status } = await message({
    query,
  });

  console.log({ data });

  if (status === 200) {
    return data.name;
  }

  return null;
};
